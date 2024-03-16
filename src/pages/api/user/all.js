import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/helper/backend/database";
import user from "@/models/user";

export default async function handler(
    req, res
) {
    const method = req.method;
    const session = await getServerSession(req, res, authOptions);

    await dbConnect();

    switch (method) {
        case 'GET':
            if (!session || !session.user || !session.user.email) {
                return res.status(403).json({error: 'not available'});
            }
            // console.log('pass 1', id)
            if (session.user.email !== process.env.ADMIN) {
                return res.status(403).json({error: 'not available'});
            }
            console.log('pass 2')
            const all = await user.find({});
            return res.status(200).json(all);
        default:
            res.status(500).send(MEG_NOT_SUPPORTED);
            break;
    }

    res.status(200).json({ info: 'Hello World' });
}
