import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Eye } from "lucide-react"
import type { Dataset as DummyDataset } from "@/lib/types"
import { getTypeMeta } from "./utils"

type Props = {
    dataset: DummyDataset
    primaryFormat: string
}

export function FormatsStatsCard({ dataset, primaryFormat }: Props) {
    const formats = (dataset?.formats && dataset?.formats.length > 0 ? dataset?.formats : [primaryFormat]) ?? []

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Formatlar ve İstatistikler</CardTitle>
                <CardDescription>Desteklenen veri formatları ve kullanım</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Formatlar</div>
                    <div className="flex flex-wrap gap-1.5">
                        {formats?.map((f) => {
                            const m = getTypeMeta(f)
                            return (
                                <Badge key={f} variant="secondary" className={`border ${m?.accent} bg-transparent`}>
                                    {m?.label}
                                </Badge>
                            )
                        })}
                    </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="rounded-md border p-3">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground">Görüntülenme</div>
                        <div className="mt-1 inline-flex items-center gap-2 text-base">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            {dataset?.viewsCount ?? 0}
                        </div>
                    </div>
                    <div className="rounded-md border p-3">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground">İndirme</div>
                        <div className="mt-1 inline-flex items-center gap-2 text-base">
                            <Download className="h-4 w-4 text-muted-foreground" />
                            {dataset?.downloadsCount ?? 0}
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}