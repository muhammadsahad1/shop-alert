import React, { useState } from 'react';
import { createProduct } from '../API/product'; // Assuming createProduct handles the API call
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { validateProduct } from '../utils/validation';

const AddProduct = ({ onProductAdded }) => {
    const { addProduct } = useSocket();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError((prev) => ({ ...prev, image: 'Please upload an image file' }));
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError((prev) => ({ ...prev, image: 'Image must be less than 5MB' }));
                return;
            }

            setProductData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
            setError((prev) => ({ ...prev, image: null }));
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        // Validate the form
        const validation = validateProduct(productData);
        if (!validation.isValid) {
            setError(validation.errors);
            return;
        }

        if (!productData.image) {
            setError((prev) => ({ ...prev, image: 'Product image is required' }));
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('price', productData.price);
            formData.append('stock', productData.stock);
            formData.append('image', productData.image);

            const result = await createProduct(formData);

            if (result.message === 'Product created successfully') {
                toast.success(result.message);
                addProduct(result.savedProduct);
                setProductData({
                    name: '',
                    description: '',
                    price: '',
                    stock: '',
                    image: null,
                });
                setImagePreview(null);
                setIsModalOpen(false);
                if (onProductAdded) onProductAdded();
            }
        } catch (error) {
            toast.error(error.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-start ms-32">
                <button
                    onClick={toggleModal}
                    className="flex px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 bg-zinc-950 text-white hover:bg-zinc-900"
                >
                    Add Product
                </button>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-50"
                    onClick={toggleModal}
                >
                    <div
                        className="bg-white p-6 rounded-xl w-[28rem] shadow-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={toggleModal}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-medium mb-6">Add Product</h2>

                        {/* Error display */}
                        {Object.keys(error).length > 0 && (
                            <div className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded">
                                {Object.values(error).map((errMsg, index) => (
                                    <p key={index}>{errMsg}</p>
                                ))}
                            </div>
                        )}

                        {/* Success display */}
                        {success && (
                            <div className="text-green-500 text-sm mb-4 bg-green-50 p-3 rounded">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 mb-1.5">
                                    Product Image
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 border rounded-lg overflow-hidden bg-gray-50">
                                        <img
                                            src={imagePreview || "/api/placeholder/96/96"}
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
                                            onChange={handleImageChange}
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
