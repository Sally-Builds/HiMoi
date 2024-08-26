import { Schema, model } from 'mongoose'


export enum MsgStatus {
    Delivered = 'delivered',
    Seen = 'seen'
}

export interface IChat {
    id: string;
    sender: string;
    receiver: string;
    message: string;
    reply_to?: string;
    msg_status: MsgStatus
    created_at: string;
    updated_at: string;
}

const chatSchema = new Schema<IChat>({
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
    reply_to: String,
    msg_status: {
        type: String,
        enum: Object.values(MsgStatus),
        default: MsgStatus.Delivered,
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

export const chatModel = model("Chat", chatSchema)
