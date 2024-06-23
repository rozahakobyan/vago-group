import {Router} from "express";
import ourAdvantagesTaxi from "../schema/ourAdvantagesTaxiSchema.js";
import validate from "../middelwares/validate.js";
import uploader from "../middelwares/uploader.js";
import OurAdvantagesTaxiController from "../controllers/OurAdvantagesTaxiController.js";

const router = Router()

router.post('/add',
    uploader.image.single('image'),
    validate(ourAdvantagesTaxi.add),
    OurAdvantagesTaxiController.add);

router.put('/update/:id',
    uploader.image.single('image'),
    validate(ourAdvantagesTaxi.update),
    OurAdvantagesTaxiController.update);

router.delete('/delete/:id', OurAdvantagesTaxiController.delete);

router.get('/list', OurAdvantagesTaxiController.list)

export default router;