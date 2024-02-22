import HomeInfo from "../models/HomeInfo.js";
import HttpError from "http-errors";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";

class HomeInfoController {
    static async add (req, res, next){
        try{
            const {title, description} = req.body;
            const {file} = req;

            if(!title || !description){
                throw HttpError(404, {
                    errors: {
                        exists: "Title or Description Not found"
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

            const root = path.resolve('public/homeImage')
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


            const info = await HomeInfo.create({title, description, image: file.filename})

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
            const {file} = req;

            const info = await HomeInfo.findByPk(+id);

            if (!info) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            const root = path.resolve('public/homeImage');

            if (info.image) {
                await fs.unlink(path.join(root, info.image));
                await fs.unlink(path.join(root, info.image + '.webp'));
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

            await info.update({title, description, image: file.filename})

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

            const info = await HomeInfo.findByPk(id)

            if (!info) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            const root = path.resolve('public/homeImage');
            if (info.image) {
                await fs.unlink(path.join(root, info.image));
                await fs.unlink(path.join(root, info.image + '.webp'));
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
            const info = await HomeInfo.findAll({
                attributes: [ 'id', 'title', 'description',
                    [sequelize.literal(`CONCAT('homeImage/', image)`), 'image']
                ]
            })

            res.json({
                status: "ok",
                info
            })
        }catch (e) {
            next(e)
        }
    }
}

export default HomeInfoController;