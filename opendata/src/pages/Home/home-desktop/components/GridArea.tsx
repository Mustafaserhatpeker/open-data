import GridCard from "./inner-components/GridCard";

function GridArea({
  dataset,
  header,
}: {
  dataset: { id: number; header: string; description: string; img: any }[];
  header?: string;
}) {
  return (
    <div className="w-full flex flex-col pt-4 border-t space-y-4 ">
      <div className="flex flex-col col-span-4">
        <span className="text-3xl font-semibold">
          {header || "No Header Provided"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {dataset.map((item) => (
          <GridCard
            key={item.id}
            header={item.header}
            description={item.description}
            img={item.img}
          />
        ))}
      </div>
    </div>
  );
}

export default GridArea;
