
import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import CategoryInfoDesktop from "./categoryinfo-desktop/CategoryInfoDesktop";
import CategoryInfoMobile from "./categoryinfo-mobile/CategoryInfoMobile";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

function CategoryInfo() {
    const { role } = useAuthStore()
    const deviceType = useDeviceTypeContext();
    if (role !== "organization") {
        return <Navigate to="/dashboard" />;
    }
    return deviceType === "mobile" ? <CategoryInfoMobile /> : <CategoryInfoDesktop />;
}

export default CategoryInfo;
