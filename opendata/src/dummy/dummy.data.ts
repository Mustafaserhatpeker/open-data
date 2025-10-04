import { type Dataset, type Organization, type Category, type Tag, type Format, type User } from "@/lib/types"

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
                url: "https://data.ibb.gov.tr/trafik.csv",
                format: "CSV",
                size: 204800,
                createdAt: "2023-10-01"
            },
            {
                id: "res2",
                name: "Trafik Yoğunluğu (JSON)",
                url: "https://data.ibb.gov.tr/trafik.json",
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
                url: "https://data.tuik.gov.tr/elektrik-2023.csv",
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
    }
]
