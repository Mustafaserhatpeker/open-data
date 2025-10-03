import { GraduationCap, LibraryBig, SmileIcon, ThumbsUp } from "lucide-react";
import MiddleCard from "./inner-components/MiddleCard";

function MiddleCards() {
  const dataset = [
    {
      id: 1,
      description: "Mutlu Hasta",
      data: "8237+",
      icon: <SmileIcon size={18} />,
    },
    {
      id: 2,
      description: "Hasta Memnuniyeti",
      data: "95%",
      icon: <ThumbsUp size={18} />,
    },
    {
      id: 3,
      description: "Mesleki Tecrübe",
      data: "15+",
      icon: <GraduationCap size={18} />,
    },
    {
      id: 4,
      description: "Tamamlanmış Eğitim",
      data: "27+",
      icon: <LibraryBig size={18} />,
    },
  ];
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {dataset.map((item) => (
        <MiddleCard
          key={item.id}
          description={item.description}
          data={item.data}
          icon={item.icon}
        />
      ))}
    </div>
  );
}

export default MiddleCards;
