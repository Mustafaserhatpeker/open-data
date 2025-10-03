import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "desktop";

export default function useDeviceType(): DeviceType {
  const getDeviceType = () =>
    window.innerWidth < 1025 && window.innerWidth >= 0 ? "mobile" : "desktop";

  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}
