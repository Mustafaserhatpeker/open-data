import * as XLSX from "xlsx";
import type { TableCell } from "../types";

export async function parseXLSXToRows(arrayBuffer: ArrayBuffer): Promise<TableCell[][]> {
    const wb = XLSX.read(arrayBuffer, { type: "array" });
    const firstSheetName = wb.SheetNames[0];
    const sheet = wb.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as TableCell[][];
    return rows;
}