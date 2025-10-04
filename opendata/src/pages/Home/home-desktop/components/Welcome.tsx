import RotatingText from "@/components/RotatingText";
import { Button } from "@/components/ui/button";
import Background from "@/assets/background.svg";
function Welcome() {
  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient(circle farthest-side at 50% -75%, #d6c7ff 54%, #8a9bff 76%)",
      }}
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
          <a href="#datasets" className="text-sm font-semibold">
            Veri Seti Arayın
          </a>
        </Button>
      </div>

      <div className="relative w-full mt-24">
        <img className="w-[100vw]" src={Background} alt="" />

        {/* Örnek buton */}
        <Button
          className="absolute top-10 left-72 w-8 h-8 bg-[#DAFAB2] text-white rounded-full"
        >

        </Button>

        <Button
          className="absolute top-58 left-2/7  w-8 h-8 bg-[#DAFAB2] text-white rounded-full"
        >

        </Button>
        <Button
          className="absolute top-50 right-1/3  w-8 h-8 bg-[#DAFAB2] text-white rounded-full"
        >

        </Button>
        <Button
          className="absolute top-92 left-2/5  w-8 h-8 bg-[#DAFAB2] text-white rounded-full"
        >

        </Button>
        <Button
          className="absolute bottom-12 left-1/2  w-8 h-8 bg-[#DAFAB2] text-white rounded-full"
        >

        </Button>
        <Button
          className="absolute bottom-64 right-1/3  w-8 h-8 bg-[#DAFAB2] text-white rounded-full"
        >

        </Button>
      </div>


    </div>
  );
}

export default Welcome;
