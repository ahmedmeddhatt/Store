import { Request ,Response, NextFunction } from "express";
import UserModel from "../modules/user_module";

const user = new UserModel()

const Create = async (req:Request, res:Response , next:NextFunction)=>{
   try {
       const data = await user.create(req.body);
       res.status(201).json({ status: 'success' , data})
       
   } catch (error) {
       next(error)
   }

    }

    

    const get = (req:Request, res:Response)=>{
        res.status(200).send('hello world🌍')
        }


export default {Create, get}