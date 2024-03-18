import LoginImage from "../models/LoginImage.js";
import sharp from "sharp";
import path from "path";
import HttpError from "http-errors";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";

class LoginImageController {
    static async add (req, res, next){
        try{
            const { file } = req;

            if (!file) {
                throw HttpError(422, {
                    errors: {
                        image: 'Invalid file'
                    }
                })
            }

            const root = path.resolve('public/loginImage')
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

            const loginImage = await LoginImage.create({
                image: file.filename
            })

            res.json({
                status: "ok",
                loginImage
            })

        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {id} = req.params;
            const {file} = req;
            const loginImage = await LoginImage.findByPk(+id);

            if (!loginImage) {
                throw HttpError(422, {
                    errors: {
                        error: 'No Image found'
                    }
                })
            }

            if(file){
                const root = path.resolve('public/loginImage');

                if (loginImage.image) {
                    if(!path.join(root, loginImage.image)){
                        await fs.unlink(path.join(root, loginImage.image));
                    }
                    if(!path.join(root, loginImage.image + '.webp')){
                        await fs.unlink(path.join(root, loginImage.image + '.webp'));
                    }
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

                await loginImage.update({image: file.filename})
            }

            res.json({
                status: 'ok',
                loginImage
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const {id} = req.params;

            const loginImage = await LoginImage.findByPk(id);

            if (!loginImage) {
                throw HttpError(422, {
                    errors: {
                        error: 'No Image found'
                    }
                })
            }
            const root = path.resolve('public/loginImage');

            if (loginImage.image) {
                if(!path.join(root, loginImage.image)){
                    await fs.unlink(path.join(root, loginImage.image));
                }
                if(!path.join(root, loginImage.image + '.webp')){
                    await fs.unlink(path.join(root, loginImage.image + '.webp'));
                }
            }

            await loginImage.destroy();

            res.json({
                status:'ok',
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const loginImage = await LoginImage.findAll({
                attributes: [ 'id',
                    [sequelize.literal(`CONCAT('loginImage/', image)`), 'image']
                ]});

            res.json({
                status:'ok',
                loginImage,
            })
        }catch (e) {
            next(e)
        }
    }
}

export default LoginImageController;