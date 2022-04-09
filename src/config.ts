import dotenv from 'dotenv'

dotenv.config()

const {
    ENV ,
     POSTGRES_HOST ,
      POSTGRES_PORT ,
      POSTGRES_DB ,
      POSTGRES_DB_TEST ,
      POSTGRES_USER  ,
      POSTGRES_PASSWORD 

} = process.env;

export default {
    port : POSTGRES_PORT ,
    host : POSTGRES_HOST ,
    dbPort : POSTGRES_HOST ,
    database :ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST ,
    user : POSTGRES_USER ,
    password : POSTGRES_PASSWORD
};