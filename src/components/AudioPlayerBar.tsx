import React, { useState, useEffect } from 'react';
import { AudioTrack } from '../types';

interface AudioPlayerBarProps {
  track: AudioTrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  track,
  isPlaying,
  onTogglePlay,
  onClose
}) => {
  const [progress, setProgress] = useState(12); // seconds simulated
  const [speed, setSpeed] = useState<number>(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && track) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 600 ? 0 : prev + 1));
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, track, speed]);

  if (!track) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const cycleSpeed = () => {
    if (speed === 1) setSpeed(1.25);
    else if (speed === 1.25) setSpeed(1.5);
    else if (speed === 1.5) setSpeed(2);
    else setSpeed(1);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black text-white border-t border-[#333] shadow-2xl px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Track Info */}
        <div className="flex items-center space-x-3 w-full sm:w-1/3 min-w-0">
          <div
            className="w-10 h-10 flex items-center justify-center font-bold text-xs shrink-0"
            style={{ backgroundColor: track.accentColor || '#333' }}
          >
            <span className="material-symbols-outlined text-white text-base">podcasts</span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[0.625rem] font-sans uppercase font-bold tracking-widest text-[#99ccfa] block">
              {track.show}
            </span>
            <p className="text-xs font-serif font-semibold truncate text-white">
              {track.title}
            </p>
            <p className="text-[0.625rem] text-[#aaa] font-sans truncate">{track.host}</p>
          </div>
        </div>

        {/* Player Controls & Scrubber */}
        <div className="flex flex-col items-center w-full sm:w-1/2 space-y-1">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setProgress((p) => Math.max(0, p - 15))}
              className="text-[#aaa] hover:text-white transition-colors cursor-pointer"
              title="Rewind 15 seconds"
            >
              <span className="material-symbols-outlined text-base">replay_15</span>
            </button>
            <button
              onClick={onTogglePlay}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#e5e5e5] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <button
              onClick={() => setProgress((p) => p + 15)}
              className="text-[#aaa] hover:text-white transition-colors cursor-pointer"
              title="Fast forward 15 seconds"
            >
              <span className="material-symbols-outlined text-base">forward_15</span>
            </button>
            <button
              onClick={cycleSpeed}
              className="text-[0.6875rem] font-mono text-[#aaa] hover:text-white border border-[#444] px-1.5 py-0.5 rounded cursor-pointer"
            >
              {speed}x
            </button>
          </div>

          <div className="w-full flex items-center space-x-2 text-[0.625rem] font-mono text-[#888]">
            <span>{formatTime(progress)}</span>
            <div
              className="flex-1 h-1 bg-[#333] cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setProgress(Math.floor(pos * 600));
              }}
            >
              <div
                className="h-full bg-white relative"
                style={{ width: `${Math.min(100, (progress / 600) * 100)}%` }}
              />
            </div>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Action / Dismiss */}
        <div className="hidden sm:flex items-center justify-end w-1/6 space-x-3 text-[#aaa]">
          <button
            onClick={onClose}
            className="hover:text-white transition-colors p-1 cursor-pointer"
            title="Close audio player"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
