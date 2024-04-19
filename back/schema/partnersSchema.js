import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.string().max(255).required(),
        image: Joi.string(),
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        image: Joi.string().allow(null, '').default(null),
    })
}