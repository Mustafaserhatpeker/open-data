import React from "react";
import { Link } from "react-router-dom";

// shadcn/ui components (adjust the import paths to your project)
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export function DataStaticCard({
    title,
    icon: Icon,
    items,
    href,
}: {
    title: string;
    icon: LucideIcon;
    items: Array<{ label: string; value: number }>;
    href?: string;
}) {
    const cardInner = (
        <Card className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg">
            <CardHeader className="flex items-center justify-between gap-2 p-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                        <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <CardTitle className="text-sm">{title}</CardTitle>
                </div>
                <Badge variant="secondary" className="text-xs">
                    Genel
                </Badge>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-3 p-4">
                {items.map((it) => (
                    <div key={it.label} className="flex flex-col items-center justify-center gap-1 rounded-md bg-muted/50 p-3 text-center">
                        <div className="text-lg font-semibold">{it.value}</div>
                        <div className="text-[11px] text-muted-foreground">{it.label}</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );

    // If href provided, wrap in Next.js Link for SPA navigation
    if (href) {
        return (
            <Link to={href} className="block">
                {cardInner}
            </Link>
        );
    }

    return cardInner;
}
