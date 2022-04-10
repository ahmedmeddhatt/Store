import { Router , Request ,Response } from "express";
import  api from '../../controllers/user_controller'
const routes = Router()

//adding route 
routes.get('/', api.get)
routes.post('/', api.Create)

export default routes