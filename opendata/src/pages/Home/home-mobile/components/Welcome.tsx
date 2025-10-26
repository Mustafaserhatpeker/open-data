import RotatingText from "@/components/RotatingText";
import { Button } from "@/components/ui/button";

import BlurText from "@/components/BlurText";

function Welcome() {


  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-between pt-24">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-sm font-extrabold text-center mb-8 flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full">
          Kocaeli Veri Portalında
          <RotatingText
            texts={['Veri İsteyin', 'Veri Bulun', 'Üye Olun', 'Giriş Yapın']}
            mainClassName="text-black overflow-hidden w-24 justify-start mt-1"
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

        <BlurText
          text="Kocaeli Büyükşehir Belediyesi açık veri portalına hoş geldiniz!"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-xl mb-8 max-w-sm text-center font-extrabold p-2"
        />

        <Button
          variant={"outline"}
          className="mt-16 px-4 py-6 rounded-md bg-[#6558F6] border-none text-accent"
        >
          <a href="datasets" className="text-sm font-semibold">
            Veri Seti Arayın
          </a>
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
