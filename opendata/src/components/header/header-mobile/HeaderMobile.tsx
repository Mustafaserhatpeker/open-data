"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Database, Building2, BarChart2, Shapes, MailPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useThemeContext } from "@/contexts/ThemeContext";
import Logo from "@/assets/logoacik.png";
import UserDropdown from "./components/UserDropdown";

export default function MobileHeader() {
  const { isAuthenticated, role } = useAuthStore();
  const { theme } = useThemeContext();

  return (
    <header className="flex w-full h-16 items-center justify-between px-4 fixed bg-[#D5C6FF] top-0 left-0 shadow-sm z-50">

      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={theme === "dark" ? Logo : Logo}
          alt="logo"
          className="h-10"
        />
      </Link>

      {/* Right Section: Auth + Hamburger */}
      <div className="flex items-center gap-2">

        {isAuthenticated ? (
          <UserDropdown role={role} />
        ) : (
          <>
            <Button
              size="sm"
              variant="outline"
              className="text-[10px] px-3 py-1 "
              asChild
            >
              <Link to="/login">Giriş</Link>
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="text-[10px] px-3 py-1 "
              asChild
            >
              <Link to="/register">Üye Ol</Link>
            </Button>
          </>
        )}

        {/* Hamburger Drawer */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className=""
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-3/4 px-6 pt-10">
            <nav className="flex flex-col gap-5">

              <Link to="/" className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <Menu className="h-5 w-5" />
                Anasayfa
              </Link>

              <Link to="/datasets" className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <Database className="h-5 w-5" />
                Veri Setleri
              </Link>

              <Link to="/organizations" className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <Building2 className="h-5 w-5" />
                Organizasyonlar
              </Link>

              <Link to="/statistics" className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <BarChart2 className="h-5 w-5" />
                İstatistikler
              </Link>

              <Link to="/categories" className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <Shapes className="h-5 w-5" />
                Kategoriler
              </Link>

              <Link to="/datarequests" className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <MailPlus className="h-5 w-5" />
                Veri İsteği
              </Link>

            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
