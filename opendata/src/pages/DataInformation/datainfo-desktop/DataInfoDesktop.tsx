

import { DatasetHeader } from "./components/DatasetHeader"
import { OrganizationCard } from "./components/OrganizationCard"
import { DatasetMetaCard } from "./components/DatasetMetaCard"
import { ResourcesList } from "./components/ResourceList"
import { FormatsStatsCard } from "./components/FormatsStatsCard"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getDataset } from "@/services/dataset.service"



export default function DataInfoDesktop() {

    const { id } = useParams();

    const { data: datasetResp } = useQuery({
        queryKey: ["datasets"],
        queryFn: () => getDataset(id),
    });




    return (
        <div className="w-full px-4 py-6 bg-accent min-h-[100vh]">
            <div className="max-w-[80%] mx-auto space-y-6">
                <DatasetHeader
                    dataset={datasetResp?.data}
                    categoryNames={datasetResp?.data?.categories?.map((cat: any) => cat.categoryName) || []}
                    tagNames={datasetResp?.data?.tags?.map((tag: any) => tag.tagName) || []}
                    primaryFormat={datasetResp?.data?.formats[0]?.formatName || "Bilinmeyen Format"}
                />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-4 space-y-6">
                        <OrganizationCard organization={datasetResp?.data?.organization} />
                        <DatasetMetaCard dataset={datasetResp?.data} />
                    </div>

                    <div className="lg:col-span-8 space-y-6">
                        <ResourcesList resources={datasetResp?.data?.resources} />
                        <FormatsStatsCard dataset={datasetResp} primaryFormat={datasetResp?.data?.formats[0]?.formatName || "Bilinmiyor"} />
                    </div>
                </div>
            </div>
        </div>
    )
}