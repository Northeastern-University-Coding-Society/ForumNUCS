import post from "@/models/post";
import {MEG_NOT_SUPPORTED} from "@/commons/Constants";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/helper/backend/database";
import user from "@/models/user";

const crypto = require('crypto');

export default async function handler(
    req, res
) {
    // todo: guest is allowed, for now
    // no check for user identity
    const method = req.method;
    const {id} = req.query;
    const session = await getServerSession(req, res, authOptions);
    await dbConnect();

    switch (method) {
        case 'GET':
            // no check
            const thePost = await post.findOne({
                uuid: id,
                status: {$ne: 'deleted'}
            });
            return res.status(200).json(thePost);
        case 'POST':
            // whatever id for post is okay
            if (!session || !session.user || !session.user.email) {
                return res.status(403).json({error: 'not available'});
            }
            const author = await user.findOne({email: session.user.email});
            const uuid = crypto.randomUUID();
            await post.create({
                ...req.body,
                uuid,
                date: new Date(Date.now()),
                author: `${author.first} ${author.last}`,
                authorId: author.username
            })
            return res.status(200).json({});
        case 'PUT':
            if (!session || !session.user || !session.user.email) {
                return res.status(403).json({error: 'not available'});
            }
            const currentUser = await user.findOne({email: session.user.email});
            await post.updateOne(
                {$and: [{uuid: id}, {authorId: currentUser.username}]},
                {...req.body}
            )
            return res.status(200).json({});
        case 'DELETE':
            if (!session || !session.user || !session.user.email) {
                return res.status(403).json({error: 'not available'});
            }
            if (session.user.email === process.env.ADMIN) {
                await post.updateOne(
                    {uuid: id},
                    {status: 'deleted'}
                )
            } else {
                const currentUser = await user.findOne({email: session.user.email});
                await post.updateOne(
                    {$and: [{uuid: id}, {authorId: currentUser.username}]},
                    {status: 'deleted'}
                )
            }
            return res.status(200).json({});
        default:
            break;
    }
    res.status(500).send(MEG_NOT_SUPPORTED);
}