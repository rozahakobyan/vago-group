import HttpError from "http-errors";
import Services from "../models/Services.js";

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

            const achievement = await Services.create({name, number})

            res.json({
                status: "ok",
                achievement
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {name, number} = req.body;
            const { id } = req.params;

            const achievement = await Services.findOne({
                where: {id}
            })

            if (!achievement) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await achievement.update({name, number})

            res.json({
                status: "ok",
                achievement
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const achievement = await Services.findByPk(id)

            if (!achievement) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await achievement.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const achievements = await Services.findAll()

            res.json({
                status: "ok",
                achievements
            })
        }catch (e) {
            next(e)
        }
    }
}

export default ServicesController;