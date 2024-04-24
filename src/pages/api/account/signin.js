import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import dbConnect from "@/helper/backend/database";
import {checkAuth, checkUserLogin} from "@/helper/backend/user";

export default async function handler(
    req, res
) {
    const method = req.method;

    await dbConnect();

    switch (method) {
        case 'POST':
            const auth = await checkUserLogin(req.body);
            return res.status(200).json({...auth});
        default:
            break;
    }

    return res.status(500).send({error: MEG_NOT_SUPPORTED});
}