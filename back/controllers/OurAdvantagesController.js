import sharp from "sharp";
import path from "path";
import HttpError from "http-errors";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";
import OurAdvantages from "../models/OurAdvantages.js";
import Translation from "../models/Translation.js";
import History from "../models/History.js";

class OurAdvantagesController {
    static async add (req, res, next){
        try{
            const { text, color } = req.body;
            const { file } = req;

            if (!file) {
                throw HttpError(422, {
                    errors: {
                        image: 'Invalid file'
                    }
                })
            }

            const root = path.resolve('public/ourAdvantages')
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
            
            const ourAdvantageCreate = await OurAdvantages.create({
                image: file.filename, text: text.en, color, translationId: translation.id
            })

            const ourAdvantage = await OurAdvantages.findOne({
                where: {
                    id: ourAdvantageCreate.id
                },
                include: {
                    model: Translation,
                    required: false,
                }
            })

            res.json({
                status: "ok",
                ourAdvantage
            })

        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {id} = req.params;
            const {text, color, translation} = req.body;
            const {file} = req;
            const ourAdvantage = await OurAdvantages.findByPk(+id);
            const translations = await Translation.findByPk(ourAdvantage.translationId);

            if (!ourAdvantage) {
                throw HttpError(422, {
                    errors: {
                        error: 'Not found'
                    }
                })
            }

            if(file){
                const root = path.resolve('public/ourAdvantages');

                if (ourAdvantage.image) {
                    await fs.unlink(path.join(root, ourAdvantage.image));
                    await fs.unlink(path.join(root, ourAdvantage.image + '.webp'));
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

                await ourAdvantage.update({image: file.filename, text: translation.en.text, color})
                await translations.update(translation)
            }else{
                await ourAdvantage.update({text: translation.en.text, color})
                await translations.update(translation)
            }

            res.json({
                status: 'ok',
                ourAdvantage
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const {id} = req.params;

            const ourAdvantage = await OurAdvantages.findByPk(id);
            const translation = await Translation.findByPk(ourAdvantage.translationId);

            if (!ourAdvantage) {
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
            const root = path.resolve('public/ourAdvantages');

            if (ourAdvantage.image) {
                await fs.unlink(path.join(root, ourAdvantage.image));
                await fs.unlink(path.join(root, ourAdvantage.image + '.webp'));
            }

            await ourAdvantage.destroy();
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
            const ourAdvantages = await OurAdvantages.findAll({
                attributes: [ 'id',
                    [sequelize.literal(`CONCAT('ourAdvantages/', image)`), 'image'], "text", "color"
                ],
                include: {
                    model: Translation,
                    required: false,
                }});

            res.json({
                status:'ok',
                ourAdvantages,
            })
        }catch (e) {
            next(e)
        }
    }
}

export default OurAdvantagesController;