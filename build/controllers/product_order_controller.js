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
const product_order_model_1 = __importDefault(require("../models/product_order_model"));
const productOrder = new product_order_model_1.default();
//    get all products for productOrder
const getAllProductsForproductOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield productOrder.getAllProductsForOrder(req.params.order_id);
        if (allProducts.length === 0) {
            res.json({
                message: 'No products found',
                data: allProducts
            });
        }
        else {
            res.json({
                Results: allProducts.length,
                message: 'All Products retrieved successfully',
                data: allProducts
            });
            // console.table(allProducts);
        }
    }
    catch (error) {
        throw error;
    }
});
//    add product to productOrder
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedProduct = yield productOrder.addProductToOrder(req.params.order_id, req.body.product_id, req.body.quantity);
        res.json({
            message: 'Product Successfully Added to Order',
            data: addedProduct
        });
        // console.table(addedProduct);
    }
    catch (error) {
        throw error;
    }
});
//    update product quantity in order
const updateProductQuantityInOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield productOrder.updateProductQuantityInOrder(req.params.order_id, req.body.product_id, req.body.quantity);
        res.json({
            message: 'Product Quantity Successfully Updated in Order',
            data: updatedProduct
        });
        // console.table(updatedProduct);
    }
    catch (error) {
        throw error;
    }
});
//    delete product from productOrder
const deleteProductFromOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield productOrder.deleteProductFromOrder(req.params.order_id, req.body.product_id);
        res.json({
            message: 'Product Successfully Deleted from Order',
            data: deletedProduct
        });
        // console.table(deletedProduct);
    }
    catch (error) {
        throw error;
    }
});
exports.default = {
    getAllProductsForproductOrder,
    addProductToOrder,
    updateProductQuantityInOrder,
    deleteProductFromOrder
};
