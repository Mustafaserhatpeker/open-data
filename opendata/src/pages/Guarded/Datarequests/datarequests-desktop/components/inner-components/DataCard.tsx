import { useAuthStore } from "@/stores/auth.store";

export type DataRequestCardModel = {
    id: string;
    title: string;
    description?: string;
    status: "pending" | "approved" | "rejected";
    organization?: string;
    requestedBy?: string;
    createdDate?: string;
    updatedDate?: string;
    commentsCount?: number;
    likesCount?: number;
};

function statusColor(status: string): string {
    switch (status) {
        case "approved":
            return "bg-green-100 text-green-800 ring-green-600/20";
        case "rejected":
            return "bg-red-100 text-red-800 ring-red-600/20";
        case "pending":
        default:
            return "bg-gray-100 text-yellow-800 ring-yellow-600/20";
    }
}

function formatDate(date?: string): string {
    if (!date) return "";
    try {
        return new Date(date).toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    } catch {
        return date;
    }
}

export default function DataRequestCard({
    request,
}: {
    request: DataRequestCardModel;
}) {
    const { isAuthenticated } = useAuthStore();

    return (
        <div
            onClick={() => {
                if (isAuthenticated) {
                    window.location.href = `/dashboard/datarequests/${request.id}`;
                }
            }}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                    {request.title}
                </h3>
                <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusColor(
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

            {/* Açıklama */}
            {request.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {request.description}
                </p>
            )}

            {/* Bilgi etiketleri */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                {request.organization && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M3 21h18v-2H3v2zm2-4h14V5H5v12zm2-2V7h10v8H7z" />
                        </svg>
                        {request.organization}
                    </span>
                )}

                {request.requestedBy && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 110-8 4 4 0 010 8z" />
                        </svg>
                        {request.requestedBy}
                    </span>
                )}

                {request.commentsCount !== undefined && (
                    <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M4 4h16v12H5.17L4 17.17V4zM2 2v20l4-4h16V2H2z" />
                        </svg>
                        {request.commentsCount}
                    </span>
                )}


            </div>

            {/* Alt kısım: tarih bilgileri */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                {request.createdDate && (
                    <span>Oluşturma: {formatDate(request.createdDate)}</span>
                )}
                {request.updatedDate && (
                    <span>Güncelleme: {formatDate(request.updatedDate)}</span>
                )}
            </div>
        </div>
    );
}
