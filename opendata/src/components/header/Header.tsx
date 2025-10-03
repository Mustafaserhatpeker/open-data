import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import HeaderDesktop from "./header-desktop/HeaderDesktop";
import HeaderMobile from "./header-mobile/HeaderMobile";

function Home() {
  const deviceType = useDeviceTypeContext();
  return deviceType === "mobile" ? <HeaderMobile /> : <HeaderDesktop />;
}

export default Home;
