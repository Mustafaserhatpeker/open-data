import React, { useEffect, useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Worker'ı yerelden kullanın (Vite ve modern bundler'larda ?url çalışır)
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
// Alternatif (sürümünüze göre):
// import workerUrl from "pdfjs-dist/build/pdf.worker.min.js?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

interface Props {
    data: Uint8Array;
    className?: string;
}

export const PDFPreview: React.FC<Props> = ({ data, className }) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    // 1) DataCloneError'ı önlemek için Blob kullan
    // 2) "file" prop'unu memoize ederek "changed but equal" uyarısını önle
    const fileBlob = useMemo(() => {
        // data TypedArray -> Blob
        return new Blob([new Uint8Array(data)], { type: "application/pdf" });
    }, [data]);

    useEffect(() => {
        setPageNumber(1);
    }, [fileBlob]);

    return (
        <div className={`w-full h-full flex flex-col ${className || ""}`}>
            <div className="flex items-center justify-between mb-2 gap-2">
                <div className="text-sm text-gray-500">Sayfalar: {numPages || "-"}</div>
                <div className="flex items-center gap-2">
                    <button
                        className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
                        onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                        disabled={pageNumber <= 1}
                    >
                        Önceki
                    </button>
                    <span className="text-sm">
                        {pageNumber} / {numPages || "-"}
                    </span>
                    <button
                        className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
                        onClick={() => setPageNumber((p) => Math.min(numPages || 1, p + 1))}
                        disabled={!numPages || pageNumber >= numPages}
                    >
                        Sonraki
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto border rounded flex items-center justify-center bg-gray-50">
                <Document
                    file={fileBlob}
                    onLoadSuccess={(info) => setNumPages(info.numPages)}
                    loading={<div className="p-4 text-gray-500 text-sm">PDF yükleniyor...</div>}
                    error={<div className="p-4 text-red-600 text-sm">PDF yüklenemedi.</div>}
                >
                    {numPages > 0 && (
                        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
                    )}
                </Document>
            </div>
        </div>
    );
};