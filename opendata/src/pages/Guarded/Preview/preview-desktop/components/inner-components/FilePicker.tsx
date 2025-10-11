import React from "react";
import { ACCEPT_ATTR } from "../../../utils/detectFileType";

interface Props {
    onSelect: (file: File) => void;
    className?: string;
}

export const FilePicker: React.FC<Props> = ({ onSelect, className }) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) onSelect(f);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f) onSelect(f);
    };

    return (
        <div
            className={`border-2 border-dashed rounded p-6 text-center space-y-3 bg-white ${className || ""}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
        >
            <div className="text-lg font-medium">Dosya Yükle</div>
            <div className="text-sm text-gray-600">
                Sürükleyip bırakın veya aşağıdan dosya seçin.
            </div>
            <div>
                <input
                    type="file"
                    accept={ACCEPT_ATTR}
                    onChange={onChange}
                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                />
            </div>
            <div className="text-xs text-gray-500">
                Desteklenenler: XLSX, CSV, PDF, GeoJSON, XML, HTML, KML, TXT, KMZ
            </div>
        </div>
    );
};