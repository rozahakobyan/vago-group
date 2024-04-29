import Joi from 'joi';

export default {
    add: Joi.object({
        description: Joi.string().required(),
        active: Joi.boolean().required()
    }),
    update: Joi.object({
        description: Joi.string(),
        active: Joi.boolean()
    })
}