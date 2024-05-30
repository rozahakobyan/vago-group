import Joi from 'joi';

export default {
    add: Joi.object({
        src: Joi.string(),
        pageGallery: Joi.string().max(255).required(),
    }),
    update: Joi.object({
        src: Joi.string().allow(null, '').default(null),
        pageGallery: Joi.string().max(255)
    })
}