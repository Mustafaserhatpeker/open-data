import type { DatasetItem } from "../../types";
import DataCard from "./inner-components/DataCard";


export default function DatasetCards({ items }: { items: DatasetItem[] }) {
  if (!items.length) {
    return (
      <div className="mt-6 text-sm text-muted-foreground">
        Gösterilecek veri bulunamadı.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-1">
      {items.map((item) => (
        <DataCard key={item._id} dataset={item} />
      ))}
    </div>
  );
}
