import "reflect-metadata";
import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from "./config";
import router from "./router"
// import path from "path";
import { mongoInitialConnection } from "./config/mongo.config";

const app = express()

app.use(cors({
    origin: config.client_url,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router)
// app.use('/public', express.static(path.join(__dirname, "..", "public")))



app.use('*', (_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
});

mongoInitialConnection()

const port = config.port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
