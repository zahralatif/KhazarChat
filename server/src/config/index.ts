import dotenv from "dotenv"

dotenv.config()

export const config = {
    port: process.env.PORT,
    client_url: process.env.CLIENT_URL,
}