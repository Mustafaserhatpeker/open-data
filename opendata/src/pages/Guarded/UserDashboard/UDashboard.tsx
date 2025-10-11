import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import UDashboardDesktop from "./udashboard-desktop/UDashboardDesktop";
import UDashboardMobile from "./udashboard-mobile/UDashboardMobile";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

function UDashboard() {
    const { role } = useAuthStore()
    const deviceType = useDeviceTypeContext();
    if (role !== "user") {
        return <Navigate to="/dashboard" />;
    }
    return deviceType === "mobile" ? <UDashboardMobile /> : <UDashboardDesktop />;
}

export default UDashboard;
