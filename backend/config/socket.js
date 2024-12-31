import { Server } from 'socket.io';

const userSubscriptions = {};

const createServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Replace with your frontend URL in production
            methods: ["GET", "POST"]
        },
    });

    io.on('connection', (socket) => {
        console.log("A user connected:", socket.id);

        // Listen for when a user subscribes to a product
        socket.on('subscribe', (productId, userId) => {
            console.log(`User ${userId} subscribed to product ${productId}`);

            if (!userSubscriptions[userId]) {
                userSubscriptions[userId] = new Set();
            }
            userSubscriptions[userId].add(productId);

            // Join the user to a personal room
            socket.join(userId);
        }); -

            // Listen for when a user unsubscribes from a product
            socket.on('unsubscribe', (productId, userId) => {
                if (userSubscriptions[userId]) {
                    userSubscriptions[userId].delete(productId);
                    console.log(`User ${userId} unsubscribed from product ${productId}`);
                }
            });

        socket.on('subscribedToNewProducts', (userId) => {
            console.log(`User ${userId} subscribed to notifications about new products.`);
            if (!userSubscriptions[userId]) {
                userSubscriptions[userId] = new Set();
            }
            userSubscriptions[userId].add('newProducts');
            socket.join(userId);
        });

        // Unsubscribe from updates about new products
        socket.on('unsubscribeFromNewProducts', (userId) => {
            if (userSubscriptions[userId]) {
                userSubscriptions[userId].delete('newProducts');
                console.log(`User ${userId} unsubscribed from notifications about new products.`);
            }
        });

        // When a product is added, you need to notify users subscribed to new products
        socket.on('productAdded', (product) => {
            console.log("New product added:", product);

            // Notify users subscribed to new products
            Object.keys(userSubscriptions).forEach((userId) => {
                if (userSubscriptions[userId].has('newProducts')) {
                    io.to(userId).emit('productNotification',
                        `New product added: ${product.name}`);
                }
            });

            // Also notify users subscribed to this specific product
            Object.keys(userSubscriptions).forEach((userId) => {
                if (userSubscriptions[userId].has(product._id)) {
                    io.to(userId).emit('productNotification',
                        `Product you're following "${product.name}" has been added`);
                }
            });
        });
        socket.on('productUpdated', (updatedProduct) => {
            console.log("Product updated:", updatedProduct);

            // Notify users subscribed to this specific product
            Object.keys(userSubscriptions).forEach((userId) => {
                if (userSubscriptions[userId].has(updatedProduct._id)) {
                    io.to(userId).emit('productNotification',
                        `Product "${updatedProduct.name}" has been updated with new details.`);
                }
            });
        });
        // Handle when a product is deleted
        socket.on('productDeleted', (productId, productName) => {
            const message = `'${productName}' product has been removed from our catalog.`;
            console.log(message);

            Object.keys(userSubscriptions).forEach((userId) => {
                if (userSubscriptions[userId].has(productId)) {
                    // Send notification to the user
                    io.to(userId).emit('productNotification', message);
                }
            });
        });

        // Handle socket disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);

            // Clean up user subscriptions (optional)
            Object.keys(userSubscriptions).forEach((userId) => {
                if (userSubscriptions[userId].has(socket.id)) {
                    userSubscriptions[userId].delete(socket.id);
                }
            });
        });
    });

    console.log('Socket.io server initialized');
};

export default createServer;
