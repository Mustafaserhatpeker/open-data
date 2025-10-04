import { Routes, Route, BrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home/Home";
import Datasets from "./pages/Datasets/Datasets";
import DataInfo from "./pages/DataInformation/DataInfo";

import { DeviceTypeProvider } from "@/contexts/DeviceTypeContext";

function App() {
  return (
    <DeviceTypeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/datasets/:id" element={<DataInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DeviceTypeProvider>
  );
}

export default App;
