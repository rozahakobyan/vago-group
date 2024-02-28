import {Router} from "express";
import validate from "../middelwares/validate.js";
import massagers from "../schema/massagersSchema.js";
import MassagersController from "../controllers/MassagersController.js";
import uploader from "../middelwares/uploader.js";

const router = Router();

router.post('/add',
    uploader.image.single("icon"),
    validate(massagers.add),
    MassagersController.add);

router.put('/update/:id',
    uploader.image.single("icon"),
    validate(massagers.update),
    MassagersController.update);

router.delete('/delete/:id', MassagersController.delete);

router.get('/list', MassagersController.list)

export default router;