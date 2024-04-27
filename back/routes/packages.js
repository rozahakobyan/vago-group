import {Router} from "express";
import validate from "../middelwares/validate.js";
import packages from "../schema/packages.js";
import PackagesController from "../controllers/PackagesController.js";

const router = Router()

router.post('/add',
    validate(packages.add),
    PackagesController.add);

router.put('/update/:id',
    validate(packages.update),
    PackagesController.update);

router.delete('/delete/:id', PackagesController.delete);

router.get('/list', PackagesController.list)

export default router;