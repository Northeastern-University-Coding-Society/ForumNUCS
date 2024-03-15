import post from "@/models/post";
import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import dbConnect from "@/helper/backend/database";
import user from "@/models/user";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(
    req, res
) {
    const {filter, search} = req.query;
    const method = req.method;
    if (method === 'GET') {
        await dbConnect();

        const session = await getServerSession(req, res, authOptions);
        const loginUser = await user.findOne({email: session?.user?.email}).catch(() => {
            return null
        });

        if (filter === 'mine') {
            if (!loginUser) {
                return res.status(403).json({error: 'not available'});
            }
            const all = await post.find({
                authorId: loginUser.username
            }, {})
            return res.status(200).json(all);
        } else {
            if (search) {
                const regex = new RegExp(search, 'i');
                const all = await post.find({
                    [filter]: regex
                }, {})
                return res.status(200).json(all);
            } else {
                const all = await post.find({}, {})
                return res.status(200).json(all);
            }
        }
    }
    res.status(500).send(MEG_NOT_SUPPORTED);
}