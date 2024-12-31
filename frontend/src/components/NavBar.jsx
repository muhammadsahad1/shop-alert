import React from "react";
import { IoLogOut } from "react-icons/io5";
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticationStatus, setUserDetails } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../API/user";

const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const user = useSelector(state => state.user)
    console.log(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        try {
            const result = await userLogout(); // This will make the API call to your backend
            if (result.message === "Logged out successfully") {
                // Clear user data from Redux store
                dispatch(setAuthenticationStatus(false));
                dispatch(setUserDetails({ name: "", email: "" }));

                // Show success toast and navigate to the login page
                toast.success(result.message);
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Error logging out");
        }
    };
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md fixed w-full top-0 left-0 z-10" style={{ height: "60px" }}>
            <div>
                <h1 className="text-2xl font-bold text-blue-600">ShopAlert</h1>
            </div>
            <div>
                {isAuthenticated ? (
                    <div
                        className="flex items-center text-gray-600 cursor-pointer hover:text-blue-600"
                        onClick={handleLogout}
                    >
                        <IoLogOut size={24} className="mr-2" />
                        <span>Logout</span>
                    </div>
                ) : (
                    <button
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};


export default Navbar;
