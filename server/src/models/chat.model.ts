import { Schema, model } from 'mongoose'


export interface IChat {
    sender: string;
    receiver: string;
    message: string;
    reply_to: string;
    created_at: string;
    updated_at: string;
}

const chatSchema = new Schema<IChat> ({
    sender: {
        type: String,
        required: [true, 'sender is required']
    },
    receiver: {
        type: String,
        required: [true, 'receiver is required']
    },
    message: {
        type: String,
        required: [true, "message is required"]
    },
    reply_to: String
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

export const chatModel = model("Chat", chatSchema)
