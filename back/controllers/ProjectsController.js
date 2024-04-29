import Project from "../models/Projects.js";
import sharp from "sharp";
import path from "path";
import HttpError from "http-errors";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";
import {Op} from "sequelize";
import Galleries from "../models/Galleries.js";

class ProjectsController {
    static async add (req, res, next){
        try{
            const { name, description, status } = req.body;
            const { file } = req;

            if(!name || !description || !status){
                throw HttpError(422, {
                    errors: {
                        image: 'Not Found'
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

            const root = path.resolve('public/projects')
            await sharp(file.path)
                .rotate()
                .toFile(path.join(root, file.filename));

            await sharp(file.path)
                .rotate()
                .webp({
                    quality: 80,
                })
                .toFile(path.join(root, file.filename + '.webp'))

            const project = await Project.create({
                name, description, status, image: file.filename,
            })

            res.json({
                status: "ok",
                project
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {id} = req.params;
            const {name, description, status} = req.body;
            const {file} = req;

            const project = await Project.findByPk(id);

            if (!project) {
                throw HttpError(422, {
                    errors: {
                        error: 'No Image found'
                    }
                })
            }

            if(file){
                const root = path.resolve('public/projects');

                if (project.image) {
                    await fs.unlink(path.join(root, project.image));
                    await fs.unlink(path.join(root, project.image + '.webp'));
                }

                await sharp(file.path)
                    .rotate()
                    .toFile(path.join(root, file.filename));

                await sharp(file.path)
                    .rotate()
                    .webp({
                        quality: 80,
                    })
                    .toFile(path.join(root, file.filename + '.webp'))

                await project.update({image: file.filename, name, description, status})
            }else{
                await project.update({name, description, status})
            }

            res.json({
                status: 'ok',
                project
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const {id} = req.params;

            const project = await Project.findByPk(id);

            if (!project) {
                throw HttpError(422, {
                    errors: {
                        error: 'No Image found'
                    }
                })
            }
            const root = path.resolve('public/projects');

            if (project.image) {
                await fs.unlink(path.join(root, project.image));
                await fs.unlink(path.join(root, project.image + '.webp'));
            }

            await project.destroy();

            res.json({
                status:'ok',
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const {status, page = 1, limit = 9} = req.query;
            const offset = (page - 1) * limit;

            const where = {};

            if(status){
                where[Op.or] = [
                    { status: { [Op.substring]: status } },
                ];
            }

            const projects = await Project.findAll({
                where,
                limit,
                offset,
                attributes: [ 'id', 'name', 'description', 'status',
                    [sequelize.literal(`CONCAT('projects/', image)`), 'image']
                ]});

            const total = await Project.count();

            res.json({
                status:'ok',
                projects,
                page,
                total,
                pages: Math.ceil(total / limit)
            })
        }catch (e) {
            next(e)
        }
    }
}

export default ProjectsController;