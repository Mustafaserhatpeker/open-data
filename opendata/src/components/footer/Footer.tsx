import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import FooterDesktop from "./footer-desktop/FooterDesktop";
import FooterMobile from "./footer-mobile/FooterMobile";

function Footer() {
  const deviceType = useDeviceTypeContext();
  return deviceType === "mobile" ? <FooterMobile /> : <FooterDesktop />;
}

export default Footer;
