import { CategoryChart } from "./components/linecharts/CategoryChart";
import { DatarequestChart } from "./components/linecharts/DatarequestChart";
import { OrganizationChart } from "./components/linecharts/OrganizationChart";
import { DataStaticCard } from "./components/inner-components/DataStaticCard";
import { ResourceFormatChart } from "./components/piecharts/ResourceFormatChart";
import { DatarequestStatusChart } from "./components/piecharts/DatarequestStatusChart";
import { CategoryDistributionChart } from "./components/piecharts/CategoryDistributionChart";
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "@/services/statistics.service";

// ✅ Lucide icons
import {
    Users,
    Eye,
    Download,
    ListTree,
    Shapes,
    Tags,
    Building2,
} from "lucide-react";

function formatNumber(n?: number) {
    if (typeof n !== "number") return "-";
    return Intl.NumberFormat("tr-TR").format(n);
}

export default function DashboardDesktop() {
    const {
        data: statisticsResp,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["statistics"],
        queryFn: () => getStatistics(),
    });

    const generalStats = [
        { label: "Veri Seti Sayısı", value: statisticsResp?.data?.datasetCount, icon: Shapes },
        { label: "Kategori Sayısı", value: statisticsResp?.data?.categoryCount, icon: ListTree },
        { label: "Organizasyon Sayısı", value: statisticsResp?.data?.organizationCount, icon: Building2 },
        { label: "Kullanıcı Sayısı", value: statisticsResp?.data?.userCount, icon: Users },
        { label: "Etiket (Tag) Sayısı", value: statisticsResp?.data?.tagCount, icon: Tags },
        { label: "T.İndirme", value: statisticsResp?.data?.totalDownloads, icon: Download },
        { label: "T.Görüntülenme", value: statisticsResp?.data?.totalViews, icon: Eye },
    ].filter(Boolean);

    return (
        <div className="w-full">
            <section className="w-full pb-12 mx-auto">
                <div className="mb-4 mt-8 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Genel İstatistikler</h2>
                </div>

                {isLoading && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className="w-full animate-pulse rounded-xl bg-muted h-24" />
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="text-red-600 text-sm">
                        İstatistikler yüklenemedi. {(error as any)?.message ?? ""}
                    </div>
                )}

                {!isLoading && !isError && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
                        {generalStats.map((s, idx) => (
                            <DataStaticCard
                                key={idx}
                                items={[{
                                    label: s.label,
                                    value: formatNumber(s.value),
                                    icon: s.icon
                                }]}
                            />
                        ))}
                    </div>
                )}

                {/* Grafikler */}
                <div className="grid grid-cols-3 gap-2 pt-8">
                    <OrganizationChart data={statisticsResp?.data.datasetsByOrganization || []} />
                    <CategoryChart data={statisticsResp?.data.datasetsByCategory || []} />
                    <DatarequestChart />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-8">
                    <ResourceFormatChart data={statisticsResp?.data.datasetsByFormat || []} />
                    <DatarequestStatusChart />
                    <CategoryDistributionChart data={statisticsResp?.data.datasetsByCategory || []} />
                </div>

            </section>
        </div>
    );
}
