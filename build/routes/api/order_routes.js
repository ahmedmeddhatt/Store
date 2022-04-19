"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../../controllers/order_controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth_middleware"));
const routes = (0, express_1.Router)();
//adding route 
// api/users
routes.route('/:user_id')
    .get(auth_middleware_1.default, order_controller_1.default.getMany)
    .get(auth_middleware_1.default, order_controller_1.default.getAllActiveOrders)
    .get(auth_middleware_1.default, order_controller_1.default.getAllCompleteOrders)
    .post(auth_middleware_1.default, order_controller_1.default.Create)
    .put(auth_middleware_1.default, order_controller_1.default.updateOne)
    .delete(auth_middleware_1.default, order_controller_1.default.deleteOne);
// api/users/id
exports.default = routes;
