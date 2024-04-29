import sharp from "sharp";
import path from "path";
import HttpError from "http-errors";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";
import Galleries from "../models/Galleries.js";

class GalleriesController {
    static async add (req, res, next){
        try{
            const gallery = req.files['gallery[]'];

            if(!gallery){
                throw HttpError(422, {
                    errors: {
                        image: 'Invalid file'
                    }
                })
            } else {
                const root = path.resolve('public/galleries')

                await Galleries.bulkCreate(gallery.map(s => ({
                    src: s.filename
                })));

                gallery.map(async (file) => {
                    await sharp(file.path)
                        .rotate()
                        .toFile(path.join(root, file.filename));
                    await sharp(file.path)
                        .rotate()
                        .webp({
                            quality: 80,
                        })
                        .toFile(path.join(root, file.filename + '.webp'))
                });
            }

            const galleries = await Galleries.findAll({
                attributes: [ 'id',
                    [sequelize.literal(`CONCAT('galleries/', src)`), 'src']
                ]});

            res.json({
                status: "ok",
                galleries
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {id} = req.params;
            const {file} = req;
            const gallery = await Galleries.findByPk(+id);

            if (!gallery) {
                throw HttpError(422, {
                    errors: {
                        error: 'No Image found'
                    }
                })
            }

            if(file){
                const root = path.resolve('public/galleries');

                if (gallery.src) {
                    await fs.unlink(path.join(root, gallery.src));
                    await fs.unlink(path.join(root, gallery.src + '.webp'));
                }

                await sharp(file.path)
                    .rotate()
                    .toFile(path.join(root, file.filename));

                await sharp(file.path)
                    .rotate()
                    .webp({
                        quality: 80,
                    })
                    .toFile(path.join(root, file.filename + '.webp'))

                await gallery.update({src: file.filename})
            }

            res.json({
                status: 'ok',
                gallery
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const {id} = req.params;

            const gallery = await Galleries.findByPk(id);

            if (!gallery) {
                throw HttpError(422, {
                    errors: {
                        error: 'No Image found'
                    }
                })
            }
            const root = path.resolve('public/galleries');

            if (gallery.src) {
                await fs.unlink(path.join(root, gallery.src));
                await fs.unlink(path.join(root, gallery.src + '.webp'));
            }

            await gallery.destroy();

            res.json({
                status:'ok',
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const {page = 1, limit = 10} = req.query;
            const offset = (page - 1) * limit;

            const galleries = await Galleries.findAll({
                limit,
                offset,
                attributes: [ 'id',
                    [sequelize.literal(`CONCAT('galleries/', src)`), 'src']
                ]});

            res.json({
                status:'ok',
                galleries,
            })
        }catch (e) {
            next(e)
        }
    }
}

export default GalleriesController;