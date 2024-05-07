import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.object().required(),
        advanced: Joi.string().max(255).required(),
        premium: Joi.string().max(255).required(),
        standard: Joi.string().max(255).required(),
        activePage: Joi.string().max(255).required(),
        active: Joi.boolean().required()
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        translation: Joi.object(),
        advanced: Joi.string().max(255),
        premium: Joi.string().max(255),
        standard: Joi.string().max(255),
        activePage: Joi.string().max(255),
        active: Joi.boolean()
    })
}