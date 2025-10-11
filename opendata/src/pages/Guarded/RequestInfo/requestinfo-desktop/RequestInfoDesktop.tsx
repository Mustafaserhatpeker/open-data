import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"

import {
    dataRequests as dataRequestsList,
    organizations as orgs,
    users as usersList,
    comments as commentsList,
} from "@/dummy/dummy.data"
import type { DataRequest, Organization, Comment } from "@/lib/types"

import { Button } from "@/components/ui/button"
import { Hash, ArrowLeft } from "lucide-react"

import { OrganizationCard } from "./components/OrganizationCard"
import { RequestHeader } from "./components/RequestHeader"
import { RequestMetaCard } from "./components/RequestMetaCard"
import { CommentsList } from "./components/CommentsList"

type UIComment = {
    id: string
    authorName: string
    content: string
    createdAt: string
}

function resolveOrganization(orgId?: string): Organization | undefined {
    if (!orgId) return undefined
    return orgs.find((o) => o.id === orgId)
}

function resolveUserNameById(userId?: string): string | undefined {
    if (!userId) return undefined
    const u = usersList.find((x) => x.id === userId)
    return u?.fullName || u?.username
}

function resolveCommentsForRequest(dr: DataRequest): UIComment[] {
    const list: Comment[] = dr.comments ?? commentsList.filter((c) => c.dataRequestId === dr.id)
    return list.map((c) => ({
        id: c.id,
        authorName: resolveUserNameById(c.authorId) ?? "Bilinmiyor",
        content: c.content,
        createdAt: c.createdAt,
    }))
}

export default function RequestInfoDesktop() {
    const { id: requestId } = useParams<{ id: string }>()
    const [loading, setLoading] = useState(true)
    const [request, setRequest] = useState<DataRequest | null>(null)

    useEffect(() => {
        setLoading(true)
        const found = dataRequestsList.find((r) => r.id === requestId)
        setRequest(found ?? null)
        setLoading(false)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [requestId])

    const organization = useMemo(() => (request ? resolveOrganization(request.organizationId) : undefined), [request])
    const requestedByName = useMemo(() => (request ? resolveUserNameById(request.requestedBy) : undefined), [request])
    const uiComments = useMemo(() => (request ? resolveCommentsForRequest(request) : []), [request])

    if (loading) {
        return (
            <div className="w-full px-4 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 w-28 bg-muted rounded" />
                    <div className="h-10 w-1/2 bg-muted rounded" />
                    <div className="h-5 w-2/3 bg-muted rounded" />
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                        <div className="h-64 bg-muted rounded lg:col-span-4" />
                        <div className="h-64 bg-muted rounded lg:col-span-8" />
                    </div>
                </div>
            </div>
        )
    }

    if (!request) {
        return (
            <div className="w-full px-4 py-12 bg-accent">
                <div className="mx-auto max-w-xl text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-3">
                        <Hash className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">Veri Talebi Bulunamadı</h2>
                    <p className="text-muted-foreground mt-1">Aradığınız veri talebi kaldırılmış veya hiç var olmamış olabilir.</p>
                    <div className="mt-4">
                        <Button asChild variant="secondary">
                            <Link to="/data-requests">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Veri taleplerine dön
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full px-4 py-6 bg-accent min-h-[100vh]">
            <div className="max-w-7xl mx-auto space-y-6">
                <RequestHeader
                    request={request}
                    requestedByName={requestedByName}
                    organizationName={organization?.name}
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-4 space-y-6">
                        <OrganizationCard organization={organization} />
                        <RequestMetaCard request={request} requestedByName={requestedByName} />
                    </div>

                    <div className="lg:col-span-8 space-y-6">
                        <CommentsList comments={uiComments} />
                    </div>
                </div>
            </div>
        </div>
    )
}