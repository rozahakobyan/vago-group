import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.object().required(),
        number: Joi.string().max(255).required(),
        activePage: Joi.string().max(255).required()
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        number: Joi.string().max(255),
        activePage: Joi.string().max(255),
        translation: Joi.object(),
    })
}