import Image from "next/image";
import PlayButtonOverlay from "./playbuttonoverlay";

const GlobalVideoCard = () => {
  return (
    <div className="bg-white flex-1 group cursor-pointer">
      <div className="flex gap-4 h-full">
        <div className="h-full w-[40%] relative shrink-0">
          <Image
            className="object-cover"
            src={"/family_image.webp"}
            alt="GlobalVideoCard"
            fill
            sizes="(max-width: 768px) 33vw, 200px"
          />
          <PlayButtonOverlay />
        </div>
        <div className="flex-1 w-2/3 flex items-start py-3 px-2">
          <h4 className="text-sm md:text-2xl line-clamp-2">
            I Am Romário | By Romário | The Players' Tribune
          </h4>
        </div>
      </div>
    </div>
  );
};

export default GlobalVideoCard;
