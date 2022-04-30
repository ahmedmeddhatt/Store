import Order from '../types/order_type'
import OrderModel from '../models/order_model';
import db from '../database';

import ProductOrdersType from '../types/Product_orders_type';
import UserType from '../types/user_type';
import UserModel from '../models/user_model';
import ProductType from '../types/product_type';
import ProductModel from '../models/product_model';
import ProductorderModel from '../models/product_order_model';

describe('order model', () => {
  const userModel = new UserModel();
  const user = {
    email: 'testo@test.com',
    first_name: 'userFnameo',
    last_name: 'userLnameo',
    user_name: 'userNameo',
    password: 'test123o'
  } as UserType;

  const productModel = new ProductModel();
  const product = {
    name: 'testo',
    price: 10 ,
    category :'food'
  } as ProductType;

  const orderModel = new OrderModel();
  const productorderModel = new ProductorderModel();

  const order = {
    status: 'active'
  } as Order;

  const orderToDelete = {
    status: 'active'
  } as Order;

  const orderToAddProducts = {
    status: 'active'
  } as Order;

  beforeAll(async () => {
    const createUser = await userModel.create(user);
    user.id = createUser.id;
    order.user_id = user.id as unknown as string;
    orderToDelete.user_id = user.id as unknown as string;
    orderToAddProducts.user_id = user.id as unknown as string;

    const createProduct = await productModel.create(product);
    product.id = createProduct.id;

    const createOrder = await orderModel.create(order.user_id);
    order.id = createOrder.id;

    const createOrderToDeleteTest = await orderModel.create(
      orderToDelete.user_id
    );
    orderToDelete.id = createOrderToDeleteTest.id;

    const createOrderToproductsTest = await orderModel.create(
      orderToAddProducts.user_id
    );
    orderToAddProducts.id = createOrderToproductsTest.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const deleteTestDataInproductOrdersTable = 'DELETE FROM order_products;';
    const deleteTestDataInOrderTable = 'DELETE FROM orders;';
    const deleteTestDataInUsersTable = 'DELETE FROM users;';
    const deleteTestDataInProductsTable = 'DELETE FROM Products;';
    await connection.query(deleteTestDataInproductOrdersTable);
    await connection.query(deleteTestDataInOrderTable);
    await connection.query(deleteTestDataInUsersTable);
    await connection.query(deleteTestDataInProductsTable);
    connection.release();
  });

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
    it('Should Successfully Pass Test return a new order', async () => {
      const createdorder = await orderModel.create(
        user.id as unknown as string
      );
      expect(createdorder).toEqual({
        id: createdorder.id,
        user_id: user.id,
        status: 'active'
      } as Order);
    });

    it('Should Successfully Pass Test and return all available orders in DB', async () => {
      const orders = await orderModel.getMany();
      expect(orders.length).toBe(4);
    });

    it('Should Successfully Pass Test and return active orders when called with ID', async () => {
      const activeOrder = await orderModel.getActiveOrders(
        user.id as unknown as string
      );
      expect(activeOrder.length).toBe(4);
    });

    it('Should Successfully Pass Test and create complete order', async () => {
      const completeOrder = await orderModel.orderCompleted(
        user.id as unknown as string,
        order.id as unknown as string
      );
      expect(completeOrder).toEqual({
        id: completeOrder.id,
        user_id: user.id,
        status: 'complete'
      } as Order);
    });

    it('Should Successfully Pass Test and return complete orders', async () => {
      const completeOrders = await orderModel.getCompleteOrders(
        user.id as unknown as string
      );
      expect(completeOrders.length).toBe(1);
    });

    it('Should Successfully Pass Test and return cancel Order', async () => {
      const cancelOrder = await orderModel.deleteOne(
        user.id as unknown as string,
        orderToDelete.id as unknown as string
      );
      expect(cancelOrder).toEqual({
        id: cancelOrder.id,
        user_id: user.id,
        status: 'active'
      } as Order);
    });

    it('Should Successfully Pass Test and return product added to order', async () => {
      const addProductToOrder = await productorderModel.addProductToOrder(
        orderToAddProducts.id as unknown as string,
        product.id as unknown as string,
        10
      );
      expect(addProductToOrder).toEqual({
        id: addProductToOrder.id,
        order_id: orderToAddProducts.id,
        quantity: 10,
        product_id: product.id
      } as ProductOrdersType);
    });

    it('Should Successfully Pass Test and return all products added to order', async () => {
      const getAllProductsForOrder = await productorderModel.getAllProductsForOrder(
        orderToAddProducts.id as unknown as string
      );
      expect(getAllProductsForOrder.length).toBe(1);
    });

    it('Should Successfully Pass Test and return updated quantity of products added to order', async () => {
      const updateProductQuantityInOrder =
        await productorderModel.updateProductQuantityInOrder(
          orderToAddProducts.id as unknown as string,
          product.id as unknown as string,
          15
        );
      expect(updateProductQuantityInOrder).toEqual({
        id: updateProductQuantityInOrder.id,
        order_id: orderToAddProducts.id,
        quantity: 15,
        product_id: product.id
      } as ProductOrdersType);
    });

    it('Should Successfully Pass Test and return deleted products from order', async () => {
      const deleteProductFromOrder = await productorderModel.deleteProductFromOrder(
        orderToAddProducts.id as unknown as string,
        product.id as unknown as string
      );
      expect(deleteProductFromOrder).toEqual({
        id: deleteProductFromOrder.id,
        order_id: orderToAddProducts.id,
        quantity: 15,
        product_id: product.id
      } as ProductOrdersType);
    });
  });
});
