import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import user from "@/models/user";
import dbConnect from "@/helper/backend/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

const crypto = require('crypto');

export default async function handler(
    req, res
) {

    console.log('receiving request...', req.query, req.method, req.body);

    const session = await getServerSession(req, res, authOptions);

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

    /// IMPORTANT: Due to safety concern
    /// in GET: id is email
    /// in ELSE: id is username
    switch (method) {
        case 'GET':
            // check session first
            if (!session || !session.user || !session.user.email) {
                return res.status(403).json({error: 'not available'});
            }
            console.log('pass 1', id)
            if (session.user.email !== id && session.user.email !== process.env.ADMIN) {
                return res.status(403).json({error: 'not available'});
            }
            console.log('pass 2')
            const temp = await user.findOne({
                email: id
            }, {
                first: 1,
                last: 1,
                email: 1,
                username: 1,
                date: 1,
                school: 1,
                campus: 1,
                company: 1,
                portrait: 1,
            })
            return res.status(200).json({...temp});
        case 'POST':
            if (!await safetyCheck({email: data.email, username: id})) {
                return res.status(200).json({data: {}, hasError: true, error: 'user exist'});
            }
            if (!session || !session.user || !session.user.email) {
                return res.status(403).json({error: 'not available'});
            }
            if (session.user.email !== data.email && session.user.email !== process.env.ADMIN) {
                return res.status(403).json({error: 'not available'});
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
