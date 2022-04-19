import { Request ,Response, NextFunction } from "express";
import productModel from "../models/product_model";


const product = new productModel()


// GET ALL
const getMany = async (req:Request, res:Response , next:NextFunction)=>{
    try {
        const data = await product.getMany();
        res.status(200).json({Results : data.length , status: 'success' , data ,
         message:`All Products Reviewed successfully`})
        
    } catch (error) {
        next(error)
        }

    }
    

//GET ONE
const getOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
            const data = await product.getOne(req.params.id as string); // as unknown
            res.status(200).json({ status: 'success' , data , message:`Product Reviewed successfully`})
            
        } catch (error) {
            next(error)
        }

    }

//CREATE
const Create = async (req:Request, res:Response , next:NextFunction)=>{
            try {
                const data = await product.create(req.body);
                res.status(201).json({ status: 'success' , data , message:`Product Created successfully`})
                
            } catch (error) {
                next(error)
            }
    
        }
    
//UPDATE
const updateOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
            const data = await product.updateOne(req.body); 
            res.status(201).json({ status: 'success' , data , message:`Product Updated successfully`})
            
        } catch (error) {
            next(error)
        }

    }



//DELETE
const deleteOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
             await product.deleteOne(req.params.id as string); // as unknown
            res.status(200).json({ status: 'success' , message:`Product Deleted successfully`})
            
        } catch (error) {
            next(error)
        }

    }





    




export default {Create,
        getMany ,
        getOne ,
        updateOne ,
        deleteOne 
    }