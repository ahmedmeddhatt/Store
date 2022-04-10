import { Router } from "express";
import usersRoutes from './api/user_routes'
const routes = Router()

routes.use('/users', usersRoutes)

export default routes