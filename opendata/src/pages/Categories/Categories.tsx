import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import CategoriesDesktop from "./categories-desktop/CategoriesDesktop";
import CategoriesMobile from "./categories-mobile/CategoriesMobile";

function Categories() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <CategoriesMobile /> : <CategoriesDesktop />;
}

export default Categories;
