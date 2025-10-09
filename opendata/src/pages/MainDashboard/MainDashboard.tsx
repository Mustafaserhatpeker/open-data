import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import MainDashboardDesktop from "./desktop-maindashboard/MainDashboardDesktop";
import MainDashboardMobile from "./mobile-maindashboard/MainDashboardMobile";

function MainDashboard() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <MainDashboardMobile /> : <MainDashboardDesktop />;
}

export default MainDashboard;
