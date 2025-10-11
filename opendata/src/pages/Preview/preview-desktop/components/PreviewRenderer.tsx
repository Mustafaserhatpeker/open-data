import React from "react";
import { HTMLPreview } from "./inner-components/HTMLPreview";
import { PDFPreview } from "./inner-components/PDFPreview";
import { TablePreview } from "./inner-components/TablePreview";
import { TextBlock } from "./inner-components/TextBlock";
import { GeoJSONMap } from "./inner-components/GeoJSONMap";
import { type PreviewData, PreviewKind } from "../../types";

interface Props {
    data?: PreviewData;
}

export const PreviewRenderer: React.FC<Props> = ({ data }) => {
    if (!data) return null;

    switch (data.kind) {
        case PreviewKind.Table:
            return <TablePreview rows={data.rows} />;
        case PreviewKind.PDF:
            return <PDFPreview data={data.data} />;
        case PreviewKind.Map:
            return <GeoJSONMap geojson={data.geojson} />;
        case PreviewKind.Text:
            return <TextBlock text={data.text} />;
        case PreviewKind.HTML:
            return <HTMLPreview html={data.html} />;
        default:
            return <div className="text-sm text-gray-500">Bu veri türü için önizleme bulunamadı.</div>;
    }
};