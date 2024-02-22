import {Router} from "express";
import validate from "../middelwares/validate.js";
import homeInfo from "../schema/homeInfo.js";
import HomeInfoController from "../controllers/HomeInfoController.js";
import uploader from "../middelwares/uploader.js";

const router = Router();

router.post('/add',
    uploader.image.single("image"),
    validate(homeInfo.add),
    HomeInfoController.add);

router.put('/update/:id',
    uploader.image.single("image"),
    validate(homeInfo.update),
    HomeInfoController.update);

router.delete('/delete/:id', HomeInfoController.delete);

router.get('/list', HomeInfoController.list)

export default router;