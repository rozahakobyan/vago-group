import Joi from 'joi';

export default {
    add: Joi.object({
        eur: Joi.number().required(),
        usd: Joi.number().required(),
        rub: Joi.number().required(),
        amd: Joi.number().required(),
        min: Joi.object().required(),
        active: Joi.boolean().required()
    }),
    update: Joi.object({
        eur: Joi.number(),
        usd: Joi.number(),
        rub: Joi.number(),
        amd: Joi.number(),
        min: Joi.object(),
        active: Joi.boolean()
    })
}