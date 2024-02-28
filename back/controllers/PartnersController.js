import Partners from "../models/Partners.js";
import HttpError from "http-errors";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";

class PartnersController {
    static async add (req, res, next){
        try{
            const {pathPartners} = req.body;
            const {file} = req;

            if(!pathPartners){
                throw HttpError(404, {
                    errors: {
                        exists: "Path Not found"
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

            const root = path.resolve('public/partners')
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


            const partner = await Partners.create({pathPartners, image: file.filename})

            res.json({
                status: "ok",
                partner
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {pathPartners} = req.body;
            const { id } = req.params;
            const {file} = req;

            const partner = await Partners.findByPk(+id);

            if (!partner) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            const root = path.resolve('public/partners');

            if (partner.image) {
                await fs.unlink(path.join(root, partner.image));
                await fs.unlink(path.join(root, partner.image + '.webp'));
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

            await partner.update({pathPartners, image: file.filename})

            res.json({
                status: "ok",
                partner
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const partner = await Partners.findByPk(id)

            if (!partner) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            const root = path.resolve('public/partners');
            if (partner.image) {
                await fs.unlink(path.join(root, partner.image));
                await fs.unlink(path.join(root, partner.image + '.webp'));
            }

            await partner.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const partners = await Partners.findAll({
                attributes: [ 'id', 'pathPartners',
                    [sequelize.literal(`CONCAT('partners/', image)`), 'image']
                ]
            })

            res.json({
                status: "ok",
                partners
            })
        }catch (e) {
            next(e)
        }
    }
}

export default PartnersController;