"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user_controller"));
const routes = (0, express_1.Router)();
//adding route 
// api/users
routes.route('/')
    .get(user_controller_1.default.getMany)
    .post(user_controller_1.default.Create);
// api/users/id
routes.route('/:id')
    .get(user_controller_1.default.getOne)
    .put(user_controller_1.default.updateOne)
    .delete(user_controller_1.default.deleteOne);
exports.default = routes;
