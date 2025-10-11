export type SupportedExtension =
    | "xlsx"
    | "csv"
    | "pdf"
    | "geojson"
    | "xml"
    | "html"
    | "kml"
    | "txt"
    | "kmz";

export type PreviewStatus = "idle" | "loading" | "ready" | "error";

export const PreviewKind = {
    Table: "table",
    PDF: "pdf",
    Map: "map",
    Text: "text",
    HTML: "html",
} as const;
export type PreviewKind = (typeof PreviewKind)[keyof typeof PreviewKind];

export type TableCell = string | number | boolean | null | undefined;

export type PreviewData =
    | { kind: typeof PreviewKind.Table; rows: TableCell[][] }
    | { kind: typeof PreviewKind.PDF; data: Uint8Array }
    | { kind: typeof PreviewKind.Map; geojson: any }
    | { kind: typeof PreviewKind.Text; text: string; language?: "xml" | "txt" }
    | { kind: typeof PreviewKind.HTML; html: string };

export interface PreviewState {
    file: File | null;
    ext?: SupportedExtension;
    kind?: PreviewKind;
    status: PreviewStatus;
    data?: PreviewData;
    error?: string;
}