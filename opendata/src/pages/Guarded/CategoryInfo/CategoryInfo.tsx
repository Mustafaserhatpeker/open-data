
import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import CategoryInfoDesktop from "./categoryinfo-desktop/CategoryInfoDesktop";
import CategoryInfoMobile from "./categoryinfo-mobile/CategoryInfoMobile";

function CategoryInfo() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <CategoryInfoMobile /> : <CategoryInfoDesktop />;
}

export default CategoryInfo;
