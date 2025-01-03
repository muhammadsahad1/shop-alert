import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import AddProduct from './AddProduct';
import {
    getProducts, getSubscribed, subscribedToNewProductsAPI, subscribeProduct, unsubscribeFromNewProductsAPI, updateProduct
} from '../API/product';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useSocket } from '../context/SocketContext';
import NewProductsUpdatesBtn from './NewProductsUpdatesBtn';
import Bar from './Bar';
import { X } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [subscribedProducts, setSubscribedProducts] = useState(new Set());
    const [isSubscribedToNewProducts, setIsSubscribedToNewProducts] = useState(false)
    const role = useSelector((state) => state.user.userRole);
    const { socket, subscribeToProduct, unsubscribeFromProduct, subscribeToNewProducts, unsubscribeFromNewProducts } = useSocket();

    useEffect(() => {
        fetchProducts();
        fetchSubscribedProducts();

        // Listen for real-time notifications (uncomment if needed)
        // socket.on('productNotification', ({ productId, message }) => {
        //     if (subscribedProducts.has(productId)) {
        //         toast.success(message);
        //     }
        // });

        // return () => {
        //     socket.off('productNotification');
        // };
    }, [socket]);

    const fetchProducts = async () => {
        try {
            const result = await getProducts();
            setProducts(result);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchSubscribedProducts = async () => {
        try {
            const result = await getSubscribed();
            setSubscribedProducts(new Set(result.subscribedProducts || []));
            setIsSubscribedToNewProducts(result.isSubscribedToNewProducts || false);
        } catch (err) {
            toast.error("Failed to fetch subscribed products");
        }
    };

    const handleSubscribe = async (productId) => {
        try {
            if (subscribedProducts.has(productId)) {
                // First emit the socket event
                unsubscribeFromProduct(productId);
                // Then update the database
                setSubscribedProducts((prev) => {
                    const updated = new Set(prev);
                    updated.delete(productId);
                    return updated;
                });
                await subscribeProduct(productId);

                toast.success('Unsubscribed successfully');
            } else {

                subscribeToProduct(productId);
                setSubscribedProducts((prev) => new Set(prev).add(productId));
                await subscribeProduct(productId);
                toast.success('Subscribed successfully');
            }
        } catch (error) {
            toast.error('Failed to update subscription');
        }
    };

    const handleUpdateClick = (product) => {
        setCurrentProduct(product);
        setModalOpen(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!currentProduct.name || !currentProduct.price || !currentProduct.stock) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            const updatedProduct = await updateProduct(currentProduct._id, currentProduct);
            console.log(updateProduct);

            socket.emit('productUpdated', updatedProduct);
            toast.success('Product updated successfully');
            setModalOpen(false);
            fetchProducts();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNewProductSubscribe = async () => {
        try {
            subscribeToNewProducts();
            await subscribedToNewProductsAPI();
            // toast.success('Subscribed to new product updates successfully!');
        } catch (err) {
            toast.error(err.message || 'Failed to subscribe to new product updates.');
        }
    };

    const handleNewProductUnSubscribe = async () => {
        try {
            unsubscribeFromNewProducts();
            await unsubscribeFromNewProductsAPI();
            // toast.success('Unsubscribed from new product updates successfully!');
        } catch (err) {
            toast.error(err.message || 'Failed to unsubscribe from new product updates.');
        }
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {role === "Admin" ? (
                <AddProduct onProductAdded={fetchProducts} />
            ) : (
                <NewProductsUpdatesBtn
                    subscribeToNewProducts={handleNewProductSubscribe}
                    unsubscribeFromNewProducts={handleNewProductUnSubscribe}
                    isSubscribed={isSubscribedToNewProducts}
                />
            )}
            <Bar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
                {products.length === 0 ? (
                    <div>No products available</div>
                ) : (
                    <>

                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onSubscribe={handleSubscribe}
                                isSubscribed={subscribedProducts.has(product._id)}
                                isAdmin={role === "Admin"}
                                onUpdate={() => handleUpdateClick(product)}
                            />
                        ))}
                    </>
                )}
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-50"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-white p-6 rounded-xl w-[28rem] shadow-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-medium mb-6">Update Product</h2>

                        <form onSubmit={handleUpdateSubmit} className="space-y-5">
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 mb-1.5">
                                    Product Image
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 border rounded-lg overflow-hidden bg-gray-50">
                                        <img
                                            src={currentProduct?.image || "/api/placeholder/96/96"}
                                            alt="Product preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleInputChange}
                                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm text-gray-600 mb-1.5">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={currentProduct?.name || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 text-sm border border-gray-200 rounded-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm text-gray-600 mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={currentProduct?.description || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 text-sm border border-gray-200 rounded-lg"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="price" className="block text-sm text-gray-600 mb-1.5">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={currentProduct?.price || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="stock" className="block text-sm text-gray-600 mb-1.5">
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        value={currentProduct?.stock || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg"
                                >
                                    Update Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
