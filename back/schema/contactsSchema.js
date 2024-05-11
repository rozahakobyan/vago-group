import Joi from 'joi';

export default {
    add: Joi.object({
        address: Joi.object().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        pathList: Joi.array().items(Joi.object().required()),
        activeContact: Joi.boolean().required()
    }),
    update: Joi.object({
        address: Joi.string().max(255),
        email: Joi.string().email(),
        phone: Joi.string(),
        translation: Joi.object(),
        pathList: Joi.array().items(Joi.object().allow(null,'')),
        activeContact: Joi.boolean()
    }),
    updatePath: Joi.object({
        path: Joi.string().max(255),
        massagerId: Joi.number(),
        contactId: Joi.number()
    })
}