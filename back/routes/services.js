import {Router} from "express";
import achievements from "../schema/servicesSchema.js";
import ServicesController from "../controllers/ServicesController.js";
import validate from "../middelwares/validate.js";

const router = Router()

router.post('/add',
    validate(achievements.add),
    ServicesController.add);

router.put('/update/:id',
    validate(achievements.update),
    ServicesController.update);

router.delete('/delete/:id', ServicesController.delete);

router.get('/list', ServicesController.list)

export default router;