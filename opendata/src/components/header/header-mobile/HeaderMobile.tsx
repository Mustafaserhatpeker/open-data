"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
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
      <div className="flex items-center gap-3">

        {isAuthenticated ? (
          <UserDropdown role={role} />
        ) : (
          <>
            <Button
              size="sm"
              className="text-[10px] px-3 py-1 bg-[#221A4C] text-white rounded"
              asChild
            >
              <Link to="/login">Giriş</Link>
            </Button>

            <Button
              size="sm"
              className="text-[10px] px-3 py-1 bg-[#221A4C] text-white rounded"
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
              className="border-gray-400"
            >
              <Menu className="h-5 w-5 text-[#221A4C]" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-3/4 px-6 pt-10">
            <nav className="flex flex-col gap-4">

              <Link to="/datasets" className="text-lg font-semibold text-[#221A4C]">
                Veri Setleri
              </Link>

              <Link to="/organizations" className="text-lg font-semibold text-[#221A4C]">
                Organizasyonlar
              </Link>

              <Link to="/statistics" className="text-lg font-semibold text-[#221A4C]">
                İstatistikler
              </Link>

              <Link to="/categories" className="text-lg font-semibold text-[#221A4C]">
                Kategoriler
              </Link>

              <Link to="/datarequests" className="text-lg font-semibold text-[#221A4C]">
                Veri İsteği
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
