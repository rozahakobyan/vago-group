import { Router } from "express";
import galleries from "../schema/galleriesSchema.js";
import uploader from "../middelwares/uploader.js";
import validate from "../middelwares/validate.js";
import GalleriesController from "../controllers/GalleriesController.js";

const router = Router();

router.post(
    '/add',
    uploader.image.fields([
        {name: "gallery[]", maxCount:10}
    ]),
    validate(galleries.add),
    GalleriesController.add);

router.put('/update/:id' ,
    uploader.image.single('src'),
    validate(galleries.update),
    GalleriesController.update)

router.delete('/delete/:id', GalleriesController.delete);

router.get('/list', GalleriesController.list)

export default router;