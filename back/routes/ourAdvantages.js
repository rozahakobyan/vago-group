import {Router} from "express";
import validate from "../middelwares/validate.js";
import uploader from "../middelwares/uploader.js";
import OurAdvantagesController from "../controllers/OurAdvantagesController.js";
import ourAdvantages from "../schema/ourAdvantagesSchema.js";

const router = Router()

router.post('/add',
    uploader.image.single('image'),
    validate(ourAdvantages.add),
    OurAdvantagesController.add);

router.put('/update/:id',
    uploader.image.single('image'),
    validate(ourAdvantages.update),
    OurAdvantagesController.update);

router.delete('/delete/:id', OurAdvantagesController.delete);

router.get('/list', OurAdvantagesController.list)

export default router;