import { Card, CardContent, CardHeader } from "@/components/ui/card";

const dictionaryData = [
    {
        term: "Veri",
        definition: "Veri; ölçüm, sayım, gözlem veya kayıt süreçlerinden çıkan ham gerçeklik parçalarıdır. Tek başına yorum taşımayabilir; anlam kazanması için toplanır, temizlenir, gruplanır ve işlenerek enformasyona dönüştürülür. Veriler nicel (sayısal) ya da nitel (metinsel/katmanlı) olabilir; ayrıca yapılandırılmış, yarı yapılandırılmış veya yapılandırılmamış formda tutulabilir. Kullanım amacına göre statik, dinamik, açık veya ücretli/büyük veri sınıflarına da ayrılabilir."
    },
    {
        term: "Açık Veri",
        definition: "Açık veri; kamu ya da kurumların ürettiği verilerin herkesin ücretsiz ve ayrım gözetmeden erişebileceği, makinece okunabilir biçimlerde (CSV, JSON, GeoJSON vb.) ve açık lisanslarla yayımlanmasıdır. Amaç; şeffaflık, hesap verebilirlik, katılım ve yeniliği desteklemektir."
    },
    {
        term: "Veri Seti",
        definition: "Bir konuyu tanımlayan dosyalarla (CSV, JSON, vb.) bu dosyaları açıklayan bilgilerden oluşan yayın paketidir. En temel temsilinde tablo yapısı vardır: satırlar kayıtları, sütunlar değişkenleri gösterir; ek olarak açıklama, zaman/mekân kapsamı, lisans ve sürüm bilgisi bulunur."
    },
    {
        term: "CKAN",
        definition: "Açık veri portalları için yaygın kullanılan açık kaynak katalog yazılımıdır. Veri seti, kaynak ve organizasyon kavramlarını standartlaştırır."
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
    // Buraya kalan tüm terimleri aynı formatta ekleyebilirsiniz...
];

function OpenDictionaryDesktop() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Açık Veri Sözlüğü</h1>
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
