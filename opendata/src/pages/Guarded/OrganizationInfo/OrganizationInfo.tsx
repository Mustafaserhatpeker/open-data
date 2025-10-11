import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import OrganizationInfoDesktop from "./organizationinfo-desktop/OrganizationInfoDesktop";
import OrganizationInfoMobile from "./organizationinfo-mobile/OrganizationInfoMobile";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

function OrganizationInfo() {
    const { role } = useAuthStore()
    const deviceType = useDeviceTypeContext();
    if (role !== "organization") {
        return <Navigate to="/dashboard" />;
    }
    return deviceType === "mobile" ? <OrganizationInfoMobile /> : <OrganizationInfoDesktop />;
}

export default OrganizationInfo;
