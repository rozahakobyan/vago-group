import HttpError from "http-errors";
import {Op} from "sequelize";
import MinimalPrice from "../models/MinimalPrice.js";

class MinimalPriceController {
    static async add (req, res, next){
        try{
            const {eur, usd, rub, amd, minKm, min, active} = req.body;

            if(!eur || !usd || !rub || !amd || !min || !minKm){
                throw HttpError(404, {
                    errors: {
                        exists: "Not found"
                    }
                })
            }

            const price = await MinimalPrice.create({eur, usd, rub, amd, minKm, min, active})

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
            const {eur, usd, rub, amd, minKm, min, active} = req.body;
            const { id } = req.params;

            const price = await MinimalPrice.findOne({
                where: {id}
            })

            if (!price) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await price.update({eur, usd, rub, amd, minKm, min, active})

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

            const price = await MinimalPrice.findByPk(id)

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
                    { active: { [Op.substring]: 1} }
                ];
            }

            const prices = await MinimalPrice.findAll({where})

            res.json({
                status: "ok",
                prices
            })
        }catch (e) {
            next(e)
        }
    }
}

export default MinimalPriceController;