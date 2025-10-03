import React, { createContext, useContext } from "react";
import useDeviceType, { type DeviceType } from "@/hooks/useDeviceType";

const DeviceTypeContext = createContext<DeviceType>("desktop");

export const DeviceTypeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deviceType = useDeviceType();
  return (
    <DeviceTypeContext.Provider value={deviceType}>
      {children}
    </DeviceTypeContext.Provider>
  );
};

export const useDeviceTypeContext = () => useContext(DeviceTypeContext);
