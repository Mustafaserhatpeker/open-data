import { Mail, Phone, MapPin } from "lucide-react";
import Logo2 from "@/assets/logo2.png";

function Footer() {
  return (
    <div className="w-full flex flex-col md:flex-row p-6 border-t px-12  bg-accent">

      <div className="w-full md:w-1/3 flex flex-col items-start justify-start p-4 space-y-4 mt-6 md:mt-0">
        <img className="h-32" src={Logo2} alt="" />
        <span className="text-xs text-gray-400">
          © 2025 Kocaeli Açık Veri Portalı. Tüm hakları saklıdır.
        </span>
      </div>
      <div className="w-full md:w-2/3 flex flex-col items-start justify-start p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold mb-2">Klinik Hakkında</h2>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>Hakkımızda</li>
              <li>Kocaeli Belediyesi</li>
              <li>Hizmetlerimiz</li>
              <li>Kurumsal</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-bold mb-2">İletişim</h2>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +90 212 000 00 00
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> info@kocaeli.bel.tr.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} /> İstanbul, Türkiye
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-bold mb-2">Çalışma Saatleri</h2>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>Pazartesi - Cuma: 09:00 - 18:00</li>
              <li>Cumartesi: 10:00 - 14:00</li>
              <li>Pazar: Kapalı</li>
            </ul>
          </div>
        </div>


      </div>



    </div>
  );
}

export default Footer;
