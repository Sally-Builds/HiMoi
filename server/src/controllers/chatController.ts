import { IChat, chatModel } from "../models";
import { Request, Response } from "express";
import { CustomError } from "../helpers/lib/App";


export const createChatController = async (req: Request, res: Response) => {
    const data: IChat = req.body;

    const chat = new chatModel(data);
    await chat.save();

    res.status(200).json({data: chat})
}