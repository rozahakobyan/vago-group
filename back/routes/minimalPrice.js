import {Router} from "express";
import validate from "../middelwares/validate.js";
import minimalPrice from "../schema/minimalPriceSchema.js";
import MinimalPriceController from "../controllers/MinimalPriceController.js";

const router = Router()

router.post('/add',
    validate(minimalPrice.add),
    MinimalPriceController.add);

router.put('/update/:id',
    validate(minimalPrice.update),
    MinimalPriceController.update);

router.delete('/delete/:id', MinimalPriceController.delete);

router.get('/list', MinimalPriceController.list)

export default router;