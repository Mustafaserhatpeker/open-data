import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import OpenDictionaryDesktop from "./opendictionary-desktop/OpenDictionaryDesktop";
import OpenDictionaryMobile from "./opendictionary-mobile/OpenDictionaryMobile";

function OpenDictionary() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <OpenDictionaryMobile /> : <OpenDictionaryDesktop />;
}

export default OpenDictionary;
