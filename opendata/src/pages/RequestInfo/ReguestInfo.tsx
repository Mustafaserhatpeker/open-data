import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import RequestInfoDesktop from "./requestinfo-desktop/RequestInfoDesktop";
import RequestInfoMobile from "./requestinfo-mobile/RequestInfoMobile";

function RequestInfo() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <RequestInfoMobile /> : <RequestInfoDesktop />;
}

export default RequestInfo;
