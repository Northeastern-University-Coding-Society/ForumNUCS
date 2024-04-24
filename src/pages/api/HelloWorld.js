import {checkAuth} from "@/helper/backend/user";

export default async function handler(
    req, res
) {
    const auth = await checkAuth(req);
    console.log(auth)
    if (auth) {
        return res.status(200).json(auth);
    }
    res.status(200).json({ info: 'Hello World' });
}
