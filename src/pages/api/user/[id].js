import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import user from "@/models/user";
import dbConnect from "@/helper/backend/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

const crypto = require('crypto');

const adminInfo = {
    first: 'admin',
    last: 'admin',
    email: process.env.ADMIN,
    username: 'admin'
};

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
        console.log('safety cheeck finds...', temp)
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

    const loginUser = session.user.email === process.env.ADMIN
        ? adminInfo :
        await user.findOne({email: session?.user?.email}).catch(() => {
            return null
        });

    if (method !== 'POST' && !loginUser) {
        return res.status(403).json({error: 'not available'});
    }

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
            if (id === session.user.email && session.user.email === process.env.ADMIN) {
                return res.status(200).json(adminInfo);
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
            return res.status(200).json(temp);
        case 'POST':
            if (!await safetyCheck({email: data.email, username: id})) {
                return res.status(400).json({data: {}, hasError: true, error: 'user exist'});
            }
            await user.create({
                ...req.body,
                username: id,
                password: generateMD5(req.body.password)
            });
            break;
        case 'PUT':
            if (!session || !session.user || !session.user.email) {
                return res.status(403).json({error: 'not available'});
            }
            if (session.user.email === process.env.ADMIN) {
                // admin update
                await user.updateOne({
                    username: id
                }, {
                    $set: {...req.body}
                });
            } else {
                console.log(req.body.email, loginUser.email)
                if (req.body.email !== loginUser.email) {
                    // user are changing email
                    // one more check
                    if (!await safetyCheck({
                        email: req.body.email,
                        username: 'abcd'
                    })) return res.status(403).json({error: 'not available'});
                }
                await user.updateOne({
                    username: loginUser.username
                }, {
                    $set: {...req.body}
                });
            }
            break;
        case 'DELETE':
            break;
        default:
            res.status(500).send(MEG_NOT_SUPPORTED);
            break;
    }

    res.status(200).json({info: 'Hello World'});
}
