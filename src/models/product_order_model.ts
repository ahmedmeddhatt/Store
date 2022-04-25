import db from '../database'
import ProductOrdersType from '../types/Product_orders_type'


class productOrderModel {
//   get all products for order
async getAllProductsForOrder(order_id: string): Promise<ProductOrdersType[]> {
    try {
      // connect with data base and create query
      const connection = await db.connect();
      const getProductsForOrder = await connection.query(
        'SELECT * FROM order_products WHERE order_id = $1',
        [order_id]
      );
      connection.release();
      // return all products for order
      return getProductsForOrder.rows;
    } catch (error) {
      throw `Unable to get all products for order ${order_id} according to ${error}`;
    }
  }

  //    add product to order
  async addProductToOrder(
    order_id: string,
    product_id: string,
    quantity: number
  ): Promise<ProductOrdersType> {
    try {
      // connect with data base and create query
      const connection = await db.connect();
      const addProductToOrder = await connection.query(
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [order_id, product_id, quantity]
      );
      // release connection
      connection.release();
      // return added product to order
      return addProductToOrder.rows[0];
    } catch (error) {
      throw `Unable to add product to order ${order_id} according to ${error}`;
    }
  }

  //    delete product from order
  async deleteProductFromOrder(
    order_id: string,
    product_id: string
  ): Promise<ProductOrdersType> {
    try {
      // connect with data base and create query
      const connection = await db.connect();
      const deleteProductFromOrder = await connection.query(
        'DELETE FROM order_products WHERE order_id = $1 AND product_id = $2 RETURNING *',
        [order_id, product_id]
      );
      // release connection
      connection.release();
      // return removed product from order
      return deleteProductFromOrder.rows[0];
    } catch (error) {
      throw `Unable to remove product from order ${order_id} according to ${error}`;
    }
  }

  //    update product quantity in order
  async updateProductQuantityInOrder(
    order_id: string,
    product_id: string,
    quantity: number
  ): Promise<ProductOrdersType> {
    try {
      // connect with data base and create query
      const connection = await db.connect();
      const updateProductQuantityInOrder = await connection.query(
        'UPDATE order_products SET quantity = $1 WHERE order_id = $2 AND product_id = $3 RETURNING *',
        [quantity, order_id, product_id]
      );
      // release connection
      connection.release();
      // return updated product quantity in order
      return updateProductQuantityInOrder.rows[0];
    } catch (error) {
      throw `Unable to update product quantity in order ${order_id} according to ${error}`;
    }
  }
}

export default productOrderModel