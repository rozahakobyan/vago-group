import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.string().max(255).required(),
        department: Joi.string().max(255).required(),
        description: Joi.string().max(255).required(),
        price: Joi.string().max(255).required(),
        hoursWeek: Joi.number().min(0).required(),
        schedule:Joi.array().items(Joi.string().required()),
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        department: Joi.string().max(255),
        description: Joi.string().max(255),
        price: Joi.string().max(255),
        hoursWeek: Joi.number().min(0),
        schedule:Joi.array().items(Joi.string().allow(null,'')),
    }),
    updateSchedule: Joi.object({
        date: Joi.string().allow(null,''),
    }),
}