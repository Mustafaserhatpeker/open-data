import { useEffect, useRef, useState } from "react";
import { PreviewKind, type PreviewData, type PreviewState, type SupportedExtension } from "../types";

import { readAsArrayBuffer, readBlobAsUTF8 } from "../utils/fileReaders";
import { getExtensionFromName, mapExtToKind } from "../utils/detectFileType";
import { formatXml } from "../utils/formatters";
import { parseCSVToRows } from "../parsers/parseCSV";
import { parseXLSXToRows } from "../parsers/parseXLSX";
import { parseGeoJSONText, parseKMLTextToGeoJSON, parseKMZToGeoJSON } from "../parsers/parseGeo";

import { PREVIEW_URL } from "@/lib/urls";
export function useFilePreview() {
    const [state, setState] = useState<PreviewState>({
        file: null,
        status: "idle",
    });

    const objectUrlRef = useRef<string | null>(null);

    const processFile = async (file: File, ext: SupportedExtension) => {
        const kind = mapExtToKind(ext);
        setState({ file, ext, kind, status: "loading" });

        try {
            let data: PreviewData | undefined;

            if (ext === "csv") {
                const text = await readBlobAsUTF8(file);
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
                const text = await readBlobAsUTF8(file);
                const gj = parseGeoJSONText(text);
                data = { kind: PreviewKind.Map, geojson: gj };
            } else if (ext === "kml") {
                const text = await readBlobAsUTF8(file);
                const gj = parseKMLTextToGeoJSON(text);
                data = { kind: PreviewKind.Map, geojson: gj };
            } else if (ext === "kmz") {
                const ab = await readAsArrayBuffer(file);
                const gj = await parseKMZToGeoJSON(ab);
                data = { kind: PreviewKind.Map, geojson: gj };
            } else if (ext === "xml") {
                const text = await readBlobAsUTF8(file);
                data = { kind: PreviewKind.Text, text: formatXml(text), language: "xml" };
            } else if (ext === "txt") {
                const text = await readBlobAsUTF8(file);
                data = { kind: PreviewKind.Text, text, language: "txt" };
            } else if (ext === "html") {
                const text = await readBlobAsUTF8(file);
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

    const onFileSelect = async (file: File) => {
        if (!file) return;
        const ext = getExtensionFromName(file.name);
        if (!ext) {
            setState({ file, status: "error", error: "Desteklenmeyen dosya uzantısı." });
            return;
        }
        await processFile(file, ext as SupportedExtension);
    };


    const loadFileFromToken = async (token: string) => {
        setState({ status: "loading", file: null });

        try {
            // ✅ Token decode → fileUrl → ext belirle
            const decoded = JSON.parse(atob(token.split(".")[1]));
            const fileUrl = decoded.fileUrl;
            const extFromToken = fileUrl?.split(".").pop()?.toLowerCase();

            if (!extFromToken) {
                throw new Error("Token içinde dosya uzantısı bulunamadı.");
            }

            // ✅ Backend inline URL → dosyayı çek
            const res = await fetch(`${PREVIEW_URL}/${token}`);
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(text || "Dosya alınamadı");
            }

            const blob = await res.blob();
            const ab = await blob.arrayBuffer();

            // ✅ Token’dan alınan isim + ext
            const file = new File([ab], fileUrl, { type: blob.type || "application/octet-stream" });

            // ✅ Doğrudan token’dan gelen uzantı ile işle
            await processFile(file, extFromToken);

        } catch (err: any) {
            setState({ file: null, status: "error", error: err.message || "Dosya yüklenemedi." });
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
        loadFileFromToken, // ✅ Export edildi
        reset,
        downloadUrl,
    };
}
