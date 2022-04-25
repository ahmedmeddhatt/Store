import { Router , Request ,Response } from "express";
import  api from '../../controllers/product_order_controller'
import validator from "../../middlewares/auth_middleware";

const routes = Router()


routes.route('/:user_id/:order_id')
.get(validator , api.getAllProductsForproductOrder)
.post(validator ,api.addProductToOrder) 
.put(validator , api.updateProductQuantityInOrder)
.delete(validator , api.deleteProductFromOrder)

export default routes