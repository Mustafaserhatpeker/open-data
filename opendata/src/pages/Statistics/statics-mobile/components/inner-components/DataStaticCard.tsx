// shadcn/ui components
import { Card, CardContent } from "@/components/ui/card";
import CountUp from "@/components/CountUp";

export function DataStaticCard({
    items,
}: {
    items: Array<{ label: string; value: number | string | null | undefined }>;
}) {
    return (
        <Card className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg">
            <CardContent className="flex flex-1 w-full h-full p-2">
                {items.map((it) => (
                    <div
                        key={it.label}
                        className="flex flex-col items-center justify-center flex-1 gap-1 p-3 text-center"
                    >
                        <div className="text-lg font-semibold">
                            <CountUp
                                from={0}
                                to={it.value ? Number(it.value) : 0}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                            />
                        </div>
                        <div className="text-[11px] text-muted-foreground">{it.label}</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
