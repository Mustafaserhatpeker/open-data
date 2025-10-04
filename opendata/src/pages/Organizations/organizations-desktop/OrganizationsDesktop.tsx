import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

import { organizations as orgs } from "@/dummy/dummy.data"
import type { Organization } from "@/lib/types"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import {
    Building2,
    FolderClosed,
    Users,
    Globe,
    Mail,
} from "lucide-react"

function getInitials(name?: string) {
    if (!name) return "ORG"
    const parts = name.split(" ").filter(Boolean)
    const first = parts[0]?.[0] ?? ""
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : ""
    return (first + last).toUpperCase()
}

type SortKey = "name" | "datasets" | "followers"

export default function OrganizationsDesktop() {
    const [query, setQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortKey>("name")

    const filtered = useMemo(() => {
        const q = query.trim().toLocaleLowerCase()
        const base = q
            ? orgs.filter(
                (o) =>
                    o.name.toLocaleLowerCase().includes(q) ||
                    o.description.toLocaleLowerCase().includes(q)
            )
            : orgs.slice()

        base.sort((a, b) => {
            switch (sortBy) {
                case "datasets":
                    return (b.datasetsCount ?? 0) - (a.datasetsCount ?? 0)
                case "followers":
                    return (b.followersCount ?? 0) - (a.followersCount ?? 0)
                case "name":
                default:
                    return a.name.localeCompare(b.name, "tr")
            }
        })

        return base
    }, [query, sortBy])

    return (
        <div className="w-full bg-accent px-4 py-6">
            <div className="mx-auto w-full max-w-7xl ">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold">Organizasyonlar</h1>
                            <p className="text-muted-foreground mt-1">
                                Veri setlerini sağlayan kurum ve kuruluşlar
                            </p>
                        </div>

                        <div className="hidden sm:flex items-center gap-2">
                            <Badge variant="secondary">
                                Toplam: {orgs.length}
                            </Badge>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="sm:col-span-2">
                            <Input
                                placeholder="Ara: isim veya açıklama..."
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
                                    <option value="name">Ada göre (A-Z)</option>
                                    <option value="datasets">Veri seti sayısı (çoktan aza)</option>
                                    <option value="followers">Takipçi (çoktan aza)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="mb-6" />

                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((org: Organization) => (
                        <Card key={org.id} className="h-full overflow-hidden border border-border/60">
                            <CardHeader className="pb-3">
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-12 w-12 rounded-lg">
                                        <AvatarImage src={org.logoUrl} alt={org.name} />
                                        <AvatarFallback className="rounded-lg">
                                            {getInitials(org.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <CardTitle className="text-base">{org.name}</CardTitle>
                                        <CardDescription className="mt-1 line-clamp-2">
                                            {org.description}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="rounded-md border p-3">
                                        <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                            Veri Setleri
                                        </div>
                                        <div className="mt-1 inline-flex items-center gap-2">
                                            <FolderClosed className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{org.datasetsCount ?? 0}</span>
                                        </div>
                                    </div>
                                    <div className="rounded-md border p-3">
                                        <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                            Takipçi
                                        </div>
                                        <div className="mt-1 inline-flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{org.followersCount ?? 0}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-3 text-sm">
                                        <a
                                            href={org.website || "#"}
                                            onClick={(e) => {
                                                if (!org.website) e.preventDefault()
                                            }}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`inline-flex items-center gap-1.5 ${org.website ? "text-foreground hover:underline" : "text-muted-foreground cursor-default"}`}
                                            title={org.website ? "Web sitesine git" : "Web sitesi yok"}
                                        >
                                            <Globe className="h-4 w-4" />
                                            Web
                                        </a>
                                        <a
                                            href={org.contactEmail ? `mailto:${org.contactEmail}` : "#"}
                                            onClick={(e) => {
                                                if (!org.contactEmail) e.preventDefault()
                                            }}
                                            className={`inline-flex items-center gap-1.5 ${org.contactEmail ? "text-foreground hover:underline" : "text-muted-foreground cursor-default"}`}
                                            title={org.contactEmail ? "E-posta gönder" : "E-posta yok"}
                                        >
                                            <Mail className="h-4 w-4" />
                                            E-posta
                                        </a>
                                    </div>

                                    {/* Gelecekte detay sayfasına yönlendirmek için Link eklenebilir */}
                                    <Button variant="secondary" asChild>
                                        <Link to={`/datasets?organizationId=${org.id}`}>
                                            <Building2 className="h-4 w-4 mr-2" />
                                            Veri setleri
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div className="mt-16 text-center text-muted-foreground">
                        Aramanızla eşleşen organizasyon bulunamadı.
                    </div>
                )}
            </div>
        </div>
    )
}