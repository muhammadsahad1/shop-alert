import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import { protect, isAdmin } from '../middleware/middlware.js';


const productRouter = express.Router();

productRouter.post('/', protect, isAdmin, createProduct);

productRouter.get('/', getProducts);

productRouter.put('/update/:id', protect, isAdmin, updateProduct);

productRouter.delete('/:id', protect, isAdmin, deleteProduct);

export default productRouter;
