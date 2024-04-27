import HttpError from "http-errors";
import Packages from "../models/Packages.js";

class PackagesController {
    static async add (req, res, next){
        try{
            const {name, advanced, premium, standard} = req.body;

            if(!name){
                throw HttpError(404, {
                    errors: {
                        exists: "Not found"
                    }
                })
            }

            const packages = await Packages.create({name, advanced, premium, standard})

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
            const {name, advanced, premium, standard} = req.body;
            const { id } = req.params;

            const packages = await Packages.findOne({
                where: {id}
            })

            if (!packages) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await packages.update({name, advanced, premium, standard})

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

            if (!packages) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await packages.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const packages = await Packages.findAll()

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