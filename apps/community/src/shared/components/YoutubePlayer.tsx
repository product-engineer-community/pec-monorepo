"use client";

import { useEffect, useRef } from "react";

// YouTube Player의 Props 타입 정의
interface YoutubePlayerProps {
  videoId: string;
  width?: number;
  height?: number;
}

// YouTube IFrame API의 타입 정의
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          height: string | number;
          width: string | number;
          videoId: string;
          playerVars?: {
            autoplay?: 0 | 1;
            mute?: 0 | 1;
          };
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (event: { target: any }) => void;
            onStateChange: (event: { data: number }) => void;
          };
        },
      ) => void;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
  videoId,
  width = 640,
  height = 360,
}) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the IFrame Player API code asynchronously.
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player) after the API code downloads.
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player(playerRef.current!, {
        height,
        width,
        videoId,
        playerVars: {
          autoplay: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    // The API will call this function when the video player is ready.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onPlayerReady(event: { target: any }) {
      console.log("Player is ready");
      event.target.playVideo();
    }

    // The API calls this function when the player's state changes.
    function onPlayerStateChange(event: { data: number }) {
      console.log("Player state changed:", event.data);
    }

    // Clean up
    return () => {
      window.onYouTubeIframeAPIReady = null!;
    };
  }, [videoId, width, height]);

  return <div ref={playerRef} />;
};
