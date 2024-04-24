import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import user from "@/models/user";
import dbConnect from "@/helper/backend/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import follow from "@/models/follow";
import {myServerSession} from "@/helper/backend/auth";

const crypto = require('crypto');

export default async function handler(
    req, res
) {
    // return part of information, as this is author search
    const {id} = req.query;
    const method = req.method;

    const session = await myServerSession(req, res, authOptions);

    if (!session || !session.user || !session.user.email) {
        return res.status(403).json({error: 'not available'});
    }

    const me = await user.findOne({email: session.user.email});

    await dbConnect();

    switch (method) {
        case 'GET':
            const temp = await follow.find({
                followee: me.username
            })
            return res.status(200).json(temp);
        default:
            res.status(500).send(MEG_NOT_SUPPORTED);
            break;
    }

    res.status(200).json({info: 'Hello World'});
}
