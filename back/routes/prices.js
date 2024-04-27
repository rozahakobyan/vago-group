import {Router} from "express";
import validate from "../middelwares/validate.js";
import prices from "../schema/prices.js";
import PricesController from "../controllers/PricesController.js";

const router = Router()

router.post('/add',
    validate(prices.add),
    PricesController.add);

router.put('/update/:id',
    validate(prices.update),
    PricesController.update);

router.delete('/delete/:id', PricesController.delete);

router.get('/list', PricesController.list)
router.get('/list-price', PricesController.listPrice)

export default router;