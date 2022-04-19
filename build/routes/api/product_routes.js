"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controler_1 = __importDefault(require("../../controllers/product_controler"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth_middleware"));
const routes = (0, express_1.Router)();
//adding route 
// api/users
routes.route('/')
    .get(product_controler_1.default.getMany)
    .post(auth_middleware_1.default, product_controler_1.default.Create);
// api/users/id
routes.route('/:id')
    .get(product_controler_1.default.getOne)
    .put(auth_middleware_1.default, product_controler_1.default.updateOne)
    .delete(auth_middleware_1.default, product_controler_1.default.deleteOne);
exports.default = routes;
