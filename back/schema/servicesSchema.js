import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.string().max(255).required(),
        number: Joi.string().max(255).required()
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        number: Joi.string().max(255)
    })
}