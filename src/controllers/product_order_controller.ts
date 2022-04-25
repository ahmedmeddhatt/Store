import { Request ,Response, NextFunction } from "express";
import productOrderModel from "../models/product_order_model";


const productOrder = new productOrderModel()

//    get all products for productOrder
 const getAllProductsForproductOrder = async (req: Request, res: Response) => {
    try {
      const allProducts = await productOrder.getAllProductsForOrder(
        req.params.order_id as unknown as string
      );
      if (allProducts.length === 0) {
        res.json({
          message: 'No products found',
          data: allProducts
        });
      } else {
        res.json({
          Results : allProducts.length ,
          message: 'All Products retrieved successfully',
          data: allProducts
        });
        // console.table(allProducts);
      }
    } catch (error) {
      throw error;
    }
  };
  
  //    add product to productOrder
   const addProductToOrder = async (req: Request, res: Response) => {
    try {
      const addedProduct = await productOrder.addProductToOrder(
        req.params.order_id as unknown as string,
        req.body.product_id as unknown as string,
        req.body.quantity as unknown as number
      );
      res.json({
        message: 'Product Successfully Added to Order',
        data: addedProduct
      });
      // console.table(addedProduct);
    } catch (error) {
      throw error;
    }
  };


//    update product quantity in order
const updateProductQuantityInOrder = async (
    req: Request,
    res: Response
    ) => {
    try {
        const updatedProduct = await productOrder.updateProductQuantityInOrder(
        req.params.order_id as unknown as string,
        req.body.product_id as unknown as string,
        req.body.quantity as unknown as number
        );
        res.json({
        message: 'Product Quantity Successfully Updated in Order',
        data: updatedProduct
        });
        // console.table(updatedProduct);
    } catch (error) {
        throw error;
    }

    }
    

  //    delete product from productOrder
   const deleteProductFromOrder = async (req: Request, res: Response) => {
    try {
      const deletedProduct = await productOrder.deleteProductFromOrder(
        req.params.order_id as unknown as string,
        req.body.product_id as unknown as string
      );
      res.json({
        message: 'Product Successfully Deleted from Order',
        data: deletedProduct
      });
      // console.table(deletedProduct);
    } catch (error) {
      throw error;
    }
  };
  



  export default {
      getAllProductsForproductOrder ,
      addProductToOrder ,
      updateProductQuantityInOrder ,
      deleteProductFromOrder
  }
