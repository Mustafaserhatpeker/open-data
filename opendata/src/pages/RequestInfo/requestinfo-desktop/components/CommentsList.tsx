import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MessageSquareText, User, Send } from "lucide-react"
import { addDataRequestComment } from "@/services/datarequest.service"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"



type Props = {
    comments: any[]
    requestId: string
}

export function CommentsList({ comments, requestId }: Props) {
    const [newComment, setNewComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (commentText: string) => {
            const token = localStorage.getItem("accessToken")
            if (!token) throw new Error("Oturum bulunamadı.")
            return await addDataRequestComment(requestId, commentText, token)
        },
        onSuccess: () => {
            toast.success("Yorum eklendi 🎉")
            setNewComment("")
            queryClient.invalidateQueries({ queryKey: ["data-request", requestId] })
        },
        onError: (err: any) => {
            console.error(err)
            toast.error("Yorum eklenemedi, lütfen tekrar deneyin.")
        },
        onSettled: () => setIsSubmitting(false),
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return
        setIsSubmitting(true)
        mutation.mutate(newComment.trim())
    }

    return (
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            {/* Başlık */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Yorumlar</h3>
                <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquareText className="h-3.5 w-3.5" />
                    {comments.length}
                </div>
            </div>

            {/* Liste */}
            {comments.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">Henüz yorum bulunmuyor.</p>
            ) : (
                <ul className="mt-4 space-y-4">
                    {comments.map((c) => (
                        <li key={c.id} className="rounded-md border border-border p-3">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="inline-flex items-center gap-1">
                                    <User className="h-3.5 w-3.5" />
                                    <span className="font-medium text-foreground">
                                        {c.role === "USER" ? "Vatandaş" : "Yetkili"}
                                    </span>
                                </div>
                                <span>
                                    {new Date(c.createdAt).toLocaleString("tr-TR", {
                                        dateStyle: "short",
                                        timeStyle: "short",
                                    })}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-foreground">{c.body}</p>
                        </li>
                    ))}
                </ul>
            )}

            {/* Yeni yorum formu */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <Textarea
                    placeholder="Yorumunuzu yazın..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isSubmitting}
                />
                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Gönder
                    </Button>
                </div>
            </form>
        </div>
    )
}
