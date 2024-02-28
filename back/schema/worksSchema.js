import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.string().max(255).required(),
        department: Joi.string().max(255).required(),
        price: Joi.number().min(0).required(),
        hoursWeek: Joi.number().min(0).required(),
        schedule:Joi.array().items(Joi.date().iso().required()),
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        department: Joi.string().max(255),
        price: Joi.number().min(0),
        hoursWeek: Joi.number().min(0),
        schedule:Joi.array().items(Joi.date().iso().allow(null,'')),
    }),
    updateSchedule: Joi.object({
        date: Joi.date().iso().allow(null,''),
    }),
}