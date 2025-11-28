"use client";

import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Database, Building2, BarChart2, Shapes, MailPlus, Book } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useThemeContext } from "@/contexts/ThemeContext";
import Logo from "@/assets/logoacik.png";
import UserDropdown from "./components/UserDropdown";

export default function MobileHeader() {
  const { isAuthenticated, role } = useAuthStore();
  const { theme } = useThemeContext();

  // ✅ Drawer state control
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  return (
    <header className="flex w-full h-16 items-center justify-between px-4 fixed bg-[#D5C6FF] top-0 left-0 shadow-sm z-50">

      {/* Logo */}
      <Link to="/" onClick={closeSheet} className="flex items-center">
        <img src={theme === "dark" ? Logo : Logo} alt="logo" className="h-10" />
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-2">

        {isAuthenticated ? (
          <UserDropdown role={role} />
        ) : (
          <>
            <Button size="sm" variant="outline" className="text-[10px] px-3 py-1" asChild>
              <Link to="/login" onClick={closeSheet}>Giriş</Link>
            </Button>

            <Button size="sm" variant="outline" className="text-[10px] px-3 py-1" asChild>
              <Link to="/register" onClick={closeSheet}>Üye Ol</Link>
            </Button>
          </>
        )}

        {/* Hamburger Drawer */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-3/4 px-6 pt-10">
            <nav className="flex flex-col gap-5">

              <Link to="/" onClick={closeSheet} className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <Menu className="h-5 w-5" /> Anasayfa
              </Link>

              <Link to="/datasets" onClick={closeSheet} className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <Database className="h-5 w-5" /> Veri Setleri
              </Link>

              <Link to="/organizations" onClick={closeSheet} className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <Building2 className="h-5 w-5" /> Organizasyonlar
              </Link>

              <Link to="/statistics" onClick={closeSheet} className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <BarChart2 className="h-5 w-5" /> İstatistikler
              </Link>

              <Link to="/categories" onClick={closeSheet} className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <Shapes className="h-5 w-5" /> Kategoriler
              </Link>

              <Link to="/datarequests" onClick={closeSheet} className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <MailPlus className="h-5 w-5" /> Veri İsteği
              </Link>
              <Link to="/opendictionary" onClick={closeSheet} className="flex items-center gap-3 text-md font-semibold text-[#221A4C]">
                <Book className="h-5 w-5" /> Açık Veri Sözlüğü
              </Link>

            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
