import DataRequestCard from "./inner-components/DataCard";
import type { DataRequest } from "@/lib/types";

type Props = {
    data: DataRequest[];
};

function toCardDataRequest(dr: any): any {
    return {
        id: dr._id,
        title: dr.title,
        description: dr.description,
        status: dr.status,
        organization: dr.organizationName || "Bilinmeyen Organizasyon",
        requestedBy: dr.requesterEmail || "Anonim Kullanıcı",
        createdDate: dr.createdAt,
        updatedDate: dr.updatedAt,
        commentsCount: dr.commentCount ?? dr.comments?.length ?? 0,
        likesCount: dr.likeCount ?? dr.likes?.length ?? 0,
    };
}

export default function DatarequestCards({ data }: Props) {
    if (!data || data.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                Henüz veri isteği bulunamadı.
            </div>
        );
    }

    const cardData: any[] = data.map(toCardDataRequest);

    return (
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-2">
            {cardData.map((request) => (
                <DataRequestCard key={request.id} request={request} />
            ))}
        </div>
    );
}
