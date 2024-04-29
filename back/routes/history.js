import {Router} from "express";
import welcome from "../schema/historySchema.js";
import HistoryController from "../controllers/HistoryController.js";
import validate from "../middelwares/validate.js";

const router = Router()

router.post('/add',
    validate(welcome.add),
    HistoryController.add);

router.put('/update/:id',
    validate(welcome.update),
    HistoryController.update);

router.delete('/delete/:id', HistoryController.delete);

router.get('/list', HistoryController.list)

export default router;