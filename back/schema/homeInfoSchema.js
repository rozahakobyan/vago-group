import Joi from 'joi';

export default {
    add: Joi.object({
        title: Joi.string().max(255).required(),
        video: Joi.string(),
    }),
    update: Joi.object({
        title: Joi.string().max(255),
        video: Joi.string().allow(null, '').default(null),
    })
}