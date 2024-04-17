import Products from "../models/Products.js";
import HttpError from "http-errors";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";
import fss from "fs";
import resizeImages from "../helper/resizeImages.js";
import {Op} from "sequelize";

class ProductsController {
    static async add (req, res, next){
        try{
            const {name, price} = req.body;
            const {file} = req;

            if(!name || !price){
                throw HttpError(404, {
                    errors: {
                        exists: "name or price Not found"
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
            const products = await Products.create({name, price, image: file.filename})

            const destFolder = `public/products/product_${products.id}`

            if (!fss.existsSync(destFolder)) {
                fss.mkdirSync(destFolder)
            }

            const root = path.resolve(destFolder);

            await sharp(file.path)
                .rotate()
                .resize({ width: 200 })
                .toFile(path.join(root, file.filename));

            await resizeImages(file.path, root, file.filename, 2);
            await resizeImages(file.path, root, file.filename, 3);

            res.json({
                status: "ok",
                products
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {name, price} = req.body;
            const { id } = req.params;
            const {file} = req;

            const product = await Products.findByPk(+id);

            if (!product) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            if (file) {
                const destFolder = `public/products/product_${product.id}`
                const ext = path.extname(file.filename)
                if (!fss.existsSync(destFolder)) {
                    fss.mkdirSync(destFolder)
                }
                if (product.image) {
                    await fs.unlink(path.join(destFolder, product.image));
                    await fs.unlink(path.join(destFolder, product.image + '@2x' + ext));
                    await fs.unlink(path.join(destFolder, product.image + '@3x' + ext));
                }
                await sharp(file.path)
                    .rotate()
                    .resize({ width: 200 })
                    .toFile(path.join(destFolder, file.filename));

                await resizeImages(file.path, destFolder, file.filename, 2);
                await resizeImages(file.path, destFolder, file.filename, 3);

                await product.update({ name, price, image: file.filename });

            } else {
                await product.update({ name, price });
            }

            res.json({
                status: "ok",
                product
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const product = await Products.findByPk(id)

            if (!product) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            const imagePath = path.resolve(`public/products/product_${id}`);

            await fs.rm(imagePath, { recursive: true, force: true })

            await product.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const {page = 1, limit = 10, search} = req.query;
            const offset = (page - 1) * limit;

            const where = {};
            if (search) {
                where[Op.or] = [
                    { name: { [Op.substring]: search } },
                ];
            }

            const products = await Products.findAll({
                attributes: [ 'id', 'name', 'price',
                    [sequelize.literal(`CONCAT('products/product_', Products.id,'/', image)`), 'image']
                ],
                order: [
                    ['name', 'ASC'],
                ],
                where,
                limit,
                offset
            })

            const total = await Products.count();

            res.json({
                status: "ok",
                products,
                page,
                total,
                pages: Math.ceil(total / limit)
            })
        }catch (e) {
            next(e)
        }
    }
}

export default ProductsController;