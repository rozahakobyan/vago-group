import {Router} from "express";
import cars from "../schema/carsSchema.js";
import validate from "../middelwares/validate.js";
import CarsController from "../controllers/CarsController.js";
import uploader from "../middelwares/uploader.js";
import WorksController from "../controllers/WorksController.js";

const router = Router()

router.post('/add',
    uploader.image.single('image'),
    validate(cars.add),
    CarsController.add);

router.put('/update/:id',
    uploader.image.single('image'),
    validate(cars.update),
    CarsController.update);

router.delete('/delete/:id', CarsController.delete);

router.get('/list', CarsController.list)
router.get('/get-by-id/:id', CarsController.getById)

export default router;