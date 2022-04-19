"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class productModel {
    // create
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                const sql = `INSERT INTO products (name , price ,category)  
            values ($1 ,$2 ,$3 ) RETURNING id,name , price ,category`;
                // run query 
                const data = yield connection.query(sql, [
                    p.name, p.price, p.category
                ]);
                // release connection
                connection.release();
                // return created user
                return data.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to create (${p.name}) : ${error.message}`);
            }
        });
    }
    // get all products
    getMany() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                const sql = `SELECT id , name , price ,category FROM products`;
                // run query 
                const data = yield connection.query(sql);
                // release connection
                connection.release();
                // return all products
                return data.rows;
            }
            catch (error) {
                throw new Error(`Error at getting Products : ${error.message}`);
            }
        });
    }
    // get user
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                const sql = `SELECT name , price ,category FROM products where id=($1)`;
                // run query 
                const data = yield connection.query(sql, [id]);
                // release connection
                connection.release();
                // return Product with the id
                return data.rows[0];
            }
            catch (error) {
                throw new Error(`Can not find Product id ( ${id} ), ${error.message}`);
            }
        });
    }
    //update Product
    updateOne(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                const sql = `UPDATE products 
        SET name=$1 , price=$2 ,category=$3  where id=$4
        RETURNING id,name , price ,category`;
                // run query 
                const data = yield connection.query(sql, [
                    p.name, p.price, p.category, p.id
                ]);
                // release connection
                connection.release();
                // return updated Product
                return data.rows[0];
            }
            catch (error) {
                throw new Error(`Can not update Product ${p.name} , ${error.message}`);
            }
        });
    }
    // delete Product
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                const sql = `DELETE FROM products
                    where id=($1)
                    RETURNING id,name , price ,category`;
                // run query 
                const data = yield connection.query(sql, [id]);
                // release connection
                connection.release();
                // return deleting message
                return data.rows[0];
            }
            catch (error) {
                throw new Error(`Can not delete Product id ( ${id} ) , ${error.message}`);
            }
        });
    }
}
exports.default = productModel;
