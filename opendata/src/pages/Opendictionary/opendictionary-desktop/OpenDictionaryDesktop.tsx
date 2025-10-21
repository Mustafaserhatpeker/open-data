import { Card, CardContent, CardHeader } from "@/components/ui/card";

const dictionaryData = [

    {
        term: "Açık Veri",
        definition: "Açık veri; kamu ya da kurumların ürettiği verilerin herkesin ücretsiz ve ayrım gözetmeden erişebileceği, makinece okunabilir biçimlerde (CSV, JSON, GeoJSON vb.) ve açık lisanslarla yayımlanmasıdır. Amaç; şeffaflık, hesap verebilirlik, katılım ve yeniliği desteklemektir."
    },
    {
        term: "Veri Seti",
        definition: "Bir konuyu tanımlayan dosyalarla (CSV, JSON, vb.) bu dosyaları açıklayan bilgilerden oluşan yayın paketidir. En temel temsilinde tablo yapısı vardır: satırlar kayıtları, sütunlar değişkenleri gösterir; ek olarak açıklama, zaman/mekân kapsamı, lisans ve sürüm bilgisi bulunur."
    },
    {
        term: "SQL",
        definition: "SQL (Structured Query Language), ilişkisel veritabanlarında veri ekleme (INSERT), güncelleme (UPDATE), silme (DELETE) ve sorgulama (SELECT) işlemlerini gerçekleştiren standart dildir. JOIN, GROUP BY, ORDER BY, WHERE, HAVING gibi ifadeler karmaşık sorgular kurmayı sağlar; DDL komutları (CREATE/ALTER/DROP) ise şema yönetimi için kullanılır."
    },
    {
        term: "CBS (Coğrafi Bilgi Sistemleri)",
        definition: "CBS; konuma bağlı verilerin toplanması, saklanması, işlenmesi ve harita üzerinde sunulmasını sağlayan bütünleşik yapıdır. Mekânsal veriler koordinatla ilişkilidir; bu sayede katman mantığıyla görüntülenir, sorgulanır ve analiz edilir (ör. yakınlık, kesişim, alan/uzunluk hesapları)."
    },
    {
        term: "API (Uygulama Programlama Arayüzü)",
        definition: "API, yazılımların veriye ya da hizmete standart kurallar çerçevesinde erişmesini sağlayan arayüzdür. Gerçek zamanlı veya güncel veri sağlayabilir; kullanıcılar gerekli parametrelerle yalnızca ihtiyaç duydukları alt küme bilgiyi çekebilir. Kimlik doğrulama (örn. anahtar/token) ve istek sınırları API politikalarıyla yönetilir."
    },
    {
        term: "XML",
        definition: "XML, veriyi etiketlerle tanımlayan esnek bir işaretleme biçimidir. Yapının şemayla (XSD) doğrulanabilmesi ve insan/ makine tarafından okunabilir olması veri değişimi için tercih edilmesini sağlar; ancak hacim açısından JSON’a göre daha ağır olabilir."
    },
    {
        term: "HTML",
        definition: "HTML, web sayfalarının iskeletini oluşturan işaretleme dilidir. Bazı veri yayınları doğrudan sayfa içinde sunulsa da, yeniden kullanım ve otomasyon için veri dosyası (CSV/JSON) ya da API erişimi tercih edilir."
    },
    {
        term: "ETL",
        definition: "ETL (Extract, Transform, Load), veriyi bir kaynaktan alıp (Extract), işleyip dönüştürerek (Transform) hedef sisteme yükleme (Load) sürecidir. Veri ambarları ve analiz platformları için kullanılır; veri kalitesini artırır ve farklı kaynaklardan gelen verilerin uyumlu hale gelmesini sağlar."
    },
    {
        term: "Filtreleme",
        definition: "Arama sonuçlarını belirli koşullara (tarih aralığı, kategori, etiket, organizasyon vb.) göre daraltma işlemidir. Filtreler, kullanıcıların ilgili veri setine hızlı ve isabetli şekilde ulaşmasını sağlar."
    },
    {
        term: "Metaveri",
        definition: "Metaveri; veriyi tanımlayan yapılandırılmış bilgidir: başlık, açıklama, üretici/organizasyon, lisans, zaman ve mekân kapsamı, güncelleme sıklığı, sürüm ve kalite notları gibi alanları içerir. İyi metaveri, arama, karşılaştırma ve doğru kullanım için kritik önemdedir."
    },
    {
        term: "PostgreSQL",
        definition: "PostgreSQL; açık kaynak, ACID uyumlu bir ilişkisel veritabanı yönetim sistemidir. Gelişmiş sorgu yetenekleri, genişletilebilirlik ve PostGIS eklentisiyle mekânsal veri desteği sunar; büyük ölçekli kurumsal uygulamalarda yaygın kullanılır."
    },
    {
        term: "Shapefile (SHP)",
        definition: "Shapefile; nokta, çizgi ve alan geometrilerini ve bunlara ait öznitelikleri saklayan, CBS’de çok kullanılan bir vektör veri biçim ailesidir. Birden fazla dosyadan (SHP, SHX, DBF vb.) oluşur; basit yapısı nedeniyle geniş destek görür, ancak modern alternatiflere göre bazı sınırlamaları vardır."
    },
    {
        term: "Veri Otomasyonu",
        definition: "Verinin toplanması, dönüştürülmesi, doğrulanması ve yayımlanmasını otomatikleştiren uçtan uca süreçtir. Zamanlanmış işler ve izleme (monitoring) mekanizmaları ile tutarlılık, hız ve tekrarlanabilirlik sağlanır."
    },
    {
        term: "Mekânsal (Geospatial) Veri",
        definition: "Koordinat, adres veya idari kod gibi konumsal referans içeren her türlü veridir. Vektör (nokta/çizgi/alan) ve raster (piksel tabanlı) olarak saklanabilir; haritalama ve mekânsal analizler için temel kaynaktır."
    },
    {
        term: "GeoServer",
        definition: "GeoServer; OGC standartlarını (WMS, WFS, WMTS vb.) uygulayan, mekânsal veriyi servis etmeye yarayan Java tabanlı bir sunucudur. Katman yayınlama, stil yönetimi ve farklı veri kaynaklarına bağlanma yetenekleriyle kurum içi/ dışı harita servislerini kolaylaştırır."
    },
    {
        term: "JSON",
        definition: "JSON; anahtar–değer çiftleriyle veriyi hafif ve anlaşılır biçimde temsil eden metin formatıdır. Web servislerinde (REST API) yaygındır; hız, okunabilirlik ve geniş dil desteği nedeniyle veri alışverişinde tercih edilir."
    },
    {
        term: "PDF",
        definition: "PDF (Portable Document Format); biçimi bozulmadan görüntülenebilen ve yazdırılabilen belge formatıdır. Rapor ve çıktı paylaşımında uygundur; ancak ham veri analizi için makinece okunabilir alternatifler (CSV/JSON) önerilir."
    },
    {
        term: "GeoJSON",
        definition: "GeoJSON; coğrafi nesneleri (Point, LineString, Polygon vb.) JSON yapısıyla tanımlar. Web tabanlı haritalarda hafif ve yaygın bir değişim biçimidir; özellik verileri (öznitelikler) aynı gövdede taşınır."
    },
];

function OpenDictionaryDesktop() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Açık Veri Sözlüğü</h1>
            <h5 className="text-2xl font-bold  mb-6">Veri Nedir?</h5>

            <p className="mb-4">
                Veri; ölçüm, sayım, gözlem veya kayıt süreçlerinden çıkan ham gerçeklik parçalarıdır. Tek başına yorum taşımayabilir; anlam kazanması için toplanır, temizlenir, gruplanır ve işlenerek enformasyona dönüştürülür. Veriler nicel (sayısal) ya da nitel (metinsel/katmanlı) olabilir; ayrıca yapılandırılmış, yarı yapılandırılmış veya yapılandırılmamış formda tutulabilir. Kullanım amacına göre statik, dinamik, açık veya ücretli/büyük veri sınıflarına da ayrılabilir.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {dictionaryData.map((item, index) => (
                    <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="font-semibold text-lg">{item.term}</CardHeader>
                        <CardContent className="text-gray-700">{item.definition}</CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default OpenDictionaryDesktop;
