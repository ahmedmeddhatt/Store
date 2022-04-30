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
const productModel = new product_model_1.default();
const baseProduct = {
    name: 'Farawla',
    price: 50,
    category: 'food'
};
let product;
let allProducts;
describe('Testing Model prroducts', () => {
    it('Must have a create method', () => {
        expect(productModel.create).toBeDefined();
    });
    it('Testing the create method', () => __awaiter(void 0, void 0, void 0, function* () {
        product = yield productModel.create(baseProduct);
        expect({
            name: product.name,
            price: product.price,
        }).toEqual({
            name: baseProduct.name,
            price: baseProduct.price,
        });
    }));
    it('Must have a getMany method', () => {
        expect(productModel.getMany).toBeDefined();
    });
    it('Testing the getMany method', () => __awaiter(void 0, void 0, void 0, function* () {
        allProducts = yield productModel.getMany();
        expect({
            price: allProducts.pop().price,
        }).toEqual({
            price: baseProduct.price,
        });
    }));
    it('Must have a getOne method', () => {
        expect(productModel.getOne).toBeDefined();
    });
    it('Testing the getOne method', () => __awaiter(void 0, void 0, void 0, function* () {
        const currentproduct = yield productModel.getOne(String(product.id));
        expect({
            price: currentproduct.price,
        }).toEqual({
            price: baseProduct.price,
        });
    }));
    it('Must have a update method', () => {
        expect(productModel.updateOne).toBeDefined();
    });
    //   it('Testing the update method', async () => {
    //     const updatedproduct = await productModel.updateOne({
    //       id: product.id,
    //       price: 234,
    //     });
    //     expect({
    //       price: updatedproduct.price,
    //     }).toEqual({
    //       price: 234,
    //     });
    //   });
    it('Must have a delete method', () => {
        expect(productModel.deleteOne).toBeDefined();
    });
    it('Testing the delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedproduct = yield productModel.deleteOne(String(product.id));
        expect({
            price: deletedproduct.name
        }).toEqual({
            price: product.name
        });
    }));
});
