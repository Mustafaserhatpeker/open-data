import React, { useMemo, useState } from "react";
import type { TableCell } from "../../../types";

interface Props {
    rows: TableCell[][];
    pageSize?: number;
    className?: string;
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export const TablePreview: React.FC<Props> = ({ rows, pageSize = 50, className }) => {
    const [page, setPage] = useState(1);
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = clamp(page, 1, totalPages);

    const pageRows = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return rows.slice(start, start + pageSize);
    }, [rows, currentPage, pageSize]);

    const header = rows[0] || [];

    return (
        <div className={`w-full h-full flex flex-col ${className || ""}`}>
            <div className="flex items-center justify-between mb-2 gap-2">
                <div className="text-sm text-gray-500">Satır: {total.toLocaleString()}</div>
                <div className="flex items-center gap-2">
                    <button
                        className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
                        onClick={() => setPage((p) => clamp(p - 1, 1, totalPages))}
                        disabled={currentPage <= 1}
                    >
                        Önceki
                    </button>
                    <span className="text-sm">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
                        onClick={() => setPage((p) => clamp(p + 1, 1, totalPages))}
                        disabled={currentPage >= totalPages}
                    >
                        Sonraki
                    </button>
                </div>
            </div>
            <div className="relative overflow-auto border rounded">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-gray-50">
                        <tr>
                            {header.map((h, idx) => (
                                <th key={idx} className="text-left px-3 py-2 border-b font-medium">
                                    {String(h ?? "")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map((r, rIdx) => (
                            <tr key={rIdx} className="odd:bg-white even:bg-gray-50/40">
                                {r.map((c, cIdx) => (
                                    <td key={cIdx} className="px-3 py-2 border-b align-top">
                                        {c === null || c === undefined ? "" : String(c)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {pageRows.length === 0 && (
                            <tr>
                                <td className="px-3 py-6 text-center text-gray-500" colSpan={header.length || 1}>
                                    Gösterilecek veri yok.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};