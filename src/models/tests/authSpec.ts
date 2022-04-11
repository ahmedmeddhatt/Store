import userModel from "../user_model";
import db from '../../database'
import User from "../../types/user_type";

const user = new userModel()

describe('Authentication route',() =>{
    describe("is authentication exists",() =>{
        it('should have an authentication method',()=>{
            expect(user.authenticate).toBeDefined()
        })
    })
})


describe('Authentication logic',()=>{
    const newUser = {
        "email":"ahmedmedht@com",
        "user_name":"Ahmed Medhat" ,
        "first_name":"Ahmed" ,
        "last_name":"Medhat" ,
        "password":"mypassword" 
    
    } as User
    
    beforeAll(async ()=>{
        const createUser = await user.create(newUser)
        newUser.id = createUser.id
    }) ;


    afterAll(async ()=>{
         const connection = await db.connect();

    })
})