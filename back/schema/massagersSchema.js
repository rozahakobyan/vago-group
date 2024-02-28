import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.string().max(255).required(),
        icon: Joi.string(),
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        icon: Joi.string().allow(null, '').default(null),
    })
}