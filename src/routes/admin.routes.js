import { Router } from "express";
import * as adminCtrl from "../controllers/admin.controller"
import { verifySignUp } from "../middlewares";

const router = Router();


router.post('/signin',adminCtrl.signIn);
router.post('/signup',  [verifySignUp.checkDuplicateEmail, verifySignUp.isAuthorizedToCreateAdmin], adminCtrl.signUp)



export default router;