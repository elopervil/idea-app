import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
