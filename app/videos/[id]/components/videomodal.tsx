"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { LuX } from "react-icons/lu";
import clsx from "clsx";
import VideoPlayer, { VideoPlayerHandle } from "./videoplayer";
import { MediaItem } from "@/app/types/video";
import Modal from "@/app/components/modal";

interface VideoModalProps {
  videos: MediaItem[];
  initialVideoId?: string;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({
  videos,
  initialVideoId,
  isOpen,
  onClose,
}: VideoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: VideoPlayerHandle | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const orderedVideos = useMemo(() => {
    if (!activeVideoId || videos.length === 0) return videos;
    const active = videos.find((v) => v.id === activeVideoId);
    const rest = videos.filter((v) => v.id !== activeVideoId);
    return active ? [active, ...rest] : videos;
  }, [videos, activeVideoId]);

  useEffect(() => {
    if (isOpen && initialVideoId) {
      setActiveVideoId(initialVideoId);
    }
  }, [isOpen, initialVideoId]);

  useEffect(() => {
    if (!isOpen || !activeVideoId || !containerRef.current) return;

    const timer = setTimeout(() => {
      const el = containerRef.current?.querySelector(
        `[data-video-id="${activeVideoId}"]`
      ) as HTMLElement | null;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, activeVideoId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute("data-video-id");
          const player = videoId ? videoRefs.current[videoId] : null;

          if (entry.isIntersecting && player) {
            player.play();
          } else if (player) {
            player.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    document
      .querySelectorAll("[data-video-id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isOpen]);

  if (!isOpen || videos.length === 0) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <Modal open={isOpen}>
      <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur z-10">
        <h2 className="text-lg font-semibold text-white">Watch Videos</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
          aria-label="Close"
        >
          <LuX className="w-6 h-6 text-white" />
        </button>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto"
        style={{
          maxHeight: "calc(100vh - 8rem)",
          minHeight: 0,
        }}
      >
        <div className="flex flex-col gap-6 py-6 px-4">
          {orderedVideos.map((video) => {
            const isActive = video.id === activeVideoId;
            return (
              <div
                key={video.id}
                data-video-id={video.id}
                className={clsx(
                  "flex flex-col gap-3 transition-all duration-300",
                  isActive &&
                    "ring-4 ring-white/70 rounded-xl p-3 -m-3 bg-white/5"
                )}
              >
                <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                  <VideoPlayer
                    ref={(el) => {
                      videoRefs.current[video.id] = el;
                    }}
                    url={video.url}
                    playing={isActive}
                    controls={true}
                    muted={false}
                    className="w-full"
                  />
                </div>

                <div className="px-1 py-5">
                  <h3 className="text-2xl lg:text-lg font-semibold text-white line-clamp-2">
                    {video.name.replace(/.mp4$/i, "").replace(/_/g, " ")}
                  </h3>
                  {video.category && (
                    <p className="text-sm text-gray-400 mt-1">
                      {video.category}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default VideoModal;
