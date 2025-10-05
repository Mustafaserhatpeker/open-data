import type { DataRequest } from "@/lib/types"

export function RequestMetaCard({
    request,
    requestedByName,
}: {
    request: DataRequest
    requestedByName?: string
}) {
    return (
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground">Talep Bilgileri</h3>

            <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Durum</dt>
                    <dd className="text-foreground">{request.status}</dd>
                </div>

                {requestedByName ? (
                    <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">Talep Eden</dt>
                        <dd className="text-foreground">{requestedByName}</dd>
                    </div>
                ) : null}

                <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Oluşturma</dt>
                    <dd className="text-foreground">{request.createdAt}</dd>
                </div>

                {request.updatedAt ? (
                    <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">Güncelleme</dt>
                        <dd className="text-foreground">{request.updatedAt}</dd>
                    </div>
                ) : null}

                {typeof request.commentsCount === "number" ? (
                    <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">Yorum</dt>
                        <dd className="text-foreground">{request.commentsCount}</dd>
                    </div>
                ) : null}
            </dl>
        </div>
    )
}