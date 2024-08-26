import { IChat, UserModel, chatModel } from "../models";
import { Request, Response } from "express";
import { CustomError } from "../helpers/lib/App";
import { redis_client } from "..";


export const createChatController = async (req: Request, res: Response) => {
    const data: IChat = { ...req.body, sender: req.user.id };

    const receiver = await UserModel.findById(data.receiver)

    if (!receiver) throw new CustomError({ message: "Receiver not found", code: 404 })

    const chat = new chatModel(data);
    await chat.save();

    const client = await redis_client.getRedisClient()
    const receiverSocketId = await client.get(chat.receiver);

    if (receiverSocketId) {
        req.io.to(receiverSocketId).emit("chat", chat)
    }

    res.status(200).json({ data: chat })
}

export const getChatWithUserController = async (req: Request, res: Response) => {
    const chat_user_id = req.params.id;

    const chat_user = await UserModel.findById(chat_user_id)

    if (!chat_user) throw new CustomError({ message: "Receiver not found", code: 404 })

    const chats = await chatModel.find({
        $or: [
            { $and: [{ sender: req.user.id }, { receiver: chat_user_id }] },
            { $and: [{ sender: chat_user_id }, { receiver: req.user.id }] }
        ]
    }).sort({ timestamp: 1 });  // Assuming you have a timestamp field to sort by

    res.status(200).json({ data: chats })
}
