import { CategoryChart } from "./CategoryChart";
import { DatarequestChart } from "./DatarequestChart";
import { OrganizationChart } from "./OrganizationChart";
import { DataStaticCard } from "./inner-components/DataStaticCard"

export default function Statics() {
    const stats = [
        {
            label: "Veri Seti Sayısı",
            value: 120,
        },
        {
            label: "Veri Kaynağı Sayısı",
            value: 450,
        },
        {
            label: "Kullanıcı Sayısı",
            value: 103,
        },
        {
            label: "Toplam İndirme",
            value: 1.565,
        },
        {
            label: "Toplam Görüntülenme",
            value: 15.453,
        }

    ];

    return (
        <section className="w-full">
            <div className="mb-4 mt-8 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Genel İstatistikler</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {stats.map((s, idx) => (
                    <div key={idx} className="w-full">
                        <DataStaticCard
                            items={[{ label: s.label, value: s.value }]}
                        />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-2 pt-8">
                <div className="grid-cols-1">
                    <OrganizationChart />
                </div>
                <div className="grid-cols-1">
                    <CategoryChart />
                </div>
                <div className="grid-cols-1">
                    <DatarequestChart />
                </div>
            </div>

        </section>
    );
}
