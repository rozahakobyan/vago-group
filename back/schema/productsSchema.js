import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.object().required(),
        price: Joi.number().required(),
        image: Joi.string(),
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        price: Joi.number(),
        translation: Joi.object(),
        image: Joi.string().allow(null, '').default(null),
    })
}