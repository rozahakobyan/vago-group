import HttpError from "http-errors";
import Prices from "../models/Prices.js";
import Packages from "../models/Packages.js";
import {Op} from "sequelize";

class PricesController {
    static async add (req, res, next){
        try{
            const {name, advanced, premium, standard, active} = req.body;

            if(!name || !advanced || !premium || !standard){
                throw HttpError(404, {
                    errors: {
                        exists: "Not found"
                    }
                })
            }

            const price = await Prices.create({name, advanced, premium, standard, active})

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
            const {name, advanced, premium, standard, active} = req.body;
            const { id } = req.params;

            const price = await Prices.findOne({
                where: {id}
            })

            if (!price) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await price.update({name, advanced, premium, standard, active})

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

            if (!price) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await price.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const {active} = req.query;

            const where = {};

            if(active){
                where[Op.or] = [
                    { active: { [Op.substring]: active } },
                ];
            }

            const price = await Prices.findAll({
                where
            })

            const packages = await Packages.findAll()

            const prices = [...price, ...packages]

            res.json({
                status: "ok",
                prices
            })
        }catch (e) {
            next(e)
        }
    }

    static async listPrice (req, res, next){
        try{
            const {active} = req.query;

            const where = {};

            if(active){
                where[Op.or] = [
                    { active: { [Op.substring]: active } },
                ];
            }

            const prices = await Prices.findAll({
                where
            })

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