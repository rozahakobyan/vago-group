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

            const service = await Services.create({name, number})

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
            const {name, number} = req.body;
            const { id } = req.params;

            const service = await Services.findOne({
                where: {id}
            })

            if (!service) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await service.update({name, number})

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

            if (!service) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await service.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const services = await Services.findAll()

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