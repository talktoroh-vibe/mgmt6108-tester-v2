import React from 'react';
import { AudioTrack } from '../types';

interface AudioPodcastsWidgetProps {
  onPlayTrack: (track: AudioTrack) => void;
  onOpenAllPodcasts: () => void;
  currentTrackId?: string;
  isPlaying?: boolean;
}

export const AudioPodcastsWidget: React.FC<AudioPodcastsWidgetProps> = ({
  onPlayTrack,
  onOpenAllPodcasts,
  currentTrackId,
  isPlaying
}) => {
  const catchingUpTrack: AudioTrack = {
    id: 'catching-up-with-lemonde',
    title: 'Catching Up with Le Monde: Inside France’s High-Stakes Assembly Battle',
    show: 'LE MONDE IN ENGLISH PODCAST',
    host: 'Elvire Camus and Paris Bureau',
    duration: '28 MIN',
    description: 'Our editors in Paris unpack the political tensions in the Palais Bourbon and what European leaders negotiated behind closed doors at the Élysée.',
    date: 'October 12, 2026',
    accentColor: '#1a1a1a'
  };

  const spotlightTrack: AudioTrack = {
    id: 'spotlight-chamonix-glaciers',
    title: 'Spotlight: The Meltdown of the Alpine Giants',
    show: 'GRANDES ENQUÊTES AUDIO',
    host: 'Stéphane Mandard',
    duration: '22 MIN',
    description: 'Field recordings and scientific interviews from the Mer de Glace in Chamonix, tracking the rapid retreat of European glaciers.',
    date: 'October 12, 2026',
    accentColor: '#1e3a8a'
  };

  return (
    <div className="bg-[#FAF8F5] p-4 border border-[#E5E5E5] space-y-3">
      <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-2">
        <span className="text-[0.6875rem] font-sans uppercase font-bold text-[#1a1a1a] tracking-wider flex items-center space-x-1.5">
          <span className="material-symbols-outlined text-sm">headphones</span>
          <span>LE MONDE AUDIO</span>
        </span>
        <button
          onClick={onOpenAllPodcasts}
          className="text-[0.6875rem] font-sans text-[#1a1a1a] font-bold hover:underline cursor-pointer"
        >
          All Podcasts ›
        </button>
      </div>

      {/* Main Track: Catching Up with Le Monde */}
      <div className="space-y-1.5">
        <span className="text-[0.6875rem] font-sans font-bold text-[#855B00] uppercase tracking-wider">
          WEEKLY PODCAST
        </span>
        <h4
          onClick={() => onPlayTrack(catchingUpTrack)}
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          className="text-base font-bold text-[#1a1a1a] hover:underline cursor-pointer leading-tight"
        >
          {catchingUpTrack.title}
        </h4>
        <p className="text-xs text-[#555] font-serif leading-relaxed">
          {catchingUpTrack.description}
        </p>
        <div className="flex items-center space-x-3 pt-1">
          <button
            onClick={() => onPlayTrack(catchingUpTrack)}
            className="bg-[#1a1a1a] hover:bg-[#333] text-white text-[0.6875rem] font-sans font-bold px-3 py-1 flex items-center space-x-1.5 transition-colors cursor-pointer rounded-none uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-xs">
              {currentTrackId === catchingUpTrack.id && isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>
              {currentTrackId === catchingUpTrack.id && isPlaying ? 'PAUSE' : 'LISTEN · 28 MIN'}
            </span>
          </button>
        </div>
      </div>

      {/* Secondary Audio Track */}
      <div className="pt-3 border-t border-[#E5E5E5] space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-[0.6875rem] font-sans font-bold text-[#1e3a8a] uppercase tracking-wider">
            DOCUMENTARY
          </span>
          <button
            onClick={() => onPlayTrack(spotlightTrack)}
            className="text-[0.6875rem] font-sans text-[#1a1a1a] hover:underline font-bold flex items-center space-x-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xs">
              {currentTrackId === spotlightTrack.id && isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>{currentTrackId === spotlightTrack.id && isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>
        <p
          onClick={() => onPlayTrack(spotlightTrack)}
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          className="text-base font-bold text-[#1a1a1a] hover:underline cursor-pointer leading-tight"
        >
          {spotlightTrack.title}
        </p>
        <span className="text-[0.6875rem] font-sans text-[#666] block">
          Reported by Stéphane Mandard · 22 min
        </span>
      </div>
    </div>
  );
};
