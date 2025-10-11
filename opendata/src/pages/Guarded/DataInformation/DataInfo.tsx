import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import DataInfoDesktop from "./datainfo-desktop/DataInfoDesktop";
import DataInfoMobile from "./datainfo-mobile/DataInfoMobile";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

function DataInfo() {
    const { role } = useAuthStore()
    const deviceType = useDeviceTypeContext();
    if (role !== "organization") {
        return <Navigate to="/dashboard" />;
    }
    return deviceType === "mobile" ? <DataInfoMobile /> : <DataInfoDesktop />;
}

export default DataInfo;
