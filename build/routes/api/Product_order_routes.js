"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../../controllers/order_controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth_middleware"));
const routes = (0, express_1.Router)();
routes.route('/:user_id/:order_id')
    .get(auth_middleware_1.default, order_controller_1.default.getAllProductsForOrder)
    .post(auth_middleware_1.default, order_controller_1.default.addProductToOrder)
    .put(auth_middleware_1.default, order_controller_1.default.updateProductQuantityInOrder)
    .delete(auth_middleware_1.default, order_controller_1.default.deleteProductFromOrder);
exports.default = routes;
