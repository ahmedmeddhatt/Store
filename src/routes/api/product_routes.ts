import { Router , Request ,Response } from "express";
import  api from '../../controllers/product_controler'
import validator from "../../middlewares/auth_middleware";

const routes = Router()


//adding route 

// api/products

routes.route('/')
.get( api.getMany)
.post( validator ,api.Create) ;


// api/products/id

routes.route('/:id')
.get( api.getOne)
.put(validator , api.updateOne)
.delete(validator , api.deleteOne)



export default routes