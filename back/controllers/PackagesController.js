import HttpError from "http-errors";
import Packages from "../models/Packages.js";
import {Op} from "sequelize";
import Translation from "../models/Translation.js";
import Banner from "../models/Banner.js";

class PackagesController {
    static async add (req, res, next){
        try{
            const {name, advanced, premium, standard, activePage} = req.body;

            if(!name || !activePage){
                throw HttpError(404, {
                    errors: {
                        exists: "Not found"
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

            const packagesCreate = await Packages.create({name: name.en, advanced, premium,
                standard, activePage,
                translationId: translation.id})

            const packages = await Banner.findOne({
                where: {
                    id: packagesCreate.id
                },
                include: {
                    model: Translation,
                    required: false,
                }
            })

            res.json({
                status: "ok",
                packages
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {name, advanced, premium, standard, activePage, translation} = req.body;
            const { id } = req.params;

            const packages = await Packages.findOne({
                where: {id}
            })
            const translations = await Translation.findByPk(packages.translationId);

            if (!packages) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await packages.update({name, advanced, premium, standard, activePage})
            await translations.update(translation)

            res.json({
                status: "ok",
                packages
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const packages = await Packages.findByPk(id)
            const translation = await Translation.findByPk(packages.translationId);

            if (!packages) {
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

            await packages.destroy()
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
            const {activePage} = req.query;
            const where = {};

            if(activePage){
                where[Op.or] = [
                    { activePage: { [Op.substring]: activePage } },
                ];
            }

            const packages = await Packages.findAll({where,
                include: {
                    model: Translation,
                    required: false,
                }})

            res.json({
                status: "ok",
                packages
            })
        }catch (e) {
            next(e)
        }
    }
}

export default PackagesController;