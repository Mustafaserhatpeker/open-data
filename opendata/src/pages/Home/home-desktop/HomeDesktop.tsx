import Welcome from "./components/Welcome";
import IntroductionArea from "./components/IntroductionArea";
import CardSwap, { Card } from '@/components/CardSwap';
import photo1 from '@/assets/photo1.png';
import photo2 from '@/assets/photo2.png';
import photo3 from '@/assets/photo3.png';
function HomeDesktop() {
  return (
    <div className="flex flex-col items-center justify-start bg-[#6B61F1]">
      <Welcome />
      <IntroductionArea />

      <div style={{ height: '600px', position: 'relative', width: '100%' }} className="flex flex-row  items-center justify-around mb-32">
        <h1 className="text-6xl font-bold text-white  absolute top-1/2 left-1/3 transform -translate-x-1/2">
          Aradığınız Veri Setini Bulun.<br /> Bulamadınız mı? İsteyin!
        </h1>
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={false}
        >
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold">Veri Setlerinde Gezinin</h3>
              <img className="h-90" src={photo1} alt="" />
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold">Organizasyonlara Göz Atın</h3>
              <img className="h-90" src={photo2} alt="" />

            </div>
          </Card>
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold">Bulamadığınız Veri Setini Talep Edin</h3>
              <img className="h-90" src={photo3} alt="" />
            </div>
          </Card>
        </CardSwap>
      </div>

    </div>
  );
}

export default HomeDesktop;