import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext"; // artık buradan geliyor
import Header from "@/components/header/Header";
import { useDeviceTypeContext } from "@/contexts/DeviceTypeContext";
import Footer from "@/components/footer/Footer"; // Footer component import


function DefaultLayout() {
  const deviceType = useDeviceTypeContext();

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-x-hidden">
        <div className="flex-1 flex flex-col w-full  ">
          <Header />
          <main
            className={`flex-1 flex flex-col w-full items-center ${deviceType !== "mobile" ? "" : "pt-24"
              }`}
          >
            <Outlet />


          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default DefaultLayout;
