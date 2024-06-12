import Project from "../models/Projects.js";
import sharp from "sharp";
import path from "path";
import HttpError from "http-errors";
import fs from "fs/promises";
import sequelize from "../services/sequelize.js";
import {Op} from "sequelize";
import Translation from "../models/Translation.js";

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

            const translation = await Translation.create({
                en: {
                    name: name.en,
                    description: description.en
                },
                ru: {
                    name: name.ru,
                    description: description.ru
                },
                am: {
                    name: name.am,
                    description: description.am
                },
                pl: {
                    name: name.pl,
                    description: description.pl
                },
            })

            const projectCreate = await Project.create({
                name: name.en, description: description.en,
                status, image: file.filename,
                translationId: translation.id
            })

            const project = await Project.findOne({
                where: {
                    id: projectCreate.id
                },
                include: {
                    model: Translation,
                    required: false,
                }
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
            const {name, description, translation, status} = req.body;
            const {file} = req;

            const project = await Project.findByPk(id);
            const translations = await Translation.findByPk(project.translationId);

            if (!project) {
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

                await project.update({image: file.filename, name: translation.en.name,
                    description: translation.en.description, status})
                await translations.update(translation)
            }else{
                await project.update({ name: translation.en.name,
                    description: translation.en.description, status})
                await translations.update(translation)
            }

            const projectUpdate = await Project.findOne({
                where: {
                    id
                },
                include: {
                    model: Translation,
                    required: false,
                }
            })

            res.json({
                status: 'ok',
                project: projectUpdate
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const {id} = req.params;

            const project = await Project.findByPk(id);
            const translation = await Translation.findByPk(project.translationId);

            if (!project) {
                throw HttpError(422, {
                    errors: {
                        error: 'No Image found'
                    }
                })
            }

            if (!translation) {
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
                limit: Number(limit),
                offset,
                attributes: [ 'id', 'name', 'description', 'status',
                    [sequelize.literal(`CONCAT('projects/', image)`), 'image']
                ],
                include: {
                    model: Translation,
                    required: false,
                }
            });

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

    static async listToEnded (req, res, next){
        try{
            const {page = 1, limit = 9} = req.query;
            const offset = (page - 1) * limit;

            const projects = await Project.findAll({
                where: {
                    status: "ended"
                },
                limit: Number(limit),
                offset,
                attributes: [ 'id', 'name', 'description', 'status',
                    [sequelize.literal(`CONCAT('projects/', image)`), 'image']
                ],
                include: {
                    model: Translation,
                    required: false,
                }
            });

            const total = await Project.findAll({
                where: {
                    status: "ended"
                }
            });

            res.json({
                status:'ok',
                projects,
                page,
                total,
                pages: Math.ceil(total.length / limit)
            })
        }catch (e) {
            next(e)
        }
    }

    static async listToPending (req, res, next){
        try{
            const {page = 1, limit = 9} = req.query;
            const offset = (page - 1) * limit;

            const projects = await Project.findAll({
                where: {
                    status: "pending"
                },
                limit: Number(limit),
                offset,
                attributes: [ 'id', 'name', 'description', 'status',
                    [sequelize.literal(`CONCAT('projects/', image)`), 'image']
                ],
                include: {
                    model: Translation,
                    required: false,
                }
            });

            const total = await Project.findAll({
                where: {
                    status: "pending"
                }
            });

            res.json({
                status:'ok',
                projects,
                page,
                total,
                pages: Math.ceil(total.length / limit)
            })
        }catch (e) {
            next(e)
        }
    }
}

export default ProjectsController;