import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <div className="w-full flex flex-col md:flex-row p-6 border-t  bg-accent">
      {/* Sol taraf: Bilgiler */}
      <div className="w-full md:w-2/3 flex flex-col items-start justify-start p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold mb-2">Klinik Hakkında</h2>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>Hakkımızda</li>
              <li>Uzman Kadromuz</li>
              <li>Hizmetlerimiz</li>
              <li>Blog & Bilgilendirme</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-bold mb-2">İletişim</h2>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +90 212 000 00 00
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> info@klinikadiniz.com
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

        <div className="flex items-center gap-4 mt-4">
          <Instagram size={20} className="text-gray-500 cursor-pointer" />
          <Facebook size={20} className="text-gray-500 cursor-pointer" />
        </div>

        <span className="text-xs text-gray-400">
          © 2025 Klinik Adınız. Tüm hakları saklıdır.
        </span>
      </div>

      {/* Sağ taraf: Randevu Formu */}
      <div className="w-full md:w-1/3 flex flex-col items-start justify-start p-4 space-y-4 mt-6 md:mt-0">
        <h2 className="text-lg font-bold mb-2">Randevu Talep Formu</h2>
        <Input type="text" placeholder="Ad Soyad" />
        <Input type="email" placeholder="E-posta" />
        <Input type="tel" placeholder="Telefon Numarası" />
        {/* İsteğe bağlı mesaj alanı eklenebilir */}
        {/* <Textarea placeholder="Mesajınız" /> */}
        <Button className="w-full">Randevu Talebi Gönder</Button>
        <p className="text-xs text-gray-400 mt-1">
          Gönderdiğiniz bilgiler yalnızca randevu oluşturma amacıyla
          kullanılacaktır.
        </p>
      </div>
    </div>
  );
}

export default Footer;
