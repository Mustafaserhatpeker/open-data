import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ArrowLeft,
    CalendarClock,
    Download,
    Eye,
    FolderClosed,
    Tags as TagsIcon,
    UserRound,
} from "lucide-react"
import type { Dataset as DummyDataset } from "@/lib/types"
import { getTypeMeta, formatDate } from "./utils"

type Props = {
    dataset: DummyDataset
    createdByName?: string
    categoryNames: string[]
    tagNames: string[]
    primaryFormat: string
}

export function DatasetHeader({
    dataset,
    createdByName,
    categoryNames,
    tagNames,
    primaryFormat,
}: Props) {
    const primaryFormatMeta = getTypeMeta(primaryFormat)

    return (
        <div className="mb-6">
            {/* Header bar */}
            <div className="mb-4 flex items-center justify-between">
                <Button asChild variant="ghost" className="pl-0">
                    <Link to="/datasets">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Geri
                    </Link>
                </Button>

                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={`border ${primaryFormatMeta.accent} bg-transparent`}>
                        {primaryFormatMeta.label}
                    </Badge>
                    {dataset.isOpenData ? (
                        <Badge className="bg-emerald-600 hover:bg-emerald-600/90">Açık Veri</Badge>
                    ) : (
                        <Badge variant="outline">Kısıtlı</Badge>
                    )}
                    <Badge variant="outline" className="flex items-center gap-1">
                        {dataset.license}
                    </Badge>
                    {dataset.version ? <Badge variant="outline">v{dataset.version}</Badge> : null}
                </div>
            </div>

            {/* Title and meta */}
            <div className="flex items-start gap-3">
                <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-lg ${primaryFormatMeta.color}`}
                    aria-hidden
                >
                    <primaryFormatMeta.Icon className="h-8 w-8" />
                </div>
                <div className="min-w-0">
                    <h1 className="text-2xl font-semibold leading-tight">{dataset.title}</h1>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                            <Eye className="h-4 w-4" />
                            {dataset.viewsCount ?? 0} görüntülenme
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Download className="h-4 w-4" />
                            {dataset.downloadsCount ?? 0} indirme
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarClock className="h-4 w-4" />
                            Oluşturulma: {formatDate(dataset.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarClock className="h-4 w-4" />
                            Güncellenme: {formatDate(dataset.updatedAt)}
                        </span>
                        {createdByName ? (
                            <span className="inline-flex items-center gap-1.5">
                                <UserRound className="h-4 w-4" />
                                {createdByName}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>

            {dataset.description ? (
                <p className="mt-3 text-muted-foreground">{dataset.description}</p>
            ) : null}

            {/* Tags and categories */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
                {categoryNames.length > 0 ? (
                    <div className="inline-flex items-center gap-2">
                        <FolderClosed className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1.5">
                            {categoryNames.map((c) => (
                                <Badge key={c} variant="outline">
                                    {c}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ) : null}
                {tagNames.length > 0 ? (
                    <div className="inline-flex items-center gap-2">
                        <TagsIcon className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1.5">
                            {tagNames.map((t) => (
                                <Badge key={t} variant="secondary">
                                    {t}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}