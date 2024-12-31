import React, { useState } from 'react';
import axiosInstance from '../Axios';
import toast from 'react-hot-toast';

const UserForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            submitUserData(userData)
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (userData.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters long';
            isValid = false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(userData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const submitUserData = async (userData) => {
        const response = await axiosInstance.post('/users/login', { userData })
        if (response.message === "successfully login user") {
            toast.success(response.message)
            
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome!</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                            required
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your name"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            required
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-zinc-900 text-white py-3 rounded-md hover:bg-zinc-800 transition duration-300"
                    >
                        Continue to Products
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
