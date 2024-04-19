import HttpError from "http-errors";
import Works from "../models/Works.js";
import WorksSchedules from "../models/WorksSchedules.js";
import {Op} from "sequelize";

class WorksController {
    static async add (req, res, next){
        try{
            const {name, department, price, hoursWeek, description, schedule = []} = req.body;

            if(!name || !department || !price || !hoursWeek || !description){
                throw HttpError(404, {
                    errors: {
                        exists: "Not found"
                    }
                })
            }

            const work = await Works.create({name, department, price, hoursWeek, description})

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
                attributes: ["id", "name", "department", "price", "hoursWeek", "description"]
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

            await work.update({name, department, price, hoursWeek, description})

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
                attributes: ["id", "name", "department", "price", "hoursWeek", "description"]
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
                attributes: ["id", "name", "department", "price", "hoursWeek", "description"],
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