import React from "react"
import {
    Building2,
    User,
    CalendarDays,
    MessageSquare,
    ThumbsUp,
    ChevronDown,
} from "lucide-react"

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

import { organizations, users } from "@/dummy/dummy.data"
import type { DataRequest } from "@/lib/types"

type RequestComment = {
    id: string
    userId: string
    text: string
    createdAt: string
}

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

    // Demo için current user. Uygulama kimliği entegre olduğunda dışarıdan prop olarak alabilirsiniz.
    const currentUser = users.find((u) => u.id === "usr2") ?? users[0]

    const [status, setStatus] = React.useState<DataRequest["status"]>(
        request.status
    )
    const [comments, setComments] = React.useState<RequestComment[]>(
        ((request as any).comments as RequestComment[]) ?? []
    )
    const [newComment, setNewComment] = React.useState("")

    function handleAddComment(e: React.FormEvent) {
        e.preventDefault()
        const text = newComment.trim()
        if (!text) return
        const next: RequestComment = {
            id: Math.random().toString(36).slice(2),
            userId: currentUser.id,
            text,
            createdAt: new Date().toISOString(),
        }
        // Yeni yorum en üste
        setComments((prev) => [next, ...prev])
        setNewComment("")
    }

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`req-${request.id}`} className="border-none">
                <div className="group rounded-xl border border-zinc-200 bg-zinc-50/50 transition hover:bg-white hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 hover:dark:bg-zinc-900">
                    <AccordionTrigger className="w-full p-4 text-left hover:no-underline group">
                        <div className="flex w-full flex-col gap-2">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="mb-1 flex flex-wrap items-center gap-2">
                                        <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-50">
                                            {request.title}
                                        </h3>
                                        <StatusBadge status={status} />
                                    </div>
                                    <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
                                        {request.description}
                                    </p>
                                </div>
                                <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </div>

                            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
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
                                        {comments.length}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
                                        <ThumbsUp className="h-3.5 w-3.5" />
                                        {request.upvotesCount ?? 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 pb-4">
                        <div className="mt-2 grid gap-6">
                            {/* Durum Değiştirme */}
                            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                                        Durumu Güncelle
                                    </div>
                                    <StatusBadge status={status} />
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Select
                                        value={status}
                                        onValueChange={(v) =>
                                            setStatus(v as DataRequest["status"])
                                        }
                                    >
                                        <SelectTrigger className="w-44">
                                            <SelectValue placeholder="Durum seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="in_review">İncelemede</SelectItem>
                                            <SelectItem value="approved">Onaylandı</SelectItem>
                                            <SelectItem value="rejected">Reddedildi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="text-xs text-zinc-500">
                                        Durum anında güncellenir (demo).
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                                <div className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
                                    Yorumlar ({comments.length})
                                </div>
                                {comments.length === 0 ? (
                                    <div className="text-sm text-zinc-500">
                                        Henüz yorum yok. İlk yorumu sen yaz!
                                    </div>
                                ) : (
                                    <ul className="space-y-3">
                                        {comments.map((c) => {
                                            const author =
                                                users.find((u) => u.id === c.userId) ?? null
                                            const initials =
                                                author?.fullName
                                                    ?.split(" ")
                                                    .map((p) => p[0])
                                                    .slice(0, 2)
                                                    .join("")
                                                    .toUpperCase() ??
                                                author?.username?.slice(0, 2).toUpperCase() ??
                                                "U"
                                            return (
                                                <li
                                                    key={c.id}
                                                    className="flex gap-3 rounded-md bg-white p-3 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
                                                >
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                                                        {initials}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="mb-0.5 flex items-center justify-between gap-2">
                                                            <div className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                                {author?.fullName ?? author?.username ?? "Anonim"}
                                                            </div>
                                                            <div className="text-xs text-zinc-500">
                                                                {formatDate(c.createdAt)}
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-zinc-700 dark:text-zinc-300">
                                                            {c.text}
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </div>
                            {/* Yorum Ekle */}
                            <form
                                onSubmit={handleAddComment}
                                className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                            >
                                <div className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
                                    Yorum Yap
                                </div>
                                <Textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Bu veri talebi hakkında yorumunuzu yazın..."
                                    className="min-h-[80px]"
                                />
                                <div className="mt-2 flex justify-end">
                                    <Button type="submit" disabled={!newComment.trim()}>
                                        Gönder
                                    </Button>
                                </div>
                            </form>


                        </div>
                    </AccordionContent>
                </div>
            </AccordionItem>
        </Accordion>
    )
}

export default DatarequestCard