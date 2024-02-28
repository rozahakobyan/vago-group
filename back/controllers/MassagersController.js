import massagers from "../models/massagers.js";
import HttpError from "http-errors";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";
import Massagers from "../models/Massagers.js";

class MassagersController {
    static async add (req, res, next){
        try{
            const {name} = req.body;
            const {file} = req;

            if(!name){
                throw HttpError(404, {
                    errors: {
                        exists: "Name Not found"
                    }
                })
            }

            if (!file) {
                throw HttpError(422, {
                    errors: {
                        image: 'Invalid file'
                    }
                })
            }

            const root = path.resolve('public/massagersIcon')
            await sharp(file.path)
                .rotate()
                .resize({ width: 40 })
                .toFile(path.join(root, file.filename));

            await sharp(file.path)
                .rotate()
                .resize({ width: 40 })
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, file.filename + '.webp'))


            const massager = await Massagers.create({name, icon: file.filename})

            res.json({
                status: "ok",
                massager
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {name} = req.body;
            const { id } = req.params;
            const {file} = req;

            const massager = await Massagers.findByPk(+id);

            if (!massager) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            const root = path.resolve('public/massagersIcon');

            if (massager.icon) {
                await fs.unlink(path.join(root, massager.icon));
                await fs.unlink(path.join(root, massager.icon + '.webp'));
            }

            await sharp(file.path)
                .rotate()
                .resize({ width: 40 })
                .toFile(path.join(root, file.filename));

            await sharp(file.path)
                .rotate()
                .resize({ width: 40 })
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, file.filename + '.webp'))

            await massager.update({name, icon: file.filename})

            res.json({
                status: "ok",
                massager
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const massager = await Massagers.findByPk(id)

            if (!massager) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            const root = path.resolve('public/massagersIcon');
            if (massager.icon) {
                await fs.unlink(path.join(root, massager.image));
                await fs.unlink(path.join(root, massager.image + '.webp'));
            }

            await massager.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const massagers = await Massagers.findAll({
                attributes: [ 'id', 'name',
                    [sequelize.literal(`CONCAT('massagersIcon/', icon)`), 'icon']
                ]
            })

            res.json({
                status: "ok",
                massagers
            })
        }catch (e) {
            next(e)
        }
    }
}

export default MassagersController;