import { useParams } from "react-router-dom"
import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { getDatasets } from "@/services/dataset.service"
import { useAuthStore } from "@/stores/auth.store"

import DataCard from "./components/DataCard"
import BackButton from "@/components/back-button"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Building2,
    CalendarClock,
    FolderClosed,
    Globe,
    Mail,
} from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

// Yardımcı fonksiyonlar
function formatDate(dateString?: string) {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("tr-TR")
}

function getInitials(name?: string) {
    if (!name) return "?"
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
}

type SortKey = "recent" | "views" | "downloads" | "title"

export default function OrganizationInfoDesktop() {
    const { id } = useParams<{ id: string }>()
    const { accessToken } = useAuthStore()

    const [query, setQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortKey>("recent")
    // IMPORTANT: Hooks must be declared before any early returns.
    const [gridView, setGridView] = useState(false)

    const { data: datasetsResp, isLoading } = useQuery({
        queryKey: ["datasets", id],
        queryFn: () => getDatasets({ categoryId: id, accessToken }),
    })

    const datasets = datasetsResp?.data?.data || []
    const org = datasets[0]?.organization

    const filteredAndSorted = useMemo(() => {
        let results = datasets.filter((d: any) =>
            d?.title.toLowerCase().includes(query.toLowerCase())
        )

        switch (sortBy) {
            case "views":
                results.sort((a: any, b: any) => b.viewsCount - a.viewsCount)
                break
            case "downloads":
                results.sort((a: any, b: any) => b.downloadsCount - a.downloadsCount)
                break
            case "title":
                results.sort((a: any, b: any) => a.title.localeCompare(b.title))
                break
            default:
                results.sort(
                    (a: any, b: any) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                )
        }
        return results
    }, [datasets, query, sortBy])

    if (isLoading) {
        return <div className="p-6 text-center text-muted-foreground">Yükleniyor...</div>
    }

    return (
        <div className="w-full bg-accent px-4 py-6">
            <div className="mx-auto w-full max-w-[80%]">
                {/* Üst Kısım */}
                <div className="mb-6 flex items-center justify-between">
                    <BackButton />
                    <Badge variant="secondary">Toplam veri seti: {datasets.length}</Badge>
                </div>

                {/* Organizasyon Başlığı */}
                {org ? (
                    <div className="mb-6 flex items-start gap-3">
                        <Avatar className="h-12 w-12 rounded-lg">
                            <AvatarImage src={org.logoUrl} alt={org.organizationName} />
                            <AvatarFallback className="rounded-lg bg-purple-400">
                                {getInitials(org.organizationName)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                            <h1 className="text-2xl font-semibold leading-tight">{org.organizationName}</h1>
                            <p className="mt-2 text-muted-foreground">{org.description}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Organizasyon bilgisi bulunamadı.</p>
                )}

                {/* İki kolon düzeni */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Sol kolon: Organizasyon Bilgileri */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Organizasyon Bilgileri</CardTitle>
                                <CardDescription>İletişim ve istatistikler</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {org ? (
                                    <>
                                        <div className="grid grid-cols-1 gap-3 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                                <span className="truncate">{org.organizationName}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-muted-foreground" />
                                                {org.websiteUrl ? (
                                                    <a
                                                        href={org.websiteUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="hover:underline"
                                                    >
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
                                                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                                    Veri Setleri
                                                </div>
                                                <div className="mt-1 inline-flex items-center gap-2">
                                                    <FolderClosed className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{datasets.length}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="grid grid-cols-1 gap-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Oluşturulma:</span>
                                                <span className="text-foreground">{formatDate(org.createdAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Güncelleme:</span>
                                                <span className="text-foreground">{formatDate(org.updatedAt)}</span>
                                            </div>

                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Organizasyon bilgisi yüklenemedi.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sağ kolon: Veri Setleri */}
                    <div className="lg:col-span-9 space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <CardTitle className="text-base">Veri Setleri</CardTitle>
                                        <CardDescription>
                                            Bu organizasyon tarafından yayımlanan veri setleri
                                        </CardDescription>
                                    </div>
                                    <Badge variant="secondary">Toplam: {filteredAndSorted.length}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Arama & Sıralama */}
                                <div className="grid  gap-3 grid-cols-5 items-center justify-between">
                                    <div className="col-span-3">
                                        <Input
                                            placeholder="Veri setlerinde ara..."
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <div className="flex items-center gap-2 w-full justify-end">
                                            <div className="flex  flex-row items-center gap-2 ml-4 justify-between">
                                                <label
                                                    htmlFor="sort"
                                                    className="text-sm text-muted-foreground whitespace-nowrap"
                                                >
                                                    Sırala:
                                                </label>
                                                <Select
                                                    value={sortBy}
                                                    onValueChange={(value: SortKey) => setSortBy(value)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Sırala" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="recent">En yeni</SelectItem>
                                                            <SelectItem value="views">Görüntülenme (çoktan aza)</SelectItem>
                                                            <SelectItem value="downloads">İndirme (çoktan aza)</SelectItem>
                                                            <SelectItem value="title">Başlık (A-Z)</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="text-xs text-muted-foreground">
                                                <Select defaultValue="list">
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Görünüm Seçin" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Görünümler</SelectLabel>
                                                            <SelectItem onClick={() => setGridView(true)} value="grid">Izgara</SelectItem>
                                                            <SelectItem onClick={() => setGridView(false)} value="list">Liste</SelectItem>

                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <Separator />

                                {/* Veri Seti Kartları */}
                                {filteredAndSorted.length > 0 ? (
                                    <div className={`grid ${gridView ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}>
                                        {filteredAndSorted.map((d: any) => (
                                            <DataCard key={d._id} dataset={d} />
                                        ))}
                                    </div>
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