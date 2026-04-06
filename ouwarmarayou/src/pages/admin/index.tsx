import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const AdminIndex = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("hb_admin_auth") === "true";
    if (isAuth) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return null;
};

export { AdminDashboard };
export default AdminIndex;
