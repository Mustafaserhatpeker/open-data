import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"

import {
    datasets as dummyDatasets,
    organizations as orgs,
    categories as categoriesList,
    tags as tagsList,
    users as usersList,
} from "@/dummy/dummy.data"
import type { Dataset as DummyDataset, Organization } from "@/lib/types"

import { Button } from "@/components/ui/button"
import { Hash, ArrowLeft } from "lucide-react"

import { DatasetHeader } from "./components/DatasetHeader"
import { OrganizationCard } from "./components/OrganizationCard"
import { DatasetMetaCard } from "./components/DatasetMetaCard"
import { ResourcesList } from "./components/ResourceList"
import { FormatsStatsCard } from "./components/FormatsStatsCard"

function resolveOrganization(d: DummyDataset): Organization | undefined {
    return d.organization ?? orgs.find((o) => o.id === d.organizationId)
}
function resolveCategoryNames(d: DummyDataset): string[] {
    return (d.categories ?? [])
        .map((id) => categoriesList.find((c) => c.id === id)?.name)
        .filter((x): x is string => Boolean(x))
}
function resolveTagNames(d: DummyDataset): string[] {
    return (d.tags ?? [])
        .map((id) => tagsList.find((t) => t.id === id)?.name)
        .filter((x): x is string => Boolean(x))
}
function resolveCreatedByName(d: DummyDataset): string | undefined {
    const u = usersList.find((u) => u.id === d.createdBy)
    return u?.fullName || u?.username
}
function resolvePrimaryFormat(d: DummyDataset): string {
    if (d.formats && d.formats.length > 0) return d.formats[0]
    if (d.resources && d.resources.length > 0) return d.resources[0].format
    return "Unknown"
}

export default function DataInfoDesktop() {
    const { id: dataId } = useParams<{ id: string }>()
    const [loading, setLoading] = useState(true)
    const [dataset, setDataset] = useState<DummyDataset | null>(null)

    useEffect(() => {
        setLoading(true)
        // Synchronous lookup from dummy store (API ile değiştirilebilir)
        const found = dummyDatasets.find((d) => d.id === dataId)
        setDataset(found ?? null)
        setLoading(false)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [dataId])

    const organization = useMemo(() => (dataset ? resolveOrganization(dataset) : undefined), [dataset])
    const categoryNames = useMemo(() => (dataset ? resolveCategoryNames(dataset) : []), [dataset])
    const tagNames = useMemo(() => (dataset ? resolveTagNames(dataset) : []), [dataset])
    const createdByName = useMemo(() => (dataset ? resolveCreatedByName(dataset) : undefined), [dataset])
    const primaryFormat = useMemo(() => (dataset ? resolvePrimaryFormat(dataset) : "Unknown"), [dataset])

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

    if (!dataset) {
        return (
            <div className="w-full px-4 py-12 bg-accent">
                <div className="mx-auto max-w-xl text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-3">
                        <Hash className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">Veri Seti Bulunamadı</h2>
                    <p className="text-muted-foreground mt-1">Aradığınız veri seti kaldırılmış veya hiç var olmamış olabilir.</p>
                    <div className="mt-4">
                        <Button asChild variant="secondary">
                            <Link to="/datasets">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Veri setlerine dön
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
                <DatasetHeader
                    dataset={dataset}
                    createdByName={createdByName}
                    categoryNames={categoryNames}
                    tagNames={tagNames}
                    primaryFormat={primaryFormat}
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-4 space-y-6">
                        <OrganizationCard organization={organization} />
                        <DatasetMetaCard dataset={dataset} createdByName={createdByName} />
                    </div>

                    <div className="lg:col-span-8 space-y-6">
                        <ResourcesList resources={dataset.resources} />
                        <FormatsStatsCard dataset={dataset} primaryFormat={primaryFormat} />
                    </div>
                </div>
            </div>
        </div>
    )
}