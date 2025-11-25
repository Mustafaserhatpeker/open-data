import LogoSlider from "./inner-components/LogoSlider";
function IntroductionArea(
  { organizations }: { organizations: any }
) {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-16 border-t  text-white space-y-8 ">
      <span className=" text-2xl">Size Neler Sunuyoruz</span>
      <span className="text-6xl font-bold max-w-[80%] text-center">İstediğiniz Verileri Hızla Bulun ve İşinizi Kolaylaştırın</span>
      <div className="max-w-7xl mt-24">
        <LogoSlider organizations={organizations} />
      </div>
    </div>
  );
}

export default IntroductionArea;
