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
    <div className="w-full flex flex-col items-start justify-between pt-4 border-t ">
      <div className="w-full flex justify-center mb-6">
        <img
          src={img}
          alt="Fizyoterapi"
          className="object-cover w-full h-auto aspect-video rounded"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <span className="text-lg font-semibold p-2">
          {header || "No Header Provided"}
        </span>
        <span className="text-md text-muted-foreground p-2">
          {description || `No Description Provided`}
        </span>
      </div>
    </div>
  );
}

export default IntroductionArea;
