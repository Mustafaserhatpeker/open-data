import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState, type ReactNode } from "react";

type HomeTooltipProps = {
    className?: string;
    titleContent: ReactNode;
    fullContent: ReactNode;
    children?: ReactNode;
};

export function HomeTooltip({
    className,
    titleContent,
    fullContent,
    children
}: HomeTooltipProps) {
    const [hover, setHover] = useState(false);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    className={`${className} cursor-pointer`}
                    variant="outline"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    {children}

                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-white font-bold text-[10px] whitespace-nowrap bg-black/20 pr-8 px-2 py-1 rounded-md">
                        {titleContent}
                    </div>
                </Button>
            </TooltipTrigger>

            <TooltipContent
                className={`max-w-xs backdrop-blur-2xl bg-black/40 border border-white/30 shadow-lg transition-all duration-200
                ${hover ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                `}
            >
                {fullContent}
            </TooltipContent>
        </Tooltip>
    )
}
