// lib/mongoose.ts
import mongoose from 'mongoose'

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
    }
}

const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in .env.local')
}

let cached = global.mongooseCache || { conn: null, promise: null }
if (!global.mongooseCache) global.mongooseCache = cached

export default async function connectToDatabase() {
    if (cached.conn) return cached.conn
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((m) => m)
    }
    cached.conn = await cached.promise
    return cached.conn
}
