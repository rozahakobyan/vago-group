import {Router} from "express";
import videoPath from "../schema/videoPathSchema.js";
import validate from "../middelwares/validate.js";
import PathVideoController from "../controllers/PathVideoController.js";

const router = Router()

router.post('/add',
    validate(videoPath.add),
    PathVideoController.add);

router.put('/update/:id',
    validate(videoPath.update),
    PathVideoController.update);

router.delete('/delete/:id', PathVideoController.delete);

router.get('/list', PathVideoController.list)

export default router;