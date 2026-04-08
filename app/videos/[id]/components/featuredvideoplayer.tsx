"use client";

import { useRef, useState } from "react";
import VideoShuffleCard from "./videoshufflecard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import VideoPlayer, { VideoPlayerHandle } from "./videoplayer";
import { MediaItem } from "@/app/types/video";

interface IVideoData {
  videos: MediaItem[];
}

const FeaturedVideoPlayer: React.FC<IVideoData> = ({ videos }) => {
  const [currentVideo, setCurrentVideo] = useState<MediaItem>(videos[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef<any>(null);
  const videoPlayerRef = useRef<VideoPlayerHandle>(null);

  const handleVideoClick = async (video: MediaItem) => {
    if (video.id === currentVideo.id) {
      if (videoPlayerRef.current) {
        const nowPlaying = videoPlayerRef.current.togglePlay();
        setIsPlaying(nowPlaying);
      }
    } else {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.pause();
      }

      setCurrentVideo(video);
      setIsPlaying(true);

      // Small delay to ensure the new video is mounted before playing
      setTimeout(() => {
        if (videoPlayerRef.current) {
          videoPlayerRef.current.play();
        }
      }, 100);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const goToSlide = (index: any) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <section className="grid grid-cols-12 bg-black text-white w-full min-h-[400px] h-fit overflow-hidden">
      <div className="col-span-full md:col-span-8 h-full">
        <div className="w-full aspect-video rounded-lg">
          <VideoPlayer
            ref={videoPlayerRef}
            playing={isPlaying}
            url={currentVideo.url}
            onPause={handleVideoPause}
            onPlay={handleVideoPlay}
          />
        </div>
        <div className="px-2">
          <p className="pt-2 text-lg md:text-2xl lg:text-4xl font-semibold text-start truncate">
            {currentVideo.name}
          </p>
        </div>
      </div>
      <div className="col-span-full md:col-span-4 w-full h-full px-0 md:px-3 relative">
        <div className="py-2 sticky top-0 z-30">
          <p className="px-2 md:px-0 text-[13px] md:text-sm font-semibold">
            NEXT UP
          </p>
        </div>
        <div
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#374151 #000000",
          }}
          className="hidden md:block overflow-y-scroll -mr-1 scrollbar-thin scrollbar-thumb-gray-800 hover:scrollbar-thumb-gray-700 h-[560px]"
        >
          {videos.map((video) => (
            <VideoShuffleCard
              key={video.id}
              videoName={video.name}
              isPlaying={video.id === currentVideo.id && isPlaying}
              isCurrentVideo={video.id === currentVideo.id}
              onClick={() => handleVideoClick(video)}
            />
          ))}
        </div>
        <div className="md:hidden h-full">
          <Swiper
            spaceBetween={2}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{
              clickable: true,
              currentClass: "my-custom-bullet-active",
            }}
            grabCursor={true}
            className="h-fit"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <VideoShuffleCard
                  videoName={video.name}
                  isPlaying={video.id === currentVideo.id && isPlaying}
                  isCurrentVideo={video.id === currentVideo.id}
                  onClick={() => handleVideoClick(video)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center items-center space-x-2 my-4">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-white"
                    : "bg-gray-500 hover:bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideoPlayer;
