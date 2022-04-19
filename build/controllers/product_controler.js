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
const product_model_1 = __importDefault(require("../models/product_model"));
const product = new product_model_1.default();
// GET ALL
const getMany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product.getMany();
        res.status(200).json({ Results: data.length, status: 'success', data,
            message: `All Products Reviewed successfully` });
    }
    catch (error) {
        next(error);
    }
});
//GET ONE
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product.getOne(req.params.id); // as unknown
        res.status(200).json({ status: 'success', data, message: `Product Reviewed successfully` });
    }
    catch (error) {
        next(error);
    }
});
//CREATE
const Create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product.create(req.body);
        res.status(201).json({ status: 'success', data, message: `Product Created successfully` });
    }
    catch (error) {
        next(error);
    }
});
//UPDATE
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product.updateOne(req.body);
        res.status(201).json({ status: 'success', data, message: `Product Updated successfully` });
    }
    catch (error) {
        next(error);
    }
});
//DELETE
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product.deleteOne(req.params.id); // as unknown
        res.status(200).json({ status: 'success', message: `Product Deleted successfully` });
    }
    catch (error) {
        next(error);
    }
});
exports.default = { Create,
    getMany,
    getOne,
    updateOne,
    deleteOne
};
