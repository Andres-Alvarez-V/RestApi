import { Router } from "express";

import {generarIva, enviarFactura} from "../controllers/functional.controller";

const router = Router();


//router.post('/genera-factura', ...);
router.post('/calcularIva', generarIva)
router.post('/enviarFactura', enviarFactura)



export default router;