import { useEffect, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { getDataRequestById } from "@/services/datarequest.service"
import { getOrganizationById } from "@/services/organization.service"

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

export default function RequestInfoDesktop() {
    const { id: requestId } = useParams<{ id: string }>()

    // 🔹 Veri talebi sorgusu
    const {
        data: dataReqResp,
        isLoading: isDataReqLoading,
        isError: isDataReqError,
    } = useQuery({
        queryKey: ["data-request", requestId],
        queryFn: () => getDataRequestById(requestId || ""),
        enabled: !!requestId,
    })

    const request = dataReqResp?.data

    // 🔹 Organizasyon sorgusu (request yüklendikten sonra organizationId ile)
    const {
        data: organizationResp,
        isLoading: isOrgLoading,
    } = useQuery({
        queryKey: ["organization", request?.organizationId],
        queryFn: () => getOrganizationById(request!.organizationId),
        enabled: !!request?.organizationId,
    })

    const organization = organizationResp?.data
    const organizationName = organization?.organizationName

    const uiComments: UIComment[] = useMemo(() => {
        if (!request?.comments) return []
        return request.comments.map((c: any, index: number) => ({
            id: index.toString(),
            authorName: c.userId || "Bilinmiyor",
            content: c.body,
            createdAt: c.createdAt,
        }))
    }, [request])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [requestId])

    if (isDataReqLoading || isOrgLoading) {
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

    if (isDataReqError || !request) {
        return (
            <div className="w-full px-4 py-12 bg-accent">
                <div className="mx-auto max-w-xl text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-3">
                        <Hash className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">Veri Talebi Bulunamadı</h2>
                    <p className="text-muted-foreground mt-1">
                        Aradığınız veri talebi kaldırılmış veya hiç var olmamış olabilir.
                    </p>
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
            <div className="max-w-[80%] mx-auto space-y-6">
                <RequestHeader
                    request={request}
                    requestedByName={request.requesterUserId}
                    organizationName={organizationName}
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-4 space-y-6">
                        {organization && <OrganizationCard organization={organization} />}
                        <RequestMetaCard
                            request={request}
                            requestedByName={request.requesterUserId}
                        />
                    </div>

                    <div className="lg:col-span-8 space-y-6">
                        <CommentsList comments={uiComments} />
                    </div>
                </div>
            </div>
        </div>
    )
}
