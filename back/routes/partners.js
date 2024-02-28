import {Router} from "express";
import validate from "../middelwares/validate.js";
import partners from "../schema/partnersSchema.js";
import PartnersController from "../controllers/PartnersController.js";
import uploader from "../middelwares/uploader.js";

const router = Router();

router.post('/add',
    uploader.image.single("image"),
    validate(partners.add),
    PartnersController.add);

router.put('/update/:id',
    uploader.image.single("image"),
    validate(partners.update),
    PartnersController.update);

router.delete('/delete/:id', PartnersController.delete);

router.get('/list', PartnersController.list)

export default router;