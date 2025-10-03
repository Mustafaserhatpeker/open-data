import LogoSlider from "./inner-components/LogoSlider";
function IntroductionArea() {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-16 border-t bg-[#6A60F2] text-white space-y-8 ">
      <span className=" text-2xl">Size Neler Sunuyoruz</span>
      <span className="text-6xl font-bold max-w-7xl text-center">İstediğiniz Verileri Hızla Bulun ve İşinizi Kolaylaştırın</span>
      <LogoSlider />
    </div>
  );
}

export default IntroductionArea;
