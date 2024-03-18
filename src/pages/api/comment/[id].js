import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import dbConnect from "@/helper/backend/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import post from "@/models/post";
import like from "@/models/like";
import user from "@/models/user";
import comment from "@/models/comment";

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
            const mine = await comment.find({
                uuid: id,
            });
            return res.status(200).json(mine);
        case 'POST':
            const thePost = await post.findOne({
                uuid: id,
            });
            await comment.create({
                uuid: id,
                to: thePost.authorId,
                from: me.username,
                content: req.body.content,
                date: new Date(Date.now()),
                parent: req.body.parent ?? '',
                extra: {...thePost}
            });
            return res.status(200).json({});
        default:
            break;
    }

    return res.status(500).send({error: MEG_NOT_SUPPORTED});
}