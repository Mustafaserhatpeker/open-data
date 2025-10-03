function IntroductionArea({
  header,
  description,
  img,
}: {
  header?: string;
  description?: string;
  img?: any;
}) {
  return (
    <div className="w-full flex flex-row items-start justify-between pt-4 border-t ">
      <div className="w-1/2 flex flex-col gap-4">
        <span className="text-3xl font-semibold">
          {header || "No Header Provided"}
        </span>
        <span className="text-md text-muted-foreground">
          {description || `No Description Provided`}
        </span>
      </div>
      <div className="w-1/2 flex justify-end">
        <img
          src={img}
          alt="Fizyoterapi"
          className="object-cover w-2/3 h-auto aspect-square rounded"
        />
      </div>
    </div>
  );
}

export default IntroductionArea;
