import { Request, Response } from "express";
import { UserModel } from "../models";
import { CustomError } from "../helpers/lib/App";
import otpGenerator from 'otp-generator'
import bcrypt from 'bcryptjs'
import { redis_client } from "..";

export const signupController = async (req: Request, res: Response) => {
    const { email } = req.body
    //check if email already exist
    let user = await UserModel.findOne({ email })

    if (user) throw new CustomError({ message: "email already exist", code: 400 })

    //generate otp
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

    //save to cache
    const client = await redis_client.getRedisClient()
    client.set(email, await bcrypt.hash(otp, 12), 'EX', 60 * 10)

    //send email
    console.log(otp)
    res.status(200).json({ data: "OTP sent to email" })
}