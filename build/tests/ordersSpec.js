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
const order_model_1 = __importDefault(require("../models/order_model"));
const database_1 = __importDefault(require("../database"));
const user_model_1 = __importDefault(require("../models/user_model"));
const product_model_1 = __importDefault(require("../models/product_model"));
const product_order_model_1 = __importDefault(require("../models/product_order_model"));
describe('order model', () => {
    const userModel = new user_model_1.default();
    const user = {
        email: 'testo@test.com',
        first_name: 'userFnameo',
        last_name: 'userLnameo',
        user_name: 'userNameo',
        password: 'test123o'
    };
    const productModel = new product_model_1.default();
    const product = {
        name: 'testo',
        price: '10',
        category: 'food'
    };
    const orderModel = new order_model_1.default();
    const productorderModel = new product_order_model_1.default();
    const order = {
        status: 'active'
    };
    const orderToDelete = {
        status: 'active'
    };
    const orderToAddProducts = {
        status: 'active'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield userModel.create(user);
        user.id = createUser.id;
        order.user_id = user.id;
        orderToDelete.user_id = user.id;
        orderToAddProducts.user_id = user.id;
        const createProduct = yield productModel.create(product);
        product.id = createProduct.id;
        const createOrder = yield orderModel.create(order.user_id);
        order.id = createOrder.id;
        const createOrderToDeleteTest = yield orderModel.create(orderToDelete.user_id);
        orderToDelete.id = createOrderToDeleteTest.id;
        const createOrderToproductsTest = yield orderModel.create(orderToAddProducts.user_id);
        orderToAddProducts.id = createOrderToproductsTest.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const deleteTestDataInproductOrdersTable = 'DELETE FROM order_products;';
        const deleteTestDataInOrderTable = 'DELETE FROM orders;';
        const deleteTestDataInUsersTable = 'DELETE FROM users;';
        const deleteTestDataInProductsTable = 'DELETE FROM Products;';
        yield connection.query(deleteTestDataInproductOrdersTable);
        yield connection.query(deleteTestDataInOrderTable);
        yield connection.query(deleteTestDataInUsersTable);
        yield connection.query(deleteTestDataInProductsTable);
        connection.release();
    }));
    describe('Test methods exists', () => {
        it('Should Successfully Pass Test if createOrder method exists', () => {
            expect(orderModel.create).toBeDefined();
        });
        it('Should Successfully Pass Test if getAllOrders method exists', () => {
            expect(orderModel.getMany).toBeDefined();
        });
        it('Should Successfully Pass Test if getActiveOrders method exists', () => {
            expect(orderModel.getActiveOrders).toBeDefined();
        });
        it('Should Successfully Pass Test if getCompleteOrders method exists', () => {
            expect(orderModel.getCompleteOrders).toBeDefined();
        });
        it('Should Successfully Pass Test if orderCompleted method exists', () => {
            expect(orderModel.orderCompleted).toBeDefined();
        });
        it('Should Successfully Pass Test if cancelOrder method exists', () => {
            expect(orderModel.deleteOne).toBeDefined();
        });
        it('Should Successfully Pass Test if getAllProductsForOrder method exists', () => {
            expect(productorderModel.getAllProductsForOrder).toBeDefined();
        });
        it('Should Successfully Pass Test if addProductToOrder method exists', () => {
            expect(productorderModel.addProductToOrder).toBeDefined();
        });
        it('Should Successfully Pass Test if deleteProductFromOrder method exists', () => {
            expect(productorderModel.deleteProductFromOrder).toBeDefined();
        });
        it('Should Successfully Pass Test if updateProductQuantityInOrder method exists', () => {
            expect(productorderModel.updateProductQuantityInOrder).toBeDefined();
        });
    });
    describe('test order model process', () => {
        it('Should Successfully Pass Test return a new order', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdorder = yield orderModel.create(user.id);
            expect(createdorder).toEqual({
                id: createdorder.id,
                user_id: user.id,
                status: 'active'
            });
        }));
        it('Should Successfully Pass Test and return all available orders in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield orderModel.getMany();
            expect(orders.length).toBe(4);
        }));
        it('Should Successfully Pass Test and return active orders when called with ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const activeOrder = yield orderModel.getActiveOrders(user.id);
            expect(activeOrder.length).toBe(4);
        }));
        it('Should Successfully Pass Test and create complete order', () => __awaiter(void 0, void 0, void 0, function* () {
            const completeOrder = yield orderModel.orderCompleted(user.id, order.id);
            expect(completeOrder).toEqual({
                id: completeOrder.id,
                user_id: user.id,
                status: 'complete'
            });
        }));
        it('Should Successfully Pass Test and return complete orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const completeOrders = yield orderModel.getCompleteOrders(user.id);
            expect(completeOrders.length).toBe(1);
        }));
        it('Should Successfully Pass Test and return cancel Order', () => __awaiter(void 0, void 0, void 0, function* () {
            const cancelOrder = yield orderModel.deleteOne(user.id, orderToDelete.id);
            expect(cancelOrder).toEqual({
                id: cancelOrder.id,
                user_id: user.id,
                status: 'active'
            });
        }));
        it('Should Successfully Pass Test and return product added to order', () => __awaiter(void 0, void 0, void 0, function* () {
            const addProductToOrder = yield productorderModel.addProductToOrder(orderToAddProducts.id, product.id, 10);
            expect(addProductToOrder).toEqual({
                id: addProductToOrder.id,
                order_id: orderToAddProducts.id,
                quantity: 10,
                product_id: product.id
            });
        }));
        it('Should Successfully Pass Test and return all products added to order', () => __awaiter(void 0, void 0, void 0, function* () {
            const getAllProductsForOrder = yield productorderModel.getAllProductsForOrder(orderToAddProducts.id);
            expect(getAllProductsForOrder.length).toBe(1);
        }));
        it('Should Successfully Pass Test and return updated quantity of products added to order', () => __awaiter(void 0, void 0, void 0, function* () {
            const updateProductQuantityInOrder = yield productorderModel.updateProductQuantityInOrder(orderToAddProducts.id, product.id, 15);
            expect(updateProductQuantityInOrder).toEqual({
                id: updateProductQuantityInOrder.id,
                order_id: orderToAddProducts.id,
                quantity: 15,
                product_id: product.id
            });
        }));
        it('Should Successfully Pass Test and return deleted products from order', () => __awaiter(void 0, void 0, void 0, function* () {
            const deleteProductFromOrder = yield productorderModel.deleteProductFromOrder(orderToAddProducts.id, product.id);
            expect(deleteProductFromOrder).toEqual({
                id: deleteProductFromOrder.id,
                order_id: orderToAddProducts.id,
                quantity: 15,
                product_id: product.id
            });
        }));
    });
});
