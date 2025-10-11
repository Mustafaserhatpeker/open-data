import { Database, Users, Folder, BarChart3 } from "lucide-react";
import { DataStaticCard } from "./inner-components/DataStaticCard"
export default function Statics() {
    const stats = [
        {
            label: "Veri Seti Sayısı",
            value: 120,
            icon: Database,

        },
        {
            label: "Veri Kaynağı Sayısı",
            value: 45,
            icon: Folder,

        },
        {
            label: "Kullanıcı Sayısı",
            value: 300,
            icon: Users,

        },
        {
            label: "Toplam Veri İsteği",
            value: 75,
            icon: BarChart3,

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
                            icon={s.icon}
                            items={[{ label: s.label, value: s.value }]}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
