import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import view from "@/models/view";
import dbConnect from "@/helper/backend/database";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import user from "@/models/user";
import {myServerSession} from "@/helper/backend/auth";

export default async function handler(
    req, res
) {
    const {id, target} = req.query;
    const method = req.method;

    await dbConnect();

    const session = await myServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        return res.status(403).json({error: 'not available'});
    }

    switch (method) {
        case 'GET':
            if (session.user.email === process.env.ADMIN) {
                const count = await view.countDocuments({});
                return res.status(200).json({count});
            }
            const me = await user.findOne({
                email: session.user.email
            });
            if (!target || target === 'author') {
                const count = await view.countDocuments({
                    author: me.username,
                })
                return res.status(200).json({count});
            } else {
                const count = await view.find({
                    by: me.username,
                })
                return res.status(200).json(count);
            }
        default:
            break;
    }

    return res.status(500).send({error: MEG_NOT_SUPPORTED});
}