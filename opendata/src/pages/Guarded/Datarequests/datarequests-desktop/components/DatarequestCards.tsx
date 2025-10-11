import DataRequestCard, { type DataRequestCardModel } from "./inner-components/DataCard"
import {
    dataRequests as dataRequestsList,
    organizations,
    users,
} from "@/dummy/dummy.data"
import type { DataRequest } from "@/lib/types"

function resolveOrganizationNameById(orgId?: string): string | undefined {
    if (!orgId) return undefined
    return organizations.find((o) => o.id === orgId)?.name
}

function resolveUserNameById(userId?: string): string | undefined {
    if (!userId) return undefined
    const u = users.find((x) => x.id === userId)
    return u?.fullName || u?.username
}

function toCardDataRequest(dr: DataRequest): DataRequestCardModel {
    return {
        id: dr.id,
        title: dr.title,
        description: dr.description,
        status: dr.status,
        organization: resolveOrganizationNameById(dr.organizationId),
        requestedBy: resolveUserNameById(dr.requestedBy),
        createdDate: dr.createdAt,
        updatedDate: dr.updatedAt,
        commentsCount: dr.commentsCount ?? dr.comments?.length,
    }
}

export default function DatarequestCards() {
    const data: DataRequestCardModel[] = dataRequestsList.map(toCardDataRequest)

    return (
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-2">
            {data.map((request) => (
                <DataRequestCard key={request.id} request={request} />
            ))}
        </div>
    )
}