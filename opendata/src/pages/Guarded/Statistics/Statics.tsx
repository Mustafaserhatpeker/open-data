import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import StaticsDesktop from "./statics-desktop/StaticsDesktop";
import StaticsMobile from "./statics-mobile/StaticsMobile";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

function Statics() {
    const { role } = useAuthStore()
    const deviceType = useDeviceTypeContext();
    if (role !== "user") {
        return <Navigate to="/dashboard" />;
    }
    return deviceType === "mobile" ? <StaticsMobile /> : <StaticsDesktop />;
}

export default Statics;
