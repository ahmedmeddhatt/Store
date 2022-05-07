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
const order = new order_model_1.default();
// GET ALL
const getMany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield order.getMany();
        if (data.length === 0) {
            res.json({ message: 'No orders found', data: data
            });
        }
        else {
            res.status(200).json({ Results: data.length, status: 'success', data,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// getAllActiveOrders
const getAllActiveOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activeOrders = yield order.getActiveOrders(req.params.user_id);
        if (activeOrders.length === 0) {
            res.json({ message: 'No Active Orders', data: activeOrders
            });
        }
        else {
            res.json({ Results: activeOrders.length,
                message: 'Active Orders retrieved successfully', data: activeOrders
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// getAllCompleteOrders
const getAllCompleteOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completeOrders = yield order.getCompleteOrders(req.params.user_id);
        if (completeOrders.length === 0) {
            res.json({ message: 'No Complete Orders', data: completeOrders
            });
        }
        else {
            res.json({ Results: completeOrders.length, data: completeOrders });
        }
    }
    catch (error) {
        throw error;
    }
});
//CREATE
const Create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield order.create(req.params.user_id);
        res.status(201).json({ status: 'success', data, message: `Order Created successfully` });
    }
    catch (error) {
        next(error);
    }
});
//UPDATE
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield order.orderCompleted(req.params.user_id, req.body.id);
        res.status(201).json({ status: 'success', data, message: `Order Updated successfully` });
    }
    catch (error) {
        next(error);
    }
});
//DELETE
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order.deleteOne(req.params.user_id, req.body.id); // as unknown
        res.status(200).json({ status: 'success', message: `Order Deleted successfully` });
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    Create,
    getMany,
    deleteOne,
    getAllActiveOrders,
    getAllCompleteOrders,
    updateOne,
};
