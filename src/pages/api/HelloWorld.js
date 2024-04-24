import {checkAuth} from "@/helper/backend/user";
import {corsMiddleware} from "@/helper/backend/auth";

export default async function handler(
    req, res
) {
    await corsMiddleware(req, res);
    const auth = await checkAuth(req);
    console.log(auth)
    if (auth) {
        return res.status(200).json(auth);
    }
    res.status(200).json({ info: 'Hello World' });
}
