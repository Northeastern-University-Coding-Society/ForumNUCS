import {MEG_NOT_SUPPORTED} from "@/commons/Constants";

export default async function handler(
    req, res
) {
    const { id } = req.query;
    const method = req.method;

    switch (method) {
        case 'GET':
            break;
        case 'POST':
            break;
        case 'PUT':
            break;
        case 'DELETE':
            break;
        default:
            res.status(500).send(MEG_NOT_SUPPORTED);
            break;
    }

    res.status(200).json({ info: 'Hello World' });
}
