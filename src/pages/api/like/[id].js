import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import dbConnect from "@/helper/backend/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import post from "@/models/post";
import like from "@/models/like";
import user from "@/models/user";
import {myServerSession} from "@/helper/backend/auth";

export default async function handler(
    req, res
) {
    const {id} = req.query;
    const method = req.method;

    await dbConnect();

    const session = await myServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        return res.status(403).json({error: 'not available'});
    }

    const me = await user.findOne({
        email: session.user.email
    });

    switch (method) {
        case 'GET':
            const mine = await like.findOne({
                uuid: id,
                by: me.username
            });
            return res.status(200).json(mine);
        case 'POST':
            const thePost = await post.findOne({
                uuid: id,
            });
            const ifLiked = await like.findOne({
                uuid: id,
                by:me.username
            })
            if (ifLiked && ifLiked.by) {
                await like.deleteOne({
                    uuid: id,
                    by:me.username
                });
            } else {
                await like.create({
                    uuid: id,
                    author: thePost.authorId,
                    by: me.username,
                    date: new Date(Date.now()),
                    extra: {...thePost}
                });
            }
            return res.status(200).json({});
        default:
            break;
    }

    return res.status(500).send({error: MEG_NOT_SUPPORTED});
}