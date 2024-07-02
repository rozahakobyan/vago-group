import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.object().required(),
        image: Joi.string(),
        price: Joi.string().required(),
        fuel: Joi.object().required(),
        transmission: Joi.object().required(),
        bac: Joi.string().required(),
        documents: Joi.object().required(),
        bonusSystem: Joi.object().required(),
        rules: Joi.object().required(),
    }),
    update: Joi.object({
        name: Joi.string(),
        image: Joi.string(),
        price: Joi.string(),
        fuel: Joi.string(),
        transmission: Joi.string(),
        bac: Joi.string(),
        documents: Joi.string(),
        bonusSystem: Joi.string(),
        rules: Joi.string(),
        translation: Joi.object(),
    })
}