import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Building2, FolderClosed, Globe, Mail } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getMyOrganizations } from "@/services/organization.service"
import { AddDataOrgDialog } from "./components/AddDataOrgDialog"

function getInitials(name?: string) {
    if (!name) return "ORG"
    const parts = name.split(" ").filter(Boolean)
    const first = parts[0]?.[0] ?? ""
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : ""
    return (first + last).toUpperCase()
}

type SortKey = "name" | "datasets" | "followers"

type ApiOrganization = {
    _id?: string
    id?: string
    name?: string
    organizationName?: string
    description?: string
    logoUrl?: string
    websiteUrl?: string
    website?: string
    contactEmail?: string
    datasetCount?: number
    datasetsCount?: number
    followersCount?: number
    createdAt?: string
    updatedAt?: string
}

export default function OrganizationsDesktop() {
    const [query, setQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortKey>("name")

    const { data: organizationsResp } = useQuery({
        queryKey: ["organizations"],
        queryFn: () => getMyOrganizations(),
    })

    // API -> Organization tipine map
    const organizations: Organization[] = useMemo(() => {
        const apiData: ApiOrganization[] = (organizationsResp as any)?.data ?? []
        return (apiData ?? []).map((o) => ({
            id: o._id ?? o.id ?? "",
            name: o.name ?? o.organizationName ?? "",
            description: o.description ?? "",
            logoUrl: o.logoUrl ?? "",
            // UI 'website' bekliyor, API 'websiteUrl' veriyor
            website: o.websiteUrl ?? o.website ?? "",
            contactEmail: o.contactEmail ?? "",
            datasetsCount: o.datasetCount ?? o.datasetsCount ?? 0,
            followersCount: o.followersCount ?? 0,
            createdAt: o.createdAt,
            updatedAt: o.updatedAt,
        })) as Organization[]
    }, [organizationsResp])

    const filtered = useMemo(() => {
        const q = query.trim().toLocaleLowerCase("tr")
        const base = q
            ? organizations.filter(
                (o) =>
                    (o.name ?? "").toLocaleLowerCase("tr").includes(q) ||
                    (o.description ?? "").toLocaleLowerCase("tr").includes(q)
            )
            : organizations.slice()

        base.sort((a, b) => {
            switch (sortBy) {
                case "datasets":
                    return (b.datasetsCount ?? 0) - (a.datasetsCount ?? 0)
                case "followers":
                    return (b.followersCount ?? 0) - (a.followersCount ?? 0)
                case "name":
                default:
                    return (a.name ?? "").localeCompare(b.name ?? "", "tr")
            }
        })

        return base
    }, [query, sortBy, organizations])

    return (
        <div className="w-full  px-4 py-6 min-h-screen">
            <div className="mx-auto w-full ">
                <div className="mb-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold">Organizasyonlarım</h1>
                        </div>

                        <div className="hidden sm:flex items-center gap-2">
                            <Badge variant="secondary">
                                Toplam: {organizations.length}
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
                                <label
                                    htmlFor="sort"
                                    className="text-sm text-muted-foreground whitespace-nowrap"
                                >
                                    Sırala:
                                </label>
                                <Select
                                    value={sortBy}
                                    onValueChange={(value) => setSortBy(value as SortKey)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sıralama seç" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">Ada göre (A-Z)</SelectItem>
                                        <SelectItem value="datasets">
                                            Veri seti sayısı (çoktan aza)
                                        </SelectItem>
                                        <SelectItem value="followers">
                                            Takipçi (çoktan aza)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="mb-6" />

                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((org: Organization) => (
                        <Card

                            key={org.id}
                            className="h-full overflow-hidden border border-border/60 flex flex-col justify-between cursor-pointer"
                        >
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
                                    <AddDataOrgDialog
                                        organizationId={org.id}
                                        organizationName={org.name}
                                    />
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
                                            className={`inline-flex items-center gap-1.5 ${org.website
                                                ? "text-foreground hover:underline"
                                                : "text-muted-foreground cursor-default"
                                                }`}
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
                                            className={`inline-flex items-center gap-1.5 ${org.contactEmail
                                                ? "text-foreground hover:underline"
                                                : "text-muted-foreground cursor-default"
                                                }`}
                                            title={org.contactEmail ? "E-posta gönder" : "E-posta yok"}
                                        >
                                            <Mail className="h-4 w-4" />
                                            E-posta
                                        </a>
                                    </div>

                                    <Button variant="secondary" asChild>
                                        <Link to={`/dashboard/organizations/${org.id}`}>
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