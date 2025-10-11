import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"

import {
    organizations as orgs,
    datasets as allDatasets,
    categories as categoriesList,
    tags as tagsList,
} from "@/dummy/dummy.data"
import type { Dataset as DummyDataset, Organization } from "@/lib/types"

import DataCard, { type Dataset as CardDataset } from "@/pages/Datasets/datasets-desktop/components/inner-components/DataCard"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    ArrowLeft,
    Building2,
    CalendarClock,
    FolderClosed,
    Globe,
    Mail,
    Hash,
} from "lucide-react"

function getInitials(name?: string) {
    if (!name) return "ORG"
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

// Mapping helpers to adapt DummyDataset -> CardDataset (used by DataCard)
function resolveOrganizationName(d: DummyDataset): string | undefined {
    return d.organization?.name ?? orgs.find((o) => o.id === d.organizationId)?.name
}
function resolveCategoryName(d: DummyDataset): string | undefined {
    const firstCatId = d.categories?.[0]
    if (!firstCatId) return undefined
    return categoriesList.find((c) => c.id === firstCatId)?.name
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

export default function OrganizationInfoDesktop() {
    const { id } = useParams<{ id: string }>()
    const [loading, setLoading] = useState(true)
    const [org, setOrg] = useState<Organization | null>(null)

    // Right column controls
    const [query, setQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortKey>("recent")

    useEffect(() => {
        setLoading(true)
        const found = orgs.find((o) => o.id === id) ?? null
        setOrg(found)
        setLoading(false)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])

    const orgDatasets = useMemo(() => {
        if (!org) return []
        return allDatasets.filter((d) => d.organizationId === org.id)
    }, [org])

    const filteredAndSorted = useMemo(() => {
        const q = query.trim().toLocaleLowerCase()
        let list = q
            ? orgDatasets.filter(
                (d) =>
                    d.title.toLocaleLowerCase().includes(q) ||
                    d.description.toLocaleLowerCase().includes(q),
            )
            : orgDatasets.slice()

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
                    // Desc by updatedAt then createdAt
                    return (
                        new Date(b.updatedAt ?? b.createdAt).getTime() -
                        new Date(a.updatedAt ?? a.createdAt).getTime()
                    )
            }
        })

        return list
    }, [orgDatasets, query, sortBy])

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

    if (!org) {
        return (
            <div className="w-full bg-accent px-4 py-12">
                <div className="mx-auto max-w-xl text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-3">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">Organizasyon Bulunamadı</h2>
                    <p className="text-muted-foreground mt-1">
                        Aradığınız organizasyon kaldırılmış veya hiç var olmamış olabilir.
                    </p>
                    <div className="mt-4">
                        <Button asChild variant="secondary">
                            <Link to="/organizations">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Organizasyonlara dön
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-accent px-4 py-6">
            <div className="mx-auto w-full max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <Button asChild variant="ghost" className="pl-0">
                        <Link to="/dashboard/organizations">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Geri
                        </Link>
                    </Button>

                    <Badge variant="secondary">Toplam veri seti: {orgDatasets.length}</Badge>
                </div>

                {/* Title */}
                <div className="mb-6 flex items-start gap-3">
                    <Avatar className="h-12 w-12 rounded-lg">
                        <AvatarImage src={org.logoUrl} alt={org.name} />
                        <AvatarFallback className="rounded-lg bg-purple-400">{getInitials(org.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <h1 className="text-2xl font-semibold leading-tight">{org.name}</h1>
                        <p className="mt-2 text-muted-foreground">{org.description}</p>
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left: Organization info */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Organizasyon Bilgileri</CardTitle>
                                <CardDescription>İletişim ve istatistikler</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-1 gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        <span className="truncate">{org.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        {org.website ? (
                                            <a href={org.website} target="_blank" rel="noreferrer" className="hover:underline">
                                                Web sitesi
                                            </a>
                                        ) : (
                                            <span className="text-muted-foreground">Web sitesi yok</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        {org.contactEmail ? (
                                            <a href={`mailto:${org.contactEmail}`} className="hover:underline">
                                                {org.contactEmail}
                                            </a>
                                        ) : (
                                            <span className="text-muted-foreground">İletişim e-postası yok</span>
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 gap-3 text-sm">
                                    <div className="rounded-md border p-3">
                                        <div className="text-xs uppercase tracking-wide text-muted-foreground">Veri Setleri</div>
                                        <div className="mt-1 inline-flex items-center gap-2">
                                            <FolderClosed className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{orgDatasets.length}</span>
                                        </div>
                                    </div>

                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Oluşturulma:</span>
                                        <span className="text-foreground">{formatDate(org.createdAt) ?? "-"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Güncelleme:</span>
                                        <span className="text-foreground">{formatDate(org.updatedAt) ?? "-"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Hash className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">ID:</span>
                                        <span className="text-foreground">{org.id}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Organization datasets */}
                    <div className="lg:col-span-9 space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <CardTitle className="text-base">Veri Setleri</CardTitle>
                                        <CardDescription>Bu organizasyon tarafından yayımlanan veri setleri</CardDescription>
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
                                            <label htmlFor="sort" className="text-sm text-muted-foreground whitespace-nowrap">
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
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {filteredAndSorted.map((d) => (
                                            <DataCard key={d.id} dataset={toCardDataset(d)} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Bu kriterlerle eşleşen veri seti bulunamadı.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}