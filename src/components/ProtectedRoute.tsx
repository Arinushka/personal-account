import React from "react"; 
import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
  isAuth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {

  return props.isAuth ? <Outlet /> : <Navigate to="/signin" />
}

export default ProtectedRoute;