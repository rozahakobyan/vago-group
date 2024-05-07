import HttpError from "http-errors";
import History from "../models/History.js";
import {Op} from "sequelize";
import Translation from "../models/Translation.js";

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

            const translation = await Translation.create({
                en: {
                    description: description.en
                },
                ru: {
                    description: description.ru
                },
                am: {
                    description: description.am
                },
                pl: {
                    description: description.pl
                },
            })

            const historyCreate = await History.create({active,
                description: description.en,
                translationId: translation.id})

            const history = await History.findOne({
                where: {
                    id: historyCreate.id
                },
                include: {
                    model: Translation,
                    required: false,
                }
            })

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
            const {active, description, translation} = req.body;
            const { id } = req.params;

            const history = await History.findOne({
                where: {id}
            })
            const translations = await Translation.findByPk(history.translationId);

            if (!history) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await history.update({active, description: translation.en.description})
            await translations.update(translation)

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

            const history = await History.findByPk(+id)
            const translation = await Translation.findByPk(history.translationId);

            if (!history) {
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

            await translation.destroy()
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

            const histories = await History.findAll({
                where,
                include: {
                    model: Translation,
                    required: false,
                }})

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