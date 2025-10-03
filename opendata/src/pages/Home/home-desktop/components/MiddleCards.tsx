import MiddleCard from "./inner-components/MiddleCard";

function MiddleCards() {
  const dataset = [
    { id: 1, description: "Mutlu Hasta", data: "8237+" },
    { id: 2, description: "Hasta Memnuniyeti", data: "95%" },
    { id: 3, description: "Mesleki Tecrübe", data: "15+" },
    { id: 4, description: "Tamamlanmış Eğitim", data: "27+" },
  ];
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {dataset.map((item) => (
        <MiddleCard
          key={item.id}
          description={item.description}
          data={item.data}
        />
      ))}
    </div>
  );
}

export default MiddleCards;
