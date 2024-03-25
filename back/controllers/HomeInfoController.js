import HomeInfo from "../models/HomeInfo.js";
import HttpError from "http-errors";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";

class HomeInfoController {
    static async add (req, res, next){
        try{
            const {title} = req.body;
            const {file} = req;

            console.log(req)

            if(!title){
                throw HttpError(404, {
                    errors: {
                        exists: "Title Not found"
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

            const root = path.resolve('public/homeVideo')

            // await fs.writeFile(path.join(root, file.filename), file)

            const info = await HomeInfo.create({title})

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
            const {title} = req.body;
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

            if(file){
                const root = path.resolve('public/homeVideo');

                if (info.image) {
                    if(!path.join(root, info.image)){
                        await fs.unlink(path.join(root, info.image));
                    }
                    if(!path.join(root, info.image + '.webp')){
                        await fs.unlink(path.join(root, info.image + '.webp'));
                    }
                }

                await sharp(file.path)
                    .rotate()
                    .resize({ width: 1024, height: 500 })
                    .toFile(path.join(root, file.filename));

                await sharp(file.path)
                    .rotate()
                    .resize({ width: 1024, height: 500 })
                    .webp({
                        quality: 80,
                    })
                    .toFile(path.join(root, file.filename + '.webp'))

                await info.update({title, image: file.filename})
            }else{
                await info.update({title})
            }

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

            const root = path.resolve('public/homeVideo');
            if (info.image) {
                if(!path.join(root, info.image)){
                    await fs.unlink(path.join(root, info.image));
                }
                if(!path.join(root, info.image + '.webp')){
                    await fs.unlink(path.join(root, info.image + '.webp'));
                }
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
                attributes: [ 'id', 'title',
                    [sequelize.literal(`CONCAT('homeVideo/', video)`), 'video']
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