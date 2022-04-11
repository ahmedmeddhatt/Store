import { Router , Request ,Response } from "express";
import  api from '../../controllers/user_controller'
import validator from "../../middlewares/auth_middleware";

const routes = Router()


//adding route 

// api/users

routes.route('/')
.get(validator,api.getMany)
.post(api.Create) ;


// api/users/id

routes.route('/:id')
.get(api.getOne)
.put(api.updateOne)
.delete(api.deleteOne)

//login
routes.post('/login', api.authentication)

export default routes