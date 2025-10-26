import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import StaticsDesktop from "./statics-desktop/StaticsDesktop";
import StaticsMobile from "./statics-mobile/StaticsMobile";


function Statics() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <StaticsMobile /> : <StaticsDesktop />;
}

export default Statics;
