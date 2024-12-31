import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        // Validate input
        if (!name || !price) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            stock,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "Product create successfully", savedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update product fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Find and delete the product
        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
