import {Router} from "express";
import loginImage from "../schema/loginImageSchema.js";
import validate from "../middelwares/validate.js";
import LoginImageController from "../controllers/LoginImageController.js";
import uploader from "../middelwares/uploader.js";

const router = Router()

router.post('/add',
    uploader.image.single('image'),
    validate(loginImage.add),
    LoginImageController.add);

router.put('/update/:id',
    uploader.image.single('image'),
    validate(loginImage.update),
    LoginImageController.update);

router.delete('/delete/:id', LoginImageController.delete);

router.get('/list', LoginImageController.list)

export default router;