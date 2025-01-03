

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { email } = useSelector(state => state.user);
    
   
    if (email) {
      return <Navigate to="/home" replace />;
    }
  
    return <Outlet />;
  };
  
  export default PublicRoute;