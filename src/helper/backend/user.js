import crypto from "crypto";
import dbConnect from "@/helper/backend/database";
import user from "@/models/user";

export const checkAuth = async (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return null;
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    return checkUserLogin({email, password});
}

export const checkUserLogin = async (credentials) => {
    const generateMD5 = (string) => {
        return crypto.createHash('md5').update(string).digest('hex');
    }
    console.log('login info', credentials)
    if (!credentials?.email || !credentials?.password) {
        return null;
    }
    await dbConnect();
    if (credentials.email === process.env.ADMIN_EMAIL && credentials.password === process.env.ADMIN_PASSWORD) {
        return {username: 'admin', email: process.env.ADMIN_EMAIL}
    }
    const findUser = await user.findOne({email: credentials.email});
    console.log(credentials.email, findUser)
    if (!findUser) {
        return null;
    }
    if (generateMD5(credentials.password) === findUser.password) {
        console.log('login success')
        return {username: findUser.username, email: findUser.email}
    }
    return null;
}