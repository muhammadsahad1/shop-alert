import React, { useState } from 'react';
import { createProduct } from '../API/product'; // Assuming this is the correct import
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { useSocket } from '../context/SocketContext';


const AddProduct = ({ onProductAdded }) => {

    const { addProduct } = useSocket()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!productData.name || !productData.description || !productData.price || !productData.stock) {
            setError("All fields are required.");
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const result = await createProduct(productData);
            if (result.message === "Product create successfully") {
                toast.success(result.message)
                addProduct(result.savedProduct); 
                setProductData({
                    name: '',
                    description: '',
                    price: '',
                    stock: '',
                });
                setIsModalOpen(false);
                if (onProductAdded) {
                    onProductAdded();
                }
            }
        } catch (error) {
            setError(error.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div className='flex justify-center items-center mt-12'>
                <button
                    onClick={toggleModal}
                    className="flex font-semibold p-2 rounded text-blue-600 bg-blue-50 hover:bg-blue-100' transition duration-300"
                >
                    Add Product
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-50"
                    onClick={toggleModal}
                >
                    <div
                        className="bg-white p-6 rounded-xl w-[28rem] shadow-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={toggleModal}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-medium mb-6">Add Product</h2>

                        {error && <div className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded">{error}</div>}
                        {success && <div className="text-green-500 text-sm mb-4 bg-green-50 p-3 rounded">{success}</div>}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm text-gray-600 mb-1.5">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleChange}
                                    className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
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
                                    value={productData.description}
                                    onChange={handleChange}
                                    className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
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
                                        value={productData.price}
                                        onChange={handleChange}
                                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
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
                                        value={productData.stock}
                                        onChange={handleChange}
                                        className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors
                                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-zinc-900 hover:bg-zinc-800'}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Creating...' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
