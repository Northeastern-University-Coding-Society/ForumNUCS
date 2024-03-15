import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import user from "@/models/user";
import dbConnect from "@/helper/backend/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

const crypto = require('crypto');

export default async function handler(
    req, res
) {
    // return part of information, as this is author search
    const {id} = req.query;
    const method = req.method;

    await dbConnect();

    /// IMPORTANT: Due to safety concern
    /// in GET: id is email
    /// in ELSE: id is username
    switch (method) {
        case 'GET':
            const temp = await user.findOne({
                email: id
            }, {
                first: 1,
                last: 1,
                school: 1,
                campus: 1,
                company: 1,
                portrait: 1,
            })
            return res.status(200).json(temp);
        default:
            res.status(500).send(MEG_NOT_SUPPORTED);
            break;
    }

    res.status(200).json({info: 'Hello World'});
}
