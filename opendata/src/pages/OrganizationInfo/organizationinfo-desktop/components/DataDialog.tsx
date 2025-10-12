import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    FileSpreadsheet,
    FileJson,
    FileText,
    FileCode,
    Map,
    Network,
    FileArchive,
    Building2,
    FolderClosed,
    Tags as TagsIcon,
    CircleHelp,
    Eye,
    CalendarClock,
    Hash,
} from "lucide-react"

type DataType =
    | "XLSX"
    | "CSV"
    | "PDF"
    | "API"
    | "GeoJSON"
    | "XML"
    | "HTML"
    | "KML"
    | "TXT"
    | "KMZ"
    | "JSON"

export interface Dataset {
    id: number | string
    title: string
    description?: string
    datatype: DataType | string
    organization?: string
    category?: string
    tags?: string[]
    createdDate?: string
    updatedDate?: string
}

function getTypeMeta(datatypeRaw: string) {
    const t = (datatypeRaw || "").toUpperCase().trim()

    let Icon = CircleHelp
    let color = "bg-gray-100 text-gray-700 ring-1 ring-gray-200"
    let accent = "text-gray-500"
    let label = datatypeRaw || "Unknown"

    switch (t) {
        case "XLSX":
        case "CSV":
            Icon = FileSpreadsheet
            color = "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
            accent = "text-emerald-600"
            label = t
            break
        case "PDF":
            Icon = FileText
            color = "bg-red-50 text-red-700 ring-1 ring-red-100"
            accent = "text-red-600"
            label = t
            break
        case "TXT":
            Icon = FileText
            color = "bg-slate-50 text-slate-700 ring-1 ring-slate-200"
            accent = "text-slate-600"
            label = t
            break
        case "XML":
        case "HTML":
            Icon = FileCode
            color = "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100"
            accent = "text-indigo-600"
            label = t
            break
        case "GEOJSON":
        case "KML":
            Icon = Map
            color = "bg-teal-50 text-teal-700 ring-1 ring-teal-100"
            accent = "text-teal-600"
            label = t
            break
        case "KMZ":
            Icon = FileArchive
            color = "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
            accent = "text-amber-600"
            label = t
            break
        case "API":
            Icon = Network
            color = "bg-sky-50 text-sky-700 ring-1 ring-sky-100"
            accent = "text-sky-600"
            label = t
            break
        case "JSON":
            Icon = FileJson
            color = "bg-violet-50 text-violet-700 ring-1 ring-violet-100"
            accent = "text-violet-600"
            label = t
            break
    }

    return { Icon, color, accent, label }
}

function InfoRow({
    label,
    value,
    icon,
}: {
    label: string
    value?: React.ReactNode
    icon?: React.ReactNode
}) {
    return (
        <div className="flex items-start gap-2">
            <div className="mt-0.5 h-4 w-4 shrink-0 opacity-80">{icon}</div>
            <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-muted-foreground pb-1">
                    {label}
                </div>
                <div className="truncate text-foreground">{value ?? "-"}</div>
            </div>
        </div>
    )
}

function formatDate(input?: string) {
    if (!input) return undefined
    const d = new Date(input)
    if (isNaN(d.getTime())) return input
    try {
        return d.toLocaleString()
    } catch {
        return d.toISOString()
    }
}

export default function DataDialog({ dataset }: { dataset?: Dataset }) {
    const meta = getTypeMeta(dataset?.datatype ?? "")
    const { Icon, color, accent, label } = meta

    return (

        <Dialog >
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Veri detayını aç</span>
                </Button>
            </DialogTrigger>


            <DialogContent onClick={(e) => e.stopPropagation()}
                className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start gap-3">
                        <div
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${color}`}
                            aria-hidden
                        >
                            <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <DialogTitle className="truncate">
                                {dataset?.title ?? "Veri"}
                            </DialogTitle>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                                <Badge
                                    variant="secondary"
                                    className={`border ${accent} bg-transparent`}
                                >
                                    {label}
                                </Badge>
                                {dataset?.organization ? (
                                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Building2 className="h-3.5 w-3.5" />
                                        <span className="truncate">{dataset.organization}</span>
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {dataset?.description ? (
                        <DialogDescription className="mt-2">
                            {dataset.description}
                        </DialogDescription>
                    ) : null}
                </DialogHeader>

                <Separator className="my-2" />

                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                    <InfoRow
                        label="Veri Türü"
                        value={label}
                        icon={<Icon className={`${accent} h-4 w-4`} />}
                    />
                    <InfoRow
                        label="ID"
                        value={dataset ? String(dataset.id) : "-"}
                        icon={<Hash className="h-4 w-4 opacity-80" />}
                    />
                    <InfoRow
                        label="Kategori"
                        value={dataset?.category || "-"}
                        icon={<FolderClosed className="h-4 w-4 opacity-80" />}
                    />
                    <InfoRow
                        label="Oluşturulma"
                        value={formatDate(dataset?.createdDate) || "-"}
                        icon={<CalendarClock className="h-4 w-4 opacity-80" />}
                    />
                    <InfoRow
                        label="Güncellenme"
                        value={formatDate(dataset?.updatedDate) || "-"}
                        icon={<CalendarClock className="h-4 w-4 opacity-80" />}
                    />
                    <InfoRow
                        label="Kurum"
                        value={dataset?.organization || "-"}
                        icon={<Building2 className="h-4 w-4 opacity-80" />}
                    />
                </div>

                <Separator className="my-2" />

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                        <TagsIcon className="h-4 w-4 opacity-80" />
                        Etiketler
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {dataset?.tags && dataset.tags.length > 0 ? (
                            dataset.tags.map((t, i) => (
                                <Badge key={`${t}-${i}`} variant="outline" className="px-2 py-0.5">
                                    {t}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>


    )
}