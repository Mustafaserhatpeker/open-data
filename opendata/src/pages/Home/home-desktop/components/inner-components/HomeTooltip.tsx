import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ReactNode } from "react";

type HomeTooltipProps = {
    className?: string;
    content?: ReactNode;
    children?: ReactNode;

    // Kontrollü kullanım için
    open?: boolean;
    onOpenChange?: (open: boolean) => void;

    // Otomatik oynatmayı duraklatmak/devam ettirmek için
    onPointerEnter?: React.PointerEventHandler<HTMLButtonElement>;
    onPointerLeave?: React.PointerEventHandler<HTMLButtonElement>;

    // Konumlandırma opsiyonları (isteğe bağlı)
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
};

export function HomeTooltip({
    className,
    content,
    children,
    open,
    onOpenChange,
    onPointerEnter,
    onPointerLeave,
    side = "top",
    align = "center",
    sideOffset = 8,
}: HomeTooltipProps) {
    return (
        <Tooltip open={open} onOpenChange={onOpenChange}>
            <TooltipTrigger asChild>
                <Button
                    className={className}
                    variant="outline"
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    aria-label="Bilgi balonu tetikleyicisi"
                >
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent
                side={side}
                align={align}
                sideOffset={sideOffset}
                className="max-w-xs backdrop-blur-2xl bg-white/30 border border-white/30 shadow-lg"
            >
                {content}
            </TooltipContent>
        </Tooltip>
    );
}