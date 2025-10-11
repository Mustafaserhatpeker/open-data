import type React from "react"
import {
    CircleHelp,
    FileSpreadsheet,
    FileText,
    FileCode,
    Map,
    FileArchive,
    Network,
    FileJson,
} from "lucide-react"

export type TypeMeta = {
    Icon: React.ComponentType<{ className?: string }>
    color: string
    accent: string
    label: string
}

export function getTypeMeta(raw: string): TypeMeta {
    const t = (raw || "").toUpperCase().trim()
    let Icon = CircleHelp
    let color = "bg-gray-100 text-gray-700 ring-1 ring-gray-200"
    let accent = "text-gray-500"
    let label = raw || "Unknown"

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

export function formatDate(input?: string) {
    if (!input) return undefined
    const d = new Date(input)
    if (isNaN(d.getTime())) return input
    try {
        return d.toLocaleString()
    } catch {
        return d.toISOString()
    }
}

export function formatBytes(bytes?: number) {
    if (bytes === undefined || bytes === null) return "-"
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}