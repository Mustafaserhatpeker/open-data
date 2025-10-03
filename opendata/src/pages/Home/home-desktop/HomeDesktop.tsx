import Welcome from "./components/Welcome";
import IntroductionArea from "./components/IntroductionArea";
import GridArea from "./components/GridArea";
import Photo1 from "@/assets/photo1.webp";
import Photo2 from "@/assets/photo2.jpg";
import Doctor1 from "@/assets/doctor1.jpeg";
import Doctor2 from "@/assets/doctor2.jpg";
import Doctor3 from "@/assets/doctor3.webp";
import Doctor4 from "@/assets/doctor4.jpg";
import Doctor5 from "@/assets/doctor5.jpg";
import MiddleCards from "./components/MiddleCards";
function HomeDesktop() {
  const dataset = [
    {
      id: 1,
      header: "Fizyoterapi Nedir? Neden Önemlidir?",
      description: `Fizyoterapi, kas-iskelet sistemi başta olmak üzere sinir ve solunum
          sistemleri gibi pek çok alanda fonksiyon kaybını önlemeyi, var olan
          rahatsızlıkları iyileştirmeyi ve bireyin yaşam kalitesini artırmayı
          amaçlayan bilimsel ve bütüncül bir tedavi yaklaşımıdır. Genellikle
          ağrı, hareket kısıtlılığı, duruş bozuklukları, yaralanmalar ve cerrahi
          sonrası rehabilitasyon gibi durumlarda tercih edilir.
          Fizyoterapistler; egzersiz programları, manuel terapi, elektroterapi,
          sıcak-soğuk uygulamaları ve benzeri çeşitli yöntemlerle hastaya özel
          bir tedavi süreci yürütür. Bu sayede bireyler hem fiziksel hem de
          psikolojik olarak daha sağlıklı bir yaşama kavuşabilir. Özellikle
          sporcular, yaşlı bireyler, felç geçiren hastalar ve ortopedik sorunlar
          yaşayan kişiler için fizyoterapi büyük önem taşır. Günlük yaşamda
          rahat hareket edebilmek, bağımsızlık kazanmak ve ağrısız bir yaşam
          sürmek adına fizyoterapi, modern tıbbın vazgeçilmez destek
          alanlarından biri hâline gelmiştir.Fizyoterapi, hastanın yaşam
          kalitesini artırmayı hedeflerken, aynı zamanda bireyin fiziksel
          bağımsızlığını ve işlevselliğini de geri kazandırmayı amaçlar. Bu
          nedenle, erken teşhis ve tedavi ile birlikte düzenli fizyoterapi
          seansları, hastaların iyileşme süreçlerini hızlandırır ve uzun vadede
          etkilerini olumlu yönde destekler`,
      img: Photo1,
    },

    {
      id: 2,
      header: "Biz Size Neler Sunuyoruz?",
      description: `Fizyoterapi, kas-iskelet sistemi başta olmak üzere sinir ve solunum
          sistemleri gibi pek çok alanda fonksiyon kaybını önlemeyi, var olan
          rahatsızlıkları iyileştirmeyi ve bireyin yaşam kalitesini artırmayı
          amaçlayan bilimsel ve bütüncül bir tedavi yaklaşımıdır. Genellikle
          ağrı, hareket kısıtlılığı, duruş bozuklukları, yaralanmalar ve cerrahi
          sonrası rehabilitasyon gibi durumlarda tercih edilir.
          Fizyoterapistler; egzersiz programları, manuel terapi, elektroterapi,
          sıcak-soğuk uygulamaları ve benzeri çeşitli yöntemlerle hastaya özel
          bir tedavi süreci yürütür. Bu sayede bireyler hem fiziksel hem de
          psikolojik olarak daha sağlıklı bir yaşama kavuşabilir. Özellikle
          sporcular, yaşlı bireyler, felç geçiren hastalar ve ortopedik sorunlar
          yaşayan kişiler için fizyoterapi büyük önem taşır. Günlük yaşamda
          rahat hareket edebilmek, bağımsızlık kazanmak ve ağrısız bir yaşam
          sürmek adına fizyoterapi, modern tıbbın vazgeçilmez destek
          alanlarından biri hâline gelmiştir.Fizyoterapi, hastanın yaşam
          kalitesini artırmayı hedeflerken, aynı zamanda bireyin fiziksel
          bağımsızlığını ve işlevselliğini de geri kazandırmayı amaçlar. Bu
          nedenle, erken teşhis ve tedavi ile birlikte düzenli fizyoterapi
          seansları, hastaların iyileşme süreçlerini hızlandırır ve uzun vadede
          etkilerini olumlu yönde destekler`,
      img: Photo2,
    },
  ];
  const serviceDataset = [
    {
      id: 1,
      header: "Ortopedik Rehabilitasyon",
      description: `Kırık, çıkık, kas-tendon yaralanmaları, protez ameliyatları sonrası uygulanan tedavi sürecidir.`,
      img: Photo1,
    },

    {
      id: 2,
      header: "Nörolojik Rehabilitasyon",
      description: `Felç (inme), beyin hasarı, omurilik yaralanmaları, Parkinson gibi hastalıklarda hareket ve dengeyi geliştirmeye yönelik tedavilerdir.`,
      img: Photo2,
    },
    {
      id: 3,
      header: "Sporcu Rehabilitasyonu",
      description: `Sporcularda görülen kas ve eklem yaralanmalarının tedavisi ve spor performansının artırılmasına yönelik çalışmalardır.`,
      img: Photo1,
    },
    {
      id: 4,
      header: "Pediatrik (Çocuk) Fizyoterapi",
      description: `Serebral palsi, spina bifida, kas hastalıkları gibi çocukluk dönemi hastalıklarında uygulanan özel fizyoterapi yaklaşımlarıdır.`,
      img: Photo2,
    },
    {
      id: 5,
      header: "Geriatrik (Yaşlı) Rehabilitasyon",
      description: `Yaşlanmaya bağlı hareket kısıtlılıkları, kas güçsüzlüğü ve denge sorunlarının tedavisini kapsar.`,
      img: Photo1,
    },
    {
      id: 6,
      header: "Kardiyopulmoner Rehabilitasyon",
      description: `Kalp hastalıkları ve solunum problemleri olan bireylerde dayanıklılığı ve solunum kapasitesini artırmayı amaçlar.`,
      img: Photo2,
    },
    {
      id: 7,
      header: "Manuel Terapi",
      description: `Fizyoterapistin elleriyle uyguladığı, eklem ve yumuşak dokulara yönelik özel tedavi teknikleridir.`,
      img: Photo1,
    },
    {
      id: 8,
      header: "Ağrı Tedavisi (Kronik ve Akut)",
      description: `Bel, boyun, sırt gibi bölgelerdeki ağrıların giderilmesine yönelik özel programlar içerir.`,
      img: Photo2,
    },
    {
      id: 9,
      header: "Lenfödem Tedavisi",
      description: `Lenf bezlerinin düzgün çalışmaması sonucu oluşan ödemlerin giderilmesine yönelik özel drenaj ve bandajlama teknikleri uygulanır.`,
      img: Photo1,
    },
    {
      id: 10,
      header: "Duruş ve Skolyoz Eğitimi",
      description: `Postür bozuklukları ve omurga eğrilikleri (skolyoz) için yapılan düzeltici egzersizler ve eğitim programlarıdır.`,
      img: Photo2,
    },
    {
      id: 11,
      header: "Kadın Sağlığı Fizyoterapisi",
      description: `Hamilelik öncesi ve sonrası dönemde yaşanan bel ağrısı, pelvik taban disfonksiyonları, idrar kaçırma gibi durumların tedavisinde uygulanan özel fizyoterapi programlarıdır.`,
      img: Photo1,
    },
    {
      id: 12,
      header: "Ergonomik Danışmanlık ve İş Yeri Fizyoterapisi",
      description: `Çalışma ortamında duruş, masa başı alışkanlıkları ve tekrarlayan zorlanmaların neden olduğu kas-iskelet problemlerini önlemeye ve tedavi etmeye yönelik danışmanlık ve egzersiz uygulamalarıdır.`,
      img: Photo2,
    },
  ];
  const doctorDataset = [
    {
      id: 1,
      header: "Uzm. Fzt. Ayşe Yılmaz",
      description:
        "İstanbul Üniversitesi Fizyoterapi ve Rehabilitasyon Bölümü mezunu. Ortopedik rehabilitasyon alanında 10 yılı aşkın klinik deneyime sahip.",
      img: Doctor1,
    },
    {
      id: 2,
      header: "Uzm. Fzt. Mehmet Karaca",
      description:
        "Hacettepe Üniversitesi mezunu. Nörolojik hastalıklar üzerine yüksek lisans yaptı, uluslararası rehabilitasyon kongrelerinde görev aldı.",
      img: Doctor2,
    },
    {
      id: 3,
      header: "Fzt. Elif Demir",
      description:
        "Ankara Üniversitesi mezunu. Sporcu rehabilitasyonu üzerine uzmanlaşmış, profesyonel spor kulüplerinde fizyoterapist olarak çalışmıştır.",
      img: Doctor3,
    },
    {
      id: 4,
      header: "Uzm. Fzt. Büşra Aksoy",
      description:
        "Dokuz Eylül Üniversitesi mezunu. Pediatrik fizyoterapi alanında özel eğitimlere katılmış, serebral palsi ve kas hastalıkları ile ilgili çalışmaktadır.",
      img: Doctor4,
    },
    {
      id: 5,
      header: "Fzt. Hasan Ergin",
      description:
        "Pamukkale Üniversitesi mezunu. Geriatrik fizyoterapi alanında uzman, yaşlı bireylerde denge ve mobilite üzerine çalışmaktadır.",
      img: Doctor5,
    },
    {
      id: 6,
      header: "Uzm. Fzt. Zeynep Toprak",
      description:
        "Ege Üniversitesi mezunu. Kardiyopulmoner rehabilitasyon alanında eğitim almış, solunum terapileri üzerine deneyimlidir.",
      img: Doctor2,
    },
    {
      id: 7,
      header: "Fzt. Emre Özkan",
      description:
        "Marmara Üniversitesi mezunu. Manuel terapi ve mobilizasyon tekniklerinde uzman, çeşitli uluslararası kurslara katılmıştır.",
      img: Doctor1,
    },
    {
      id: 8,
      header: "Uzm. Fzt. Selin Kurt",
      description:
        "İzmir Katip Çelebi Üniversitesi mezunu. Akut ve kronik ağrı tedavisinde uzmanlaşmış, kişiye özel egzersiz programları geliştirir.",
      img: Doctor3,
    },
    {
      id: 9,
      header: "Fzt. Cihan Yıldız",
      description:
        "Trakya Üniversitesi mezunu. Lenfödem terapisi ve onkolojik fizyoterapi üzerine sertifikalı eğitimler almıştır.",
      img: Doctor4,
    },
    {
      id: 10,
      header: "Fzt. Melis Aydın",
      description:
        "Yeditepe Üniversitesi mezunu. Skolyoz ve duruş bozuklukları üzerine eğitimli, Schroth terapisi konusunda deneyimlidir.",
      img: Doctor5,
    },
    {
      id: 11,
      header: "Uzm. Fzt. Derya Koç",
      description:
        "Başkent Üniversitesi mezunu. Pelvik taban ve kadın sağlığı fizyoterapisi üzerine uzmanlaşmış, doğum sonrası rehabilitasyon uygulamaktadır.",
      img: Doctor1,
    },
    {
      id: 12,
      header: "Fzt. Okan Demirtaş",
      description:
        "Sakarya Üniversitesi mezunu. Ergonomi, iş yeri sağlığı ve ofis çalışanlarında görülen postür bozuklukları üzerine çalışmaktadır.",
      img: Doctor2,
    },
  ];

  return (
    <div className=" flex flex-col items-center justify-start  space-y-18">
      <Welcome />
      <MiddleCards />
      {dataset.map((item) => (
        <IntroductionArea
          key={item.id}
          header={item.header}
          description={item.description}
          img={item.img}
        />
      ))}
      <GridArea dataset={serviceDataset} header="Hizmetlerimiz" />
      <GridArea dataset={doctorDataset} header="Profesyonel Kadro" />
    </div>
  );
}

export default HomeDesktop;
