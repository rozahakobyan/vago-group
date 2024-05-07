import Partners from "../models/Partners.js";
import HttpError from "http-errors";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";
import Translation from "../models/Translation.js";
import Banner from "../models/Banner.js";

class PartnersController {
    static async add (req, res, next){
        try{
            const {name} = req.body;
            const {file} = req;

            if(!name){
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
                .toFile(path.join(root, file.filename));

            await sharp(file.path)
                .rotate()
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, file.filename + '.webp'))

            const translation = await Translation.create({
                en: {
                    name: name.en
                },
                ru: {
                    name: name.ru
                },
                am: {
                    name: name.am
                },
                pl: {
                    name: name.pl
                },
            })

            const partnerCreate = await Partners.create({name: name.en,
                image: file.filename,
                translationId: translation.id})

            const partner = await Banner.findOne({
                where: {
                    id: partnerCreate.id
                },
                include: {
                    model: Translation,
                    required: false,
                }
            })

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
            const {name, translation} = req.body;
            const { id } = req.params;
            const {file} = req;

            const partner = await Partners.findByPk(+id);
            const translations = await Translation.findByPk(partner.translationId);

            if (!partner) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            if(file){
                const root = path.resolve('public/partners');

                if (partner.image) {
                    await fs.unlink(path.join(root, partner.image));
                    await fs.unlink(path.join(root, partner.image + '.webp'));
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
    
                await partner.update({name: translation.en.name, image: file.filename})
                await translations.update(translation)
            }else{
                await partner.update({name: translation.en.name})
                await translations.update(translation)
            }

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
            const translation = await Translation.findByPk(partner.translationId);

            if (!partner) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            if (!translation) {
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
            await translation.destroy()

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
                attributes: [ 'id', 'name',
                    [sequelize.literal(`CONCAT('partners/', image)`), 'image']
                ],
                include: {
                    model: Translation,
                    required: false,
                }})

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