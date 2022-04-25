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
class orderModel {
    // create
    create(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                // run query 
                const data = yield connection.query('INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *', [user_id, 'active']);
                // release connection
                connection.release();
                // return created order
                return data.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to create (${user_id}) : ${error.message}`);
            }
        });
    }
    // get all orders
    getMany() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                // run query 
                const data = yield connection.query('SELECT * FROM orders');
                // release connection
                connection.release();
                // return all orders
                return data.rows;
            }
            catch (error) {
                throw new Error(`Error at getting Orders : ${error.message}`);
            }
        });
    }
    //    get all active orders for user (user cart)
    getActiveOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect with data base and create query
                const connection = yield database_1.default.connect();
                const getActiveOrders = yield connection.query('SELECT * FROM orders WHERE user_id = $1 AND status = $2', [user_id, 'active']);
                connection.release();
                // return active orders
                return getActiveOrders.rows;
            }
            catch (error) {
                throw `Unable to get all active orders for user ${user_id} according to ${error}`;
            }
        });
    }
    //    get all complete orders for user
    getCompleteOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect with data base and create query
                const connection = yield database_1.default.connect();
                const getActiveOrders = yield connection.query('SELECT * FROM orders WHERE user_id = $1 AND status = $2', [user_id, 'complete']);
                connection.release();
                // return complete orders
                return getActiveOrders.rows;
            }
            catch (error) {
                throw `Unable to get all complete orders for user ${user_id} according to ${error}`;
            }
        });
    }
    //    update order
    orderCompleted(user_id, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect with data base and create query
                const connection = yield database_1.default.connect();
                const updateOrder = yield connection.query('UPDATE orders SET status=$1 WHERE id=$2 AND user_id=$3 RETURNING *', ['complete', id, user_id]);
                // release connection
                connection.release();
                // return updated order
                return updateOrder.rows[0];
            }
            catch (error) {
                throw `Unable to update order ${id} according to ${error}`;
            }
        });
    }
    // delete Order
    deleteOne(user_id, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect with data base and create query
                const connection = yield database_1.default.connect();
                const deleteOrder = yield connection.query('DELETE FROM orders WHERE id=($1) AND user_id=($2) AND status=($3) RETURNING *', [id, user_id, 'active']);
                // release connection
                connection.release();
                // return deleted order
                return deleteOrder.rows[0];
            }
            catch (error) {
                throw `Unable to delete Order ${id} according to ${error}`;
            }
        });
    }
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
exports.default = orderModel;
