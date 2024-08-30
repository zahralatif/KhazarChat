import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { deleteChat, renameChat, user } from "../controllers/userChats.controller";

const router = Router();

router.get("/", ClerkExpressRequireAuth(), user);

router.put('/:id', renameChat);

router.delete('/:id', deleteChat);

export default router;