import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.object().required(),
        price: Joi.number().required(),
        currency: Joi.string().required(),
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        price: Joi.number(),
        translation: Joi.object(),
        currency: Joi.string(),
    })
}