import mongoose from "mongoose"
import { config } from "./index"

mongoose.connection
    .once('connected', () => {
        console.log("Your db connected succesfuly")
    })
    .on('disconnected', () => {
        console.log("Your db disconnected")
    })
    .on("connecting", () => {
        console.log("Your db connecting")
    })
    .on('error', (error) => {
        console.log("Your DB has encountered an error: ", error); mongoInitialConnection()
    })

export const mongoInitialConnection = async () => {
    try {
        await mongoose.connect(config.mongo_url);
    } catch (error) {
        console.error("Initial MongoDB connection error: ", error);
    }
}