"use client";

import VideoCard from "./videocard";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Autoplay } from "swiper/modules";
import { MediaItem } from "@/app/types/video";
import VideoModal from "./videomodal";

interface IVideoCarouselProps {
  videos: MediaItem[];
}

const VideoCarousel: React.FC<IVideoCarouselProps> = ({ videos }) => {
  const swiperRef = useRef<SwiperType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | undefined>(
    undefined
  );

  const openModal = (videoId: string) => {
    setSelectedVideoId(videoId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideoId(undefined);
  };

  if (!videos || videos.length === 0) {
    return null;
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalOpen]);

  return (
    <div className="max-w-[1200px] h-fit mx-auto mt-10">
      <div className="w-full py-12 md:px-4 relative bg-[#f4f4f4] rounded-lg">
        <div className="flex justify-center items-center absolute -top-4 left-0 w-full">
          <h1 className="bg-black py-1 px-2 text-white text-lg md:text-xl font-semibold">
            FOOTBALL VIDEOS
          </h1>
        </div>
        <div className="cursor-pointer z-10 absolute hidden md:flex justify-between items-center w-full h-full top-0 left-0 pointer-events-none">
          <div
            className="bg-white rounded-r-full p-3 transition-colors duration-200 hover:bg-gray-100 pointer-events-auto"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FiArrowLeft size={40} className="text-black" />
          </div>
          <div
            className="bg-white rounded-l-full p-3 transition-colors duration-200 hover:bg-gray-100 pointer-events-auto"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FiArrowRight size={40} className="text-black" />
          </div>
        </div>
        {videos.length === 1 ? (
          <VideoCard
            thumbNameUrl={"/charlotte_image.webp"}
            videoName={videos[0].name}
            onClick={() => openModal(videos[0].id)}
          />
        ) : (
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={videos.length > 1}
            spaceBetween={16}
            slidesPerView={1.5}
            centeredSlides={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              1: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 15,
              },
              // 510: {
              //   slidesPerView: 3,
              //   centeredSlides: true,
              //   spaceBetween: 15,
              // },
              // 603: {
              //   slidesPerView: 2.2,
              //   centeredSlides: true,
              //   spaceBetween: 15,
              // },
              722: {
                slidesPerView: 3,
                centeredSlides: true,
                spaceBetween: 15,
              },
              900: {
                slidesPerView: 3.5,
                centeredSlides: true,
                spaceBetween: 12,
              },
              1078: {
                slidesPerView: 3.5,
                centeredSlides: true,
                spaceBetween: 15,
              },
              1200: {
                slidesPerView: 4,
                centeredSlides: false,
                spaceBetween: 15,
              },
            }}
            className="video-swiper"
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <VideoCard
                  thumbNameUrl={"/charlotte_image.webp"}
                  videoName={video.name}
                  onClick={() => openModal(video.id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="relative">
        <VideoModal
          videos={videos}
          initialVideoId={selectedVideoId}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default VideoCarousel;
