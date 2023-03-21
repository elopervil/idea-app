import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
