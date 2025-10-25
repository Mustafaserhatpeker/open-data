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

    if (data.kind === PreviewKind.Table) {
        return <TablePreview rows={data.rows} />;
    }

    if (data.kind === PreviewKind.PDF) {
        return <PDFPreview data={data.data} />;
    }

    if (data.kind === PreviewKind.Map) {
        return <GeoJSONMap geojson={data.geojson} />;
    }

    if (data.kind === PreviewKind.Text) {
        return <TextBlock text={data.text} />;
    }

    if (data.kind === PreviewKind.HTML) {
        return <HTMLPreview html={data.html} />;
    }

    return <div className="text-sm text-gray-500">Bu veri türü için önizleme bulunamadı.</div>;
};
