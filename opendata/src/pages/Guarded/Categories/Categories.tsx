import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import CategoriesDesktop from "./categories-desktop/CategoriesDesktop";
import CategoriesMobile from "./categories-mobile/CategoriesMobile";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

function Categories() {
    const { role } = useAuthStore()
    const deviceType = useDeviceTypeContext();
    if (role !== "organization") {
        return <Navigate to="/dashboard" />;
    }
    return deviceType === "mobile" ? <CategoriesMobile /> : <CategoriesDesktop />;
}

export default Categories;
