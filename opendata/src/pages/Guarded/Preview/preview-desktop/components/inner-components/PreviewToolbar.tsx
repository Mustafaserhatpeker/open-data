import React from "react";

interface Props {
    fileName?: string;
    fileSize?: number;
    onChangeFile: () => void;
    downloadUrl?: string;
}

function formatBytes(bytes?: number): string {
    if (!bytes && bytes !== 0) return "-";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

export const PreviewToolbar: React.FC<Props> = ({
    fileName,
    fileSize,
    onChangeFile,
    downloadUrl,
}) => {
    return (
        <div className="w-full flex flex-wrap items-center justify-between gap-3 border-b pb-3">
            <div className="flex items-center gap-3">
                <div className="text-base font-medium">{fileName || "Seçilmedi"}</div>
                {fileSize !== undefined && (
                    <div className="text-sm text-gray-500">{formatBytes(fileSize)}</div>
                )}
            </div>
            <div className="flex items-center gap-2">
                <button
                    className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
                    onClick={onChangeFile}
                >
                    Dosya Değiştir
                </button>
                {downloadUrl && fileName && (
                    <a
                        className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
                        href={downloadUrl}
                        download={fileName}
                    >
                        İndir
                    </a>
                )}
            </div>
        </div>
    );
};