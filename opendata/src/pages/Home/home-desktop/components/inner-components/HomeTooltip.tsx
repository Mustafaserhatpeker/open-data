import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ReactNode } from "react";

type HomeTooltipProps = {
    className?: string;
    content?: string;
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
            <TooltipContent>
                {content}
            </TooltipContent>
        </Tooltip>
    )
}
