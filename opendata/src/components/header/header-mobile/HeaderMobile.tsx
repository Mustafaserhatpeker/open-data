import { motion } from "framer-motion";
import { Sidebar } from "./components/Sidebar";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import Logo2 from "@/assets/logo2.png";
import { useThemeContext } from "@/contexts/ThemeContext";

function HeaderMobile() {
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  return (
    <header className="flex place-items-center justify-between p-2 transition-all duration-300 fixed top-0 left-0 w-full z-50 bg-background border-b border-border">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          delay: 0.3,
          duration: 1.2,
        }}
        onClick={() => {
          navigate("/");
        }}
        className="text-sm font-semibold text-[#E54805] cursor-pointer flex items-center gap-2 hover:text-orange-600 transition-colors duration-300"
      >
        <img
          className=" h-14 object-cover"
          src={theme === "dark" ? Logo2 : Logo}
          alt="logo"
        />
      </motion.div>
      <Sidebar />
    </header>
  );
}

export default HeaderMobile;
