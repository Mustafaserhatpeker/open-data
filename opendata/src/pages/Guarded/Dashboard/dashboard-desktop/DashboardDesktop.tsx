import { CategoryChart } from "./components/linecharts/CategoryChart";
import { DatarequestChart } from "./components/linecharts/DatarequestChart";
import { OrganizationChart } from "./components/linecharts/OrganizationChart";
import { DataStaticCard } from "./components/inner-components/DataStaticCard";
import { ResourceFormatChart } from "./components/piecharts/ResourceFormatChart";
import { DatarequestStatusChart } from "./components/piecharts/DatarequestStatusChart";
import { CategoryDistributionChart } from "./components/piecharts/CategoryDistributionChart";
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "@/services/statistics.service";
import { ManagementDialog } from "./components/ManagementDialog";
import {
    Users,
    Eye,
    Download,
    ListTree,
    Shapes,
    Tags,
    Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type TabType = "tag" | "licence" | "format";

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
        queryFn: getStatistics
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>("tag");

    const openPanel = (tab: TabType) => {
        setActiveTab(tab);
        setOpenDialog(true);
    };

    const generalStats = [
        { label: "Veri Seti Sayısı", value: statisticsResp?.data?.datasetCount, icon: Shapes },
        { label: "Kategori Sayısı", value: statisticsResp?.data?.categoryCount, icon: ListTree },
        { label: "Organizasyon Sayısı", value: statisticsResp?.data?.organizationCount, icon: Building2 },
        { label: "Kullanıcı Sayısı", value: statisticsResp?.data?.userCount, icon: Users },
        { label: "Etiket Sayısı", value: statisticsResp?.data?.tagCount, icon: Tags },
        { label: "Toplam İndirme", value: statisticsResp?.data?.totalDownloads, icon: Download },
        { label: "Toplam Görüntülenme", value: statisticsResp?.data?.totalViews, icon: Eye },
    ];

    return (
        <div className="w-full">
            <section className="pb-12 mx-auto">

                {/* ✅ Genel İstatistikler */}
                <div className="mt-8 mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Genel İstatistikler</h2>
                </div>

                {/* ✅ Skeleton State */}
                {isLoading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className="w-full animate-pulse rounded-xl bg-muted h-24" />
                        ))}
                    </div>
                )}

                {/* ✅ Error State */}
                {isError && (
                    <div className="text-red-600 text-sm">
                        İstatistikler yüklenemedi. {(error as any)?.message ?? ""}
                    </div>
                )}

                {/* ✅ Success */}
                {!isLoading && !isError && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
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

                {/* ✅ Yönetim */}
                <div className="mt-10 mb-4 space-y-2">
                    <h2 className="text-lg font-semibold">Yönetim</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                        <Button onClick={() => openPanel("tag")}>Etiket Yönetimi</Button>
                        <Button onClick={() => openPanel("licence")}>Lisans Yönetimi</Button>
                        <Button onClick={() => openPanel("format")}>Format Yönetimi</Button>
                    </div>
                </div>

                <ManagementDialog
                    open={openDialog}
                    onOpenChange={setOpenDialog}
                    defaultTab={activeTab}
                    onChangeTab={setActiveTab}
                />

                {/* ✅ Grafikler */}
                <div className="mt-10 space-y-6">
                    <h3 className="text-lg font-semibold">Grafikler</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <OrganizationChart data={statisticsResp?.data.datasetsByOrganization || []} />
                        <CategoryChart data={statisticsResp?.data.datasetsByCategory || []} />
                        <DatarequestChart />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <ResourceFormatChart data={statisticsResp?.data.datasetsByFormat || []} />
                        <DatarequestStatusChart />
                        <CategoryDistributionChart data={statisticsResp?.data.datasetsByCategory || []} />
                    </div>
                </div>

            </section>
        </div>
    );
}
