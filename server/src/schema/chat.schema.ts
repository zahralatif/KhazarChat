import { Document, Schema, model } from "mongoose";
import { ROLE } from '../enums/role.enum'

export interface IChat extends Document {
    userId: string;
    history: {
        role: [ROLE.USER , ROLE.MODEL];
        parts: {
            text: string;
        }[];
    }[];
}

const chatSchema = new Schema<IChat>(
    {
        userId: {
            type: String,
            required: true,
        },
        history: [
            {
                role: {
                    type: String,
                    enum: [ROLE.USER, ROLE.MODEL],
                    required: true,
                },
                parts: [
                    {
                        text: {
                            type: String,
                            required: true,
                        },
                    },
                ],

            },
        ],
    },
    { timestamps: true }
);

export const Chat = model<IChat>("Chat", chatSchema);
