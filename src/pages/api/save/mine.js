import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import dbConnect from "@/helper/backend/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import user from "@/models/user";
import save from "@/models/save";

export default async function handler(
    req, res
) {
    const {id, target} = req.query;
    const method = req.method;

    await dbConnect();

    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        return res.status(403).json({error: 'not available'});
    }

    switch (method) {
        case 'GET':
            const me = await user.findOne({
                email: session.user.email
            });
            if (!target || target === 'author') {
                const count = await save.countDocuments({
                    author: me.username,
                })
                return res.status(200).json({count});
            } else {
                const count = await save.find({
                    by: me.username,
                })
                return res.status(200).json(count);
            }
        default:
            break;
    }

    return res.status(500).send({error: MEG_NOT_SUPPORTED});
}