import { type Dataset, type Organization, type Category, type Tag, type Format, type User, type DataRequest, type Comment } from "@/lib/types"

export const organizations: Organization[] = [
    {
        id: "org1",
        name: "Open Data Istanbul",
        description: "İstanbul Büyükşehir Belediyesi açık veri platformu.",
        logoUrl: "https://via.placeholder.com/100",
        website: "https://data.ibb.gov.tr",
        contactEmail: "info@ibb.gov.tr",
        datasetsCount: 25,
        followersCount: 120,
        createdAt: "2023-01-15",
        updatedAt: "2024-09-01"
    },
    {
        id: "org2",
        name: "TÜİK",
        description: "Türkiye İstatistik Kurumu resmi verileri.",
        logoUrl: "https://via.placeholder.com/100",
        website: "https://data.tuik.gov.tr",
        datasetsCount: 42,
        followersCount: 300,
        createdAt: "2022-11-10",
        updatedAt: "2024-08-12"
    }
]

export const categories: Category[] = [
    { id: "cat1", name: "Ulaşım", datasetsCount: 12 },
    { id: "cat2", name: "Enerji", datasetsCount: 8 },
    { id: "cat3", name: "Çevre", datasetsCount: 5 }
]

export const tags: Tag[] = [
    { id: "tag1", name: "trafik", datasetsCount: 10 },
    { id: "tag2", name: "hava-kalitesi", datasetsCount: 5 },
    { id: "tag3", name: "enerji", datasetsCount: 7 },
    { id: "tag4", name: "nüfus", datasetsCount: 4 }
]

export const formats: Format[] = [
    { id: "fmt1", name: "CSV", mimeType: "text/csv", datasetsCount: 18 },
    { id: "fmt2", name: "JSON", mimeType: "application/json", datasetsCount: 10 },
    { id: "fmt3", name: "XML", mimeType: "application/xml", datasetsCount: 7 }
]

export const users: User[] = [
    {
        id: "usr1",
        username: "admin",
        fullName: "Admin User",
        role: "admin",
        joinedAt: "2023-02-10"
    },
    {
        id: "usr2",
        username: "data.editor",
        fullName: "Data Editor",
        role: "editor",
        organizationId: "org1",
        joinedAt: "2023-05-12"
    }
]

