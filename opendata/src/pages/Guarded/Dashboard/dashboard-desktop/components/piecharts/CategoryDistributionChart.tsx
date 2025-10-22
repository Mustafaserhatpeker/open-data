"use client";

import { Pie, PieChart } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export function CategoryDistributionChart({
    data,
}: {
    data: Array<{ categoryName: string; datasetCount: number }>;
}) {
    // Gelen veriyi Recharts formatına dönüştür
    const chartData = (data || []).map((cat, idx) => ({
        name: cat.categoryName || `Kategori ${idx + 1}`,
        value: cat.datasetCount || 0,
        fill: `var(--chart-${(idx % 5) + 1})`,
    }));

    const chartConfig = {
        value: { label: "Veri Seti Sayısı" },
    } satisfies ChartConfig;

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Kategori Dağılımı</CardTitle>
                <CardDescription>Veri Seti Sayısına Göre Kategoriler</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            label
                            innerRadius={40}
                            outerRadius={80}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
