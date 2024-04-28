import HttpError from "http-errors";
import Packages from "../models/Packages.js";
import {Op} from "sequelize";

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

            const packages = await Packages.create({name, advanced, premium, standard, activePage})

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
            const {name, advanced, premium, standard, activePage} = req.body;
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

            await packages.update({name, advanced, premium, standard, activePage})

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
            const {activePage} = req.query;
            const where = {};

            if(activePage){
                where[Op.or] = [
                    { activePage: { [Op.substring]: activePage } },
                ];
            }

            const packages = await Packages.findAll({where})

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