

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
    const { email } = useSelector(state => state.user);

    
    if (!email) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
}

export default ProtectRoute