import mongoose from 'mongoose'

const MONGO = process.env.MONGODB

if (!MONGO) {
    throw new Error(
        'Please define the MONGO environment variable inside env'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            dbName: "nucs",
            maxPoolSize: 200
        }

        console.log("Connecting To DB", Date.now())
        cached.promise = mongoose.connect(MONGO, opts).then((mongoose) => {
            console.log("Connected To DB", Date.now())
            console.log("Connection id", mongoose.connections[0].id)
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
        console.log("Have Cached Connection", Date.now())
    } catch (e) {
        console.log("ERROR", e)
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default dbConnect