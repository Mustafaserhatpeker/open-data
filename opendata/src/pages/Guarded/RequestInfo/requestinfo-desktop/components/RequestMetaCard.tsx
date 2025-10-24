
export function RequestMetaCard({
    request,
    requestedByName,
}: {
    request: any
    requestedByName?: string
}) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return "-"
        try {
            return new Date(dateString).toLocaleString("tr-TR", {
                dateStyle: "medium",
                timeStyle: "short",
            })
        } catch {
            return dateString
        }
    }

    return (
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground">Talep Bilgileri</h3>

            <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Durum</dt>
                    <dd className="capitalize text-foreground">
                        {request.status === "approved"
                            ? "Onaylandı"
                            : request.status === "rejected"
                                ? "Reddedildi"
                                : "Beklemede"}
                    </dd>
                </div>

                {requestedByName && (
                    <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">Talep Eden</dt>
                        <dd className="text-foreground">Vatandaş</dd>
                    </div>
                )}

                <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Oluşturma</dt>
                    <dd className="text-foreground">{formatDate(request.createdAt)}</dd>
                </div>

                {request.updatedAt && (
                    <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">Güncelleme</dt>
                        <dd className="text-foreground">{formatDate(request.updatedAt)}</dd>
                    </div>
                )}

                {request.status === "approved" && request.approvedAt && (
                    <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">Onaylanma</dt>
                        <dd className="text-foreground">{formatDate(request.approvedAt)}</dd>
                    </div>
                )}

                {typeof request.commentCount === "number" && (
                    <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">Yorum Sayısı</dt>
                        <dd className="text-foreground">{request.commentCount}</dd>
                    </div>
                )}

                {typeof request.likeCount === "number" && (
                    <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">Beğeni</dt>
                        <dd className="text-foreground">{request.likeCount}</dd>
                    </div>
                )}
            </dl>
        </div>
    )
}
