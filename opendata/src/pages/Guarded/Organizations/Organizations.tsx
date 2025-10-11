import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import OrganizationsDesktop from "./organizations-desktop/OrganizationsDesktop";
import OrganizationsMobile from "./organizations-mobile/OrganizationsMobile";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

function Organizations() {
    const { role } = useAuthStore()
    const deviceType = useDeviceTypeContext();
    if (role !== "organization") {
        return <Navigate to="/dashboard" />;
    }
    return deviceType === "mobile" ? <OrganizationsMobile /> : <OrganizationsDesktop />;
}

export default Organizations;
