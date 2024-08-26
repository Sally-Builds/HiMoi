import Joi from "joi";


export const createChatSchema = Joi.object({
    receiver: Joi.string().required(),
    message: Joi.string().required(),
    reply_to: Joi.string(),
})