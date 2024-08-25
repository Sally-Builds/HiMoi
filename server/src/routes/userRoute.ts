import { Router } from "express";
import { getUserController, signupController, verifyController, resendOTPController, updateProfileController, getMeController, loginController, logoutController } from "../controllers";
import { authenticate } from "../middlewares";
import { validationMiddleware } from "../middlewares";
import { loginSchema, resendOTPSchema, signupSchema, updateProfileSchema } from "../validations";


export const userRouter = Router();

userRouter.post('/signup', validationMiddleware(signupSchema), signupController)
userRouter.post('/login', validationMiddleware(loginSchema), loginController)
userRouter.post('/verify-account', verifyController)
userRouter.post('/resend-otp', validationMiddleware(resendOTPSchema), resendOTPController)

userRouter.get('/me', authenticate, getMeController)
userRouter.route('/').get(authenticate, getUserController)
userRouter.route('/').patch(authenticate, validationMiddleware(updateProfileSchema), updateProfileController)
