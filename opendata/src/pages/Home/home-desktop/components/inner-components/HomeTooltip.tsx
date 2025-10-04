import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ReactNode } from "react";

type HomeTooltipProps = {
    className?: string;
    content?: ReactNode;
    children?: ReactNode;
};
export function HomeTooltip({ className, content, children }: HomeTooltipProps
) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button className={className} variant="outline">
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs backdrop-blur-2xl bg-white/30 border border-white/30 shadow-lg">
                {content}
            </TooltipContent>
        </Tooltip>
    )
}
