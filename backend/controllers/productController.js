import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const image = req.file ? req.file.path : null;

        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            image,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "Product created successfully", savedProduct });
    } catch (error) {
        console.error(error);
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

        const image = req.file ? req.file.path : product.image;

        // Update product fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.image = image;

        // Save the updated product
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
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
