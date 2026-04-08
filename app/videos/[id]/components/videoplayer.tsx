"use client";

import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import clsx from "clsx";
import Video from "next-video";

interface VideoPlayerProps {
  url: string;
  className?: string;
  playing?: boolean;
  controls?: boolean;
  volume?: number;
  muted?: boolean;
  onPause?: () => void;
  onPlay?: () => void;
  onEnded?: () => void;
}

export interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  togglePlay: () => boolean;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  (
    {
      url,
      className,
      playing = true,
      controls = true,
      volume = 0.8,
      muted = false,
      onPause,
      onPlay,
      onEnded,
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [internalPlaying, setInternalPlaying] = useState(playing);

    useEffect(() => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const handlePlayPause = async () => {
        try {
          if (playing && videoElement.paused) {
            await videoElement.play();
            setInternalPlaying(true);
            onPlay?.();
          } else if (!playing && !videoElement.paused) {
            videoElement.pause();
            setInternalPlaying(false);
            onPause?.();
          }
        } catch (error) {
          console.error("Error controlling video:", error);
        }
      };

      handlePlayPause();
    }, [playing, onPlay, onPause]);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.volume = volume;
      }
    }, [volume]);

    useImperativeHandle(ref, () => ({
      play: async () => {
        if (videoRef.current) {
          try {
            await videoRef.current.play();
            setInternalPlaying(true);
            onPlay?.();
          } catch (error) {
            console.error("Error playing video:", error);
          }
        }
      },
      pause: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          setInternalPlaying(false);
          onPause?.();
        }
      },
      togglePlay: () => {
        if (videoRef.current) {
          if (videoRef.current.paused) {
            videoRef.current.play().then(() => {
              setInternalPlaying(true);
              onPlay?.();
            });
            return true;
          } else {
            videoRef.current.pause();
            setInternalPlaying(false);
            onPause?.();
            return false;
          }
        }
        return false;
      },
    }));

    const handleVideoPlay = () => {
      setInternalPlaying(true);
      onPlay?.();
    };

    const handleVideoPause = () => {
      setInternalPlaying(false);
      onPause?.();
    };

    if (!url) {
      return <div className={clsx("bg-black w-full h-full", className)} />;
    }

    return (
      <div className={clsx("bg-black w-full h-full", className)}>
        <Video
          ref={videoRef}
          src={url}
          controls={controls}
          autoPlay={playing}
          muted={muted}
          playsInline
          loop={false}
          preload="metadata"
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onEnded={onEnded}
          type="hls"
        />
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;
