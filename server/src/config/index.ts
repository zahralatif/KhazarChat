import dotenv from "dotenv"

dotenv.config()

export const config = {
    port: process.env.PORT,
    client_url: process.env.CLIENT_URL,
    mongo_url: process.env.MONGO_URL,
    clerk_publishable_key: process.env.CLERK_PUBLISHABLE_KEY,
    clerk_secret_key: process.env.CLERK_SECRET_KEY,
}