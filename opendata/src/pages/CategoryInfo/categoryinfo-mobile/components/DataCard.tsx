import {
    Card,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building2, FolderClosed, Tags } from "lucide-react"
import DataDialog from "./DataDialog"
import { getTypeMeta } from "@/pages/DataInformation/datainfo-desktop/components/utils"

export default function DataCard({ dataset }: { dataset: any }) {
    const id = dataset?._id
    const title = dataset?.title || "Başlıksız veri seti"
    const description = dataset?.description || "Açıklama bulunamadı."
    const organization = dataset?.organization?.organizationName || "-"
    const categories =
        dataset?.categories?.map((c: any) => c.categoryName).join(", ") || "-"
    const tags = dataset?.tags?.map((t: any) => t.tagName) || []
    const format = dataset?.formats?.[0]?.formatName || "Bilinmiyor"

    const { Icon, color, accent, label } = getTypeMeta(format)

    return (
        <div
            className="w-full"
            onClick={() => (window.location.href = `/datasets/${id}`)}
        >
            <Card className="flex flex-col w-full p-3 gap-3 border shadow-sm active:scale-[0.98] transition">

                {/* İkon + Başlık */}
                <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 flex items-center justify-center rounded-md ${color}`}>
                        <Icon className="h-5 w-5 " />
                    </div>

                    <div className="flex flex-col min-w-0">
                        <CardTitle className="text-sm font-semibold leading-tight line-clamp-2">
                            {title}
                        </CardTitle>

                        {/* Format + Organizasyon */}
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className={`border ${accent} bg-transparent text-[10px]`}>
                                {label || format}
                            </Badge>

                            {organization !== "-" && (
                                <span className="text-[10px] flex items-center gap-1 text-muted-foreground truncate">
                                    <Building2 className="h-3 w-3" />
                                    {organization}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Açıklama */}
                <CardDescription className="text-xs text-muted-foreground line-clamp-3">
                    {description}
                </CardDescription>

                <Separator />

                {/* Kategori ve Etiketler */}
                <CardContent className="p-0 space-y-3 text-xs text-muted-foreground">

                    <div className="flex items-start gap-2">
                        <FolderClosed className="h-4 w-4 mt-0.5" />
                        <span className="text-foreground truncate">{categories}</span>
                    </div>

                    <div className="flex items-start gap-2">
                        <Tags className="h-4 w-4 mt-0.5" />
                        <div className="flex flex-wrap gap-1">
                            {tags.length > 0 ? (
                                tags.map((t: string, i: number) => (
                                    <Badge key={i} variant="outline" className="px-2 py-0.5 text-[10px]">
                                        {t}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-muted-foreground">Etiket yok</span>
                            )}
                        </div>
                    </div>

                </CardContent>

                {/* Detay butonu → alta alındı */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex justify-end mt-1"
                >
                    <DataDialog dataset={dataset} />
                </div>
            </Card>
        </div>
    )
}
