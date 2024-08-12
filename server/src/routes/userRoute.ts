import { Router } from "express";
import { signupController } from "../controllers";


export const userRouter = Router();

userRouter.get('/signup', signupController)
