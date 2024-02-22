import Joi from 'joi';

export default {
    add: Joi.object({
        title: Joi.string().max(255).required(),
        description: Joi.string().required()
    }),
    update: Joi.object({
        title: Joi.string().max(255),
        description: Joi.string()
    })
}