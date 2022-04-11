import { Request ,Response, NextFunction } from "express";
import UserModel from "../modules/user_model";
import  Jwt  from "jsonwebtoken";
import config from "../config";

const user = new UserModel()


// GET ALL
const getMany = async (req:Request, res:Response , next:NextFunction)=>{
    try {
        const data = await user.getMany();
        res.status(200).json({Results : data.length , status: 'success' , data ,
         message:`All Users Reviewed successfully`})
        
    } catch (error) {
        next(error)
        }

    }
    

//GET ONE
const getOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
            const data = await user.getOne(req.params.id as string); // as unknown
            res.status(200).json({ status: 'success' , data , message:`User Reviewed successfully`})
            
        } catch (error) {
            next(error)
        }

    }

//CREATE
const Create = async (req:Request, res:Response , next:NextFunction)=>{
            try {
                const data = await user.create(req.body);
                res.status(201).json({ status: 'success' , data , message:`User Created successfully`})
                
            } catch (error) {
                next(error)
            }
    
        }
    
//UPDATE
const updateOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
            const data = await user.updateOne(req.body); 
            res.status(201).json({ status: 'success' , data , message:`User Updated successfully`})
            
        } catch (error) {
            next(error)
        }

    }



//DELETE
const deleteOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
             await user.deleteOne(req.params.id as string); // as unknown
            res.status(200).json({ status: 'success' , message:`User Deleted successfully`})
            
        } catch (error) {
            next(error)
        }

    }



//AUTHENTICATION
const authentication = async (req:Request, res:Response , next:NextFunction)=>{
    try {
        const {email, password} = req.body
        const data = await user.authenticate(email, password as string); // as unknown
        const token = Jwt.sign({ user}, config.tokenSecret as string)
        if(!data){

            res.status(401).json({ status: 'error' ,
             message:` Wrong Username or Password, Please tyr again !!`})
        }

        res.status(200).json({ status: 'success' ,data:{...data ,token} ,
         message:`User Authenticated successfully`})

        
    } catch (error) {
        return next(error)
    }

}

    




export default {Create,
        getMany ,
        getOne ,
        updateOne ,
        deleteOne ,
        authentication
}