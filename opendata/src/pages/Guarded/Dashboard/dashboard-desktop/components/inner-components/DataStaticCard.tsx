import { Card, CardContent } from "@/components/ui/card";

export function DataStaticCard({
    items,
}: {
    items: Array<{
        label: string;
        value: number | string | null | undefined;
        icon?: React.ComponentType<any>;
    }>;
}) {
    return (
        <Card className="cursor-pointer rounded-xl border bg-card hover:shadow-xl transition-all">
            <CardContent className="flex flex-1 w-full h-full p-3">
                {items.map((it) => {
                    const Icon = it.icon;
                    return (
                        <div
                            key={it.label}
                            className="flex flex-col items-center justify-center flex-1 gap-1 rounded-md p-2 text-center"
                        >
                            {Icon && <Icon className="h-6 w-6 text-primary opacity-90 mb-1" />}
                            <div className="text-xl font-bold tracking-tight">{it.value ?? "-"}</div>
                            <div className="text-[11px] text-muted-foreground">{it.label}</div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
