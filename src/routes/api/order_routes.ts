import { Router , Request ,Response } from "express";
import  api from '../../controllers/order_controller'
import validator from "../../middlewares/auth_middleware";

const routes = Router()


//adding route 

// api/orders

routes.route('/')
.get(validator , api.getMany)

// api/orders/:user_id

routes.route('/:user_id')
.post(validator ,api.Create) 
.put(validator , api.updateOne)
.delete(validator , api.deleteOne)

routes.route('/active/:user_id')
.get(validator , api.getAllActiveOrders)


routes.route('/complete/:user_id')
.get(validator , api.getAllCompleteOrders)


// api/users/id





export default routes