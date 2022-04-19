import { Router , Request ,Response } from "express";
import  api from '../../controllers/order_controller'
import validator from "../../middlewares/auth_middleware";

const routes = Router()


//adding route 

// api/users


routes.route('/:user_id')
.get(validator , api.getMany)
.get(validator , api.getAllActiveOrders)
.get(validator , api.getAllCompleteOrders)
.post(validator ,api.Create) 
.put(validator , api.updateOne)
.delete(validator , api.deleteOne)


// api/users/id





export default routes