import { Button } from "@/components/ui/button";
import Doctor from "@/assets/doctor.png";
import BookFast from "./BookFast";
function Welcome() {
  return (
    <div className="w-full flex flex-col items-start   justify-start">
      <div className="grid grid-cols-1 w-full ">
        <div className="col-span-1 flex flex-row items-start justify-start gap-4">
          <div className=" h-full flex flex-col items-center justify-center gap-4">
            <h1 className="text-lg font-semibold font-sans  ">
              Fiziksel Sorunların Sizi Etkilemesine İzin Vermeyin, Hayatınızın
              Her Anında Sağlıklı Kalın!
            </h1>
          </div>
          <img
            src={Doctor}
            alt="Spinal Cord"
            className="h-[30vh] object-cover "
          />
        </div>
        <h2 className="text-sm  font-sans text-gray-400 mt-2  ">
          Fiziksel Sorunların Hayatınızı Etkilemesine İzin Vermeyin, Hayatınızın
          Her Anında Sağlıklı Kalın!
        </h2>
        <div className="flex flex-row items-center gap-4 mt-4">
          <Button className="text-xs">Hemen Başlayın</Button>
          <Button className="text-xs">Biz Kimiz ?</Button>
        </div>
        <div className="col-span-1 flex flex-col items-start justify-center gap-4 mt-4 ">
          <BookFast />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
