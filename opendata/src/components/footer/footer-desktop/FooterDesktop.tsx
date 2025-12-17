import Logo2 from "@/assets/logoacik.png";

function Footer() {
  return (
    // Koyu lacivert/siyah arka plan, üst sınır çizgisi
    <div className="w-full flex flex-col md:flex-row p-12 border-t border-slate-800 bg-slate-900 text-slate-300">

      <div className="w-full md:w-1/3 flex flex-col items-start justify-start space-y-4">
        {/* Logo arka planı koyu olduğu için parlaklık/filtre gerekebilir, logonun transparan olduğundan emin ol */}
        <img className="h-24 opacity-90" src={Logo2} alt="Kocaeli Açık Veri" />
        <span className="text-sm text-slate-500">
          © 2025 Kocaeli Büyükşehir Belediyesi<br />Açık Veri Portalı. Tüm hakları saklıdır.
        </span>
      </div>

      <div className="w-full md:w-2/3 flex flex-col md:flex-row items-start justify-between mt-8 md:mt-0 gap-8">

        {/* Sütun 1 */}
        <div className="flex flex-col">
          <h4 className="text-white font-semibold mb-4">Kurumsal</h4>
          <ul className="text-sm space-y-3">
            <li>
              <a href="https://kocaeli.bel.tr" target="_blank" className="hover:text-cyan-400 transition-colors">
                Kocaeli Büyükşehir Belediyesi
              </a>
            </li>
            <li>
              <a href="https://www.kocaeli.bel.tr/hizmetler/" target="_blank" className="hover:text-cyan-400 transition-colors">
                Hizmetlerimiz
              </a>
            </li>
          </ul>
        </div>

        {/* Sütun 2 */}
        <div className="flex flex-col">
          <h4 className="text-white font-semibold mb-4">Veri & Araçlar</h4>
          <ul className="text-sm space-y-3">
            <li>
              <a href="/opendictionary" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                Açık Veri Sözlüğü
              </a>
            </li>
            <li>
              <a href="/datasets" className="hover:text-cyan-400 transition-colors">
                Tüm Veri Setleri
              </a>
            </li>
          </ul>
        </div>

        {/* Sütun 3 */}
        <div className="flex flex-col">
          <h4 className="text-white font-semibold mb-4">Bize Ulaşın</h4>
          <ul className="text-sm space-y-3">
            <li>
              <a href="https://www.kocaeli.bel.tr/iletisim/" target="_blank" className="hover:text-cyan-400 transition-colors">
                İletişim Formu
              </a>
            </li>
            <li className="text-slate-500 text-xs mt-2">
              Mimar Sinan Mahallesi,<br /> Ankara Yolu Caddesi No:1<br /> 41300 İzmit/Kocaeli
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Footer;