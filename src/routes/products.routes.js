import { Router } from "express";
import * as productsCtrl from "../controllers/products.controller";
import { verifyToken } from '../middlewares'


const router = Router();


router.get('/:productId', productsCtrl.getProductById)

router.post('/', verifyToken, productsCtrl.createProduct)

router.put('/:productId', verifyToken, productsCtrl.updateProductById)
router.delete('/:productId', verifyToken,productsCtrl.deleteProductById)


export default router;