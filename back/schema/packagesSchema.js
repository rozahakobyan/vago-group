import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.object().required(),
        activePage: Joi.string().max(255).required(),
        advanced: Joi.boolean().required(),
        premium: Joi.boolean().required(),
        standard: Joi.boolean().required(),
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        translation: Joi.object(),
        activePage: Joi.string().max(255),
        advanced: Joi.boolean(),
        premium: Joi.boolean(),
        standard: Joi.boolean(),
    })
}