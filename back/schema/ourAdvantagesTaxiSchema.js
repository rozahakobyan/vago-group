import Joi from 'joi';

export default {
    add: Joi.object({
        image: Joi.string(),
        text: Joi.object().required(),
        color: Joi.string().required(),
        active: Joi.boolean().required(),
    }),
    update: Joi.object({
        image: Joi.string().allow(null, '').default(null),
        text: Joi.string(),
        color: Joi.string(),
        active: Joi.boolean(),
        translation: Joi.object()
    })
}