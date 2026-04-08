import { FaPlay } from "react-icons/fa6";

const PlayButtonOverlay = () => {
  return (
    <div>
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 transition-opacity duration-300">
        <div className="flex justify-center items-center bg-white/35 rounded-full p-3 sm:p-4 transform scale-100 group-hover:scale-110 transition-transform duration-300">
          <FaPlay className="text-white text-sm sm:text-lg" />
        </div>
      </div>
    </div>
  );
};

export default PlayButtonOverlay;
