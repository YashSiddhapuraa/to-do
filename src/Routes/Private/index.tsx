import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  return token?.length ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
