import { Routes, Route, BrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home/Home";
import Datasets from "./pages/Datasets/Datasets";
import DataInfo from "./pages/DataInformation/DataInfo";
import Organizations from "./pages/Organizations/Organizations";
import Categories from "./pages/Categories/Categories";

import { DeviceTypeProvider } from "@/contexts/DeviceTypeContext";
import OrganizationInfo from "./pages/OrganizationInfo/OrganizationInfo";

function App() {
  return (
    <DeviceTypeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/datasets/:id" element={<DataInfo />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/organizations/:id" element={<OrganizationInfo />} />
            <Route path="/categories" element={<Categories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DeviceTypeProvider>
  );
}

export default App;
