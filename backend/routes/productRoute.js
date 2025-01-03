import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import { protect, isAdmin } from '../middleware/middlware.js';
import cloudinaryUploadMiddleware from '../middleware/uploadRoute.js';


const productRouter = express.Router();

productRouter.post('/', protect, isAdmin, cloudinaryUploadMiddleware, createProduct);

productRouter.get('/', getProducts);

productRouter.put('/update/:id', protect, isAdmin, cloudinaryUploadMiddleware, updateProduct);

productRouter.delete('/:id', protect, isAdmin, deleteProduct);

export default productRouter;
