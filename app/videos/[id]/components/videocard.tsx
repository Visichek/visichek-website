import Image from "next/image";
import PlayButtonOverlay from "./playbuttonoverlay";

interface IVideoData {
  videoName: string;
  thumbNameUrl: string;
  onClick?: () => void;
}

const VideoCard: React.FC<IVideoData> = ({
  videoName,
  thumbNameUrl,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer w-full h-[370px] bg-white rounded-sm shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-[190px] w-full bg-gray-200">
        <Image
          className="object-cover"
          src={thumbNameUrl}
          alt={videoName}
          fill
        />
        <PlayButtonOverlay />
      </div>
      <div className="p-3 sm:p-4">
        <h3
          title={videoName}
          className=" text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light text-black leading-tight line-clamp-3 wrap-break-word"
        >
          {videoName}
        </h3>
      </div>
    </div>
  );
};

export default VideoCard;
