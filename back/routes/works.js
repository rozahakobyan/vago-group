import {Router} from "express";
import works from "../schema/worksSchema.js";
import WorksController from "../controllers/WorksController.js";
import validate from "../middelwares/validate.js";
import uploader from "../middelwares/uploader.js";

const router = Router()

router.post('/add',
    uploader.image.single("image"),
    validate(works.add),
    WorksController.add);

router.put('/update/:id',
    uploader.image.single("image"),
    validate(works.update),
    WorksController.update);

router.put('/update-schedule/:id',
    validate(works.updateSchedule),
    WorksController.updateSchedules);

router.delete('/delete/:id', WorksController.delete);
router.delete('/delete-schedule/:id', WorksController.deleteSchedules);

router.get('/list', WorksController.list)

export default router;