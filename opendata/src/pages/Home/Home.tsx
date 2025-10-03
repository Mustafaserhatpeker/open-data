import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import HomeDesktop from "./home-desktop/HomeDesktop";
import HomeMobile from "./home-mobile/HomeMobile";

function Home() {
  const deviceType = useDeviceTypeContext();
  return deviceType === "mobile" ? <HomeMobile /> : <HomeDesktop />;
}

export default Home;
