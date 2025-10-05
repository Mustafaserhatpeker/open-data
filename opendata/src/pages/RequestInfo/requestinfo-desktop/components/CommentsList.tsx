import { MessageSquareText, User } from "lucide-react"

type UIComment = {
    id: string
    authorName: string
    content: string
    createdAt: string
}

export function CommentsList({ comments }: { comments: UIComment[] }) {
    return (
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Yorumlar</h3>
                <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquareText className="h-3.5 w-3.5" />
                    {comments.length}
                </div>
            </div>

            {comments.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">Henüz yorum bulunmuyor.</p>
            ) : (
                <ul className="mt-4 space-y-4">
                    {comments.map((c) => (
                        <li key={c.id} className="rounded-md border border-border p-3">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="inline-flex items-center gap-1">
                                    <User className="h-3.5 w-3.5" />
                                    <span className="font-medium text-foreground">{c.authorName}</span>
                                </div>
                                <span>{c.createdAt}</span>
                            </div>
                            <p className="mt-2 text-sm text-foreground">{c.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}