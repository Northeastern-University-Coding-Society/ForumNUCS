import post from "@/models/post";
import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import dbConnect from "@/helper/backend/database";

export default async function handler(
    req, res
) {
    // todo: guest is allowed, for now
    // no check for user identity
    const method = req.method;
    if (method === 'GET') {
        await dbConnect();
        const all = await post.find({
            status: {$ne: 'deleted'}
        }, {})
        return res.status(200).json(all);
    }
    res.status(500).send(MEG_NOT_SUPPORTED);
}