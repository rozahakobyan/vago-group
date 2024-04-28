import { Router } from "express";
import loginImage from "./loginImage.js";
import users from "./users.js";
import homeInfo from "./homeInfo.js";
import welcome from "./welcome.js";
import products from "./products.js";
import partners from "./partners.js";
import services from "./services.js";
import massagers from "./massagers.js";
import contacts from "./contacts.js";
import works from "./works.js";
import prices from "./prices.js";
import packages from "./packages.js";

const router = Router();

router.use('/login-image', loginImage);
router.use('/users', users);
router.use('/home-info', homeInfo);
router.use('/welcome', welcome);
router.use('/products', products);
router.use('/partners', partners);
router.use('/services', services);
router.use('/massagers', massagers);
router.use('/contacts', contacts);
router.use('/works', works);
router.use('/prices', prices);
router.use('/packages', packages);

export default router;