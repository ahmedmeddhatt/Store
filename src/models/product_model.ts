import { Product } from '../types/product_type';
import db from '../database'



class productModel {

    // create
    async create(p:Product):Promise<Product> {
        try {
            // connect to db
            const connection = await db.connect()
            const sql = `INSERT INTO products (name , price ,category)  
            values ($1 ,$2 ,$3 ) RETURNING id,name , price ,category`
            // run query 
            const data = await connection.query(sql , [
                p.name , p.price ,p.category 
            ])
            // release connection
            connection.release();
            // return created user
            return data.rows[0]
        } catch (error) {
            throw new Error(
                `Unable to create (${p.name}) : ${(error as Error).message}`
            )
        }
    }

    // get all products
    async getMany():Promise<Product[]>{
        try {
            // connect to db
            const connection = await db.connect() ;
            const sql = `SELECT id , name , price ,category FROM products` ;
    
             // run query 
             const data = await connection.query(sql) ;
              // release connection
              connection.release();
              // return all products
              return data.rows ;
            
        } catch (error) {
            throw new Error (`Error at getting Products : ${(error as Error).message}`)
        }
    }


    // get user
    async getOne(id: string):Promise<Product>{
        try {
            // connect to db
            const connection = await db.connect() ;
            const sql = `SELECT name , price ,category FROM products where id=($1)` ;
    
             // run query 
             const data = await connection.query(sql , [id]) ;
              // release connection
              connection.release();
              // return Product with the id
              return data.rows[0] ;
            
        } catch (error) {
            throw new Error (`Can not find Product id ( ${id} ), ${(error as Error).message}`)
        }
    }



    //update Product
    async updateOne(p: Product):Promise <Product> {
    try {
        // connect to db
        const connection = await db.connect() ;
        const sql = `UPDATE products 
        SET name=$1 , price=$2 ,category=$3  where id=$4
        RETURNING id,name , price ,category` ;

         // run query 
         const data = await connection.query(sql ,  [
            p.name , p.price ,p.category  , p.id
        ]) ;
          // release connection
          connection.release();
          // return updated Product
          return data.rows[0] ;
        
    } catch (error) {
        throw new Error (`Can not update Product ${p.name} , ${(error as Error).message}`)
    }

 }



    // delete Product
    async deleteOne(id : string):Promise <Product> {
        try {
            // connect to db
            const connection = await db.connect() ;
            const sql = `DELETE FROM products
                    where id=($1)
                    RETURNING id,name , price ,category` ;
    
             // run query 
             const data = await connection.query(sql ,  [id]) ;
              // release connection
              connection.release();
              // return deleting message
              return data.rows[0] ;
            
        } catch (error) {
            throw new Error (`Can not delete Product id ( ${id} ) , ${(error as Error).message}`)
        }
    
     }





}

export default productModel;