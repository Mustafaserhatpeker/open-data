import { useParams } from "react-router-dom"
import { useMemo, useState } from "react"
import DataCard, {

} from "./components/DataCard"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {
    CalendarClock,
    Download,
    Eye,
    FolderClosed,
    Tags as TagsIcon,
} from "lucide-react"
import BackButton from "@/components/back-button"
import { useQuery } from "@tanstack/react-query"
import { getDatasets } from "@/services/dataset.service"
import { useAuthStore } from "@/stores/auth.store"
import { getCategoryById } from "@/services/category.service"

type SortKey = "recent" | "views" | "downloads" | "title"

type Maybe<T> = T | null | undefined



function formatDate(dateString?: string) {
    if (!dateString) return "-"
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return "-"
    return d.toLocaleDateString("tr-TR")
}

function getInitials(name?: string) {
    if (!name) return "?"
    return name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
}

export default function CategoryInfo() {
    const { id } = useParams<{ id: string }>()
    const { accessToken } = useAuthStore()

    const [query, setQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortKey>("recent")

    const { data: datasetsResp, isLoading } = useQuery({
        queryKey: ["datasets", id],
        queryFn: () => getDatasets({ categoryIDs: id, accessToken }),
    })

    const { data: categoryResp } = useQuery({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id!),
    })

    const datasets: any[] = datasetsResp?.data?.data || []
    const category: any = categoryResp?.data || null



    // Arama + sıralama
    const filteredAndSorted = useMemo(() => {
        const q = query.trim().toLowerCase()
        let results = datasets.filter((d: any) =>
            (d?.title ?? "").toLowerCase().includes(q)
        )

        switch (sortBy) {
            case "views":
                results.sort(
                    (a: any, b: any) => (b.viewsCount ?? 0) - (a.viewsCount ?? 0)
                )
                break
            case "downloads":
                results.sort(
                    (a: any, b: any) => (b.downloadsCount ?? 0) - (a.downloadsCount ?? 0)
                )
                break
            case "title":
                results.sort((a: any, b: any) =>
                    String(a.title ?? "").localeCompare(String(b.title ?? ""))
                )
                break
            default:
                results.sort(
                    (a: any, b: any) =>
                        new Date(b.updatedAt ?? b.createdAt ?? 0).getTime() -
                        new Date(a.updatedAt ?? a.createdAt ?? 0).getTime()
                )
        }
        return results
    }, [datasets, query, sortBy])

    // En son güncellenen/oluşturulan dataset tarihi
    const latestDatasetTimestamp: Maybe<string> = useMemo(() => {
        if (!datasets.length) return undefined
        const times = datasets
            .map((d) => d.updatedAt ?? d.createdAt)
            .filter(Boolean)
            .map((t: string) => new Date(t).getTime())
            .filter((n: number) => !isNaN(n))
        if (!times.length) return undefined
        return new Date(Math.max(...times)).toISOString()
    }, [datasets])

    // Top etiketler
    const topTags: { id: string; tagName: string; datasetCount: number }[] = useMemo(() => {
        const counts = new Map<string, { tagName: string; datasetCount: number }>()
        for (const d of datasets) {
            const tags: any[] =
                (Array.isArray(d?.tags) ? d.tags : []) ||
                (Array.isArray(d?.keywords) ? d.keywords : [])
            for (const t of tags) {
                const key = String(t?.id ?? t?._id ?? t?.slug ?? t?.tagName ?? "").trim()
                const tagName = String(t?.tagName ?? t?.slug ?? key).trim()
                if (!key) continue
                const prev = counts.get(key) ?? { tagName, datasetCount: 0 }
                prev.datasetCount += 1
                prev.tagName = tagName || prev.tagName
                counts.set(key, prev)
            }
        }
        return Array.from(counts.entries())
            .map(([key, v]) => ({ id: key, tagName: v.tagName, datasetCount: v.datasetCount }))
            .sort((a, b) => b.datasetCount - a.datasetCount)
            .slice(0, 20)
    }, [datasets])


    if (isLoading) {
        return <div className="p-6 text-center text-muted-foreground">Yükleniyor...</div>
    }

    return (
        <div className="w-full ">
            <div className="w-full">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <BackButton />
                    <Badge variant="secondary">Toplam veri seti: {datasets.length}</Badge>
                </div>
                {category ? (
                    <div className="mb-6 flex items-start gap-3">
                        <Avatar className="h-12 w-12 rounded-lg bg-primary/10 text-primary">
                            <AvatarFallback className="rounded-lg bg-purple-400">
                                {getInitials(category.categoryName)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                            <h1 className="text-2xl font-semibold leading-tight">
                                {category.categoryName}
                            </h1>
                            {category.description ? (
                                <p className="mt-2 text-muted-foreground">
                                    {category.description}
                                </p>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Kategori bilgisi bulunamadı.</p>
                )}

                {/* Two-column layout */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left: Category info */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Kategori Bilgileri</CardTitle>
                                <CardDescription>Kimlik ve istatistikler</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {category ? (
                                    <>
                                        <div className="grid grid-cols-1 gap-3 text-sm">
                                            <div className="flex items-center gap-2">
                                                <FolderClosed className="h-4 w-4 text-muted-foreground" />
                                                <span className="truncate">{category.categoryName}</span>
                                            </div>

                                        </div>

                                        <Separator />

                                        <div className="grid grid-cols-1 gap-3 text-sm">
                                            <div className="rounded-md border p-3">
                                                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                                    Veri Setleri
                                                </div>
                                                <div className="mt-1 inline-flex items-center gap-2">
                                                    <FolderClosed className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{datasets.length}</span>
                                                </div>
                                            </div>
                                            <div className="rounded-md border p-3">
                                                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                                    En Son Güncelleme
                                                </div>
                                                <div className="mt-1 inline-flex items-center gap-2">
                                                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">
                                                        {latestDatasetTimestamp
                                                            ? new Date(latestDatasetTimestamp).toLocaleDateString("tr-TR")
                                                            : "-"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="grid grid-cols-1 gap-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Oluşturulma:</span>
                                                <span className="text-foreground">
                                                    {formatDate(category.createdAt)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Güncelleme:</span>
                                                <span className="text-foreground">
                                                    {formatDate(category.updatedAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Kategori bilgisi yüklenemedi.</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Related tags within this category */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">İlgili Etiketler</CardTitle>
                                <CardDescription>
                                    Bu kategorideki veri setlerinde en çok geçen etiketler
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {topTags.length > 0 ? (
                                    <div className="flex flex-wrap gap-1.5">
                                        {topTags.map((t) => (
                                            <Badge key={t.id} variant="outline" className="px-2 py-0.5">
                                                <div className="inline-flex items-center gap-1">
                                                    <TagsIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <span>{t.tagName}</span>
                                                    <span className="text-muted-foreground">({t.datasetCount})</span>
                                                </div>
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Etiket yok</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Datasets in this category */}
                    <div className="lg:col-span-9 space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <CardTitle className="text-base">Veri Setleri</CardTitle>
                                        <CardDescription>
                                            Bu kategori altında yayımlanan veri setleri
                                        </CardDescription>
                                    </div>

                                    <Badge variant="secondary">Toplam: {filteredAndSorted.length}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Controls */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    <div className="sm:col-span-2">
                                        <Input
                                            placeholder="Veri setlerinde ara..."
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <div className="flex items-center gap-2">
                                            <label
                                                htmlFor="sort"
                                                className="text-sm text-muted-foreground whitespace-nowrap"
                                            >
                                                Sırala:
                                            </label>
                                            <select
                                                id="sort"
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value as SortKey)}
                                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                            >
                                                <option value="recent">En yeni</option>
                                                <option value="views">Görüntülenme (çoktan aza)</option>
                                                <option value="downloads">İndirme (çoktan aza)</option>
                                                <option value="title">Başlık (A-Z)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {filteredAndSorted.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                                            {filteredAndSorted.map((d: any) => (
                                                <DataCard
                                                    key={d.id ?? d._id}
                                                    dataset={(d)}
                                                />
                                            ))}
                                        </div>

                                        {/* Quick stats */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-4">
                                            <div className="rounded-md border p-3">
                                                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                                    Toplam Görüntülenme
                                                </div>
                                                <div className="mt-1 inline-flex items-center gap-2 text-base">
                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                    {filteredAndSorted.reduce(
                                                        (sum: number, d: any) => sum + (d.viewsCount ?? 0),
                                                        0
                                                    )}
                                                </div>
                                            </div>
                                            <div className="rounded-md border p-3">
                                                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                                    Toplam İndirme
                                                </div>
                                                <div className="mt-1 inline-flex items-center gap-2 text-base">
                                                    <Download className="h-4 w-4 text-muted-foreground" />
                                                    {filteredAndSorted.reduce(
                                                        (sum: number, d: any) => sum + (d.downloadsCount ?? 0),
                                                        0
                                                    )}
                                                </div>
                                            </div>
                                            <div className="rounded-md border p-3">
                                                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                                    Veri Seti Sayısı
                                                </div>
                                                <div className="mt-1 text-base">{filteredAndSorted.length}</div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        Bu kriterlerle eşleşen veri seti bulunamadı.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}