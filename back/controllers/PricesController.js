import HttpError from "http-errors";
import Prices from "../models/Prices.js";
import {Op} from "sequelize";
import Translation from "../models/Translation.js";

class PricesController {
    static async add (req, res, next){
        try{
            const {name, advanced, premium, standard, activePage, active} = req.body;

            if(!name || !advanced || !premium || !standard || !activePage){
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

            const priceCreate = await Prices.create({name: name.en, advanced, premium,
                standard, active, activePage, translationId: translation.id})

            const price = await Prices.findOne({
                where: {
                    id: priceCreate.id
                },
                include: {
                    model: Translation,
                    required: false,
                }
            })

            res.json({
                status: "ok",
                price
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {name, advanced, premium, standard, activePage, active, translation} = req.body;
            const { id } = req.params;

            const price = await Prices.findOne({
                where: {id}
            })

            const translations = await Translation.findByPk(price.translationId);

            if (!price) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await price.update({name: translation.en.name, advanced, premium, standard, active, activePage})
            await translations.update(translation)

            res.json({
                status: "ok",
                price
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const price = await Prices.findByPk(id)
            const translation = await Translation.findByPk(price.translationId);

            if (!price) {
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

            await price.destroy()
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
            const {active, activePage} = req.query;

            const where = {};

            if(active && activePage){
                where[Op.or] = [
                    { active: { [Op.substring]: 1}, activePage: { [Op.substring]: activePage} }
                ];
            } else if(active){
                where[Op.or] = [
                    { active: { [Op.substring]: 1} }
                ];
            }else if(activePage){
                where[Op.or] = [
                    { activePage: { [Op.substring]: activePage} }
                ];
            }

            const prices = await Prices.findAll({
                where,
                include: {
                    model: Translation,
                    required: false,
                }})

            res.json({
                status: "ok",
                prices
            })
        }catch (e) {
            next(e)
        }
    }
}

export default PricesController;