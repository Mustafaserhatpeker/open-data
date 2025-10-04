import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { Dataset as DummyDataset } from "@/lib/types"
import { formatDate, getTypeMeta } from "./utils"

type Props = {
    resources?: NonNullable<DummyDataset["resources"]>
}

export function ResourcesList({ resources }: Props) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Kaynaklar</CardTitle>
                <CardDescription>Dosyalar ve bağlantılar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {resources && resources.length > 0 ? (
                    <div className="divide-y">
                        {resources.map((r) => {
                            const meta = getTypeMeta(r.format)
                            return (
                                <div key={r.id} className="py-3 flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3 min-w-0">
                                        <div className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg ${meta.color}`}>
                                            <meta.Icon className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <a
                                                    href={r.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-medium hover:underline truncate"
                                                    title={r.name}
                                                >
                                                    {r.name}
                                                </a>
                                                <Badge variant="secondary" className={`border ${meta.accent} bg-transparent`}>
                                                    {meta.label}
                                                </Badge>
                                            </div>
                                            <div className="mt-1 text-sm text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
                                                <span>Oluşturulma: {formatDate(r.createdAt) ?? "-"}</span>
                                                {r.updatedAt ? <span>Güncelleme: {formatDate(r.updatedAt)}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        <Button asChild>
                                            <a href={r.url} target="_blank" rel="noreferrer">
                                                <Download className="h-4 w-4 mr-2" />
                                                İndir
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Herhangi bir kaynak bulunamadı.</p>
                )}
            </CardContent>
        </Card>
    )
}