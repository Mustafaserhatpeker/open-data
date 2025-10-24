import { useEffect, useRef, useState } from "react";
import { PreviewKind, type PreviewData, type PreviewState } from "../types";

import { readAsArrayBuffer, readAsText } from "../utils/fileReaders";
import { getExtensionFromName, mapExtToKind } from "../utils/detectFileType";
import { formatXml } from "../utils/formatters";
import { parseCSVToRows } from "../parsers/parseCSV";
import { parseXLSXToRows } from "../parsers/parseXLSX";
import { parseGeoJSONText, parseKMLTextToGeoJSON, parseKMZToGeoJSON } from "../parsers/parseGeo";

export function useFilePreview() {
    const [state, setState] = useState<PreviewState>({
        file: null,
        status: "idle",
    });
    const objectUrlRef = useRef<string | null>(null);

    const onFileSelect = async (file: File) => {
        if (!file) return;
        const ext = getExtensionFromName(file.name);
        if (!ext) {
            setState({ file, status: "error", error: "Desteklenmeyen dosya uzantısı." });
            return;
        }
        const kind = mapExtToKind(ext);

        setState({ file, ext, kind, status: "loading" });

        try {
            let data: PreviewData | undefined;

            if (ext === "csv") {
                const text = await readAsText(file);
                const rows = await parseCSVToRows(text);
                data = { kind: PreviewKind.Table, rows };
            } else if (ext === "xlsx") {
                const ab = await readAsArrayBuffer(file);
                const rows = await parseXLSXToRows(ab);
                data = { kind: PreviewKind.Table, rows };
            } else if (ext === "pdf") {
                const ab = await readAsArrayBuffer(file);
                data = { kind: PreviewKind.PDF, data: new Uint8Array(ab) };
            } else if (ext === "geojson") {
                const text = await readAsText(file);
                const gj = parseGeoJSONText(text);
                data = { kind: PreviewKind.Map, geojson: gj };
            } else if (ext === "kml") {
                const text = await readAsText(file);
                const gj = parseKMLTextToGeoJSON(text);
                data = { kind: PreviewKind.Map, geojson: gj };
            } else if (ext === "kmz") {
                const ab = await readAsArrayBuffer(file);
                const gj = await parseKMZToGeoJSON(ab);
                data = { kind: PreviewKind.Map, geojson: gj };
            } else if (ext === "xml") {
                const text = await readAsText(file);
                data = { kind: PreviewKind.Text, text: formatXml(text), language: "xml" };
            } else if (ext === "txt") {
                const text = await readAsText(file);
                data = { kind: PreviewKind.Text, text, language: "txt" };
            } else if (ext === "html") {
                const text = await readAsText(file);
                data = { kind: PreviewKind.HTML, html: text };
            }

            setState((prev) => ({ ...prev, status: "ready", data }));
        } catch (err: any) {
            setState((prev) => ({
                ...prev,
                status: "error",
                error: err?.message || "Dosya işlenirken bir hata oluştu.",
            }));
        }
    };

    useEffect(() => {
        if (state.file) {
            const url = URL.createObjectURL(state.file);
            objectUrlRef.current = url;
            return () => {
                if (objectUrlRef.current) {
                    URL.revokeObjectURL(objectUrlRef.current);
                    objectUrlRef.current = null;
                }
            };
        }
    }, [state.file]);

    const downloadUrl = objectUrlRef.current || undefined;

    const reset = () => {
        setState({ file: null, status: "idle" });
    };

    return {
        state,
        onFileSelect,
        reset,
        downloadUrl,
    };
}