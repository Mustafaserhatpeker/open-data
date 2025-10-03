import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Instagram, Mail, Smile } from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";

export function HeaderDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="cursor-pointer bg-[#7ED957] text-white text-xs hover:bg-[#7ED957]/90 hover:text-white"
          variant={"ghost"}
        >
          <Smile />
          İletişime Geç
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="text-[#7ED957]">
          Sosyal Medya
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Instagram className="text-green-800" />
            İnstagram{" "}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <RiTwitterXFill className="text-green-800" />
            Twitter
          </DropdownMenuItem>
          <DropdownMenuLabel className="text-[#7ED957]">
            Diğer İletişim Kanalları
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Mail className="text-green-800" />E Posta
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <FaWhatsapp className="text-green-800" />
            Whatsapp
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
