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
            Açık Veri Nasıl Kullanılır?
          </h1>
          <p className="mt-6 text-lg text-white max-w-2xl ">
            Açık veri, gizlilik ve güvenlik ilkelerine uygun biçimde, herkesin erişimine açık, makine tarafından okunabilir ve yeniden kullanılabilir formatlarda yayımlanan veridir.
            Kocaeli Büyükşehir Belediyesi, açık veri yaklaşımıyla şehir verilerini paylaşarak şeffaflığı artırır, yenilikçi projelerin gelişmesini destekler ve dijital dönüşümü hızlandırır.
            <br /> <br />Bu veriler; şehir planlaması, çevre yönetimi, ulaşım optimizasyonu ve enerji verimliliği gibi alanlarda farklı sistemlerle entegre edilerek yeni çözümler üretmeyi sağlar.
            Vatandaşlar, araştırmacılar ve geliştiriciler bu verileri kullanarak şehir yaşamını kolaylaştıran uygulamalar geliştirebilir, analizler yapabilir veya Kocaeli’nin dijital geleceğine katkı sağlayacak projeler üretebilir.

          </p>

        </div>

        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={3000}
          pauseOnHover={false}
        >
          <Card onClick={() => {
            window.location.href = "/datasets";
          }}>
            <div className="p-6">
              <h3 className="text-xl font-semibold">Veri Setleri</h3>
              <p>Veri setleri üzerinden eriştiğiniz verileri projelerinizde kullanabilir, Kocaeli’nin sosyal ve ekonomik gelişimine katkı sağlayabilirsiniz.
              </p>
              <img className="h-60" src={photo1} alt="" />
            </div>
          </Card>
          <Card
            onClick={() => {
              window.location.href = "/organizations";
            }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold">Organizasyonlar</h3>
              <p>Kocaeli Büyükşehir Belediyesi birimlerinin paylaştığı verilerle şehirle ilgili analizler yapabilir, uygulamalar geliştirebilir veya araştırmalarınızı destekleyebilirsiniz.</p>
              <img className="h-60" src={photo2} alt="" />

            </div>
          </Card>
          <Card
            onClick={() => {
              window.location.href = "/istatistics";
            }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold">İstatistikler</h3>
              <p>Kocaeli’nin dijital kalbi verilerle atıyor.İstatistikler sayfası, açık veri setlerinden üretilen dinamik göstergeleri sunarak şehrin performansını izlemeyi, kıyaslamayı ve geleceğe yönelik planlamaları desteklemeyi amaçlar.
                Buradaki her veri, daha akıllı ve sürdürülebilir bir Kocaeli için yol gösterir.</p>
              <img className="h-60" src={photo2} alt="" />

            </div>
          </Card>
          <Card
            onClick={() => {
              window.location.href = "/categories";
            }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold">Kategoriler</h3>
              <p>Kategoriler, açık verileri tematik alanlara ayırarak bilgiye erişimi kolaylaştırır.
                Afet yönetiminden çevreye, ulaşımdan enerjiye kadar birçok alanda verileri keşfedebilir ve Kocaeli’nin akıllı şehir hedeflerine katkı sağlayacak fikirler geliştirebilirsiniz.
              </p>
              <img className="h-60" src={photo2} alt="" />

            </div>
          </Card>
          <Card
            onClick={() => {
              window.location.href = "/datarequests";
            }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold">Veri İsteği</h3>
              <p>Kocaeli’nin açık veri ekosistemine sen de katkı sağla! Bu alandan, ihtiyaç duyduğun verileri talep edebilir veya yeni fikirlerin için paylaşılmasını istediğin veri setlerini önerebilirsin.Her talep, şehrin dijital gelişimine bir adım daha ekler.</p>
              <img className="h-60" src={photo3} alt="" />
            </div>
          </Card>
        </CardSwap >
      </div >
      <LabelGrid />
    </div >
  );
}

export default HomeDesktop;