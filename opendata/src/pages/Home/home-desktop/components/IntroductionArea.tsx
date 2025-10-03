import ScrollVelocity from "@/components/ScrollVelocity";
function IntroductionArea() {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-16 border-t bg-[#6A60F2] text-white space-y-8 ">
      <span className=" text-2xl">Size Neler Sunuyoruz</span>
      <span className="text-6xl font-bold max-w-7xl text-center">İstediğiniz Verileri Hızla Bulun ve İşinizi Kolaylaştırın</span>
      <ScrollVelocity
        texts={['React Bits', 'Scroll Down']}
        velocity={20}
        className="custom-scroll-text"
      />
    </div>
  );
}

export default IntroductionArea;
