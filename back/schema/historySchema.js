import Joi from 'joi';

export default {
    add: Joi.object({
        description: Joi.object().required(),
        active: Joi.boolean().required()
    }),
    update: Joi.object({
        description: Joi.string().max(255),
        translation: Joi.object(),
        active: Joi.boolean()
    })
}