import HttpError from "http-errors";
import VideoPath from "../models/VideoPath.js";
import {Op} from "sequelize";

class PathVideoController {
    static async add (req, res, next){
        try{
            const {path, pageVideo} = req.body;

            if(!path || !pageVideo){
                throw HttpError(404, {
                    errors: {
                        exists: "Not found"
                    }
                })
            }

            const videoPath = await VideoPath.create({path, pageVideo})

            res.json({
                status: "ok",
                videoPath
            })
        }catch (e) {
            next(e)
        }
    }

    static async update (req, res, next){
        try{
            const {path, pageVideo} = req.body;
            const { id } = req.params;

            const videoPath = await VideoPath.findOne({
                where: {id}
            })

            if (!videoPath) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await videoPath.update({path, pageVideo})

            res.json({
                status: "ok",
                videoPath
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete (req, res, next){
        try{
            const { id } = req.params;

            const videoPath = await VideoPath.findByPk(id)

            if (!VideoPath) {
                throw HttpError(404, {
                    errors: {
                        exists: 'Not Found'
                    }
                })
            }

            await videoPath.destroy()

            res.json({
                status: "ok"
            })
        }catch (e) {
            next(e)
        }
    }

    static async list (req, res, next){
        try{
            const {pageVideo} = req.query;

            const where = {};

            if(pageVideo){
                where[Op.or] = [
                    { pageVideo: { [Op.substring]: pageVideo } },
                ];
            }

            const videoPaths = await VideoPath.findAll({where})

            res.json({
                status: "ok",
                videoPaths
            })
        }catch (e) {
            next(e)
        }
    }
}

export default PathVideoController;