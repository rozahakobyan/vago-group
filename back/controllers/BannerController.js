import Banner from "../models/Banner.js";
import HttpError from "http-errors";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";
import {Op} from "sequelize";

class BannerController {
    static async add (req, res, next){
        try{
            const {title, description, active} = req.body;
            const homeImage = req.files.homeImage[0];
            const constructionImage = req.files.constructionImage[0];
            const employmentAgencyImage = req.files.employmentAgencyImage[0];
            const logisticImage = req.files.logisticImage[0];

            console.log(req.body);
            console.log(req.files)



            if(!title || !description){
                throw HttpError(404, {
                    errors: {
                        exists: "Title or Description Not found"
                    }
                })
            }

            if(!constructionImage || !employmentAgencyImage || !logisticImage || !homeImage){
                throw HttpError(422, {
                    errors: {
                        image: 'Invalid file'
                    }
                })
            }

            const root = path.resolve('public/banner')

            await sharp(homeImage.path)
                .rotate()
                .toFile(path.join(root, homeImage.filename));

            await sharp(homeImage.path)
                .rotate()
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, homeImage.filename + '.webp'))

            await sharp(constructionImage.path)
                .rotate()
                .toFile(path.join(root, constructionImage.filename));

            await sharp(constructionImage.path)
                .rotate()
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, constructionImage.filename + '.webp'))

            await sharp(employmentAgencyImage.path)
                .rotate()
                .toFile(path.join(root, employmentAgencyImage.filename));

            await sharp(employmentAgencyImage.path)
                .rotate()
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, employmentAgencyImage.filename + '.webp'))

            await sharp(logisticImage.path)
                .rotate()
                .toFile(path.join(root, logisticImage.filename));

            await sharp(logisticImage.path)
                .rotate()
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, logisticImage.filename + '.webp'))

            const banner = await Banner.create({title, description, active,
                homeImage: homeImage.filename,
                constructionImage: constructionImage.filename,
                employmentAgencyImage: employmentAgencyImage.filename,
                logisticImage: logisticImage.filename
            })

            res.json({
                status: "ok",
                banner
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {title, description, active} = req.body;
            const { id } = req.params;
            const {homeImage, constructionImage, employmentAgencyImage, logisticImage} = req.files;

            const banner = await Banner.findByPk(+id);

            if (!banner) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            if(homeImage){
                const root = path.resolve('public/banner');

                if (banner.homeImage) {
                    await fs.unlink(path.join(root, banner.homeImage));
                    await fs.unlink(path.join(root, banner.homeImage + '.webp'));
                }

                await sharp(homeImage[0].path)
                    .rotate()
                    .toFile(path.join(root, homeImage[0].filename));

                await sharp(homeImage[0].path)
                    .rotate()
                    .webp({
                        quality: 80,
                    })
                    .toFile(path.join(root, homeImage[0].filename + '.webp'))

                await banner.update({title, description, active, homeImage: homeImage[0].filename})
            }

            if(constructionImage){
                const root = path.resolve('public/banner');

                if (banner.constructionImage) {
                    await fs.unlink(path.join(root, banner.constructionImage));
                    await fs.unlink(path.join(root, banner.constructionImage + '.webp'));
                }

                await sharp(constructionImage[0].path)
                    .rotate()
                    .toFile(path.join(root, constructionImage[0].filename));

                await sharp(constructionImage[0].path)
                    .rotate()
                    .webp({
                        quality: 80,
                    })
                    .toFile(path.join(root, constructionImage[0].filename + '.webp'))

                await banner.update({title, description, active, constructionImage: constructionImage[0].filename})
            }

            if(employmentAgencyImage){
                const root = path.resolve('public/banner');

                if (banner.employmentAgencyImage) {
                    await fs.unlink(path.join(root, banner.employmentAgencyImage));
                    await fs.unlink(path.join(root, banner.employmentAgencyImage + '.webp'));
                }

                await sharp(employmentAgencyImage[0].path)
                    .rotate()
                    .toFile(path.join(root, employmentAgencyImage[0].filename));

                await sharp(employmentAgencyImage[0].path)
                    .rotate()
                    .webp({
                        quality: 80,
                    })
                    .toFile(path.join(root, employmentAgencyImage[0].filename + '.webp'))

                await banner.update({title, description, active, employmentAgencyImage: employmentAgencyImage[0].filename})
            }

            if(logisticImage){
                const root = path.resolve('public/banner');

                if (banner.logisticImage) {
                    await fs.unlink(path.join(root, banner.logisticImage));
                    await fs.unlink(path.join(root, banner.logisticImage + '.webp'));
                }

                await sharp(logisticImage[0].path)
                    .rotate()
                    .toFile(path.join(root, logisticImage[0].filename));

                await sharp(logisticImage[0].path)
                    .rotate()
                    .webp({
                        quality: 80,
                    })
                    .toFile(path.join(root, logisticImage[0].filename + '.webp'))

                await banner.update({title, description, active, logisticImage: logisticImage[0].filename})
            }

            if(!homeImage && !constructionImage && !employmentAgencyImage && !logisticImage){
                await banner.update({title, description, active})
            }

            res.json({
                status: "ok",
                banner
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const banner = await Banner.findByPk(id)

            if (!banner) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            const root = path.resolve('public/banner');

            if (banner.homeImage) {
                await fs.unlink(path.join(root, banner.homeImage));
                await fs.unlink(path.join(root, banner.homeImage + '.webp'));
            }

            if (banner.constructionImage) {
                await fs.unlink(path.join(root, banner.constructionImage));
                await fs.unlink(path.join(root, banner.constructionImage + '.webp'));
            }

            if (banner.employmentAgencyImage) {
                await fs.unlink(path.join(root, banner.employmentAgencyImage));
                await fs.unlink(path.join(root, banner.employmentAgencyImage + '.webp'));
            }

            if (banner.logisticImage) {
                await fs.unlink(path.join(root, banner.logisticImage));
                await fs.unlink(path.join(root, banner.logisticImage + '.webp'));
            }

            await banner.destroy()

            res.json({
                status: "ok"
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
                    { active: { [Op.substring]: 1} }
                ];
            }

            const banners = await Banner.findAll({
                where,
                attributes: [ 'id', 'title', 'description', 'active',
                    [sequelize.literal(`CONCAT('banner/', homeImage)`), 'homeImage'],
                    [sequelize.literal(`CONCAT('banner/', constructionImage)`), 'constructionImage'],
                    [sequelize.literal(`CONCAT('banner/', employmentAgencyImage)`), 'employmentAgencyImage'],
                    [sequelize.literal(`CONCAT('banner/', logisticImage)`), 'logisticImage'],
                ]
            })

            res.json({
                status: "ok",
                banners
            })
        }catch (e) {
            next(e)
        }
    }
}

export default BannerController;