import React from 'react';

const ProductCard = ({ product, onSubscribe, isSubscribed, isAdmin, onUpdate }) => (
    <div className="bg-white rounded-lg border border-gray-100 p-5 hover:border-gray-200 transition-all">
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800 line-clamp-1">
                    {product?.name}
                </h3>
                {isAdmin && (
                    <button
                        onClick={() => onUpdate(product)}
                        className="px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                    >
                        Update
                    </button>
                )}
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">
                {product?.description}
            </p>
            <div className="pt-3 flex items-center justify-between border-t border-gray-50">
                <span className="text-lg font-medium text-blue-600">
                    ${product?.price}
                </span>
                <span className="text-sm text-gray-500">
                    Stock: {product?.stock}
                </span>
            </div>
            <button
                onClick={() => onSubscribe(product._id)}
                className={`w-full mt-3 px-4 py-2 text-sm font-medium rounded-md ${isSubscribed
                    ? 'text-red-600 bg-red-50 hover:bg-red-100'
                    : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                    } transition-colors`}
            >
                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
        </div>
    </div>
);

export default ProductCard;
