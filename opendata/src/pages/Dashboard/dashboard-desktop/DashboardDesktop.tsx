import React from "react"
import { Building2, FolderTree, ListChecks } from "lucide-react"

import { organizations, categories, datasets, users, dataRequests } from "@/dummy/dummy.data"

import DatarequestList from "./components/DatarequestsList"

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

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
        <div className="relative overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
            <div className="relative p-4">
                <div className="mb-3 flex items-center gap-2">
                    <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                        <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                        {title}
                    </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
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
    const currentUser = users.find((u) => u.id === "usr2") ?? users[0] // fallback: admin

    // 1) Organizasyon istatistikleri
    const totalOrganizations = organizations.length
    const userOrganizationsCount = currentUser.organizationId ? 1 : 0

    // 2) Kategori istatistikleri
    const totalCategories = categories.length
    const userDatasets = datasets.filter((d) => d.createdBy === currentUser.id)
    const userCategoryIds = new Set<string>(userDatasets.flatMap((d) => d.categories))
    const userCategoriesCount = userCategoryIds.size

    // 3) Veri talebi (request) istatistikleri
    const totalDataRequests = dataRequests.length
    const dataRequestsToUser =
        currentUser.organizationId
            ? dataRequests.filter((dr) => dr.organizationId === currentUser.organizationId).length
            : 0

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <StatCard
                    title="Organizasyonlar"
                    icon={Building2}
                    items={[
                        { label: "Toplam", value: totalOrganizations },
                        { label: "Size Ait", value: userOrganizationsCount },
                    ]}
                />
                <StatCard
                    title="Kategoriler"
                    icon={FolderTree}
                    items={[
                        { label: "Toplam", value: totalCategories },
                        { label: "Size Ait", value: userCategoriesCount },
                    ]}
                />
                <StatCard
                    title="Veri Talepleri"
                    icon={ListChecks}
                    items={[
                        { label: "Toplam", value: totalDataRequests },
                        { label: "Size Yapılan", value: dataRequestsToUser },
                    ]}
                />
            </div>

            {/* Veri Talepleri Listesi */}
            <DatarequestList />
        </div>
    )
}

export default DashboardDesktop