import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import DatasetsDesktop from "./datasets-desktop/DatasetsDesktop";
import DatasetsMobile from "./datasets-mobile/DatasetsMobile";

function Datasets() {
    const deviceType = useDeviceTypeContext();
    return deviceType === "mobile" ? <DatasetsMobile /> : <DatasetsDesktop />;
}

export default Datasets;
