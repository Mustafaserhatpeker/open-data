import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"
import { getResourceTypeMeta } from "./utils"
import { DOWNLOAD_URL } from "@/lib/urls"
type Props = {
    resources?: any
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
                        {resources.map((r: any) => {
                            const meta = getResourceTypeMeta(r.mimeType)
                            return (
                                <div key={r._id} className="py-3 flex items-start justify-between gap-4">
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
                                                    title={r.resourceName}
                                                >
                                                    {r.resourceName}
                                                </a>
                                                <Badge variant="secondary" className={`border ${meta.accent} bg-transparent`}>
                                                    {meta.label}
                                                </Badge>
                                            </div>
                                            <div className="mt-1 text-sm text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
                                                <span>Oluşturulma: {new Date(r?.createdAt).toLocaleDateString("tr-TR") || "-"} </span>
                                                {r.updatedAt ? <span>Güncelleme:{new Date(r?.updatedAt).toLocaleDateString("tr-TR") || "-"}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shrink-0 gap-2 flex flex-row sm:flex-row">
                                        <Button asChild>
                                            <a href={`${DOWNLOAD_URL}/${r.fileUrl}`} target="_blank" >
                                                <Download className="h-4 w-4 mr-2" />
                                                İndir
                                            </a>
                                        </Button>
                                        <Button asChild>
                                            <a href={`/preview/${r._id}`} target="_blank" rel="noreferrer">
                                                <Eye className="h-4 w-4 mr-2" />
                                                Önizleme
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