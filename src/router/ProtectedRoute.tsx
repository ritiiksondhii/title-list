import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { userProfile } from "../redux/reducers/profileReducer";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  
  return element;  
};

export default ProtectedRoute;
