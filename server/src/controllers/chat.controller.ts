import { Router, Request, Response, NextFunction } from "express";
import { errorHandler } from "../helpers/errorHandler";
import { ROLE } from "../enums/role.enum";
import { Chat } from "../schema/chat.schema";
import { UserChats } from "../schema/userChats.schema";
import mongoose from "mongoose";

// Create a new chat
export const create = async (req: Request, res: Response) => {
    const userId = req.auth?.userId;
    const { text } = req.body;

    try {
        const newChat = new Chat({
            userId,
            history: [{ role: ROLE.USER, parts: [{ text }] }],
        });

        const savedChat = await newChat.save();

        const userChats = await UserChats.findOne({ userId });

        if (!userChats) {
            const newUserChats = new UserChats({
                userId,
                chats: [{ _id: savedChat._id, title: text.substring(0, 40) }],
            });
            await newUserChats.save();
        } else {
            await UserChats.updateOne(
                { userId },
                { $push: { chats: { _id: savedChat._id, title: text.substring(0, 40) } } }
            );
        }

        res.status(201).send(newChat._id);
    } catch (error) {
        errorHandler(res, 500, "Error creating chat!");
    }
};

// Get a chat by ID
export const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.auth?.userId;
    const chatId = req.params.id;

    if (!userId) {
        return errorHandler(res, 400, "User ID is missing or invalid.");
    }

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return errorHandler(res, 400, "Invalid Chat ID format.");
    }

    try {
        const chat = await Chat.findOne({ _id: chatId, userId });

        if (!chat) {
            return errorHandler(res, 404, "Chat not found.");
        }

        res.status(200).json(chat);
    } catch (error) {
        console.error("Error fetching chat:", error);
        errorHandler(res, 500, "Error fetching Chat!");
    }
};

// Update a chat by adding a conversation
export const update = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.auth?.userId;
    const chatId = req.params.id;
    const { question, answer } = req.body;

    if (!userId) {
        return errorHandler(res, 400, "User ID is missing or invalid.");
    }

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return errorHandler(res, 400, "Invalid Chat ID format.");
    }

    const newItems = [
        ...(question ? [{ role: ROLE.USER, parts: [{ text: question }] }] : []),
        { role: ROLE.MODEL, parts: [{ text: answer }] },
    ];

    try {
        const updatedChat = await Chat.updateOne(
            { _id: chatId, userId },
            { $push: { history: { $each: newItems } } }
        );

        res.status(200).json(updatedChat);
    } catch (error) {
        console.error("Error adding conversation:", error);
        errorHandler(res, 500, "Error adding conversation!");
    }
};