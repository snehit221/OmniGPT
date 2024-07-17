import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const token=localStorage.getItem("token")
  const userEmail=localStorage.getItem("user")
  return (
     token && userEmail ? <Outlet /> : <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
