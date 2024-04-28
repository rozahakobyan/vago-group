import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.string().max(255).required(),
        number: Joi.number().required()
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        number: Joi.number()
    })
}