import React, { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

let RL: typeof import("react-leaflet") | null = null;
let L: typeof import("leaflet") | null = null;

interface Props {
    geojson: any;
    className?: string;
    height?: number;
}

export const GeoJSONMap: React.FC<Props> = ({ geojson, className, height = 720 }) => {
    const [ready, setReady] = useState(false);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            if (typeof window === "undefined") return;
            const [reactLeaflet, leaflet] = await Promise.all([
                import("react-leaflet"),
                import("leaflet"),
            ]);
            RL = reactLeaflet;
            L = leaflet;
            if (mounted) setReady(true);
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    const bounds = useMemo(() => {
        if (!L) return null;
        // Compute bounds from geojson coordinates
        try {
            const layer = (L as any).geoJSON(geojson);
            return layer.getBounds();
        } catch {
            return null;
        }
    }, [geojson, ready]);

    if (!ready || !RL || !L) {
        return <div className="w-full border rounded p-4 text-sm text-gray-500">Harita hazırlanıyor...</div>;
    }

    const { MapContainer, TileLayer, GeoJSON, useMap } = RL;

    const FitBounds: React.FC = () => {
        const map = useMap();
        useEffect(() => {
            if (bounds && bounds.isValid()) {
                map.fitBounds(bounds, { padding: [16, 16] });
            } else {
                map.setView([39.0, 35.0], 6); // Türkiye ortalama
            }
        }, [map, bounds]);
        return null;
    };

    return (
        <div className={`w-full ${className || ""}`} style={{ height }}>
            <MapContainer
                ref={mapRef}
                style={{ height: "100%", width: "100%" }}
                center={[39.0, 35.0]}
                zoom={6}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON data={geojson as any} />
                <FitBounds />
            </MapContainer>
        </div>
    );
};