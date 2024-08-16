import { Router, Request, Response, NextFunction } from "express";
import { errorHandler } from "../helpers/errorHandler";
import { UserChats } from "../schema/userChats.schema";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = Router();

router.get("/", ClerkExpressRequireAuth(), async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.auth?.userId;

    if (!userId) {
        return errorHandler(res, 400, "User ID is missing or invalid.");
    }

    try {
        const userChats = await UserChats.findOne({ userId });

        if (!userChats) {
            return errorHandler(res, 404, "User chats not found.");
        }

        res.status(200).json(userChats.chats);

    } catch (error) {
        console.error("Error fetching user chats:", error);
        errorHandler(res, 500, "Error fetching userChats!");
    }
});

export default router;
