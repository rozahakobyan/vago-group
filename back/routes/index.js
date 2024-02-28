import { Router } from "express";
import loginImage from "./loginImage.js";
import users from "./users.js";
import homeInfo from "./homeInfo.js";
import welcome from "./welcome.js";
import products from "./products.js";
import partners from "./partners.js";
import achievements from "./achievements.js";
import massagers from "./massagers.js";
import contacts from "./contacts.js";
import works from "./works.js";

const router = Router();

router.use('/login-image', loginImage);
router.use('/users', users);
router.use('/home-info', homeInfo);
router.use('/welcome', welcome);
router.use('/products', products);
router.use('/partners', partners);
router.use('/achievements', achievements);
router.use('/massagers', massagers);
router.use('/contacts', contacts);
router.use('/works', works);

export default router;