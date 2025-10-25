import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home/Home";
import Datasets from "./pages/Datasets/Datasets";
import DataInfo from "./pages/DataInformation/DataInfo";
import Organizations from "./pages/Organizations/Organizations";
import Categories from "./pages/Categories/Categories";
import { DeviceTypeProvider } from "@/contexts/DeviceTypeContext";
import OrganizationInfo from "./pages/OrganizationInfo/OrganizationInfo";
import CategoryInfo from "./pages/CategoryInfo/CategoryInfo";
import Datarequests from "./pages/Datarequests/Datarequests";
import RequestInfo from "./pages/RequestInfo/ReguestInfo";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import { useAuthStore } from "./stores/auth.store";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { RouteTrackerProvider } from "./contexts/RouteTrackContext";
import DashboardLayout from "./layouts/DashboardLayout";
import StaticsDesktop from "./pages/Statistics/statics-desktop/StaticsDesktop";
import OpenDictionary from "./pages/Opendictionary/OpenDictionary";
import Preview from "./pages/Preview/Preview";



import OrganizationsGuarded from "./pages/Guarded/Organizations/Organizations";
import CategoriesGuarded from "./pages/Guarded/Categories/Categories";
import OrganizationInfoGuarded from "./pages/Guarded/OrganizationInfo/OrganizationInfo";
import CategoryInfoGuarded from "./pages/Guarded/CategoryInfo/CategoryInfo";
import DatarequestsGuarded from "./pages/Guarded/Datarequests/Datarequests";
import RequestInfoGuarded from "./pages/Guarded/RequestInfo/ReguestInfo";
import DataInfoGuarded from "./pages/Guarded/DataInformation/DataInfo";
import DatasetsGuarded from "./pages/Guarded/Datasets/Datasets";
import PreviewGuarded from "./pages/Guarded/Preview/Preview";
import Dashboard from "./pages/Guarded/Dashboard/Dashboard";

const ProtectedRoute = ({ children }: { children: any }) => {
  const { isAuthenticated, role } = useAuthStore();
  if (!isAuthenticated || (role !== "user" && role !== "organization")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const RedirectAuthenticated = ({ children }: { children: any }) => {
  const { isAuthenticated, role } = useAuthStore();
  if (isAuthenticated && (role === "organization")) {
    return <Navigate to="/dashboard" replace />;
  }
  if (isAuthenticated && role === "user") {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <DeviceTypeProvider>
      <BrowserRouter>
        {/* Route tracking artık burada */}
        <RouteTrackerProvider>
          <Routes>
            {/* Public layout */}
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/datasets" element={<Datasets />} />
              <Route path="/datasets/:id" element={<DataInfo />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/organizations/:id" element={<OrganizationInfo />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:id" element={<CategoryInfo />} />
              <Route path="/datarequests" element={<Datarequests />} />
              <Route path="/datarequests/:id" element={<RequestInfo />} />
              <Route path="/statistics" element={<StaticsDesktop />} />
              <Route path="/opendictionary" element={<OpenDictionary />} />

              <Route path="/preview/:token" element={<Preview />} />
              <Route
                path="/login"
                element={
                  <RedirectAuthenticated>
                    <LoginPage />
                  </RedirectAuthenticated>
                }
              />
              <Route
                path="/register"
                element={
                  <RedirectAuthenticated>
                    <RegisterPage />
                  </RedirectAuthenticated>
                }
              />
            </Route>

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="organizations" element={<OrganizationsGuarded />} />
              <Route path="categories" element={<CategoriesGuarded />} />
              <Route path="organizations/:id" element={<OrganizationInfoGuarded />} />
              <Route path="categories/:id" element={<CategoryInfoGuarded />} />
              <Route path="datarequests" element={<DatarequestsGuarded />} />
              <Route path="datarequests/:id" element={<RequestInfoGuarded />} />
              <Route path="datasets/:id" element={<DataInfoGuarded />} />
              <Route path="preview/:id" element={<PreviewGuarded />} />
              <Route path="datasets" element={<DatasetsGuarded />} />
            </Route>
          </Routes>
        </RouteTrackerProvider>
      </BrowserRouter>
    </DeviceTypeProvider>
  );
}

export default App;
