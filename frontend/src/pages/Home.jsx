import React from 'react';
import { useSelector } from 'react-redux';
import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';

const Home = () => {
    const role = useSelector((state) => state.user.userRole);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row justify-start">
                {role === "Admin" ? (
                    <div className="mb-8">
                        <h2 className="text-zinc-950 text-3xl sm:text-4xl md:text-4xl font-bold leading-tight">
                            Product Alerts Dashboard
                        </h2>
                        <p className="text-gray-600 mt-3">
                            Manage product availability
                        </p>
                    </div>
                ) : (
                    <div className="mb-8">
                        <h2 className="text-zinc-950 text-3xl sm:text-4xl md:text-4xl font-bold leading-tight">
                            Product Alerts
                        </h2>
                        <p className="text-gray-600">
                            Stay updated on product availability and price changes.
                        </p>
                    </div>
                )}
            </div>
                
            <div className="max-w-6xl mx-auto">
                <ProductList />
            </div>
        </div>
    );
};

export default Home;
