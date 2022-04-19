import { Router } from "express";
import usersRoutes from './api/user_routes'
import productRoutes from './api/product_routes'
import ordersRoutes from './api/order_routes'
import productOrderRoutes from './api/Product_order_routes'
const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/products', productRoutes)
routes.use('/orders', ordersRoutes)
routes.use('/productOrder', productOrderRoutes)

export default routes