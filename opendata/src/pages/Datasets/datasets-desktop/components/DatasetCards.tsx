import DataCard, { type Dataset } from "./inner-components/DataCard"

export default function DatasetCards() {
    const data: Dataset[] = [
        {
            id: 1,
            title: "Dataset 1",
            description: "Description for Dataset 1",
            datatype: "CSV",
            organization: "Org 1",
            category: "Category 1",
            tags: ["tag1", "tag2"],
        },
        {
            id: 2,
            title: "Dataset 2",
            description: "Description for Dataset 2",
            datatype: "JSON", // JSON için ikon yoksa varsayılan görünecek
            organization: "Org 2",
            category: "Category 2",
            tags: ["tag3", "tag4"],
        },
        {
            id: 3,
            title: "Dataset 3",
            description: "Description for Dataset 3",
            datatype: "XML",
            organization: "Org 3",
            category: "Category 3",
            tags: ["tag5", "tag6"],
        },
        {
            id: 4,
            title: "Dataset 4",
            description: "Description for Dataset 4",
            datatype: "XLSX",
            organization: "Org 4",
            category: "Category 4",
            tags: ["tag7", "tag8"],
        },
        {
            id: 5,
            title: "Dataset 5",
            description: "Description for Dataset 5",
            datatype: "TXT",
            organization: "Org 5",
            category: "Category 5",
            tags: ["tag9", "tag10"],
        },
        {
            id: 6,
            title: "Dataset 6",
            description: "Description for Dataset 6",
            datatype: "PDF",
            organization: "Org 6",
            category: "Category 6",
            tags: ["tag11", "tag12"],
        },
        // İstersen örnekleri genişletebilirsin:
        {
            id: 7,
            title: "Geospatial Data",
            description: "Sample GeoJSON dataset",
            datatype: "GeoJSON",
            organization: "Geo Org",
            category: "Maps",
            tags: ["geo", "map", "features"],
        },
        {
            id: 8,
            title: "KML Route",
            description: "KML route data",
            datatype: "KML",
            organization: "Transport Dept",
            category: "Routes",
            tags: ["kml", "routes"],
        },
        {
            id: 9,
            title: "Zipped KML",
            description: "KMZ compressed KML data",
            datatype: "KMZ",
            organization: "Survey",
            category: "Survey",
            tags: ["kmz", "compressed"],
        },
        {
            id: 10,
            title: "Public API",
            description: "Open data API endpoint",
            datatype: "API",
            organization: "Open Data",
            category: "Services",
            tags: ["api", "rest"],
        },
        {
            id: 11,
            title: "HTML Snapshot",
            description: "Static HTML export",
            datatype: "HTML",
            organization: "Web Archive",
            category: "Snapshots",
            tags: ["html", "archive"],
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-2">
            {data.map((dataset) => (
                <DataCard key={dataset.id} dataset={dataset} />
            ))}
        </div>
    )
}