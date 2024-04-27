import post from "@/models/post";
import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import dbConnect from "@/helper/backend/database";
import {corsMiddleware} from "@/helper/backend/auth";

export default async function handler(
    req, res
) {
    // todo: guest is allowed, for now
    // no check for user identity
    await corsMiddleware(req, res);
    const method = req.method;
    const params = req.query;
    console.log(params)
    if (method === 'GET') {
        await dbConnect();
        if (params.sort) {
            const sorter = params.sort === 'name' ? 'date' : 'title';
            const all = await post.find({
                status: {$ne: 'deleted'}
            }, {}).sort({
                [sorter]: 1
            })
            return res.status(200).json(all);
        } else {
            const all = await post.find({
                status: {$ne: 'deleted'}
            }, {})
            return res.status(200).json(all);
        }
    }
    res.status(500).send(MEG_NOT_SUPPORTED);
}