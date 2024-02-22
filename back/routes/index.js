import { Router } from "express";
import loginImage from "./loginImage.js";
import users from "./users.js";
import homeInfo from "./homeInfo.js";
import welcome from "./welcome.js";

const router = Router();

router.use('/login-image', loginImage);
router.use('/users', users);
router.use('/home-info', homeInfo);
router.use('/welcome', welcome);
export default router;