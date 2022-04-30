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
class productOrderModel {
    //   get all products for order
    getAllProductsForOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect with data base and create query
                const connection = yield database_1.default.connect();
                const getProductsForOrder = yield connection.query('SELECT * FROM order_products WHERE order_id = $1', [order_id]);
                connection.release();
                // return all products for order
                return getProductsForOrder.rows;
            }
            catch (error) {
                throw `Unable to get all products for order ${order_id} according to ${error}`;
            }
        });
    }
    //    add product to order
    addProductToOrder(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect with data base and create query
                const connection = yield database_1.default.connect();
                const addProductToOrder = yield connection.query('INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [order_id, product_id, quantity]);
                // release connection
                connection.release();
                // return added product to order
                return addProductToOrder.rows[0];
            }
            catch (error) {
                throw `Unable to add product to order ${order_id} according to ${error}`;
            }
        });
    }
    //    delete product from order
    deleteProductFromOrder(order_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect with data base and create query
                const connection = yield database_1.default.connect();
                const deleteProductFromOrder = yield connection.query('DELETE FROM order_products WHERE order_id = $1 AND product_id = $2 RETURNING *', [order_id, product_id]);
                // release connection
                connection.release();
                // return removed product from order
                return deleteProductFromOrder.rows[0];
            }
            catch (error) {
                throw `Unable to remove product from order ${order_id} according to ${error}`;
            }
        });
    }
    //    update product quantity in order
    updateProductQuantityInOrder(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect with data base and create query
                const connection = yield database_1.default.connect();
                const updateProductQuantityInOrder = yield connection.query('UPDATE order_products SET quantity = $1 WHERE order_id = $2 AND product_id = $3 RETURNING *', [quantity, order_id, product_id]);
                // release connection
                connection.release();
                // return updated product quantity in order
                return updateProductQuantityInOrder.rows[0];
            }
            catch (error) {
                throw `Unable to update product quantity in order ${order_id} according to ${error}`;
            }
        });
    }
}
exports.default = productOrderModel;
