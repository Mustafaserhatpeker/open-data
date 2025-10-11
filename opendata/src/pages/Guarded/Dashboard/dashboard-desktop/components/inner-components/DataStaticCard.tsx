import React from "react";

// shadcn/ui components (adjust the import paths to your project)
import { Card, CardContent } from "@/components/ui/card";


type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export function DataStaticCard({
    items,
    icon,
}: {
    icon: LucideIcon;
    items: Array<{ label: string; value: number }>;
}) {
    const cardInner = (
        <Card className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg p-0">


            <CardContent className="flex flex-1 w-full h-full p-0 ">
                {items.map((it) => (
                    <div key={it.label} className="flex flex-col items-center justify-center flex-1 gap-1 rounded-md bg-muted/50 p-3 text-center">
                        <div className="text-lg font-semibold">{it.value}</div>
                        <div className="text-[11px] text-muted-foreground">{it.label}</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );


    return cardInner;
}
