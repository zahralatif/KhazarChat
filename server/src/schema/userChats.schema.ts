import { Document, Schema, model } from "mongoose";

export interface IUserChats extends Document {
    userId: string;
    chats: {
        _id: string;
        title: string;
        createdAt?: Date;
    }[];
}

const userChatsSchema = new Schema<IUserChats>(
    {
        userId: {
            type: String,
            required: true,
        },
        chats: [
            {
                _id: {
                    type: String,
                    required: true,
                },
                title: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

export const UserChats = model<IUserChats>("UserChats", userChatsSchema);
