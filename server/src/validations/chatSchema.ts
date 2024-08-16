import Joi from "joi";


export const createChatSchema = Joi.object({
    sender: Joi.string().required(),
    receiver: Joi.string().required(),
    message: Joi.string().required(),
    reply_to: Joi.string(),
})