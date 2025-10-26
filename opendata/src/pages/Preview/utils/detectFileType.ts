import { PreviewKind, type SupportedExtension } from "../types";

export function getExtensionFromName(name: string): SupportedExtension | undefined {
    const dot = name.lastIndexOf(".");
    if (dot < 0) return undefined;
    const ext = name.slice(dot + 1).toLowerCase();
    const supported = [
        "xlsx",
        "csv",
        "pdf",
        "geojson",
        "xml",
        "html",
        "kml",
        "txt",
        "kmz",
    ] as const;
    return supported.includes(ext as any) ? (ext as SupportedExtension) : undefined;
}

export function mapExtToKind(ext: SupportedExtension): PreviewKind {
    switch (ext) {
        case "csv":
        case "xlsx":
            return PreviewKind.Table;
        case "pdf":
            return PreviewKind.PDF;
        case "geojson":
        case "kml":
        case "kmz":
            return PreviewKind.Map;
        case "xml":
        case "txt":
            return PreviewKind.Text;
        case "html":
            return PreviewKind.HTML;
        default:
            return PreviewKind.Text;
    }
}

export const ACCEPT_ATTR =
    ".xlsx,.csv,.pdf,.geojson,.xml,.html,.kml,.txt,.kmz";

export type { SupportedExtension };
