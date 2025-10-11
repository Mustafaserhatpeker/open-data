import JSZip from "jszip";
import { kml as kmlToGeoJSON } from "@tmcw/togeojson";

export function parseGeoJSONText(text: string): any {
    const obj = JSON.parse(text);
    if (obj.type === "FeatureCollection") return obj;
    if (obj.type === "Feature") {
        return { type: "FeatureCollection", features: [obj] };
    }
    if (obj.type && obj.coordinates) {
        return { type: "FeatureCollection", features: [{ type: "Feature", properties: {}, geometry: obj }] };
    }
    throw new Error("Unsupported GeoJSON format.");
}

export function parseKMLTextToGeoJSON(kmlText: string): any {
    const dom = new DOMParser().parseFromString(kmlText, "text/xml");
    const gj = kmlToGeoJSON(dom);
    return gj;
}

export async function parseKMZToGeoJSON(arrayBuffer: ArrayBuffer): Promise<any> {
    const zip = await JSZip.loadAsync(arrayBuffer);
    const kmlFile = Object.keys(zip.files).find((f) => f.toLowerCase().endsWith(".kml"));
    if (!kmlFile) throw new Error("KMZ içinde KML dosyası bulunamadı.");
    const kmlText = await zip.files[kmlFile].async("text");
    return parseKMLTextToGeoJSON(kmlText);
}