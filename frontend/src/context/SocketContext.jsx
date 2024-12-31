import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const socket = io('http://localhost:3000', {
    transports: ['websocket'],
});

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const user_id = useSelector((state) => state.user.id);

    useEffect(() => {
        // Reconnect socket if disconnected
        if (!socket.connected) {
            socket.connect();
        }

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            toast.error('Connection error. Trying to reconnect...');
        });

        // socket.on('productNotification', (message) => {
        //     console.log('Received notification:', message);
        //     toast.success(message, {
        //         duration: 4000,
        //         position: 'top-right'
        //     });
        //     setNotifications((prev) => [...prev, message]);
        // });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('productNotification');
            socket.off('disconnect');
        };
    }, []);

    const subscribeToProduct = (productId) => {
        console.log('Subscribing to product:', productId);
        socket.emit('subscribe', productId, user_id);
    };

    const unsubscribeFromProduct = (productId) => {
        console.log('Unsubscribing from product:', productId);
        socket.emit('unsubscribe', productId, user_id);
    };

    const productUpdated = (productId, updateField, newValue, productName) => {
        socket.emit('productUpdated', productId, updateField, newValue, productName)
    }

    const subscribeToNewProducts = () => {
        console.log('Subscribing to notifications about new products');
        socket.emit('subscribedToNewProducts', user_id);
    };

    const unsubscribeFromNewProducts = () => {
        console.log('Unsubscribing from notifications about new products');
        socket.emit('unsubscribeFromNewProducts', user_id);
    };

    const addProduct = (product) => {
        console.log('Adding product:', product);
        socket.emit('productAdded', product);
    };


    return (
        <SocketContext.Provider value={{ socket, notifications, addProduct, subscribeToProduct, unsubscribeFromProduct, productUpdated, subscribeToNewProducts, unsubscribeFromNewProducts }}>
            {children}
        </SocketContext.Provider>
    );
};
