import HttpError from "http-errors";
import HomeInfo from "../models/HomeInfo.js";
import Welcome from "../models/Welcome.js";

class WelcomeController {
    static async add (req, res, next){
        try{
            const {title, description} = req.body;

            if(!title || !description){
                throw HttpError(404, {
                    errors: {
                        exists: "Title or Description Not found"
                    }
                })
            }

            const info = await Welcome.create({title, description})

            res.json({
                status: "ok",
                info
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {title, description} = req.body;
            const { id } = req.params;

            const info = await Welcome.findOne({
                where: {id}
            })

            if (!info) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await info.update({title, description})

            res.json({
                status: "ok",
                info
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const info = await Welcome.findByPk(id)

            if (!info) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await info.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const { id } = req.params;

            const info = await Welcome.findAll()

            res.json({
                status: "ok",
                info
            })
        }catch (e) {
            next(e)
        }
    }
}

export default WelcomeController;