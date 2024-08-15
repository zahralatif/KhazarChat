import "reflect-metadata";
import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from "./config";
// import router from "./router"
import path from "path";

const app = express()

app.use(cors({
    origin: config.client_url
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', router)
app.use('/public', express.static(path.join(__dirname, "..", "public")))

app.use('*', (_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
});

// mongoInitialConnection()

// AppDataSource.initialize().then(() => {
const port = config.port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
// }).catch((error) => {
//     console.log("There is some error in your connection: ", error)
// })
