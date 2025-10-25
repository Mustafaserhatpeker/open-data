import { Building2, User } from "lucide-react"
import type { DataRequest } from "@/lib/types"
import BackButton from "@/components/back-button"
import { StatusChange } from "./inner-components/StatusChange"

function statusBadgeClasses(status: string): string {
    switch (status) {
        case "approved":
            return "bg-green-100 text-green-800 ring-green-600/20"
        case "rejected":
            return "bg-red-100 text-red-800 ring-red-600/20"
        case "pending":
        default:
            return "bg-yellow-100 text-yellow-800 ring-yellow-600/20"
    }
}

export function RequestHeader({
    request,
    requestedByName,
    organizationName,
}: {
    request: DataRequest
    requestedByName?: string
    organizationName?: string
}) {
    return (
        <div className="space-y-4">
            {/* Üst kısım: geri butonu + durum etiketi */}
            <div className="flex items-center justify-between">
                <BackButton />

                <span
                    className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusBadgeClasses(
                        request.status
                    )}`}
                    title={`Durum: ${request.status}`}
                >
                    {request.status === "approved"
                        ? "Onaylandı"
                        : request.status === "rejected"
                            ? "Reddedildi"
                            : "Beklemede"}
                </span>
            </div>

            {/* Başlık ve açıklama */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    {request.title}
                </h1>
                {request.description && (
                    <p className="mt-2 text-muted-foreground">{request.description}</p>
                )}
            </div>

            {/* Kurum ve talep eden kullanıcı bilgisi */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {organizationName && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {organizationName}
                    </span>
                )}

                {requestedByName && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                        <User className="h-3.5 w-3.5" />
                        {requestedByName}
                    </span>
                )}
                <StatusChange />

            </div>
        </div>
    )
}
