import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import DashboardDesktop from "./dashboard-desktop/DashboardDesktop";
import DashboardMobile from "./dashboard-mobile/DashboardMobile";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

function Dashboard() {
    const { role } = useAuthStore()
    const deviceType = useDeviceTypeContext();
    if (role !== "organization") {
        return <Navigate to="/dashboard" />;
    }
    return deviceType === "mobile" ? <DashboardMobile /> : <DashboardDesktop />;
}

export default Dashboard;
