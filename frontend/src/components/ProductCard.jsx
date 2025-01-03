import React from 'react';

const ProductCard = ({ product, onSubscribe, isSubscribed, isAdmin, onUpdate }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="relative h-48 overflow-hidden">
            <img
                src={product?.image || "/api/placeholder/400/300"}
                alt={product?.name}
                className="w-full h-full object-cover"
            />
            {isAdmin && (
                <button
                    onClick={() => onUpdate(product)}
                    className="absolute top-2 right-2 px-3 py-1 text-sm font-medium rounded-md bg-zinc-950 text-white hover:bg-zinc-900 transition-colors"
                >
                    Update
                </button>
            )}
        </div>

        <div className="p-4 space-y-3">
            <h3 className="text-lg font-medium text-gray-800 line-clamp-1">
                {product?.name}
            </h3>

            <p className="text-sm text-gray-500 line-clamp-2">
                {product?.description}
            </p>

            <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-medium text-blue-600">
                    ${product?.price}
                </span>
                <span className="text-sm text-gray-500">
                    Stock: {product?.stock}
                </span>
            </div>

            <button
                onClick={() => onSubscribe(product._id)}
                className={`w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isSubscribed
                    ? 'text-red-600 bg-red-50 hover:bg-red-100'
                    : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                    }`}
            >
                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
        </div>
    </div>
);

export default ProductCard;