import { Router } from "express";
import { createChatController } from "../controllers";
import { authenticate, validationMiddleware } from "../middlewares";
import { createChatSchema } from "../validations";


export const chatRouter = Router();


chatRouter.route('/').post(validationMiddleware(createChatSchema), createChatController)