import { Router, Request, Response, NextFunction } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { create, findOne, update } from "../controllers/chat.controller";

const router = Router();

router.post("/", ClerkExpressRequireAuth(), create);
router.get("/:id", ClerkExpressRequireAuth(), findOne);
router.put("/:id", ClerkExpressRequireAuth(), update);

// Global error handling middleware
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(401).send("Unauthenticated!");
});

export default router;
