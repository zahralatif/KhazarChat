import { Request, Response } from 'express';
import { UserChats } from '../schema/userChats.schema';
import { errorHandler } from '../helpers/errorHandler';

export const user = async (req: Request, res: Response) => {
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
}

// Rename a chat
export const renameChat = async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { title } = req.body;

    try {
        const chat = await UserChats.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // chat.title = title;
        await chat.save();

        res.json(chat);
    } catch (error) {
        errorHandler(res, 500, "Server error")
    }
};

// Delete a chat
export const deleteChat = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
        const chat = await UserChats.findByIdAndDelete(chatId);
        if (!chat) {
            errorHandler(res, 404, "Chat not found.");
        }
        res.json({ message: "Chat deleted successfully" })
    } catch (error) {
        errorHandler(res, 500, `Server error: ${error}`);
    }
}
