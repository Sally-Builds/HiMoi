import { Request, Response } from "express";
import { UserModel } from "../models";
import { CustomError } from "../helpers/lib/App";
import otpGenerator from 'otp-generator'
import bcrypt from 'bcryptjs'
import { redis_client } from "..";
import { createToken } from "../helpers/lib/App";

export const signupController = async (req: Request, res: Response) => {
    const { email } = req.body

    //generate otp
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

    //save to cache
    const client = await redis_client.getRedisClient()
    client.set(email, await bcrypt.hash(otp, 12), 'EX', 60 * 10)

    //send email
    console.log(otp)
    res.status(200).json({ data: "OTP sent to email" })
}

export const verifyController = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const client = await redis_client.getRedisClient();

    const hashedOTP = await client.get(email);

    if (!hashedOTP) throw new CustomError({ message: "Invalid OTP", code: 401 })

    const isValid = await bcrypt.compare(otp, hashedOTP);

    if (!isValid) throw new CustomError({ message: "Invalid OTP", code: 401 })


    let user = await UserModel.findOne({ email })

    if (!user) {
        user = await UserModel.create({ email });
    }

    const token = await createToken(user.id, 'user');

    await client.del(email);

    res.status(201).json({ token })
}

export const getUserController = async (req: Request, res: Response) => {
    req.io.emit("from", "done")
    res.status(200).json({ user: req.user })
}

export const logoutController = async (req: Request, res: Response) => { }