import RotatingText from "@/components/RotatingText";
import { Button } from "@/components/ui/button";
import Background from "@/assets/background.svg";
import { Building2, Bus, CarFront, Droplets, MousePointerClick, Ship, Trees, WavesLadder } from "lucide-react";
import { HomeTooltip } from "./inner-components/HomeTooltip";
function Welcome() {
  const tooltips = [
    {
      id: 1,
      content: <div className="flex flex-col items-start justify-between">
        <h1 className="text-start font-extrabold text-xl flex items-center gap-2 border-b-2 border-white/50 pb-1 w-full">
          <Droplets />
          Deniz Verileri
        </h1>
        <p className="text-start font-bold text-lg">
          Kocaeli’nin deniz ve kıyı bölgelerine ait ölçümler sunar. Su kalitesi, sıcaklık, tuzluluk ve deniz canlılığına dair bilgiler içerir. Deniz kirliliği ve ekosistem sağlığına ilişkin analizler yapılabilir.
        </p>
      </div>,
      clasName: "absolute top-10 left-72 w-8 h-8 bg-[#DAFAB2] text-[#7F7DFB] rounded-full"
    },
    {
      id: 2,
      content: <div className="flex flex-col items-start justify-between">
        <h1 className="text-start font-extrabold text-xl flex items-center gap-2 border-b-2 border-white/50 pb-1 w-full">
          <CarFront />
          Trafik Verisi
        </h1>
        <p className="text-start font-bold text-lg">
          Kocaeli genelinde trafik yoğunluğu, araç sayıları, kavşak geçiş süreleri ve yol kullanım istatistiklerini içerir. Trafik planlaması ve ulaşım stratejileri için kullanılabilir.
        </p>
      </div>,
      clasName: "absolute top-58 left-2/7  w-8 h-8 bg-[#DAFAB2] text-[#7F7DFB] rounded-full"
    },
    {
      id: 3,
      content: <div className="flex flex-col items-start justify-between">
        <h1 className="text-start font-extrabold text-xl flex items-center gap-2 border-b-2 border-white/50 pb-1 w-full">
          <Bus />
          Toplu Taşıma Verisi
        </h1>
        <p className="text-start font-bold text-lg">
          Otobüs, tramvay ve diğer toplu taşıma araçlarına dair sefer saatleri, hat yoğunlukları, yolcu sayıları ve durak bazlı istatistikler yer alır. Şehir içi ulaşım planlaması için kullanılabilir.
        </p>
      </div>,
      clasName: "absolute top-50 right-1/3  w-8 h-8 bg-[#DAFAB2] text-[#7F7DFB] rounded-full"
    },
    {
      id: 4,
      content: <div className="flex flex-col items-start justify-between">
        <h1 className="text-start font-extrabold text-xl flex items-center gap-2 border-b-2 border-white/50 pb-1 w-full">
          <Trees />
          Çevre ve Orman Verisi
        </h1>
        <p className="text-start font-bold text-lg">
          Orman alanları, yeşil alanlar, ağaçlandırma çalışmaları ve biyolojik çeşitlilik verilerini kapsar. Çevre koruma faaliyetleri ve sürdürülebilirlik politikaları için kaynak sağlar.
        </p>
      </div>,
      clasName: "absolute top-92 left-2/5  w-8 h-8 bg-[#DAFAB2] text-[#7F7DFB] rounded-full"
    },
    {
      id: 5,
      content: <div className="flex flex-col items-start justify-between">
        <h1 className="text-start font-extrabold text-xl flex items-center gap-2 border-b-2 border-white/50 pb-1 w-full">
          <WavesLadder />
          Göl ve Kaynak Su Verisi
        </h1>
        <p className="text-start font-bold text-lg">
          İçme suyu kaynakları, göl seviyeleri, su kalitesi ve yeraltı suları hakkında ölçümler içerir. Su yönetimi ve çevresel sürdürülebilirlik için önemli göstergeler sağlar.
        </p>
      </div>,
      clasName: "absolute bottom-12 left-1/2  w-8 h-8 bg-[#DAFAB2] text-[#7F7DFB] rounded-full"
    },
    {
      id: 6,
      content: <div className="flex flex-col items-start justify-between">
        <h1 className="text-start font-extrabold text-xl flex items-center gap-2 border-b-2 border-white/50 pb-1 w-full">
          <Building2 />
          Konut Yerleşim Verisi
        </h1>
        <p className="text-start font-bold text-lg">
          Kocaeli’deki konut bölgeleri, nüfus yoğunluğu, imar planları ve yapılaşma istatistiklerini içerir. Şehir planlaması ve kentsel gelişim için kullanılabilir.
        </p>
      </div>,
      clasName: "absolute bottom-64 right-1/3  w-8 h-8 bg-[#DAFAB2] text-[#7F7DFB] rounded-full"
    },
    {
      id: 7,
      content: <div className="flex flex-col items-start justify-between">
        <h1 className="text-start font-extrabold text-xl flex items-center gap-2 border-b-2 border-white/50 pb-1 w-full">
          <Ship />
          Liman ve Kıyı Verisi
        </h1>
        <p className="text-start font-bold text-lg">
          Kocaeli’deki liman faaliyetleri, yük hareketleri, gemi trafiği ve kıyı yapılarıyla ilgili verileri içerir. Deniz taşımacılığı ve lojistik analizleri için kullanılabilir.
        </p>
      </div>,
      clasName: "absolute bottom-40 right-1/5  w-8 h-8 bg-[#DAFAB2] text-[#7F7DFB] rounded-full"
    },
  ];

  return (
    <div
      className="w-full min-h-[100vh] flex flex-col items-center justify-between pt-24"
    >
      <div className=" flex flex-col items-center justify-center w-full">
        <h1 className="text-sm font-extrabold text-center mb-8 flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full">
          Kocaeli Veri Portalında
          <RotatingText
            texts={['Veri İsteyin', 'Veri Bulun', 'Üye Olun', 'Giriş Yapın']}
            mainClassName=" text-black overflow-hidden w-24 justify-start mt-1"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </h1>
        <h1 className="text-center text-[#221A4C] max-w-7xl px-4 mt-12 font-extrabold text-7xl">
          Kocaeli Büyükşehir Belediyesi&apos;nin açık veri portalına hoş geldiniz!

        </h1>

        <Button variant={"outline"} className="mt-16 px-4 py-6 rounded-md bg-[#6558F6] border-none text-accent">
          <a href="datasets" className="text-sm font-semibold">
            Veri Seti Arayın
          </a>
        </Button>
      </div>

      <div className="relative w-full mt-24">
        <img className="w-[100vw]" src={Background} alt="" />


        {tooltips.map((tooltip) => (
          <HomeTooltip
            key={tooltip.id}
            className={tooltip.clasName}
            content={tooltip.content}
            children={<MousePointerClick />}
          />
        ))}
      </div>


    </div>
  );
}

export default Welcome;
