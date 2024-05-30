import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.string().max(255).required(),
        headerIcon: Joi.string(),
        footerIcon: Joi.string(),
    }),
    update: Joi.object({
        name: Joi.string().max(255),
        headerIcon: Joi.string().allow(null, '').default(null),
        footerIcon: Joi.string().allow(null, '').default(null),
    })
}