import Joi from 'joi';

export default {
    add: Joi.object({
        image: Joi.string(),
        active: Joi.boolean().required(),
    }),
    update: Joi.object({
        image: Joi.string().allow(null, '').default(null),
        active: Joi.boolean(),
    })
}