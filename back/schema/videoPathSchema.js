import Joi from 'joi';

export default {
    add: Joi.object({
        path: Joi.string().max(255).required(),
        pageVideo: Joi.string().max(255).required(),
    }),
    update: Joi.object({
        path: Joi.string().max(255),
        pageVideo: Joi.string().max(255)
    })
}