import BckImg from "../assets/img/background.avif";

export const VideoComponent = () => {
  return (
    <div className=" pt-7 pb-8">
    <div
      className="realative rounded-md  border-black md:h-[95vh] md:max-w-screen flex items-center content-center justify-center px-6 py-8"
      style={{
        backgroundImage: `url(${BckImg.src})`,      
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6">
        <video
          src="/assets/videos/zap.webm"
          controls
          autoPlay
          loop
          muted
          className="w-full md:w-[900px] max-w-full rounded-lg shadow-lg"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      </div>
    </div>
  );
};
