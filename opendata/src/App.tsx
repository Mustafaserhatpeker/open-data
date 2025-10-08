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
import Dashboard from "./pages/Dashboard/Dashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import { useAuthStore } from "./stores/auth.store";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { RouteTrackerProvider } from "./contexts/RouteTrackContext";


const ProtectedOrganizatorRoute = ({ children }: { children: any }) => {
  const { isAuthenticated, role } = useAuthStore();
  if (!isAuthenticated || role !== "organization") {
    return <Navigate to="/login" replace />;
  }

  return children;
};
const ProtectedUserRoute = ({ children }: { children: any }) => {
  const { isAuthenticated, role } = useAuthStore();
  if (!isAuthenticated || role !== "user") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

const RedirectAuthenticated = ({ children }: { children: any }) => {
  const { isAuthenticated, role } = useAuthStore();
  if (isAuthenticated && role === "user") {
    return <Navigate to="/userdashboard" replace />;
  }
  else if (isAuthenticated && role === "organization") {
    return <Navigate to="/dashboard" replace />;
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
        <RouteTrackerProvider>
          <Routes>
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
              element={
                <ProtectedOrganizatorRoute>
                  <DefaultLayout />
                </ProtectedOrganizatorRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route
              element={
                <ProtectedUserRoute>
                  <DefaultLayout />
                </ProtectedUserRoute>
              }
            >
              <Route path="/userdashboard" element={<UserDashboard />} />
            </Route>
          </Routes>
        </RouteTrackerProvider>
      </BrowserRouter>
    </DeviceTypeProvider>
  );
}

export default App;
