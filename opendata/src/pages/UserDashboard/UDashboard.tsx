import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import UDashboardDesktop from "./udashboard-desktop/UDashboardDesktop";
import UDashboardMobile from "./udashboard-mobile/UDashboardMobile";

function UDashboard() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <UDashboardMobile /> : <UDashboardDesktop />;
}

export default UDashboard;
 