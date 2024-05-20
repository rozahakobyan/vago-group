import Products from "../models/Products.js";
import HttpError from "http-errors";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";
import fss from "fs";
import resizeImages from "../helper/resizeImages.js";
import {Op} from "sequelize";
import Translation from "../models/Translation.js";

class ProductsController {
    static async add (req, res, next){
        try{
            const {name, price, currency} = req.body;

            if(!name || !price || !currency){
                throw HttpError(404, {
                    errors: {
                        exists: "Not found"
                    }
                })
            }

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

            const productCreate = await Products.create({name: name.en, price,
                currency, translationId: translation.id})

            const product = await Products.findOne({
                where: {
                    id: productCreate.id
                },
                include: {
                    model: Translation,
                    required: false,
                }
            })

            res.json({
                status: "ok",
                product
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {name, price, currency, translation} = req.body;
            const { id } = req.params;

            const product = await Products.findByPk(+id);
            const translations = await Translation.findByPk(product.translationId);

            if (!product) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await product.update({ name: translation.en.name, price, currency });
            await translations.update(translation)

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
            const translation = await Translation.findByPk(product.translationId);

            if (!product) {
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

            await product.destroy()
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
            const {search} = req.query;

            const where = {};
            if (search) {
                where[Op.or] = [
                    { name: { [Op.substring]: search } },
                ];
            }

            const products = await Products.findAll({
                attributes: [ 'id', 'name', 'price', 'currency'],
                order: [
                    ['name', 'ASC'],
                ],
                include: {
                    model: Translation,
                    required: false,
                },
                where
            })


            res.json({
                status: "ok",
                products
            })
        }catch (e) {
            next(e)
        }
    }
}

export default ProductsController;