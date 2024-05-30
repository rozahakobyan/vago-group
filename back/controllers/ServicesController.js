import HttpError from "http-errors";
import Services from "../models/Services.js";
import Translation from "../models/Translation.js";
import Banner from "../models/Banner.js";

class ServicesController {
    static async add (req, res, next){
        try{
            const {name, number} = req.body;

            if(!name || !number){
                throw HttpError(404, {
                    errors: {
                        exists: "Name or Number Not found"
                    }
                })
            }

            const translation = await Translation.create({
                en: {
                    name: name.en
                },
                ru: {
                    name: name.ru
                },
                am: {
                    name: name.am
                },
                pl: {
                    name: name.pl
                },
            })

            const serviceCreate = await Services.create({name: name.en, number, translationId: translation.id})

            const service = await Banner.findOne({
                where: {
                    id: serviceCreate.id
                },
                include: {
                    model: Translation,
                    required: false,
                }
            })

            res.json({
                status: "ok",
                service
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {name, number, translation} = req.body;
            const { id } = req.params;

            const service = await Services.findOne({
                where: {id}
            })

            const translations = await Translation.findByPk(service.translationId);

            if (!service) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await service.update({name: translation.en.name, number})
            await translations.update(translation)

            res.json({
                status: "ok",
                service
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const service = await Services.findByPk(id)
            const translation = await Translation.findByPk(service.translationId);

            if (!service) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            if (!translation) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await service.destroy()
            await translation.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const services = await Services.findAll({
                include: {
                    model: Translation,
                    required: false,
                }})

            res.json({
                status: "ok",
                services
            })
        }catch (e) {
            next(e)
        }
    }
}

export default ServicesController;