import { MediaItem } from "@/app/types/video";
import VideoCarousel from "./videocarousel";

interface IVideoCarouselSectionProps {
  videos: MediaItem[];
}

const VideoCarouselSection: React.FC<IVideoCarouselSectionProps> = async ({
  videos,
}) => {
  if (videos.length === 0) {
    return (
      <section className="py-20 text-center text-gray-500 bg-black">
        <p>No videos available at the moment.</p>
      </section>
    );
  }

  return (
    <section>
      <VideoCarousel videos={videos} />
    </section>
  );
};

export default VideoCarouselSection;
