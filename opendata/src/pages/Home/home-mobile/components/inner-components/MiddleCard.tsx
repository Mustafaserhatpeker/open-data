import { Card } from "@/components/ui/card";

function MiddleCard({
  description,
  data,
  icon,
}: {
  description: string;
  data: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card className="w-full h-24 gap-0  flex-col rounded-lg flex items-center justify-center">
        <span className="text-lg font-semibold flex items-center justify-center gap-1">
          {icon}
          {data}
        </span>
        <span className="text-xs text-muted-foreground mt-2">
          {description}
        </span>
      </Card>
    </div>
  );
}

export default MiddleCard;
