import { Router , Request ,Response } from "express";
import  api from '../../controllers/user_controller'
const routes = Router()

//adding route 

// api/users

routes.route('/')
.get(api.getMany)
.post(api.Create) ;


// api/users/id

routes.route('/:id')
.get(api.getOne)
.put(api.updateOne)
.delete(api.deleteOne)

export default routes