export const datasets: Dataset[] = [
    {
        id: "ds1",
        title: "İstanbul Trafik Yoğunluğu Verisi",
        description:
            "İstanbul genelinde anlık trafik yoğunluğu bilgisi. Her 5 dakikada bir güncellenir.",
        organizationId: "org1",
        organization: organizations[0],
        categories: ["cat1"],
        tags: ["tag1"],
        formats: ["CSV", "JSON"],
        resources: [
            {
                id: "res1",
                name: "Trafik Yoğunluğu (CSV)",
                url: "trafik.csv",
                format: "CSV",
                size: 204800,
                createdAt: "2023-10-01"
            },
            {
                id: "res2",
                name: "Trafik Yoğunluğu (JSON)",
                url: "trafik.json",
                format: "JSON",
                createdAt: "2023-10-01"
            }
        ],
        createdBy: "usr2",
        createdAt: "2023-10-01",
        updatedAt: "2023-10-10",
        isOpenData: true,
        license: "CC-BY-4.0",
        version: "1.2",
        viewsCount: 1200,
        downloadsCount: 350,
        followersCount: 25
    },
    {
        id: "ds2",
        title: "Türkiye Elektrik Üretim İstatistikleri",
        description: "Türkiye genelinde elektrik üretim ve tüketim istatistikleri (2023).",
        organizationId: "org2",
        organization: organizations[1],
        categories: ["cat2"],
        tags: ["tag3"],
        formats: ["CSV"],
        resources: [
            {
                id: "res3",
                name: "Elektrik Üretim 2023",
                url: "elektrik-2023.csv",
                format: "CSV",
                size: 1048576,
                createdAt: "2023-09-01"
            }
        ],
        createdBy: "usr1",
        createdAt: "2023-09-01",
        updatedAt: "2023-09-05",
        isOpenData: true,
        license: "CC-BY-SA-4.0",
        version: "1.0",
        viewsCount: 950,
        downloadsCount: 220,
        followersCount: 18
    },
    {
        id: "ds3",
        title: "İstanbul Otobüs Hatları",
        description: "İstanbul genelindeki otobüs hatları ve durak bilgileri.",
        organizationId: "org1",
        organization: organizations[0],
        categories: ["cat1"],
        tags: ["tag1"],
        formats: ["CSV", "JSON"],
        resources: [
            {
                id: "res4",
                name: "Otobüs Hatları (CSV)",
                url: "otobus-hatlari.csv",
                format: "CSV",
                size: 356000,
                createdAt: "2023-07-12"
            },
            {
                id: "res5",
                name: "Otobüs Hatları (JSON)",
                url: "otobus-hatlari.json",
                format: "JSON",
                createdAt: "2023-07-12"
            }
        ],
        createdBy: "usr2",
        createdAt: "2023-07-12",
        updatedAt: "2023-08-01",
        isOpenData: true,
        license: "CC-BY-4.0",
        version: "1.0",
        viewsCount: 780,
        downloadsCount: 290,
        followersCount: 16
    },
    {
        id: "ds4",
        title: "Hava Kalitesi İstasyon Ölçümleri",
        description: "İstanbul genelindeki hava kalitesi istasyonlarından PM2.5, PM10, NO2 ölçümleri.",
        organizationId: "org1",
        organization: organizations[0],
        categories: ["cat3"],
        tags: ["tag2"],
        formats: ["CSV", "JSON", "XML"],
        resources: [
            {
                id: "res6",
                name: "Hava Kalitesi (CSV)",
                url: "hava-kalitesi.csv",
                format: "CSV",
                size: 512000,
                createdAt: "2023-06-05"
            },
            {
                id: "res7",
                name: "Hava Kalitesi (JSON)",
                url: "hava-kalitesi.json",
                format: "JSON",
                createdAt: "2023-06-05"
            },
            {
                id: "res8",
                name: "Hava Kalitesi (XML)",
                url: "hava-kalitesi.xml",
                format: "XML",
                createdAt: "2023-06-05"
            }
        ],
        createdBy: "usr2",
        createdAt: "2023-06-05",
        updatedAt: "2023-07-01",
        isOpenData: true,
        license: "CC-BY-4.0",
        version: "1.1",
        viewsCount: 1120,
        downloadsCount: 410,
        followersCount: 22
    },
    {
        id: "ds5",
        title: "İlçe Nüfus Dağılımı 2023",
        description: "Türkiye genelinde ilçe bazında nüfus dağılımı (2023).",
        organizationId: "org2",
        organization: organizations[1],
        categories: ["cat3"],
        tags: ["tag4"],
        formats: ["CSV"],
        resources: [
            {
                id: "res9",
                name: "İlçe Nüfus 2023 (CSV)",
                url: "ilce-nufus-2023.csv",
                format: "CSV",
                size: 734003,
                createdAt: "2023-12-20"
            }
        ],
        createdBy: "usr1",
        createdAt: "2023-12-20",
        updatedAt: "2024-01-05",
        isOpenData: true,
        license: "CC-BY-SA-4.0",
        version: "1.0",
        viewsCount: 1380,
        downloadsCount: 560,
        followersCount: 35
    },
    {
        id: "ds6",
        title: "Toplu Taşıma Kullanım İstatistikleri",
        description: "Aylık metro, metrobüs ve otobüs kullanım istatistikleri.",
        organizationId: "org1",
        organization: organizations[0],
        categories: ["cat1"],
        tags: ["tag1"],
        formats: ["JSON"],
        resources: [
            {
                id: "res10",
                name: "Toplu Taşıma Kullanımı (JSON)",
                url: "toplu-tasima.json",
                format: "JSON",
                createdAt: "2023-05-10"
            }
        ],
        createdBy: "usr2",
        createdAt: "2023-05-10",
        updatedAt: "2023-06-01",
        isOpenData: true,
        license: "CC-BY-4.0",
        version: "1.0",
        viewsCount: 665,
        downloadsCount: 180,
        followersCount: 12
    },
    {
        id: "ds7",
        title: "Enerji Tüketimi Mahalle Bazlı",
        description: "Mahalle bazında elektrik tüketim istatistikleri.",
        organizationId: "org2",
        organization: organizations[1],
        categories: ["cat2"],
        tags: ["tag3"],
        formats: ["CSV", "JSON"],
        resources: [
            {
                id: "res11",
                name: "Enerji Tüketimi (CSV)",
                url: "enerji-tuketimi.csv",
                format: "CSV",
                size: 845000,
                createdAt: "2023-03-15"
            },
            {
                id: "res12",
                name: "Enerji Tüketimi (JSON)",
                url: "enerji-tuketimi.json",
                format: "JSON",
                createdAt: "2023-03-15"
            }
        ],
        createdBy: "usr1",
        createdAt: "2023-03-15",
        updatedAt: "2023-04-01",
        isOpenData: true,
        license: "CC-BY-SA-4.0",
        version: "1.0",
        viewsCount: 720,
        downloadsCount: 245,
        followersCount: 14
    },
    {
        id: "ds8",
        title: "Geri Dönüşüm Toplama Noktaları",
        description: "İstanbul genelinde geri dönüşüm konteyner ve toplama noktalarının konumları.",
        organizationId: "org1",
        organization: organizations[0],
        categories: ["cat3"],
        tags: ["tag2"],
        formats: ["JSON"],
        resources: [
            {
                id: "res13",
                name: "Toplama Noktaları (JSON)",
                url: "geri-donusum-noktalari.json",
                format: "JSON",
                createdAt: "2023-02-18"
            }
        ],
        createdBy: "usr2",
        createdAt: "2023-02-18",
        updatedAt: "2023-03-01",
        isOpenData: true,
        license: "CC-BY-4.0",
        version: "1.0",
        viewsCount: 540,
        downloadsCount: 160,
        followersCount: 9
    },
    {
        id: "ds9",
        title: "Şehir İçi Ortalama Hız",
        description: "İstanbul ilçelerinde saatlik ortalama araç hızları.",
        organizationId: "org1",
        organization: organizations[0],
        categories: ["cat1"],
        tags: ["tag1"],
        formats: ["CSV"],
        resources: [
            {
                id: "res14",
                name: "Ortalama Hız (CSV)",
                url: "ortalama-hiz.csv",
                format: "CSV",
                size: 278000,
                createdAt: "2023-11-08"
            }
        ],
        createdBy: "usr2",
        createdAt: "2023-11-08",
        updatedAt: "2023-11-20",
        isOpenData: true,
        license: "CC-BY-4.0",
        version: "1.0",
        viewsCount: 810,
        downloadsCount: 230,
        followersCount: 17
    },
    {
        id: "ds10",
        title: "Elektrik Üretim Kaynak Dağılımı 2024",
        description: "2024 yılı için kaynak bazında elektrik üretim dağılımı.",
        organizationId: "org2",
        organization: organizations[1],
        categories: ["cat2"],
        tags: ["tag3"],
        formats: ["CSV", "XML"],
        resources: [
            {
                id: "res15",
                name: "Kaynak Dağılımı 2024 (CSV)",
                url: "elektrik-kaynak-2024.csv",
                format: "CSV",
                size: 602112,
                createdAt: "2024-04-02"
            },
            {
                id: "res16",
                name: "Kaynak Dağılımı 2024 (XML)",
                url: "elektrik-kaynak-2024.xml",
                format: "XML",
                createdAt: "2024-04-02"
            }
        ],
        createdBy: "usr1",
        createdAt: "2024-04-02",
        updatedAt: "2024-04-15",
        isOpenData: true,
        license: "CC-BY-SA-4.0",
        version: "1.0",
        viewsCount: 690,
        downloadsCount: 210,
        followersCount: 13
    }
]

