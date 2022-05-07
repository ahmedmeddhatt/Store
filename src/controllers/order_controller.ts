import { Request ,Response, NextFunction } from "express";
import orderModel from "../models/order_model";


const order = new orderModel()


// GET ALL
const getMany = async (req:Request, res:Response , next:NextFunction)=>{
    try {
        const data = await order.getMany();
        if (data.length === 0) {
            res.json({ message: 'No orders found',data: data
            });
          } else {
              res.status(200).json({Results : data.length , status: 'success' , data ,
            });
        }
        
    } catch (error) {
        next(error)
        }
    }
    

// getAllActiveOrders
const getAllActiveOrders = async (req:Request, res:Response , next:NextFunction)=>{
        try {
            const activeOrders = await order.getActiveOrders(
              req.params.user_id as unknown as string
            );
            if (activeOrders.length === 0) {
              res.json({message: 'No Active Orders', data: activeOrders
              });
            } else {
              res.json({Results : activeOrders.length ,
                  message: 'Active Orders retrieved successfully', data: activeOrders
              });
            }
          } catch (error) {
            next(error)
        }

    }


// getAllCompleteOrders
    const getAllCompleteOrders = async (req: Request, res: Response) => {
        try {
          const completeOrders = await order.getCompleteOrders(
            req.params.user_id as unknown as string
          );
          if (completeOrders.length === 0) {
            res.json({ message: 'No Complete Orders', data: completeOrders
            });
          } else {
            res.json({ Results : completeOrders.length , data: completeOrders });
          }
        } catch (error) {
          throw error;
        }
      };
      

//CREATE
const Create = async (req:Request, res:Response , next:NextFunction)=>{
            try {
                const data = await order.create(req.params.user_id as unknown as string);
                res.status(201).json({ status: 'success' , data , message:`Order Created successfully`})
                
            } catch (error) {
                next(error)
            }
    
        }
    
//UPDATE
const updateOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
            const data = await order.orderCompleted( 
                 req.params.user_id as unknown as string,
                req.body.id as unknown as string); 
            res.status(201).json({ status: 'success' , data , message:`Order Updated successfully`})
            
        } catch (error) {
            next(error)
        }

    }



//DELETE
const deleteOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
             await order.deleteOne(
                req.params.user_id as unknown as string,
               req.body.id as unknown as string); // as unknown
            res.status(200).json({ status: 'success' , message:`Order Deleted successfully`})
            
        } catch (error) {
            next(error)
        }

    }


    




export default {
        Create,
        getMany ,
        deleteOne ,
        getAllActiveOrders ,
        getAllCompleteOrders ,
        updateOne ,
    }
