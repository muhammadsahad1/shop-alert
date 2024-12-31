import React from 'react';
import { useSelector } from 'react-redux';
import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';

const Home = () => {
    const role = useSelector((state) => state.user.userRole);

    return (
        <div className="flex flex-col justify-center items-center mt-24 px-4">
            {role === "Admin" ? (
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 ">
                    <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                        Admin Dashboard
                    </h2>
                    <p className="text-lg text-gray-600 mb-4 text-center font-semibold">
                        Manage your product catalog efficiently by adding new products below.
                    </p>
                </div>
            ) : (
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                        Welcome to Our Product Store
                    </h2>
                    <p className="text-lg text-gray-600 mb-4 text-center font-semibold">
                        Explore our catalog of amazing products below.
                    </p>
                </div>
            )}
            <ProductList />
        </div>
    );
};

export default Home;