export const comments: Comment[] = [
    {
        id: "c1",
        dataRequestId: "dr1",
        authorId: "usr2",
        content: "Bu veri talebi üzerinde çalışıyoruz, yakında paylaşacağız.",
        createdAt: "2024-01-15"
    },
    {
        id: "c2",
        dataRequestId: "dr2",
        authorId: "usr1",
        content: "Veri seti onaylandı ve yayında!",
        createdAt: "2024-02-10"
    }
]

export const dataRequests: DataRequest[] = [
    {
        id: "dr1",
        title: "İstanbul Bisiklet Yolları Verisi",
        description: "İstanbul'daki bisiklet yollarının konum ve uzunluk bilgisi.",
        requestedBy: "usr2",
        organizationId: "org1",
        status: "in_review",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-20",
        commentsCount: 1,
        comments: comments.filter(c => c.dataRequestId === "dr1"),
    },
    {
        id: "dr2",
        title: "Türkiye Yağış Miktarları 2023",
        description: "Türkiye genelinde 2023 yılına ait aylık yağış miktarları.",
        requestedBy: "usr1",
        organizationId: "org2",
        status: "approved",
        createdAt: "2024-02-05",
        updatedAt: "2024-02-05",
        commentsCount: 1,
        comments: comments.filter(c => c.dataRequestId === "dr2"),
    },
    {
        id: "dr3",
        title: "İstanbul Elektrikli Scooter Kullanım Verisi",
        description: "İstanbul'da elektrikli scooter kullanımına dair aylık istatistikler.",
        requestedBy: "usr2",
        organizationId: "org1",
        status: "in_review",
        createdAt: "2024-03-12",
        updatedAt: "2024-03-12",
        commentsCount: 0,
        comments: [],
    },
    {
        id: "dr4",
        title: "Türkiye Nüfus Projeksiyonları 2025",
        description: "Türkiye'nin 2025 yılına yönelik nüfus projeksiyon verileri.",
        requestedBy: "usr1",
        organizationId: "org2",
        status: "approved",
        createdAt: "2024-04-01",
        updatedAt: "2024-04-01",
        commentsCount: 0,
        comments: [],
    },
    {
        id: "dr5",
        title: "İstanbul Hava Kirliliği Kaynakları",
        description: "İstanbul'daki hava kirliliğine neden olan başlıca kaynakların analizi.",
        requestedBy: "usr2",
        organizationId: "org1",
        status: "rejected",
        createdAt: "2024-05-18",
        updatedAt: "2024-05-18",
        commentsCount: 0,
        comments: [],
    },
    {
        id: "dr6",
        title: "Türkiye Elektrik Kesinti Verisi",
        description: "Türkiye genelinde yaşanan elektrik kesintilerinin tarih ve süre bilgisi.",
        requestedBy: "usr1",
        organizationId: "org2",
        status: "approved",
        createdAt: "2024-06-22",
        updatedAt: "2024-06-22",
        commentsCount: 0,
        comments: [],
    }
]