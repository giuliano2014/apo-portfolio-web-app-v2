"use client";

import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface VideoPlayerProps {
  poster: string;
  url: string;
}

// @TODO: Refactor this component
const RemoteVideoPlayer = ({ poster, url }: VideoPlayerProps) => {
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowPoster(false);
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };
  const handleToggleMute = () => setVolume(volume === 0 ? 0.5 : 0);
  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };
  const handleSeekMouseDown = () => setSeeking(true);
  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    playerRef.current?.seekTo(parseFloat((e.target as HTMLInputElement).value));
  };
  const handleToggleFullscreen = () => {
    if (!isFullscreen) {
      playerContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div
      ref={playerContainerRef}
      className="w-full bg-gray-200 overflow-hidden shadow-lg"
    >
      <div className="relative w-full">
        {showPoster && (
          <div className="absolute inset-0 z-10">
            <Image
              src={poster}
              alt="Video poster"
              layout="fill"
              objectFit="cover"
            />
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-30"
              aria-label="Play video"
            >
              <Play size={64} className="text-white" />
            </button>
          </div>
        )}
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={isPlaying}
          volume={volume}
          onProgress={handleProgress}
          onPlay={() => setShowPoster(false)}
          className="aspect-video"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white p-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePlayPause}
              className="p-1"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="w-full"
              aria-label="Seek video"
            />
            <div className="flex items-center space-x-1">
              <button
                onClick={handleToggleMute}
                className="p-1"
                aria-label={volume === 0 ? "Unmute" : "Mute"}
              >
                {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16"
                aria-label="Adjust volume"
              />
            </div>
            <button
              onClick={handleToggleFullscreen}
              className="p-1"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteVideoPlayer;
