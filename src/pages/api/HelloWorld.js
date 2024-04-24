import {checkAuth} from "@/helper/backend/user";
import {corsMiddleware, myServerSession} from "@/helper/backend/auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(
    req, res
) {
    await corsMiddleware(req, res);
    // const auth = await checkAuth(req);
    const auth = await myServerSession(req, res, authOptions);
    console.log(auth)
    if (auth) {
        return res.status(200).json(auth.user);
    }
    res.status(200).json({ info: 'Hello World' });
}
