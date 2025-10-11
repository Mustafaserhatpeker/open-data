import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"

import {
    categories as cats,
    datasets as allDatasets,
    tags as tagsList,
    organizations as orgs,
} from "@/dummy/dummy.data"
import type { Category, Dataset as DummyDataset } from "@/lib/types"

import DataCard, {
    type Dataset as CardDataset,
} from "./components/DataCard"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {
    ArrowLeft,
    CalendarClock,
    Download,
    Eye,
    FolderClosed,
    Plus,
    Tags as TagsIcon,
} from "lucide-react"
import BackButton from "@/components/back-button"

function getInitials(name?: string) {
    if (!name) return "CT"
    const parts = name.split(" ").filter(Boolean)
    const first = parts[0]?.[0] ?? ""
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : ""
    return (first + last).toUpperCase()
}

function formatDate(input?: string) {
    if (!input) return undefined
    const d = new Date(input)
    if (isNaN(d.getTime())) return input
    try {
        return d.toLocaleString()
    } catch {
        return d.toISOString()
    }
}

// Helpers to adapt DummyDataset -> CardDataset (DataCard props)
function resolveOrganizationName(d: DummyDataset): string | undefined {
    return d.organization?.name ?? orgs.find((o) => o.id === d.organizationId)?.name
}
function resolveCategoryName(d: DummyDataset): string | undefined {
    const firstCatId = d.categories?.[0]
    if (!firstCatId) return undefined
    const cat = cats.find((c) => c.id === firstCatId)
    return cat?.name
}
function resolveTagNames(d: DummyDataset): string[] | undefined {
    if (!d.tags || d.tags.length === 0) return undefined
    const names = d.tags
        .map((id) => tagsList.find((t) => t.id === id)?.name)
        .filter((x): x is string => Boolean(x))
    return names.length ? names : undefined
}
function resolveDatatype(d: DummyDataset): string {
    if (d.formats && d.formats.length > 0) return d.formats[0]
    if (d.resources && d.resources.length > 0) return d.resources[0].format
    return "Unknown"
}
function toCardDataset(d: DummyDataset): CardDataset {
    return {
        id: d.id,
        title: d.title,
        description: d.description,
        datatype: resolveDatatype(d),
        organization: resolveOrganizationName(d),
        category: resolveCategoryName(d),
        tags: resolveTagNames(d),
        createdDate: d.createdAt,
        updatedDate: d.updatedAt,
    }
}

type SortKey = "recent" | "views" | "downloads" | "title"

export default function CategoryInfo() {
    const { id } = useParams<{ id: string }>()
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState<Category | null>(null)

    // Right column controls
    const [query, setQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortKey>("recent")

    useEffect(() => {
        setLoading(true)
        const found = cats.find((c) => c.id === id) ?? null
        setCategory(found)
        setLoading(false)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    const catDatasets = useMemo(() => {
        if (!category) return []
        return allDatasets.filter((d) => (d.categories ?? []).includes(category.id))
    }, [category])
    const topTags = useMemo(() => {
        // Count tag frequencies within this category's datasets
        const map = new Map<string, number>()
        for (const d of catDatasets) {
            for (const tid of d.tags ?? []) {
                map.set(tid, (map.get(tid) ?? 0) + 1)
            }
        }
        const arr = Array.from(map.entries())
            .map(([id, count]) => ({
                id,
                name: tagsList.find((t) => t.id === id)?.name ?? id,
                count,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 12)
        return arr
    }, [catDatasets])

    const filteredAndSorted = useMemo(() => {
        const q = query.trim().toLocaleLowerCase()
        let list = q
            ? catDatasets.filter(
                (d) =>
                    d.title.toLocaleLowerCase().includes(q) ||
                    d.description.toLocaleLowerCase().includes(q),
            )
            : catDatasets.slice()

        list.sort((a, b) => {
            switch (sortBy) {
                case "views":
                    return (b.viewsCount ?? 0) - (a.viewsCount ?? 0)
                case "downloads":
                    return (b.downloadsCount ?? 0) - (a.downloadsCount ?? 0)
                case "title":
                    return a.title.localeCompare(b.title, "tr")
                case "recent":
                default:
                    return (
                        new Date(b.updatedAt ?? b.createdAt).getTime() -
                        new Date(a.updatedAt ?? a.createdAt).getTime()
                    )
            }
        })

        return list
    }, [catDatasets, query, sortBy])

    if (loading) {
        return (
            <div className="w-full bg-accent px-4 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 w-28 bg-muted rounded" />
                    <div className="h-10 w-1/2 bg-muted rounded" />
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                        <div className="h-64 bg-muted rounded lg:col-span-4" />
                        <div className="h-64 bg-muted rounded lg:col-span-8" />
                    </div>
                </div>
            </div>
        )
    }

    if (!category) {
        return (
            <div className="w-full bg-accent px-4 py-12">
                <div className="mx-auto max-w-xl text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-3">
                        <FolderClosed className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">Kategori Bulunamadı</h2>
                    <p className="text-muted-foreground mt-1">
                        Aradığınız kategori kaldırılmış veya hiç var olmamış olabilir.
                    </p>
                    <div className="mt-4">
                        <Button asChild variant="secondary">
                            <Link to="/categories">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kategorilere dön
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-accent px-4 py-6">
            <div className="mx-auto w-full ">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <BackButton />

                    <Badge variant="secondary">Toplam veri seti: {catDatasets.length}</Badge>
                </div>

                {/* Title */}
                <div className="mb-6 flex items-start gap-3">
                    <Avatar className="h-12 w-12 rounded-lg bg-primary/10 text-primary">
                        <AvatarFallback className="rounded-lg bg-purple-400">
                            {getInitials(category.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <h1 className="text-2xl font-semibold leading-tight">
                            {category.name}
                        </h1>
                        {category.description ? (
                            <p className="mt-2 text-muted-foreground">
                                {category.description}
                            </p>
                        ) : null}
                    </div>
                </div>

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
                                <div className="grid grid-cols-1 gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <FolderClosed className="h-4 w-4 text-muted-foreground" />
                                        <span className="truncate">{category.name}</span>
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
                                            <span className="font-medium">{catDatasets.length}</span>
                                        </div>
                                    </div>

                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Oluşturulma:</span>
                                        <span className="text-foreground">
                                            {formatDate(category.createdAt) ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Güncelleme:</span>
                                        <span className="text-foreground">
                                            {formatDate(category.updatedAt) ?? "-"}
                                        </span>
                                    </div>
                                </div>
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
                                                    <span>{t.name}</span>
                                                    <span className="text-muted-foreground">({t.count})</span>
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
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-7">
                                    <div className="sm:col-span-4">
                                        <Input
                                            placeholder="Veri setlerinde ara..."
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="sm:col-span-3">
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
                                            <Button onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }
                                            } variant={"outline"}>
                                                <Plus /> Veri Seti Ekle
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {filteredAndSorted.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {filteredAndSorted.map((d) => (
                                                <DataCard key={d.id} dataset={toCardDataset(d)} />
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
                                                    {filteredAndSorted.reduce((sum, d) => sum + (d.viewsCount ?? 0), 0)}
                                                </div>
                                            </div>
                                            <div className="rounded-md border p-3">
                                                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                                    Toplam İndirme
                                                </div>
                                                <div className="mt-1 inline-flex items-center gap-2 text-base">
                                                    <Download className="h-4 w-4 text-muted-foreground" />
                                                    {filteredAndSorted.reduce((sum, d) => sum + (d.downloadsCount ?? 0), 0)}
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