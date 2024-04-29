import Joi from 'joi';

export default {
    add: Joi.object({
        src: Joi.string(),
    }),
    update: Joi.object({
        src: Joi.string().allow(null, '').default(null),
    })
}