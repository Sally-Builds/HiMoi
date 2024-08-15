import { Router } from "express";
import { getUserController, signupController, verifyController } from "../controllers";
import { authenticate } from "../middlewares";


export const userRouter = Router();

userRouter.post('/signup', signupController)
userRouter.post('/verify-account', verifyController)

userRouter.route('/').get(authenticate, getUserController)
