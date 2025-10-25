
import NavigationMenu from "../inner-components/NavigationMenu";
import Logo from "@/assets/logoacik.png";
// import Switch from "@/components/theme-switch/Switch";
import { Button } from "@/components/ui/button";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useAuthStore } from "@/stores/auth.store";
import UserDropdown from "./components/UserDropdown";

function Header() {
  const { theme } = useThemeContext();
  const { isAuthenticated, role } = useAuthStore();
  return (
    <div className="w-full flex flex-row justify-between cursor-pointer py-4  px-8 ">
      <div onClick={
        () => { window.location.href = "/" }
      } className="text-lg font-bold">
        <img
          src={theme === "dark" ? Logo : Logo}
          alt="Logo"
          className="h-16  inline-block "
        />
      </div>
      <NavigationMenu />
      <div className=" flex flex-row items-center justify-end">
        <div className="flex flex-row items-center gap-2 pr-4  border-gray-800">

          {isAuthenticated ? (
            <UserDropdown role={role} />
          ) : (
            <>
              <Button className="bg-[#221A4C] hover:bg-[#221A4C]">
                <a href="/login" >
                  Giriş Yap
                </a>
              </Button>
              <Button className="bg-[#221A4C] hover:bg-[#221A4C]">
                <a href="/register" >
                  Üye Ol
                </a>
              </Button>
            </>
          )}

        </div>


        {/* <div className="flex flex-row items-center gap-2 ml-4">
          <Switch />
        </div> */}
      </div>
    </div >
  );
}

export default Header;
