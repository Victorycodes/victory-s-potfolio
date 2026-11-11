"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState("");

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      setPlaybackError("The audio player is unavailable.");
      return false;
    }

    setPlaybackError("");

    try {
      await audio.play();
      return true;
    } catch (error) {
      setPlaying(false);
      setPlaybackError(
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "Your browser blocked automatic playback. Tap the music button to start."
          : error instanceof Error
            ? `Music could not start: ${error.message}`
            : "Music could not start. Please try again.",
      );
      return false;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = 0.25;

    const handleFirstScroll = () => {
      window.removeEventListener("scroll", handleFirstScroll);
      void startPlayback();
    };

    window.addEventListener("scroll", handleFirstScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", handleFirstScroll);
  }, [startPlayback]);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) {
      setPlaybackError("The audio player is unavailable.");
      return;
    }

    if (audio.paused) {
      await startPlayback();
    } else {
      setPlaybackError("");
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setPlaybackError("The background music file could not be loaded.");
        }}
      />
      <div className="background-music">
        <button
          className="background-music-toggle"
          type="button"
          onClick={toggleMusic}
          aria-label={playing ? "Pause background music" : "Play background music"}
          aria-pressed={playing}
          title={playing ? "Pause background music" : "Play background music"}
        >
          {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        {playbackError && (
          <p className="background-music-error" role="status">
            {playbackError}
          </p>
        )}
      </div>
    </>
  );
}
