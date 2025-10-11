import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import PreviewDesktop from "./preview-desktop/PreviewDesktop";
import PreviewMobile from "./preview-mobile/PreviewMobile";

function Preview() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <PreviewMobile /> : <PreviewDesktop />;
}

export default Preview;
