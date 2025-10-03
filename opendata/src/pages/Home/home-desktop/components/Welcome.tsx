import RotatingText from "@/components/RotatingText";
function Welcome() {
  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient(circle farthest-side at 50% -75%, #d6c7ff 54%, #8a9bff 76%)",
      }}
      className="w-full min-h-[100vh] flex flex-col items-center justify-start py-24"
    >
      <h1 className="text-sm font-extrabold text-start mb-8 flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full">
        Kocaeli Veri Portalında
        <RotatingText
          texts={['Veri İsteyin', 'Veri Bulun', 'Üye Olun', 'Giriş Yapın']}
          mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
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

    </div>
  );
}

export default Welcome;
