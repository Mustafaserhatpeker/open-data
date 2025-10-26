import { CategoryChart } from "./components/linecharts/CategoryChart";
import { DatarequestChart } from "./components/linecharts/DatarequestChart";
import { OrganizationChart } from "./components/linecharts/OrganizationChart";
import { DataStaticCard } from "./components/inner-components/DataStaticCard"
import { ResourceFormatChart } from "./components/piecharts/ResourceFormatChart";
import { DatarequestStatusChart } from "./components/piecharts/DatarequestStatusChart";
import { CategoryDistributionChart } from "./components/piecharts/CategoryDistributionChart";
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "@/services/statistics.service";

function formatNumber(n?: number) {
    if (typeof n !== "number") return "-";
    return Intl.NumberFormat("tr-TR").format(n);
}

export default function StaticsDesktop() {
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
        { label: "Veri Seti Sayısı", value: statisticsResp?.data?.datasetCount },
        { label: "Kategori Sayısı", value: statisticsResp?.data?.categoryCount },
        { label: "Organizasyon Sayısı", value: statisticsResp?.data?.organizationCount },
        { label: "Kullanıcı Sayısı", value: statisticsResp?.data?.userCount },
        { label: "Etiket (Tag) Sayısı", value: statisticsResp?.data?.tagCount },
        { label: "T.İndirme", value: statisticsResp?.data?.totalDownloads },
        { label: "T.Görüntülenme", value: statisticsResp?.data?.totalViews },
    ].filter(Boolean);
    return (
        <div className="w-full bg-accent px-4 py-6">
            <section className="w-full pb-12  mx-auto ">
                <div className="mb-4 mt-8 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Genel İstatistikler</h2>
                </div>


                {isLoading && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
                        {Array.from({ length: 5 }).map((_, i) => (
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
                            <div key={idx} className="w-full">
                                <DataStaticCard items={[{ label: s.label, value: formatNumber(s.value) }]} />
                            </div>
                        ))}
                    </div>
                )}


                <div className="grid grid-cols-1 gap-2 pt-8">
                    <div className="grid-cols-1">
                        <OrganizationChart data={statisticsResp?.data.datasetsByOrganization || []} />
                    </div>
                    <div className="grid-cols-1">
                        <CategoryChart data={statisticsResp?.data.datasetsByCategory || []} />
                    </div>
                    <div className="grid-cols-1">
                        <DatarequestChart />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-8">
                    <div className="grid-cols-1">
                        <ResourceFormatChart data={statisticsResp?.data.datasetsByFormat || []} />
                    </div>
                    <div className="grid-cols-1">
                        <DatarequestStatusChart />
                    </div>
                    <div className="grid-cols-1">
                        <CategoryDistributionChart data={statisticsResp?.data.datasetsByCategory || []} />
                    </div>
                </div>
            </section>
        </div>
    );
}
