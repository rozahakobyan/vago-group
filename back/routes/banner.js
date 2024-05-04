import {Router} from "express";
import validate from "../middelwares/validate.js";
import banner from "../schema/bannerSchema.js";
import BannerController from "../controllers/BannerController.js";
import uploader from "../middelwares/uploader.js";

const router = Router();

router.post('/add',
    uploader.image.fields([
        {name: "homeImage", maxCount: 1},
        {name: "constructionImage", maxCount: 1},
        {name: "employmentAgencyImage", maxCount: 1},
        {name: "logisticImage", maxCount: 1}
    ]),
    validate(banner.add),
    BannerController.add);

router.put('/update/:id',
    uploader([]).fields([
        {name: "homeImage", maxCount: 1},
        {name: "constructionImage", maxCount: 1},
        {name: "employmentAgencyImage", maxCount: 1},
        {name: "logisticImage", maxCount: 1}
    ]),
    validate(banner.update),
    BannerController.update);

router.delete('/delete/:id', BannerController.delete);

router.get('/list', BannerController.list)

export default router;