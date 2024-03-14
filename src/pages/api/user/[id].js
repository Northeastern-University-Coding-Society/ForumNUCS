import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import user from "@/models/user";
import dbConnect from "@/helper/backend/database";

const crypto = require('crypto');

export default async function handler(
    req, res
) {

    console.log('receiving request...', req.query, req.method, req.body);

    const safetyCheck = async (params) => {
        if (!params.email || !params.username) {
            return false;
        }
        const temp = await user.findOne({$or: [{email: params.email}, {username: params.username}]});
        // check exist
        return !temp || !temp.email;
    }

    const generateMD5 = (string) => {
        return crypto.createHash('md5').update(string).digest('hex');
    }

    const {id} = req.query;
    const method = req.method;
    const data = req.body;

    await dbConnect();

    switch (method) {
        case 'GET':
            break;
        case 'POST':
            if (!await safetyCheck({email: data.email, username: id})) {
                return res.status(200).json({data: {}, hasError: true, error: 'user exist'});
            }
            await user.create({
                ...req.body,
                username: id,
                password: generateMD5(req.body.password)
            });
            break;
        case 'PUT':
            if (!await safetyCheck({email: data.email, username: id})) {
                return res.status(200).json({data: {}, hasError: true, error: 'user exist'});
            }
            await user.updateOne({
                username: id
            }, {
                $set: {...req.body}
            });
            break;
        case 'DELETE':
            break;
        default:
            res.status(500).send(MEG_NOT_SUPPORTED);
            break;
    }

    res.status(200).json({info: 'Hello World'});
}
