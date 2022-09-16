import { Router } from "express";

import {generarIva} from "../controllers/functional.controller";

const router = Router();


//router.post('/genera-factura', ...);
router.post('/calcularIva', generarIva)



export default router;