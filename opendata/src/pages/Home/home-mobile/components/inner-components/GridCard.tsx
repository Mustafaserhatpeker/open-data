import { Card } from "@/components/ui/card";

function GridCard({
  header,
  description,
  img,
}: {
  header: string;
  description: string;
  img: string;
}) {
  return (
    <Card className="w-full h-full flex flex-col items-start justify-start   p-4 gap-2 ">
      <img
        src={img}
        alt={header}
        className="object-cover w-full h-48 rounded  "
      />
      <h3 className="text-lg font-semibold mb-2">{header}</h3>
      <p className="text-md text-muted-foreground">{description}</p>
    </Card>
  );
}

export default GridCard;
