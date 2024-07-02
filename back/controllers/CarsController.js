import sharp from "sharp";
import path from "path";
import HttpError from "http-errors";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";
import Cars from "../models/Cars.js";
import Translation from "../models/Translation.js";
import Works from "../models/Works.js";
import WorksSchedules from "../models/WorksSchedules.js";

class CarsController {
    static async add (req, res, next){
        try{
            const { name, price, fuel, transmission, bac, documents, bonusSystem, rules } = req.body;
            const { file } = req;

            if(!name || !price || !fuel || !transmission || !bac || !documents || !bonusSystem || !rules){
                throw HttpError(422, {
                    errors: {
                        exists: 'Not Found'
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

            const root = path.resolve('public/cars')
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
                    name: name.en,
                    fuel: fuel.en,
                    transmission: transmission.en,
                    documents: documents.en,
                    bonusSystem: bonusSystem.en,
                    rules: rules.en,
                },
                ru: {
                    name: name.ru,
                    fuel: fuel.ru,
                    transmission: transmission.ru,
                    documents: documents.ru,
                    bonusSystem: bonusSystem.ru,
                    rules: rules.ru,
                },
                am: {
                    name: name.am,
                    fuel: fuel.am,
                    transmission: transmission.am,
                    documents: documents.am,
                    bonusSystem: bonusSystem.am,
                    rules: rules.am,
                },
                pl: {
                    name: name.pl,
                    fuel: fuel.pl,
                    transmission: transmission.pl,
                    documents: documents.pl,
                    bonusSystem: bonusSystem.pl,
                    rules: rules.pl,
                },
            })

            const carCreate = await Cars.create({
                name: name.en,
                price,
                image: file.filename,
                fuel: fuel.en,
                transmission: transmission.en,
                bac,
                documents: documents.en,
                bonusSystem: bonusSystem.en,
                rules: rules.en,
                translationId: translation.id
            })

            const car = await Cars.findOne({
                where: {
                    id: carCreate.id
                },
                include: {
                    model: Translation,
                    required: false,
                }
            })

            res.json({
                status: "ok",
                car
            })

        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {id} = req.params;
            const {name, price, fuel, transmission, bac, documents, bonusSystem, rules, translation} = req.body;
            const {file} = req;

            const car = await Cars.findByPk(+id);
            const translations = await Translation.findByPk(car.translationId);

            if (!car) {
                throw HttpError(422, {
                    errors: {
                        error: 'Not found'
                    }
                })
            }

            if (!translations) {
                throw HttpError(422, {
                    errors: {
                        error: 'Not found'
                    }
                })
            }

            if(file){
                const root = path.resolve('public/cars');

                if (car.image) {
                    await fs.unlink(path.join(root, car.image));
                    await fs.unlink(path.join(root, car.image + '.webp'));
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

                await car.update({image: file.filename,
                    name: translation.en.name,
                    price,
                    fuel: translation.en.fuel,
                    transmission: translation.en.transmission,
                    bac,
                    documents: translation.en.documents,
                    bonusSystem: translation.en.bonusSystem,
                    rules: translation.en.rules
                })
                await translations.update(translation)
            }else{
                await car.update({
                    name: translation.en.name,
                    price,
                    fuel: translation.en.fuel,
                    transmission: translation.en.transmission,
                    bac,
                    documents: translation.en.documents,
                    bonusSystem: translation.en.bonusSystem,
                    rules: translation.en.rules})
                await translations.update(translation)
            }

            res.json({
                status: 'ok',
                car
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const {id} = req.params;

            const car = await Cars.findByPk(id);
            const translation = await Translation.findByPk(car.translationId);

            if (!car) {
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
            const root = path.resolve('public/cars');

            if (car.image) {
                await fs.unlink(path.join(root, car.image));
                await fs.unlink(path.join(root, car.image + '.webp'));
            }

            await car.destroy();
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
            const cars = await Cars.findAll({
                attributes: [ 'id',
                    [sequelize.literal(`CONCAT('cars/', image)`), 'image'], "name", "price",
                    "fuel", "transmission", "bac", "documents", "bonusSystem", "rules"
                ],
                include: {
                    model: Translation,
                    required: false,
                }
            });

            res.json({
                status:'ok',
                cars,
            })
        }catch (e) {
            next(e)
        }
    }

    static async getById (req, res, next){
        try{
            const {id} = req.params;

            const car = await Cars.findOne({
                where: {
                    id
                },
                attributes: [ 'id',
                    [sequelize.literal(`CONCAT('cars/', image)`), 'image'], "name", "price",
                    "fuel", "transmission", "bac", "documents", "bonusSystem", "rules"
                ],
                include: {
                    model: Translation,
                    required: false,
                }
            })

            if (!car) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            res.json({
                status:'ok',
                car,
            })
        }catch (e) {
            next(e)
        }
    }
}

export default CarsController;