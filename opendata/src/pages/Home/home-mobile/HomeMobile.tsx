import Welcome from "./components/Welcome";
import IntroductionArea from "./components/IntroductionArea";
import photo1 from '@/assets/photo1.png';
import photo2 from '@/assets/photo2.png';
import photo3 from '@/assets/photo3.png';
import LabelGrid from "./components/LabelGrid";
import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "@/services/organization.service";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function HomeMobile() {
  const { data: organizationsResp } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getOrganizations(),
  })

  return (
    <div className="flex flex-col items-center justify-start">
      <Welcome />
      <IntroductionArea organizations={organizationsResp} />

      <div className="w-full flex flex-col items-center justify-center pb-32 bg-transparent">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl max-w-xs font-bold text-white">
            Aradığınız Veri Setini Bulun.<br /> Bulamadınız mı? İsteyin!
          </h1>
          <p className="mt-6 text-md text-white max-w-xs">
            Kocaeli Büyükşehir Belediyesi sizlere şehire dair farklı alanlarda toplanan veri setlerini sunar. Bu veri setleri ile analizler yapabilir, görselleştirmeler oluşturabilir ve projeler geliştirebilirsiniz. <br /><br />
            Size sağladığımız veri setlerinde arama yapabilir, kategorilere göre filtreleyebilir ve en güncel verilere kolayca erişebilirsiniz.
            <br /><br />Aradığınız veri setini bulamazsanız, bizimle iletişime geçerek talepte bulunabilirsiniz. Veri talepleriniz doğrultusunda yeni veri setleri ekleyerek, Kocaeli'nin dijital dönüşümüne katkıda bulunmanızı sağlıyoruz.
          </p>
        </div>

        {/* ✅ Carousel */}
        <Carousel className="w-full max-w-xs mt-8">
          <CarouselContent>

            <CarouselItem>
              <Card onClick={() => (window.location.href = "/datasets")} className="cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-semibold text-center">Veri Setlerinde Gezinin</h3>
                  <img className="h-40 mt-4" src={photo1} alt="" />
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card onClick={() => (window.location.href = "/organizations")} className="cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-semibold text-center">Organizasyonlara Göz Atın</h3>
                  <img className="h-40 mt-4" src={photo2} alt="" />
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card onClick={() => (window.location.href = "/datarequests")} className="cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-semibold text-center"> Veri Setini Talep Edin</h3>
                  <img className="h-40 mt-4" src={photo3} alt="" />
                </CardContent>
              </Card>
            </CarouselItem>

          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <LabelGrid />
    </div>
  );
}

export default HomeMobile;
