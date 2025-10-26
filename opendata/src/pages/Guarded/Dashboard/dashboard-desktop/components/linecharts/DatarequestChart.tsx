"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublicDataRequests } from "@/services/datarequest.service";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
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

export function DatarequestChart() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["public-data-requests"],
        queryFn: () => getPublicDataRequests({ limit: 100 }),
    });

    const requests = data?.data?.data ?? [];

    // ✅ Organizasyona göre grupla
    const countsByOrg = requests.reduce((acc: any, item: any) => {
        const name = item.organizationName ?? "Diğer";
        acc[name] = (acc[name] || 0) + 1;
        return acc;
    }, {});

    // ✅ Recharts formatına çevir
    const chartData = Object.entries(countsByOrg).map(([org, count]) => ({
        organization: org,
        count
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Organizasyona Göre Veri İstekleri</CardTitle>
                <CardDescription>Her organizasyondan kaç istek geldi?</CardDescription>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <div className="h-40 animate-pulse rounded-md bg-muted" />
                ) : isError ? (
                    <p className="text-red-500 text-sm">Veriler yüklenemedi</p>
                ) : chartData.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Veri isteği bulunamadı</p>
                ) : (
                    <ChartContainer
                        config={{
                            count: { label: "İstek Sayısı", color: "var(--chart-2)" }
                        }}
                    >
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ right: 40 }}
                        >
                            <CartesianGrid horizontal={false} />

                            <YAxis
                                dataKey="organization"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                width={120}
                            />

                            <XAxis
                                dataKey="count"
                                type="number"
                                allowDecimals={false}
                            />

                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />

                            <Bar
                                dataKey="count"
                                fill="var(--chart-2)"
                                radius={[4, 4, 4, 4]}
                            >
                                <LabelList
                                    dataKey="organization"
                                    position="insideLeft"
                                    className="fill-background"
                                />
                                <LabelList
                                    dataKey="count"
                                    position="right"
                                    offset={8}
                                    className="fill-foreground"
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
