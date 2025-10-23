import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import DataInfoDesktop from "./datainfo-desktop/DataInfoDesktop";
import DataInfoMobile from "./datainfo-mobile/DataInfoMobile";

function DataInfo() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <DataInfoMobile /> : <DataInfoDesktop />;
}

export default DataInfo;
