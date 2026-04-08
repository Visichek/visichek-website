"use client";

import Image from "next/image";
import GlobalVideoCard from "./globalvideocard";
import PlayButtonOverlay from "./playbuttonoverlay";

interface IVideoData {
  id: string;
  videoName: string;
  videoUrl: string;
  thumbNameUrl: string;
}

const videoQueue: IVideoData[] = [
  {
    id: "1",
    videoName: "Lamar Odom - The Player's Pov",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbNameUrl: "/sports.jpg",
  },
  {
    id: "2",
    videoName: "President Obama And Derek Jeter - Full Conversation",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbNameUrl: "/sports.jpg",
  },
  {
    id: "3",
    videoName: "The Making Of The Wisconsin Badgers Offensive Line",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbNameUrl: "/sports.jpg",
  },
  {
    id: "4",
    videoName: "President Obama And Derek Jeter - Full Conversation",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbNameUrl: "/sports.jpg",
  },
  {
    id: "5",
    videoName: "The Making Of The Wisconsin Badgers Offensive Line",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbNameUrl: "/sports.jpg",
  },
  {
    id: "6",
    videoName: "President Obama And Derek Jeter - Full Conversation",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbNameUrl: "/sports.jpg",
  },
  {
    id: "7",
    videoName: "The Making Of The Wisconsin Badgers Offensive Line",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbNameUrl: "/sports.jpg",
  },
  {
    id: "8",
    videoName: "President Obama And Derek Jeter - Full Conversation",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbNameUrl: "/sports.jpg",
  },
  {
    id: "9",
    videoName: "The Making Of The Wisconsin Badgers Offensive Line",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbNameUrl: "/sports.jpg",
  },
  {
    id: "12",
    videoName: "President Obama And Derek Jeter - Full Conversation",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbNameUrl: "/sports.jpg",
  },
  {
    id: "11",
    videoName: "The Making Of The Wisconsin Badgers Offensive Line",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbNameUrl: "/sports.jpg",
  },
];
const GlobalVideosSection = () => {
  return (
    <section className="max-w-[1200px] h-fit mx-auto mt-10">
      <div className="w-full py-12 md:px-4 relative bg-[#f4f4f4] rounded-lg">
        <div className="flex justify-center items-center absolute -top-4 left-0 w-full">
          <h1 className="bg-black py-1 px-2 text-white text-lg md:text-xl font-semibold">
            GLOBAL VIDEOS
          </h1>
        </div>

        {/* Fixed grid container */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-12 h-auto">
          <div className="order-2 lg:order-1 flex flex-col justify-between gap-5 col-span-1 lg:col-span-6 h-full min-h-[350px]">
            <GlobalVideoCard />
            <GlobalVideoCard />
          </div>
          <div className="order-1 lg:order-2 relative col-span-1 lg:col-span-6 h-80 lg:h-full group cursor-pointer">
            <Image
              className="object-cover"
              src={"/hands_raised.webp"}
              alt="sports"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
            <PlayButtonOverlay />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalVideosSection;
