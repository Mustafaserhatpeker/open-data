import Welcome from "./components/Welcome";
import IntroductionArea from "./components/IntroductionArea";
import CardSwap, { Card } from '@/components/CardSwap';

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
              <h3 className="text-xl font-semibold">Card 1</h3>
              <p>Your content here</p>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold">Card 2</h3>
              <p>Your content here</p>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold">Card 3</h3>
              <p>Your content here</p>
            </div>
          </Card>
        </CardSwap>
      </div>
    </div>
  );
}

export default HomeDesktop;