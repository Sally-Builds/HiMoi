import { Request, Response } from "express";


export const signupController = async (req: Request, res: Response) => {
    res.status(200).json({ data: "success" })
}