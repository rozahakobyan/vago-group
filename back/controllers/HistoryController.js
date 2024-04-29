import HttpError from "http-errors";
import History from "../models/History.js";
import {Op} from "sequelize";

class HistoryController {
    static async add (req, res, next){
        try{
            const {active, description} = req.body;

            if(!description){
                throw HttpError(404, {
                    errors: {
                        exists: "Description Not found"
                    }
                })
            }

            const history = await History.create({active, description})

            res.json({
                status: "ok",
                history
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {active, description} = req.body;
            const { id } = req.params;

            const history = await History.findOne({
                where: {id}
            })

            if (!history) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await history.update({active, description})

            res.json({
                status: "ok",
                history
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const history = await History.findByPk(id)

            if (!history) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await history.destroy()

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
                    { active: { [Op.substring]: 1 } },
                ];
            }

            const histories = await History.findAll({where})

            res.json({
                status: "ok",
                histories
            })
        }catch (e) {
            next(e)
        }
    }
}

export default HistoryController;