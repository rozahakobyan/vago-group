import {Router} from "express";
import contacts from "../schema/contactsSchema.js";
import ContactsController from "../controllers/ContactsController.js";
import validate from "../middelwares/validate.js";

const router = Router()

router.post('/add',
    validate(contacts.add),
    ContactsController.add);

router.put('/update/:id',
    validate(contacts.update),
    ContactsController.update);

router.put('/update-path/:id',
    validate(contacts.updatePath),
    ContactsController.updatePathMassager);

router.delete('/delete/:id', ContactsController.delete);
router.delete('/delete-path/:id', ContactsController.deletePathMassager);

router.get('/list', ContactsController.list)

export default router;