import DataCard, { type Dataset } from "./inner-components/DataCard"

type BackendDataset = {
    _id: string
    title: string
    description?: string
    createdAt?: string
    updatedAt?: string
    organization?: {
        organizationName?: string
        name?: string
    } | null
    categories?: Array<{
        categoryName?: string
        name?: string
    }> | null
    tags?: Array<{
        tagName?: string
        name?: string
    }> | null
    formats?: Array<{
        formatName?: string
        name?: string
    }> | null
}

type ApiResponseShape = {
    status: number
    message: string
    data?: {
        data?: BackendDataset[]
        pagination?: {
            total: number
            page: number
            limit: number
            totalPage: number
        }
    }
    error?: unknown
    timestamp?: string
} | BackendDataset[] | undefined | null

function toDataset(item: BackendDataset): Dataset {
    const firstCategory = item.categories?.[0]
    const firstFormat = item.formats?.[0]

    const datatypeRaw =
        firstFormat?.formatName ||
        firstFormat?.name ||
        "" // bilinmiyorsa boş gir, component default'u gösterecek

    return {
        id: item._id,
        title: item.title,
        description: item.description,
        datatype: String(datatypeRaw).toUpperCase(), // CSV, JSON, PDF vb.
        organization: item.organization?.name || item.organization?.organizationName || undefined,
        category: firstCategory?.name || firstCategory?.categoryName || undefined,
        tags: (item.tags || []).map(t => t.tagName || t.name || "").filter(Boolean),
        createdDate: item.createdAt,
        updatedDate: item.updatedAt,
    }
}

function extractList(datasets: ApiResponseShape): BackendDataset[] {
    if (!datasets) return []
    // Eğer direkt dizi geldiyse
    if (Array.isArray(datasets)) return datasets
    // Eğer API response şeklindeyse
    if (typeof datasets === "object" && "data" in datasets!) {
        const inner = (datasets as any).data
        if (inner && Array.isArray(inner.data)) {
            return inner.data as BackendDataset[]
        }
    }
    return []
}

export default function DatasetCards({ datasets }: { datasets?: ApiResponseShape }) {
    const rawList = extractList(datasets)
    const normalized: Dataset[] = rawList.map(toDataset)

    if (!normalized.length) {
        return (
            <div className="mt-6 text-sm text-muted-foreground">
                Gösterilecek veri bulunamadı.
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-1">
            {normalized.map((data) => (
                <DataCard key={data.id} dataset={data} />
            ))}
        </div>
    )
}