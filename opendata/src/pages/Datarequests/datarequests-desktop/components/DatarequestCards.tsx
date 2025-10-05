import DataCard, { type Dataset } from "./inner-components/DataCard"
import {
    datasets as dummyDatasets,
    organizations,
    categories as categoriesList,
    tags as tagsList,
} from "@/dummy/dummy.data"
import type { Dataset as DummyDataset } from "@/lib/types"

function resolveOrganizationName(d: DummyDataset): string | undefined {
    return d.organization?.name ?? organizations.find((o) => o.id === d.organizationId)?.name
}

function resolveCategoryName(d: DummyDataset): string | undefined {
    const firstCatId = d.categories?.[0]
    if (!firstCatId) return undefined
    return categoriesList.find((c) => c.id === firstCatId)?.name
}

function resolveTagNames(d: DummyDataset): string[] | undefined {
    if (!d.tags || d.tags.length === 0) return undefined
    const names = d.tags
        .map((id) => tagsList.find((t) => t.id === id)?.name)
        .filter((x): x is string => Boolean(x))
    return names.length ? names : undefined
}

function resolveDatatype(d: DummyDataset): string {
    // Öncelik: formats[0] -> resource[0].format -> "Unknown"
    if (d.formats && d.formats.length > 0) return d.formats[0]
    if (d.resources && d.resources.length > 0) return d.resources[0].format
    return "Unknown"
}

function toCardDataset(d: DummyDataset): Dataset {
    return {
        id: d.id,
        title: d.title,
        description: d.description,
        datatype: resolveDatatype(d),
        organization: resolveOrganizationName(d),
        category: resolveCategoryName(d),
        tags: resolveTagNames(d),
        createdDate: d.createdAt,
        updatedDate: d.updatedAt,
    }
}

export default function DatarequestCards() {
    const data: Dataset[] = dummyDatasets.map(toCardDataset)

    return (
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-2">
            {data.map((dataset) => (
                <DataCard key={dataset.id} dataset={dataset} />
            ))}
        </div>
    )
}