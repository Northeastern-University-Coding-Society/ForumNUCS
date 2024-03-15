import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import dbConnect from "@/helper/backend/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import post from "@/models/post";
import save from "@/models/save";
import like from "@/models/like";
import user from "@/models/user";

export default async function handler(
    req, res
) {
    const {id} = req.query;
    const method = req.method;

    await dbConnect();

    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        return res.status(403).json({error: 'not available'});
    }

    const me = await user.findOne({
        email: session.user.email
    });

    switch (method) {
        case 'GET':
            const mine = await save.findOne({
                uuid: id,
                by: me.username
            });
            return res.status(200).json(mine);
            break;
        case 'POST':
            const thePost = await post.findOne({
                uuid: id,
            });
            const ifLiked = await save.findOne({
                uuid: id,
                by:me.username
            })
            if (ifLiked && ifLiked.by) {
                await save.deleteOne({
                    uuid: id,
                    by:me.username
                });
            } else {
                await save.create({
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