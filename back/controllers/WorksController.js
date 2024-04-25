import HttpError from "http-errors";
import Works from "../models/Works.js";
import WorksSchedules from "../models/WorksSchedules.js";
import {Op} from "sequelize";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";

class WorksController {
    static async add (req, res, next){
        try{
            const {name, department, price, hoursWeek, description, schedule = []} = req.body;
            const {file} = req;

            if(!name || !department || !price || !hoursWeek || !description){
                throw HttpError(404, {
                    errors: {
                        exists: "Not found"
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

            const root = path.resolve('public/works')

            await sharp(file.path)
                .rotate()
                .resize({ width: 200 })
                .toFile(path.join(root, file.filename));

            await sharp(file.path)
                .rotate()
                .resize({ width: 200 })
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, file.filename + '.webp'))

            const work = await Works.create({name, department, price, hoursWeek, description, image: file.filename})

            if(schedule.length){
                await WorksSchedules.bulkCreate(schedule.map(d => ({
                    workId: work.id,
                    date: d
                })))
            }

            const createdWork = await Works.findOne({
                where: { id: work.id },
                include: [
                    {
                        model: WorksSchedules,
                        as: "schedules",
                        required: false,
                        attributes: ["id", "date"],
                    },
                ],
                attributes: ["id", "name", "department", "price", "hoursWeek", "description", "image"]
            })

            res.json({
                status: "ok",
                work: createdWork
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {name, department, price, hoursWeek, description, schedule = []} = req.body;
            const { id } = req.params;
            const {file} = req;

            const work = await Works.findOne({
                where: {id}
            })

            if (!work) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            if(file){
                const root = path.resolve('public/works');

                if (work.image) {
                    await fs.unlink(path.join(root, work.image));
                    await fs.unlink(path.join(root, work.image + '.webp'));
                }

                await sharp(file.path)
                    .rotate()
                    .resize({ width: 200 })
                    .toFile(path.join(root, file.filename));

                await sharp(file.path)
                    .rotate()
                    .resize({ width: 200 })
                    .webp({
                        quality: 80,
                    })
                    .toFile(path.join(root, file.filename + '.webp'))

                await work.update({name, department, price, hoursWeek, description, image: file.filename})
            }else{
                await work.update({name, department, price, hoursWeek, description})
            }

            if(schedule){
                await WorksSchedules.bulkCreate(schedule.map(d => ({
                    workId: work.id,
                    date: d
                })))
            }

            const updatedWork = await Works.findOne({
                where: { id: work.id },
                include: [
                    {
                        model: WorksSchedules,
                        as: "schedules",
                        required: false,
                        attributes: ["id", "date"],
                    },
                ],
                attributes: ["id", "name", "department", "price", "hoursWeek", "description", "image"]
            })

            res.json({
                status: "ok",
                work: updatedWork
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const work = await Works.findByPk(id)

            if (!work) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            const root = path.resolve('public/works');
            if (work.image) {
                await fs.unlink(path.join(root, work.image));
                await fs.unlink(path.join(root, work.image + '.webp'));
            }

            await work.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async updateSchedules (req, res, next){
        try{
            const {date} = req.body;
            const {id} = req.params;

            const schedule = await WorksSchedules.findOne({
                where: {id}
            })

            if (!schedule) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await schedule.update({date})

            res.json({
                status: "ok",
                schedule
            })
        }catch (e) {
            next(e)
        }
    }

    static async deleteSchedules (req, res, next){
        try{
            const {id} = req.params;

            const schedule = await WorksSchedules.findOne({
                where: {id}
            })

            if (!schedule) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await schedule.destroy();

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const {page = 1, limit = 5, department} = req.query;
            const offset = (page - 1) * limit;

            const where = {};
            if(department){
                where[Op.or] = [
                    { department: { [Op.substring]: department } },
                ];
            }

            const works = await Works.findAll({
                where,
                include: [
                    {
                        model: WorksSchedules,
                        as: "schedules",
                        required: false,
                        attributes: ["id", "date"],
                    },
                ],
                attributes: ["id", "name", "department", "price", "hoursWeek", "description",
                    [sequelize.literal(`CONCAT('works/', image)`), 'image']],
                limit,
                offset
            })

            const total = await Works.count();

            res.json({
                status: "ok",
                works,
                page,
                total,
                pages: Math.ceil(total / limit)
            })
        }catch (e) {
            next(e)
        }
    }
}

export default WorksController;