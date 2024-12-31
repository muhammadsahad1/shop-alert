import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import Product from "../models/Product.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            name,
            email,
            password, // Password will be hashed automatically in the model's pre-save hook
            isAdmin: false,
        });

        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 3600000),
        });
        console.log("token =>", token);


        res.json({
            message: 'Logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

//subscribing theh product 
export const subscribe = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        if (user.subscribedProducts.includes(productId.toString())) {
            user.subscribedProducts = user.subscribedProducts.filter((pro) => pro.toString() !== productId.toString());
            await user.save();
            return res.status(200).json({ message: "Unsubscribed successfully", subscribedProducts: user.subscribedProducts });
        }

        user.subscribedProducts.push(productId);
        await user.save();

        return res.status(200).json({ message: "Subscribed successfully", subscribedProducts: user.subscribedProducts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const subscribedToNewProducts = async (req, res) => {
    const { subscribe } = req.body;
    const userId = req.user._id

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.subscribedToNewProducts = subscribe;
        await user.save();

        res.status(200).json({
            message: subscribe
                ? 'Subscribed to new product updates successfully.'
                : 'Unsubscribed from new product updates successfully.',
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update subscription.', error });
    }
};


export const getSubscribed = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('subscribedProducts subscribedToNewProducts');
        const subscribedProducts = user?.subscribedProducts || [];
        const isSubscribedToNewProducts = user?.subscribedToNewProducts || false;

        res.status(200).json({ subscribedProducts, isSubscribedToNewProducts });
    } catch (error) {
        console.error("Error fetching subscribed products:", error);
        res.status(500).json({ error: "An error occurred while fetching subscriptions" });
    }
};