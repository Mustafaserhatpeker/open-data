import GridCard from "./inner-components/GridCard";

function GridArea({
  dataset,
}: {
  dataset: { id: number; header: string; description: string; img: any }[];
}) {
  return (
    <div className="w-full flex flex-col pt-4 border-t space-y-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
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
