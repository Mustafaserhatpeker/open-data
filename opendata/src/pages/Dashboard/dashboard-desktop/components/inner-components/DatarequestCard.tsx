import {
    Building2,
    User,
    CalendarDays,
    MessageSquare,
    ThumbsUp,
} from "lucide-react"

import { organizations, users } from "@/dummy/dummy.data"
import type { DataRequest } from "@/lib/types"

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

function DatarequestCard({ request }: { request: DataRequest }) {
    const org = organizations.find((o) => o.id === request.organizationId)
    const requester = users.find((u) => u.id === request.requestedBy)

    return (
        <div className="group rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:bg-white hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 hover:dark:bg-zinc-900">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-50">
                            {request.title}
                        </h3>
                        <StatusBadge status={request.status} />
                    </div>
                    <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {request.description}
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
                    <span>{formatDate(request.createdAt)}</span>
                </div>

                <div className="ml-auto inline-flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
                        <MessageSquare className="h-3.5 w-3.5" />
                        {request.commentsCount ?? request.comments?.length ?? 0}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {request.upvotesCount ?? 0}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DatarequestCard