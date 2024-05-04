import Joi from 'joi';

export default {
    add: Joi.object({
        title: Joi.string().max(255).required(),
        description: Joi.string().max(255).required(),
        homeImage: Joi.string(),
        constructionImage: Joi.string(),
        employmentAgencyImage: Joi.string(),
        logisticImage: Joi.string(),
        active: Joi.boolean().required(),
    }),
    update: Joi.object({
        title: Joi.string().max(255),
        description: Joi.string().max(255),
        homeImage: Joi.string().allow(null, '').default(null),
        constructionImage: Joi.string().allow(null, '').default(null),
        employmentAgencyImage: Joi.string().allow(null, '').default(null),
        logisticImage: Joi.string().allow(null, '').default(null),
        active: Joi.boolean(),
    })
}