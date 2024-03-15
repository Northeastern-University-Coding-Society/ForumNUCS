import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import user from "@/models/user";
import dbConnect from "@/helper/backend/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import follow from "@/models/follow";

const crypto = require('crypto');

export default async function handler(
    req, res
) {
    // return part of information, as this is author search
    const {id} = req.query;
    const method = req.method;

    await dbConnect();

    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user || !session.user.email) {
        return res.status(403).json({error: 'not available'});
    }

    console.log(session);

    const me = await user.findOne({email: session.user.email});

    console.log('me');

    switch (method) {
        case 'GET':
            // const temp = await user.findOne({
            //     username: id
            // }, {
            //     first: 1,
            //     last: 1,
            //     school: 1,
            //     campus: 1,
            //     company: 1,
            //     portrait: 1,
            // })
            return res.status(200).json({});
        case 'POST':
            const found = await follow.findOne({
                $and: [
                    {follower: me.username},
                    {followee: id}
                ]
            })
            if (found && found.followee === id) {
                // delete
                await follow.deleteOne({
                    $and: [
                        {follower: me.username},
                        {followee: id}
                    ]
                });
            } else {
                // create
                await follow.create({
                    follower: me.username,
                    followee: id,
                    name: `${me.first} ${me.last}`,
                    date: new Date(Date.now())
                });
            }
            return res.status(200).json({
                follower: me.username,
                followee: id
            });
        default:
            res.status(500).send(MEG_NOT_SUPPORTED);
            break;
    }

    res.status(200).json({info: 'Hello World'});
}
