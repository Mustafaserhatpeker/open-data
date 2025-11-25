import Welcome from "./components/Welcome";
import IntroductionArea from "./components/IntroductionArea";
import CardSwap, { Card } from '@/components/CardSwap';
import photo1 from '@/assets/photo1.png';
import photo2 from '@/assets/photo2.png';
import photo3 from '@/assets/photo3.png';
import LabelGrid from "./components/LabelGrid";
import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "@/services/organization.service";
function HomeDesktop() {

  const { data: organizationsResp } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getOrganizations(),
  })

  return (
    <div className="flex flex-col items-center justify-start ">
      <Welcome />
      <IntroductionArea organizations={organizationsResp} />

      <div style={{ height: '600px', position: 'relative', width: '100%' }} className="flex flex-row  items-center justify-around pb-32 ">
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 ">
          <h1 className="text-6xl font-bold text-white">
            Aradığınız Veri Setini Bulun.<br /> Bulamadınız mı? İsteyin!
          </h1>
          <p className="mt-6 text-lg text-white max-w-2xl ">
            Kocaeli Büyükşehir Belediyesi sizlere şehire dair farklı alanlarda toplanan veri setlerini sunar. Bu veri setleri ile analizler yapabilir, görselleştirmeler oluşturabilir ve projeler geliştirebilirsiniz. <br /> <br />
            Size sağladığımız veri setlerinde arama yapabilir, kategorilere göre filtreleyebilir ve en güncel verilere kolayca erişebilirsiniz.
            <br /><br />Aradığınız veri setini bulamazsanız, bizimle iletişime geçerek talepte bulunabilirsiniz. Veri talepleriniz doğrultusunda yeni veri setleri ekleyerek, Kocaeli'nin dijital dönüşümüne katkıda bulunmanızı sağlıyoruz.
          </p>

        </div>

        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={false}
        >
          <Card onClick={() => {
            window.location.href = "/datasets";
          }}>
            <div className="p-6">
              <h3 className="text-xl font-semibold">Veri Setlerinde Gezinin</h3>
              <img className="h-90" src={photo1} alt="" />
            </div>
          </Card>
          <Card
            onClick={() => {
              window.location.href = "/organizations";
            }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold">Organizasyonlara Göz Atın</h3>
              <img className="h-90" src={photo2} alt="" />

            </div>
          </Card>
          <Card
            onClick={() => {
              window.location.href = "/datarequests";
            }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold">Bulamadığınız Veri Setini Talep Edin</h3>
              <img className="h-90" src={photo3} alt="" />
            </div>
          </Card>
        </CardSwap >
      </div >
      <LabelGrid />
    </div >
  );
}

export default HomeDesktop;