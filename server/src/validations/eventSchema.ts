import Joi from 'joi'



export const createEventSchema = Joi.object({
    event_name: Joi.string().required(),
    event_location: Joi.string().required(),
    event_date: Joi.string().required(),
    event_time: Joi.string().required(),
    event_description: Joi.string().required(),
})

export const eventAttendanceSchema = Joi.object({
    is_attending: Joi.bool(),
    event: Joi.string().required(),
})