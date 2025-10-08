import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import DashboardDesktop from "./dashboard-desktop/DashboardDesktop";
import DashboardMobile from "./dashboard-mobile/DashboardMobile";

function UDashboard() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <DashboardMobile /> : <DashboardDesktop />;
}

export default UDashboard;
