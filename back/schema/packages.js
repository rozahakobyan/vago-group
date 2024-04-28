import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.string().max(255).required(),
        activePage: Joi.string().max(255).required(),
        advanced: Joi.boolean().required(),
        premium: Joi.boolean().required(),
        standard: Joi.boolean().required(),
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        activePage: Joi.string().max(255),
        advanced: Joi.boolean(),
        premium: Joi.boolean(),
        standard: Joi.boolean(),
    })
}