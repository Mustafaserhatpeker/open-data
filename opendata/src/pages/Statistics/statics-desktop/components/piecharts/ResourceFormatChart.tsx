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

export function ResourceFormatChart({
    data,
}: {
    data: Array<{ formatName: string; datasetCount: number }>;
}) {
    const chartData = (data || []).map((fmt, idx) => ({
        name: fmt.formatName || `Format ${idx + 1}`,
        value: fmt.datasetCount || 0,
        fill: `var(--chart-${(idx % 5) + 1})`,
    }));

    const chartConfig = {
        value: { label: "Veri Seti Sayısı" },
    } satisfies ChartConfig;

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Kaynak Format Dağılımı</CardTitle>
                <CardDescription>Veri Seti Formatları</CardDescription>
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
