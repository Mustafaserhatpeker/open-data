import LogoSlider from "./inner-components/LogoSlider";
function IntroductionArea(
  { organizations }: { organizations: any }
) {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-16 bg-transparent text-white space-y-8 ">
      <span className=" text-2xl">Size Neler Sunuyoruz</span>
      <span className="text-2xl font-bold max-w-sm p-2 text-center">İstediğiniz Verileri Hızla Bulun ve İşinizi Kolaylaştırın</span>
      <div className="max-w-7xl mt-24">
        <LogoSlider organizations={organizations} />
      </div>
    </div>
  );
}

export default IntroductionArea;
