import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import user from "@/models/user";
import crypto from "crypto";
import dbConnect from "@/helper/backend/database";

export const authOptions = {
    // Configure one or more authentication providers
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        signIn: '/auth/login',
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password", placeholder: "password" },
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either an object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
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
            },
        }),
        // ...add more providers here
    ],
    callbacks: {
        // only if an oauth is used
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.user.id = token.id
            session.user.email = token.email

            return session
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 3 * 24 * 60 * 60, // 3 day
    },
}

export default NextAuth(authOptions)