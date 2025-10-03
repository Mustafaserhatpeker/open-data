import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlignEndVertical,
  AlignLeft,
  BookOpenText,
  House,
  Info,
  MapPinned,
  MessageCircleQuestionMark,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HeaderDropdown } from "./HeaderDropdown";
import Logo from "@/assets/logo.png";
import Logo2 from "@/assets/logo2.png";
import Switch from "@/components/theme-switch/Switch";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Input } from "@/components/ui/input";

export function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { theme } = useThemeContext();
  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false); // Sayfa değişince sidebar'ı kapat
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <AlignEndVertical />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full px-2 overflow-auto pb-4">
        <SheetHeader className="p-2 pt-4">
          <SheetTitle>
            <div className="text-sm font-semibold text-[#E54805] cursor-pointer flex items-center  ">
              <img
                className=" h-14 object-cover"
                src={theme === "dark" ? Logo2 : Logo}
                alt="logo"
              />
            </div>
          </SheetTitle>
          <SheetDescription className="text-xs font-light  text-muted-foreground p-0">
            Omer Sayma - Fizyoterapi Kliniği
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col place-items-start gap-4 justify-start">
          <div className="w-full">
            <Button
              variant="outline"
              className="text-gray-600 hover:text-orange-600 font-light group text-sm w-full justify-start"
              onClick={() => handleNavigate("/")}
            >
              <House />
              Ana Sayfa
            </Button>
          </div>
          <div className="w-full">
            <Button
              variant="outline"
              className="text-gray-600 hover:text-orange-600 font-light group text-sm w-full justify-start"
            >
              <AlignLeft />
              Hizmetlerimiz
            </Button>
          </div>
          <div className="w-full">
            <Button
              variant="outline"
              className="text-gray-600 hover:text-orange-600 font-light group text-sm w-full justify-start"
            >
              <Users />
              Profesyonel Kadro
            </Button>
          </div>
          <div className="w-full">
            <Button
              variant="outline"
              className="text-gray-600 hover:text-orange-600 font-light group text-sm w-full justify-start"
            >
              <Info />
              Hakkımızda
            </Button>
          </div>
          <div className="w-full">
            <Button
              variant="outline"
              className="text-gray-600 hover:text-orange-600 font-light group text-sm w-full justify-start"
            >
              <BookOpenText />
              Blog
            </Button>
          </div>
          <div className="w-full">
            <Button
              variant="outline"
              className="text-gray-600 hover:text-orange-600 font-light group text-sm w-full justify-start"
            >
              <MessageCircleQuestionMark />
              Sık Sorulanlar
            </Button>
          </div>
          <div className="w-full">
            <Button
              variant="outline"
              className="text-gray-600 hover:text-orange-600 font-light group text-sm w-full justify-start"
            >
              <MapPinned />
              Adresimiz
            </Button>
          </div>

          <div className="w-full flex items-center justify-between">
            <HeaderDropdown />
            <Switch />
          </div>
          <div className="w-full flex flex-col gap-4  p-4 rounded-lg border bg-accent">
            <span className="text-md font-semibold font-sans text-center">
              Hızlı Randevu Alın
            </span>

            <div className="flex flex-col items-center justify-center gap-2">
              <Input className="text-xs" type="text" placeholder="Adınız" />
              <Input className="text-xs" type="text" placeholder="Soyadınız" />
              <Input
                className="text-xs"
                type="text"
                placeholder="Telefon Numarası"
              />
              <Button className="w-full text-xs">Randevu Al</Button>
            </div>

            <div>
              <span className="text-xs text-gray-500">
                Randevu almak için lütfen yukarıdaki bilgileri doldurun. En kısa
                sürede sizinle iletişime geçeceğiz.
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
