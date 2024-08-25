import Joi from 'joi'
import { Gender } from '../models'


export const signupSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    full_name: Joi.string().required(),
    nick_name: Joi.string(),
    dob: Joi.string().required(),
    gender: Joi.string().valid(...Object.values(Gender)).required(),
    interests: Joi.array().items(Joi.string()),
    location: Joi.string().required(),
    height: Joi.string()
})

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export const resendOTPSchema = Joi.object({
    email: Joi.string().required(),
})

export const updateProfileSchema = Joi.object({
    full_name: Joi.string(),
    nick_name: Joi.string(),
    dob: Joi.string(),
    gender: Joi.string().valid(...Object.values(Gender)),
    interests: Joi.array().items(Joi.string()),
    location: Joi.string(),
    height: Joi.string()
})