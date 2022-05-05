import ProductType from '../types/product_type';
import ProductsModel from '../models/product_model';
import db from '../database';


const productModel = new ProductsModel();
const baseProduct: ProductType = {
  name: 'Farawla',
  price: '50' as string,
  category:'food'
};
let product: ProductType;
let allProducts: ProductType[];

describe('Testing Model prroducts', () => {
  it('Must have a create method', () => {
    expect(productModel.create).toBeDefined();
  });

  it('Testing the create method', async () => {
    product = await productModel.create(baseProduct);
    expect({
      name: product.name,
      price: parseInt(product.price),
    }).toEqual({
      name: baseProduct.name,
      price :  parseInt(baseProduct.price) ,
    });
  });

  it('Must have a getMany method', () => {
    expect(productModel.getMany).toBeDefined();
  });

  it('Testing the getMany method', async () => {
    allProducts = await productModel.getMany();
    expect({
      price: allProducts.pop()!.price as string,
    }).toEqual({
      price: baseProduct.price,
    });
  });

  it('Must have a getOne method', () => {
    expect(productModel.getOne).toBeDefined();
  });

  it('Testing the getOne method', async () => {
    const currentproduct = await productModel.getOne(String(product.id));
    expect({
      price: currentproduct.price,
    }).toEqual({
      price: baseProduct.price,
    });
  });

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

  it('Testing the delete method', async () => {
    const deletedproduct = await productModel.deleteOne(String(product.id));
    expect({
      price: deletedproduct.name
    }).toEqual({
      price: product.name
    });
  });
});

