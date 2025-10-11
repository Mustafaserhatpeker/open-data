import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2, User } from "lucide-react"
import type { DataRequest } from "@/lib/types"

function statusBadgeClasses(status: string): string {
    switch (status) {
        case "approved":
            return "bg-green-100 text-green-800 ring-green-600/20"
        case "in_review":
            return "bg-amber-100 text-amber-800 ring-amber-600/20"
        case "rejected":
            return "bg-red-100 text-red-800 ring-red-600/20"
        case "pending":
        default:
            return "bg-gray-100 text-gray-800 ring-gray-600/20"
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
            <div className="flex items-center justify-between">
                <Button asChild variant="ghost" size="sm" className="-ml-2">
                    <Link to="/dashboard/datarequests">
                        <ArrowLeft className="h-4 w-4 mr-1.5" />
                        Geri
                    </Link>
                </Button>

                <span
                    className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusBadgeClasses(
                        request.status
                    )}`}
                    title={`Durum: ${request.status}`}
                >
                    {request.status}
                </span>
            </div>

            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">{request.title}</h1>
                {request.description ? (
                    <p className="mt-2 text-muted-foreground">{request.description}</p>
                ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {organizationName ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {organizationName}
                    </span>
                ) : null}
                {requestedByName ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                        <User className="h-3.5 w-3.5" />
                        {requestedByName}
                    </span>
                ) : null}
            </div>
        </div>
    )
}