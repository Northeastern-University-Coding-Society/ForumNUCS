import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import dbConnect from "@/helper/backend/database";
import follow from "@/models/follow";

export default async function handler(
    req, res
) {
    const method = req.method;
    if (method === 'POST') {
        await dbConnect();
        const all = await follow.findOne({
            follower: req.body.from,
            followee: req.body.to
        })
        return res.status(200).json(all ?? {});
    }
    res.status(500).send(MEG_NOT_SUPPORTED);
}