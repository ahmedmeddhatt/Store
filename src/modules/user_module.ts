import User from "../types/user_type";
import db from '../database'

class userModel {

    // create
    async create(u:User):Promise<User> {
        try {
            // connect to db
            const connection = await db.connect()
            const sql = `INSERT INTO users (email , user_name ,first_name ,last_name ,password)  
            valuues ($1 ,$2 ,$3 ,$4 ,$5) returning *`
            // run query 
            const data = await connection.query(sql , [
                u.email , u.user_name ,u.first_name ,u.last_name ,u.password
            ])
            // release connection
            connection.release();
            // return created user
            return data.rows[0]
        } catch (error) {
            throw new Error(
                `Unable to create (${u.user_name}) : ${(error as Error).message}`
            )
        }
    }
    // get all users

    // get user

    //update user

    // delete user
}

export default userModel;