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
            const headerIcon = req.files.headerIcon[0];
            const footerIcon = req.files.footerIcon[0];

            if(!name){
                throw HttpError(404, {
                    errors: {
                        exists: "Name Not found"
                    }
                })
            }

            if (!headerIcon || !footerIcon) {
                throw HttpError(422, {
                    errors: {
                        image: 'Invalid file'
                    }
                })
            }

            const root = path.resolve('public/massagersIcon')

            await sharp(headerIcon.path)
                .rotate()
                .resize({ width: 40 })
                .toFile(path.join(root, headerIcon.filename));

            await sharp(headerIcon.path)
                .rotate()
                .resize({ width: 40 })
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, headerIcon.filename + '.webp'))

            await sharp(footerIcon.path)
                .rotate()
                .resize({ width: 40 })
                .toFile(path.join(root, footerIcon.filename));

            await sharp(footerIcon.path)
                .rotate()
                .resize({ width: 40 })
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, footerIcon.filename + '.webp'))

            const massager = await Massagers.create({name, headerIcon: headerIcon.filename, footerIcon: footerIcon.filename})

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
            const {headerIcon} = req.files;
            const {footerIcon} = req.files;

            const massager = await Massagers.findByPk(+id);

            if (!massager) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            if(headerIcon){
                // console.log(headerIcon)
                const root = path.resolve('public/massagersIcon');

                if (massager.headerIcon) {
                    await fs.unlink(path.join(root, massager.headerIcon));
                    await fs.unlink(path.join(root, massager.headerIcon + '.webp'));
                }

                await sharp(headerIcon[0].path)
                    .rotate()
                    .resize({ width: 40 })
                    .toFile(path.join(root, headerIcon[0].filename));

                await sharp(headerIcon[0].path)
                    .rotate()
                    .resize({ width: 40 })
                    .webp({
                        quality: 80,
                    })
                    .toFile(path.join(root, headerIcon[0].filename + '.webp'))

                await massager.update({name, headerIcon: headerIcon[0].filename})
            }

            if(footerIcon){
                const root = path.resolve('public/massagersIcon');

                if (massager.footerIcon) {
                    await fs.unlink(path.join(root, massager.footerIcon));
                    await fs.unlink(path.join(root, massager.footerIcon + '.webp'));
                }

                await sharp(footerIcon[0].path)
                    .rotate()
                    .resize({ width: 40 })
                    .toFile(path.join(root, footerIcon[0].filename));

                await sharp(footerIcon[0].path)
                    .rotate()
                    .resize({ width: 40 })
                    .webp({
                        quality: 80,
                    })
                    .toFile(path.join(root, footerIcon[0].filename + '.webp'))

                await massager.update({name, footerIcon: footerIcon[0].filename})
            }

            if(!headerIcon && !footerIcon){
                await massager.update({name})
            }

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
            if (massager.headerIcon) {
                await fs.unlink(path.join(root, massager.headerIcon));
                await fs.unlink(path.join(root, massager.headerIcon + '.webp'));
            }
            if (massager.footerIcon) {
                await fs.unlink(path.join(root, massager.footerIcon));
                await fs.unlink(path.join(root, massager.footerIcon + '.webp'));
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
                    [sequelize.literal(`CONCAT('massagersIcon/', headerIcon)`), 'headerIcon'],
                    [sequelize.literal(`CONCAT('massagersIcon/', footerIcon)`), 'footerIcon'],
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