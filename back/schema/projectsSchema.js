import Joi from "joi";

export default {
    add: Joi.object({
        name: Joi.object().required(),
        description: Joi.object().required(),
        image: Joi.string(),
        status: Joi.string().required()
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        description: Joi.string(),
        translation: Joi.object(),
        image: Joi.string().allow(null, '').default(null),
        status: Joi.string()
    })
}