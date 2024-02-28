import {Router} from "express";
import achievements from "../schema/achievementsSchema.js";
import AchievementsController from "../controllers/AchievementsController.js";
import validate from "../middelwares/validate.js";

const router = Router()

router.post('/add',
    validate(achievements.add),
    AchievementsController.add);

router.put('/update/:id',
    validate(achievements.update),
    AchievementsController.update);

router.delete('/delete/:id', AchievementsController.delete);

router.get('/list', AchievementsController.list)

export default router;