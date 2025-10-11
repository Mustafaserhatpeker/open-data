import React from "react"
import { Search } from "lucide-react"

import { organizations, users, dataRequests } from "@/dummy/dummy.data"
import DatarequestCard from "./inner-components/DatarequestCard"

function DatarequestList() {
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
                {filteredRequests.map((dr) => (
                    <DatarequestCard key={dr.id} request={dr} />
                ))}

                {filteredRequests.length === 0 && (
                    <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
                        Aramanızla eşleşen veri talebi bulunamadı.
                    </div>
                )}
            </div>
        </div>
    )
}

export default DatarequestList