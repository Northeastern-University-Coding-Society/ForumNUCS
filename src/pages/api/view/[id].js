import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import view from "@/models/view";
import dbConnect from "@/helper/backend/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import post from "@/models/post";
import {myServerSession} from "@/helper/backend/auth";

export default async function handler(
    req, res
) {
    const {id} = req.query;
    const method = req.method;

    await dbConnect();

    const session = await myServerSession(req, res, authOptions);

    switch (method) {
        case 'GET':
            const count = await view.countDocuments({
                uuid: id,
            })
            break;
        case 'POST':
            const thePost = await post.findOne({
                uuid: id,
            });
            await view.create({
                uuid: id,
                author: thePost.authorId,
                by: session?.user?.email ?? 'guest',
                date: new Date(Date.now()),
                extra: {...thePost}
            });
            return res.status(200).json({});
        default:
            break;
    }

    return res.status(500).send({error: MEG_NOT_SUPPORTED});
}