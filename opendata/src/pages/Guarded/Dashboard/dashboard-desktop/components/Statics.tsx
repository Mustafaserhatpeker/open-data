import { Database, Users, Folder, BarChart3, Building2 } from "lucide-react";
import { DataStaticCard } from "./inner-components/DataStaticCard"
export default function Statics() {
    const stats = [
        {
            label: "Toplam Organizasyon",
            value: 120,
            icon: Building2,
            href: "/organizasyonlar",
        },
        {
            label: "Toplam Kategori",
            value: 45,
            icon: Folder,
            href: "/kategoriler",
        },
        {
            label: "Toplam Veri Seti",
            value: 300,
            icon: Database,
            href: "/veri-setleri",
        },
        {
            label: "Toplam Kullanıcı",
            value: 1500,
            icon: Users,
            href: "/kullanicilar",
        },
        {
            label: "Toplam Veri Talebi",
            value: 75,
            icon: BarChart3,
            href: "/veri-talebi",
        },
    ];

    return (
        <section className="w-full">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Genel İstatistikler</h2>
                <div className="text-sm text-muted-foreground">Son güncelleme: bugün</div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {stats.map((s, idx) => (
                    <div key={idx} className="w-full">
                        <DataStaticCard
                            title={s.label}
                            icon={s.icon}
                            items={[{ label: s.label, value: s.value }]}
                            href={s.href}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
