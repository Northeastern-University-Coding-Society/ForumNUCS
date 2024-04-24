
function initMiddleware(middleware) {
    return (req, res) => new Promise((resolve, reject) => {
        middleware(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

// pages/api/your-api-route.js

const cors = require('cors');

// Initialize the cors middleware
export const corsMiddleware = initMiddleware(
    // Configure CORS with options
    cors({
        // Allow all origins
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })
);

// export default async function handler(req, res) {
//     // Run cors
//     await corsMiddleware(req, res);
//
//     // Rest of your API logic
//     res.json({ message: 'Hello from your CORS-enabled API!' });
// }

