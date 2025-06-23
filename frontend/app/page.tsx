import AnimationComp from "./components/AnimationComp";
import FirstComponent from "./components/FirsrtComponent";
import { InforComponent } from "./components/InforComponent";
import Navbar from "./components/Navbar";
import { VideoComponent } from "./components/VideoComponent";


export default function Home() {
  
  return (
<>
  <AnimationComp/> 
  <Navbar/>
    <div className="min-h-[320vh] p-6 md:pr-24 md:pl-24 ">
      <FirstComponent/>
      <VideoComponent/>
      <InforComponent/>
    </div>
    </>
  );
}
