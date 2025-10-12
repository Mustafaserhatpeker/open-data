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
import { Building2, FolderClosed, Tags } from "lucide-react"
import DataDialog from "./DataDialog"
import { getResourceTypeMeta } from "@/pages/DataInformation/datainfo-desktop/components/utils"

export default function DataCard({ dataset }: { dataset: any }) {
    // Backend'den gelen veriye göre uyarlama:
    const id = dataset?._id
    const title = dataset?.title || "Başlıksız veri seti"
    const description = dataset?.description || "Açıklama bulunamadı."
    const organization = dataset?.organization?.organizationName || "-"
    const categories =
        dataset?.categories?.map((c: any) => c.categoryName).join(", ") || "-"
    const tags =
        dataset?.tags?.map((t: any) => t.tagName) || []
    const format = dataset?.formats?.[0]?.formatName || "Bilinmiyor"

    // Görsel ikon ve renk bilgisi (format üzerinden)
    const { Icon, color, accent, label } = getResourceTypeMeta(format)

    return (
        <TooltipProvider delayDuration={200}>
            <div
                className="cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation()
                    window.location.href = `/datasets/${id}`
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
                                        {title}
                                    </CardTitle>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Badge
                                                    variant="secondary"
                                                    className={`border ${accent} bg-transparent`}
                                                >
                                                    {label || format}
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                Veri türü: {label || format}
                                            </TooltipContent>
                                        </Tooltip>

                                        {organization !== "-" && (
                                            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Building2 className="h-3.5 w-3.5" />
                                                <span className="truncate">{organization}</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {description && (
                            <CardDescription className="mt-1 line-clamp-2">
                                {description}
                            </CardDescription>
                        )}
                    </CardHeader>

                    <CardContent className="pt-0">
                        <Separator className="mb-3" />
                        <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground md:grid-cols-2">
                            <div className="flex items-start gap-2">
                                <FolderClosed className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                                <div className="min-w-0">
                                    <div className="text-xs uppercase tracking-wide text-muted-foreground pb-2">
                                        Kategoriler
                                    </div>
                                    <div className="truncate text-foreground">{categories}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Tags className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                                <div className="min-w-0">
                                    <div className="text-xs uppercase tracking-wide text-muted-foreground pb-2">
                                        Etiketler
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {tags.length > 0 ? (
                                            tags.map((t: string, i: number) => (
                                                <Badge
                                                    key={`${t}-${i}`}
                                                    variant="outline"
                                                    className="px-2 py-0.5"
                                                >
                                                    {t}
                                                </Badge>
                                            ))
                                        ) : (
                                            <Badge variant="outline" className="px-2 py-0.5">
                                                Etiket yok
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    {/* Sağ üst: Detay diyaloğu */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 ">
                        <DataDialog dataset={dataset} />
                    </div>
                </Card>
            </div>
        </TooltipProvider>
    )
}
