import {Router} from "express";
import validate from "../middelwares/validate.js";
import products from "../schema/products.js";
import ProductsController from "../controllers/ProductsController.js";
import uploader from "../middelwares/uploader.js";

const router = Router();

router.post('/add',
    uploader.image.single("image"),
    validate(products.add),
    ProductsController.add);

router.put('/update/:id',
    uploader.image.single("image"),
    validate(products.update),
    ProductsController.update);

router.delete('/delete/:id', ProductsController.delete);

router.get('/list', ProductsController.list)

export default router;