import {Router} from "express";
import welcome from "../schema/welcomeSchema.js";
import WelcomeController from "../controllers/WelcomeController.js";
import validate from "../middelwares/validate.js";

const router = Router()

router.post('/add',
    validate(welcome.add),
    WelcomeController.add);

router.put('/update/:id',
    validate(welcome.update),
    WelcomeController.update);

router.delete('/delete/:id', WelcomeController.delete);

router.get('/list', WelcomeController.list)

export default router;