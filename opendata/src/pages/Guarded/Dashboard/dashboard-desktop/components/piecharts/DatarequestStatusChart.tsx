"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublicDataRequests } from "@/services/datarequest.service";

import { Pie, PieChart, LabelList } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export function DatarequestStatusChart() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["public-data-requests"],
        queryFn: () => getPublicDataRequests({ limit: 200 }),
    });

    const requests = data?.data?.data ?? [];

    // ✅ Status'a göre grupla: pending, approved, rejected
    const statusCounts = requests.reduce((acc: any, item: any) => {
        const status = item.status ?? "other";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    // ✅ Recharts formatına çevir
    const chartData = Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count,
        fill: colorByStatus(status)
    }));

    function colorByStatus(status: string) {
        switch (status) {
            case "approved":
                return "var(--chart-3)";
            case "rejected":
                return "var(--chart-1)";
            case "pending":
                return "var(--chart-2)";
            default:
                return "var(--chart-5)";
        }
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Veri İstekleri Durum Dağılımı</CardTitle>
                <CardDescription>Pending, Approved, Rejected</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
                {isLoading ? (
                    <div className="animate-pulse bg-muted rounded-md w-full h-[250px]" />
                ) : isError ? (
                    <p className="text-sm text-red-500">Veriler yüklenemedi</p>
                ) : chartData.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Veri bulunamadı</p>
                ) : (
                    <ChartContainer config={{} as any}
                        className="mx-auto aspect-square max-h-[260px]"
                    >
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

                            <Pie
                                data={chartData}
                                dataKey="count"
                                nameKey="status"
                                labelLine={false}
                                innerRadius="45%"
                                stroke="none"
                            >
                                <LabelList
                                    dataKey="count"
                                    position="outside"
                                    className="fill-foreground"
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
