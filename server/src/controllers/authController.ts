import { Request, Response } from "express";
import { UserModel } from "../models";
import { CustomError } from "../helpers/lib/App";
import otpGenerator from 'otp-generator'
import bcrypt from 'bcryptjs'
import { redis_client } from "..";
import { createToken } from "../helpers/lib/App";

export const signupController = async (req: Request, res: Response) => {

    //check if email already exist
    const user = await UserModel.findOne({ email: req.body.email })

    if (user) throw new CustomError({ message: "Email already exist", code: 400 })

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    await UserModel.create({ ...req.body, password: hashedPassword })

    //generate otp
    const otp = otpGenerator.generate(6,
        { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

    //save to cache
    const client = await redis_client.getRedisClient()
    client.set(req.body.email, await bcrypt.hash(otp, 12), 'EX', 60 * 10)

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
        throw new CustomError({ message: "User not found", code: 404 })
    }

    user.is_verified = true;
    await user.save();

    const token = await createToken(user.id, 'user', '30d');

    await client.del(email);

    res.status(201).json({ token })
}

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email });

    if (!user) throw new CustomError({ message: "Email or Password not valid", code: 401 })

    if (!(await bcrypt.compare(password, user.password))) throw new CustomError({ message: "Email or Password not valid", code: 401 })


    if (!user.is_verified) return res.status(200).json({ message: "Please verify your account to continue" })

    const token = await createToken(user.id, 'user', '30d');

    res.status(201).json({ token })
}

export const resendOTPController = async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) throw new CustomError({ message: "Email not found", code: 404 })

    //generate otp
    const otp = otpGenerator.generate(6,
        { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

    //save to cache
    const client = await redis_client.getRedisClient()
    client.set(req.body.email, await bcrypt.hash(otp, 12), 'EX', 60 * 10)

    //send email
    console.log(otp)
    res.status(200).json({ data: "OTP sent to email" })
}

export const getMeController = async (req: Request, res: Response) => {
    res.status(200).json({ user: req.user })
}

export const getUserController = async (req: Request, res: Response) => {
    // req.io.emit("from", "done")
    const user = await UserModel.findById(req.params.id)

    if (!user) throw new CustomError({ message: "User not found", code: 404 })

    res.status(200).json({ user })
}

export const updateProfileController = async (req: Request, res: Response) => {
    const user = await UserModel.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password')

    if (!user) throw new CustomError({ message: "User not found", code: 404 })

    res.status(200).json({ user })
}

export const logoutController = async (req: Request, res: Response) => {
    const token = await createToken('null', 'user', '30d');

    res.status(201).json({ token })
}