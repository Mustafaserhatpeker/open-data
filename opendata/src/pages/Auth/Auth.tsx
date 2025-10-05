import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import AuthDesktop from "./auth-desktop/AuthDesktop";
import AuthMobile from "./auth-mobile/AuthMobile";

function Auth() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <AuthMobile /> : <AuthDesktop />;
}

export default Auth;
