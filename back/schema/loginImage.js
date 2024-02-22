import Joi from 'joi';

export default {
    add: Joi.object({
        image: Joi.string(),
    }),
    update: Joi.object({
        image: Joi.string().allow(null, '').default(null),
    })
}