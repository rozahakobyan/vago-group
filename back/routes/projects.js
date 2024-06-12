import {Router} from "express";
import projects from "../schema/projectsSchema.js";
import validate from "../middelwares/validate.js";
import uploader from "../middelwares/uploader.js";
import ProjectsController from "../controllers/ProjectsController.js";

const router = Router()

router.post('/add',
    uploader.image.single('image'),
    validate(projects.add),
    ProjectsController.add);

router.put('/update/:id',
    uploader.image.single('image'),
    validate(projects.update),
    ProjectsController.update);

router.delete('/delete/:id', ProjectsController.delete);

router.get('/list', ProjectsController.list)
router.get('/list-to-ended', ProjectsController.listToEnded)
router.get('/list-to-pending', ProjectsController.listToPending)

export default router;