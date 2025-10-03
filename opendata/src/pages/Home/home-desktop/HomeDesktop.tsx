import Welcome from "./components/Welcome";
import IntroductionArea from "./components/IntroductionArea";

function HomeDesktop() {


  return (
    <div className=" flex flex-col items-center justify-start  ">
      <Welcome />

      <IntroductionArea />
    </div>
  );
}

export default HomeDesktop;
