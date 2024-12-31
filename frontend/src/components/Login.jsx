import React, { useState } from 'react';
import axiosInstance from '../Axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../API/user';
import { setUserDetails, setUserRole, setAuthenticationStatus } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form before submission
        if (validateForm()) {
            submitUserData(userData);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(userData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (userData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const submitUserData = async (userData) => {
        try {
            const result = await userLogin(userData);


            if (result.message === "Logged in successfully") {
                console.log("res =>", result)
                const { user } = result;
                console.log("User: ", user);
                dispatch(setUserRole(user.isAdmin ? "Admin" : "User"));
                dispatch(setAuthenticationStatus(true));
                dispatch(setUserDetails({ email: user.email, name: user.name, id: user.id }));

                // Show success message
                toast.success(result.message);
                navigate('/home');
            } else {
                // Handle unexpected message or error scenario (if any)
                toast.error("An unexpected error occurred");
            }
        } catch (error) {
            console.error("Login Error: ", error);
            toast.error("Invalid credentials");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-zinc-900 text-white py-3 rounded-md hover:bg-zinc-800 transition duration-300"
                    >
                        Login
                    </button>
                    <button>
                        <Link to="/signup">
                            <p>Signup</p>
                        </Link>
                    </button>

                </form>
            </div>
        </div>
    );
};


export default LoginForm;
