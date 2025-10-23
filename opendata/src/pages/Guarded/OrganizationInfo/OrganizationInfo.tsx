import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import OrganizationInfoDesktop from "./organizationinfo-desktop/OrganizationInfoDesktop";
import OrganizationInfoMobile from "./organizationinfo-mobile/OrganizationInfoMobile";

function OrganizationInfo() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <OrganizationInfoMobile /> : <OrganizationInfoDesktop />;
}

export default OrganizationInfo;
