import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Building2,
    FolderClosed,
    Tags,
} from "lucide-react"
import DataDialog from "./DataDialog"
import { getResourceTypeMeta } from "@/pages/DataInformation/datainfo-desktop/components/utils"



export default function DataCard({ dataset }: { dataset: any }) {
    const { Icon, color, accent, label } = getResourceTypeMeta(dataset?.datatype)

    return (
        <TooltipProvider delayDuration={200}>
            <div
                className="cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation()
                    window.location.href = `/datasets/${dataset?.id}`
                }}
            >
                <Card className="flex h-full flex-col overflow-hidden border border-border/60 shadow-sm transition-all hover:shadow-md relative">
                    <CardHeader className="space-y-3 pb-3">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${color}`}
                                    aria-hidden
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <CardTitle className="text-base md:text-lg truncate">
                                        {dataset?.title}
                                    </CardTitle>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Badge
                                                    variant="secondary"
                                                    className={`border ${accent} bg-transparent`}
                                                >
                                                    {label}
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                Veri türü: {label}
                                            </TooltipContent>
                                        </Tooltip>
                                        {dataset?.organization ? (
                                            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Building2 className="h-3.5 w-3.5" />
                                                <span className="truncate">
                                                    {dataset?.organization}
                                                </span>
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {dataset?.description ? (
                            <CardDescription className="mt-1 line-clamp-2">
                                {dataset?.description}
                            </CardDescription>
                        ) : null}
                    </CardHeader>

                    <CardContent className="pt-0">
                        <Separator className="mb-3" />
                        <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground md:grid-cols-2">
                            <div className="flex items-start gap-2">
                                <FolderClosed className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                                <div className="min-w-0">
                                    <div className="text-xs uppercase tracking-wide text-muted-foreground pb-2">
                                        Kategori
                                    </div>
                                    <div className="truncate text-foreground">
                                        {dataset?.category || "-"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Tags className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                                <div className="min-w-0">
                                    <div className="text-xs uppercase tracking-wide text-muted-foreground pb-2">
                                        Etiketler
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(dataset?.tags && dataset?.tags?.length > 0
                                            ? dataset?.tags
                                            : ["etiket yok"]
                                        ).map((t: any, i: any) => (
                                            <Badge
                                                key={`${t}-${i}`}
                                                variant="outline"
                                                className="px-2 py-0.5"
                                            >
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <div className="absolute top-3 right-3 flex items-center gap-2 ">
                        <DataDialog dataset={dataset} />
                    </div>
                </Card>
            </div>
        </TooltipProvider>
    )
}