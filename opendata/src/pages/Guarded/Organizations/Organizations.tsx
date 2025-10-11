import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import OrganizationsDesktop from "./organizations-desktop/OrganizationsDesktop";
import OrganizationsMobile from "./organizations-mobile/OrganizationsMobile";

function Organizations() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <OrganizationsMobile /> : <OrganizationsDesktop />;
}

export default Organizations;
