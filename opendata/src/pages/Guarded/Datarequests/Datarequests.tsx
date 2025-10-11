import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import DataRequestsDesktop from "./datarequests-desktop/DatarequestsDesktop";
import DataRequestsMobile from "./datarequests-mobile/DatarequestsMobile";

function DataRequests() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <DataRequestsMobile /> : <DataRequestsDesktop />;
}

export default DataRequests;
