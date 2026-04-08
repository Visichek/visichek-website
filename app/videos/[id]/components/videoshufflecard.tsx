import { FaPlay } from "react-icons/fa";
import clsx from "clsx";
import { FaPause } from "react-icons/fa6";

interface IVideoShuffleCard {
  videoName: string;
  isPlaying?: boolean;
  isCurrentVideo?: boolean;
  onClick: () => void;
}

const VideoShuffleCard: React.FC<IVideoShuffleCard> = ({
  videoName,
  onClick,
  isPlaying = false,
  isCurrentVideo,
}) => {
  return (
    <div
      className={clsx(
        "grid h-24 px-2 md:px-0 md:pt-0 md:pb-0 grid-cols-12 items-center bg-[linear-gradient(220deg,grey_0.57%,#252525_111.06%)] md:bg-none cursor-pointer transition duration-150 ease-in-out",
        isCurrentVideo && isPlaying ? "text-white" : "text-gray-400",
        isCurrentVideo && !isPlaying ? "text-white" : ""
      )}
      onClick={onClick}
    >
      <div className="flex flex-col justify-between gap-5 md:gap-0 col-span-11 md:col-span-10 h-full py-2">
        <div className="flex items-center flex-1">
          <p className="text-sm font-semibold truncate">{videoName}</p>
        </div>
        <div className="border-0 md:border-b-2 border-b-gray-400">
          <p className="text-sm font-semibold h-6 flex items-center">
            {isPlaying ? "PLAYING..." : ""}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center col-span-1 md:col-span-2">
        {isPlaying ? (
          <FaPause className="cursor-pointer" size={20} />
        ) : (
          <FaPlay className="cursor-pointer" size={20} />
        )}
      </div>
    </div>
  );
};

export default VideoShuffleCard;

// import { LuPlay } from "react-icons/lu";
// import clsx from "clsx";

// interface IVideoShuffleCard {
//   videoName: string;
//   isPlaying?: boolean;
//   onClick: () => void;
// }

// const VideoShuffleCard: React.FC<IVideoShuffleCard> = ({
//   videoName,
//   onClick,
//   isPlaying = false,
// }) => {
//   return (
//     <div
//       onClick={onClick}
//       className={clsx(
//         "group grid grid-cols-12 items-center gap-4 px-4 py-5 rounded-xl cursor-pointer",
//         "transition-all duration-300 ease-out",
//         "hover:bg-white/5",
//         isPlaying
//           ? "bg-cyan-900/30 border border-cyan-800/50"
//           : "bg-transparent border border-transparent"
//       )}
//     >
//       <div className="col-span-10 flex flex-col">
//         <p
//           className={clsx(
//             "text-sm font-medium truncate transition-colors duration-300",
//             isPlaying ? "text-cyan-400" : "text-gray-300 group-hover:text-white"
//           )}
//         >
//           {videoName}
//         </p>

//         <p
//           className={clsx(
//             "text-xs font-medium mt-1 transition-all duration-300",
//             isPlaying
//               ? "text-cyan-400 opacity-100"
//               : "text-transparent opacity-0"
//           )}
//         >
//           Playing now
//         </p>
//       </div>
//       <div className="col-span-2 flex justify-end">
//         {isPlaying ? (
//           <div className="w-5 h-5 bg-cyan-400 rounded-full animate-pulse" />
//         ) : (
//           <LuPlay
//             size={20}
//             className="text-gray-500 group-hover:text-white transition-colors duration-300"
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoShuffleCard;
