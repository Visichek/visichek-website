"use client";

import { MediaItem } from "@/app/types/video";
import FeaturedVideoPlayer from "./featuredvideoplayer";

interface IVideoSectionOneProps {
  videos: MediaItem[];
}

const VideoSectionOne: React.FC<IVideoSectionOneProps> = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <section className="py-20 text-center text-gray-500 bg-black">
        <p>No videos available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="bg-black text-white">
      <FeaturedVideoPlayer videos={videos} />
    </section>
  );
};

export default VideoSectionOne;
