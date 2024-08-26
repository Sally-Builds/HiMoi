import { Router } from "express";
import { createChatController, getChatWithUserController } from "../controllers";
import { authenticate, validationMiddleware } from "../middlewares";
import { createChatSchema } from "../validations";


export const chatRouter = Router();


chatRouter.route('/').post(validationMiddleware(createChatSchema), authenticate, createChatController)
chatRouter.route('/:id').get(authenticate, getChatWithUserController)