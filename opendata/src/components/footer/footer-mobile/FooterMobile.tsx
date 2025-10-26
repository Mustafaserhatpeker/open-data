import Logo2 from "@/assets/logoacik.png";

function Footer() {
  return (
    <div className="w-full flex flex-col md:flex-row p-6 border-t px-12  bg-accent-30">

      <div className="w-full md:w-1/3 flex flex-col items-start justify-start p-4 space-y-4 mt-6 md:mt-0">
        <img className="h-32" src={Logo2} alt="" />
        <span className="text-xs text-accent">
          © 2025 Kocaeli Açık Veri Portalı. Tüm hakları saklıdır.
        </span>
      </div>
      <div className="w-full md:w-2/3 flex flex-col items-start justify-start p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="flex flex-col">

            <ul className="text-sm text-accent space-y-2">
              {/* <li className="cursor-pointer">
                <a href="/about" className="hover:underline">
                  Hakkımızda
                </a>
              </li> */}
              <li className="cursor-pointer">
                <a href="https://kocaeli.bel.tr" target="_blank" className="hover:underline">
                  Kocaeli Belediyesi
                </a>
              </li>
              <li className="cursor-pointer">
                <a href="https://www.kocaeli.bel.tr/hizmetler/" target="_blank" className="hover:underline">
                  Hizmetlerimiz
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">

            <ul className="text-sm text-accent-500 space-y-2">
              <li className="flex items-center gap-2">
                <a href="/opendictionary" className="hover:underline flex items-center gap-2 text-accent">
                  Açık Veri Sözlüğü
                </a>
              </li>

            </ul>
          </div>

          <div className="flex flex-col">

            <ul className="text-sm text-accent-500 space-y-2">
              <li className="flex items-center gap-2">
                <a href="https://www.kocaeli.bel.tr/iletisim/" target="_blank" className="hover:underline flex items-center gap-2 text-accent">
                  İletişim
                </a>
              </li>

            </ul>
          </div>


        </div>


      </div>



    </div>
  );
}

export default Footer;
