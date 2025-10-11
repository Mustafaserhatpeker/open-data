import { Building2, FolderTree, ListChecks } from "lucide-react"

import { organizations, categories, datasets, users, dataRequests } from "@/dummy/dummy.data"

import DatarequestList from "./components/DatarequestsList"

import StatCard from "./components/inner-components/DashboardHeader"


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