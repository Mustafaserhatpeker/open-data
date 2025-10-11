import React from "react"
import {
    Building2,
    FolderTree,
    ListChecks,
    Search,
    MessageSquare,
    ThumbsUp,
    CalendarDays,
    User,
} from "lucide-react"

import {
    organizations,
    categories,
    datasets,
    users,
    dataRequests,
} from "@/dummy/dummy.data"
import type { DataRequest } from "@/lib/types"

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

function formatDate(dateStr?: string) {
    if (!dateStr) return "-"
    try {
        return new Intl.DateTimeFormat("tr-TR", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        }).format(new Date(dateStr))
    } catch {
        return dateStr
    }
}

function StatusBadge({ status }: { status: DataRequest["status"] }) {
    const map: Record<
        DataRequest["status"],
        { text: string; className: string }
    > = {
        in_review: {
            text: "İncelemede",
            className:
                "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200",
        },
        approved: {
            text: "Onaylandı",
            className:
                "bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200",
        },
        rejected: {
            text: "Reddedildi",
            className: "bg-rose-100 text-rose-800 ring-1 ring-inset ring-rose-200",
        },
    }
    const { text, className } = map[status]
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
        >
            {text}
        </span>
    )
}

function StatCard({
    title,
    icon: Icon,
    items,

}: {
    title: string
    icon: LucideIcon

    items: Array<{ label: string; value: number }>
}) {
    return (
        <div
            className={`relative overflow-hidden rounded-xl border  shadow-sm transition-all hover:shadow-md `}
        >
            <div className="relative p-4">
                <div className="mb-3 flex items-center gap-2">
                    <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                        <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                        {title}
                    </h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {items.map((it) => (
                        <div
                            key={it.label}
                            className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-800/60"
                        >
                            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                                {it.value}
                            </div>
                            <div className="text-[11px] text-zinc-500">{it.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function DashboardDesktop() {
    // Not: Uygulama kimliği bağlanana kadar örnek kullanıcı olarak 'usr2' (data.editor) kullanıyoruz
    const currentUser =
        users.find((u) => u.id === "usr2") ?? users[0] // fallback: admin
    const userOrg = organizations.find(
        (o) => o.id === currentUser.organizationId
    )

    // 1) Organizasyon istatistikleri
    const totalOrganizations = organizations.length
    const userOrganizationsCount = currentUser.organizationId ? 1 : 0
    const datasetsInUserOrganizations = userOrg ? userOrg.datasetsCount : 0

    // 2) Kategori istatistikleri
    const totalCategories = categories.length
    const userDatasets = datasets.filter((d) => d.createdBy === currentUser.id)
    const userCategoryIds = new Set<string>(
        userDatasets.flatMap((d) => d.categories)
    )
    const userCategoriesCount = userCategoryIds.size
    // Bu kullanıcının kullandığı kategorilerdeki toplam dataset sayısı (genel)
    const datasetsInUserCategories = datasets.filter((d) =>
        d.categories.some((c) => userCategoryIds.has(c))
    ).length

    // 3) Veri talebi (request) istatistikleri
    const totalDataRequests = dataRequests.length
    // Bu kişiye yapılmış: kullanıcının bulunduğu kuruma gelen talepler
    const dataRequestsToUser =
        currentUser.organizationId
            ? dataRequests.filter(
                (dr) => dr.organizationId === currentUser.organizationId
            ).length
            : 0

    // Liste + arama
    const [query, setQuery] = React.useState("")
    const filteredRequests = React.useMemo(() => {
        const q = query.trim().toLowerCase()
        const list = dataRequests
            .slice()
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
        if (!q) return list
        return list.filter((dr) => {
            const org = organizations.find((o) => o.id === dr.organizationId)
            const requester = users.find((u) => u.id === dr.requestedBy)
            return (
                dr.title.toLowerCase().includes(q) ||
                dr.description.toLowerCase().includes(q) ||
                (org?.name.toLowerCase().includes(q) ?? false) ||
                (requester?.fullName?.toLowerCase().includes(q) ?? false) ||
                dr.status.toLowerCase().includes(q)
            )
        })
    }, [query])

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <StatCard
                    title="Organizasyonlar"
                    icon={Building2}
                    items={[
                        { label: "Toplam", value: totalOrganizations },
                        { label: "Size Ait", value: userOrganizationsCount },
                        { label: "Bu Kurumlardaki", value: datasetsInUserOrganizations },
                    ]}
                />
                <StatCard
                    title="Kategoriler"
                    icon={FolderTree}

                    items={[
                        { label: "Toplam", value: totalCategories },
                        { label: "Size Ait", value: userCategoriesCount },
                        { label: "Bu Kategorilerdeki", value: datasetsInUserCategories },
                    ]}
                />
                <StatCard
                    title="Veri Talepleri"
                    icon={ListChecks}

                    items={[
                        { label: "Toplam", value: totalDataRequests },
                        { label: "Size Yapılan", value: dataRequestsToUser },
                        {
                            label: "Onaylanan",
                            value: dataRequests.filter((d) => d.status === "approved").length,
                        },
                    ]}
                />
            </div>

            <div className="flex-1 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                            Veri Talepleri
                        </h2>
                        <p className="text-sm text-zinc-500">
                            Son talepleri görüntüleyin ve arayın.
                        </p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Başlık, açıklama, kurum, kullanıcı, durum..."
                            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-0 transition focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-800"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {filteredRequests.map((dr) => {
                        const org = organizations.find((o) => o.id === dr.organizationId)
                        const requester = users.find((u) => u.id === dr.requestedBy)
                        return (
                            <div
                                key={dr.id}
                                className="group rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:bg-white hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 hover:dark:bg-zinc-900"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="mb-1 flex flex-wrap items-center gap-2">
                                            <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-50">
                                                {dr.title}
                                            </h3>
                                            <StatusBadge status={dr.status} />
                                        </div>
                                        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
                                            {dr.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
                                    <div className="inline-flex items-center gap-1.5">
                                        <Building2 className="h-3.5 w-3.5" />
                                        <span className="truncate">{org?.name ?? "-"}</span>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5">
                                        <User className="h-3.5 w-3.5" />
                                        <span className="truncate">
                                            {requester?.fullName ?? requester?.username ?? "-"}
                                        </span>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5">
                                        <CalendarDays className="h-3.5 w-3.5" />
                                        <span>{formatDate(dr.createdAt)}</span>
                                    </div>

                                    <div className="ml-auto inline-flex items-center gap-3">
                                        <span className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
                                            <MessageSquare className="h-3.5 w-3.5" />
                                            {dr.commentsCount ?? dr.comments?.length ?? 0}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
                                            <ThumbsUp className="h-3.5 w-3.5" />
                                            {dr.upvotesCount ?? 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {filteredRequests.length === 0 && (
                        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
                            Aramanızla eşleşen veri talebi bulunamadı.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DashboardDesktop