import LoginImage from "../models/LoginImage.js";
import sharp from "sharp";
import path from "path";
import HttpError from "http-errors";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";
import {Op} from "sequelize";
import OurAdvantagesTaxi from "../models/OurAdvantagesTaxi.js";
import Translation from "../models/Translation.js";
import OurAdvantages from "../models/OurAdvantages.js";

class OurAdvantagesTaxiController {
    static async add (req, res, next){
        try{
            const { active, text, color } = req.body;
            const { file } = req;

            if (!file) {
                throw HttpError(422, {
                    errors: {
                        image: 'Invalid file'
                    }
                })
            }

            const root = path.resolve('public/ourAdvantagesTaxi')
            await sharp(file.path)
                .rotate()
                .resize({width: 1024})
                .toFile(path.join(root, file.filename));

            await sharp(file.path)
                .rotate()
                .resize({width: 1024})
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, file.filename + '.webp'))
            
            const translation = await Translation.create({
                en: {
                    text: text.en
                },
                ru: {
                    text: text.ru
                },
                am: {
                    text: text.am
                },
                pl: {
                    text: text.pl
                },
            })
            
            const ourAdvantageTaxiCreate = await OurAdvantagesTaxi.create({
                image: file.filename, active, text: text.en, color, translationId: translation.id
            })

            const ourAdvantageTaxi = await OurAdvantagesTaxi.findOne({
                where: {
                    id: ourAdvantageTaxiCreate.id
                },
                include: {
                    model: Translation,
                    required: false,
                }
            })
            res.json({
                status: "ok",
                ourAdvantageTaxi
            })

        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {id} = req.params;
            const {active, text, color, translation} = req.body;
            const {file} = req;
            const ourAdvantageTaxi = await OurAdvantagesTaxi.findByPk(+id);
            const translations = await Translation.findByPk(ourAdvantageTaxi.translationId);

            if (!ourAdvantageTaxi) {
                throw HttpError(422, {
                    errors: {
                        error: 'Not found'
                    }
                })
            }

            if(file){
                const root = path.resolve('public/ourAdvantagesTaxi');

                if (ourAdvantageTaxi.image) {
                    await fs.unlink(path.join(root, ourAdvantageTaxi.image));
                    await fs.unlink(path.join(root, ourAdvantageTaxi.image + '.webp'));
                }

                await sharp(file.path)
                    .rotate()
                    .resize({ width: 1024 })
                    .toFile(path.join(root, file.filename));

                await sharp(file.path)
                    .rotate()
                    .resize({ width: 1024 })
                    .webp({
                        quality: 80,
                    })
                    .toFile(path.join(root, file.filename + '.webp'))

                await ourAdvantageTaxi.update({image: file.filename, active, text: translation.en.text, color})
                await translations.update(translation)
            }else{
                await ourAdvantageTaxi.update({active, text: translation.en.text, color})
                await translations.update(translation)
            }

            res.json({
                status: 'ok',
                ourAdvantageTaxi
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const {id} = req.params;

            const ourAdvantageTaxi = await OurAdvantagesTaxi.findByPk(id);
            const translation = await Translation.findByPk(ourAdvantageTaxi.translationId);

            if (!ourAdvantageTaxi) {
                throw HttpError(422, {
                    errors: {
                        error: 'Not found'
                    }
                })
            }
            if (!translation) {
                throw HttpError(422, {
                    errors: {
                        error: 'Not found'
                    }
                })
            }
            const root = path.resolve('public/ourAdvantagesTaxi');

            if (ourAdvantageTaxi.image) {
                await fs.unlink(path.join(root, ourAdvantageTaxi.image));
                await fs.unlink(path.join(root, ourAdvantageTaxi.image + '.webp'));
            }

            await ourAdvantageTaxi.destroy();
            await translation.destroy();

            res.json({
                status:'ok',
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const {active} = req.query;

            const where = {};

            if(active){
                where[Op.or] = [
                    { active: { [Op.substring]: 1 } },
                ];
            }

            const ourAdvantagesTaxi = await OurAdvantagesTaxi.findAll({
                where,
                attributes: [ 'id',
                    [sequelize.literal(`CONCAT('ourAdvantagesTaxi/', image)`), 'image'], "active", "text", "color"
                ],
                include: {
                    model: Translation,
                    required: false,
                }});

            res.json({
                status:'ok',
                ourAdvantagesTaxi,
            })
        }catch (e) {
            next(e)
        }
    }
}

export default OurAdvantagesTaxiController;