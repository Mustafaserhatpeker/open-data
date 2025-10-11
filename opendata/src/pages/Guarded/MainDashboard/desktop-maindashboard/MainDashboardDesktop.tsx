import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";
import Dashboard from "@/pages/Guarded/Dashboard/Dashboard";
import UDashboard from "@/pages/Guarded/UserDashboard/UDashboard";

function MainDashboardDesktop() {
    // ✅ Hook burada, ana bileşenin üst düzeyinde
    const { isAuthenticated, role } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (role === "user") {
        return <UDashboard />;
    }

    if (role === "organization") {
        return <Dashboard />;
    }

    return <Navigate to="/login" replace />;
}

export default MainDashboardDesktop;
