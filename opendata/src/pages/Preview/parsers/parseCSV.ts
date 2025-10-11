import Papa from "papaparse";
import type { TableCell } from "../types";

export async function parseCSVToRows(text: string): Promise<TableCell[][]> {
    return new Promise((resolve, reject) => {
        Papa.parse(text, {
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results: { data: TableCell[][]; }) => resolve(results.data as TableCell[][]),
            error: (err: any) => reject(err),
        });
    });
}