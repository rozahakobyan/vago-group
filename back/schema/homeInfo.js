import Joi from 'joi';

export default {
    add: Joi.object({
        title: Joi.string().max(255).required(),
        description: Joi.string().required(),
        image: Joi.string(),
    }),
    update: Joi.object({
        title: Joi.string().max(255),
        description: Joi.string(),
        image: Joi.string().allow(null, '').default(null),
    })
}