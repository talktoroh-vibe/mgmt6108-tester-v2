import React from 'react';

interface GamesWidgetProps {
  onPlayGame: (game: 'wordle' | 'connections' | 'spellingbee' | 'mini') => void;
}

export const GamesWidget: React.FC<GamesWidgetProps> = ({ onPlayGame }) => {
  return (
    <div className="border border-[#E5E5E5] p-4 bg-white space-y-3">
      <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-2">
        <div>
          <h3
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-lg font-bold text-[#1a1a1a]"
          >
            Le Monde Jeux & Puzzles
          </h3>
          <p className="text-[0.6875rem] font-sans text-[#666]">Daily brain teasers & crosswords</p>
        </div>
        <button
          onClick={() => onPlayGame('mini')}
          className="font-sans text-[0.6875rem] text-[#1a1a1a] font-bold hover:underline cursor-pointer"
        >
          All Games ›
        </button>
      </div>

      {/* Bento Game Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs font-sans">
        {/* Mots Croisés / Mini Crossword */}
        <button
          onClick={() => onPlayGame('mini')}
          className="border border-[#E5E5E5] p-2.5 hover:bg-[#FAF8F5] transition-colors block text-left group cursor-pointer w-full"
        >
          <div className="flex items-center space-x-1 mb-1 text-[#1a1a1a]">
            <span className="material-symbols-outlined text-base">grid_4x4</span>
          </div>
          <p className="font-bold text-[#1a1a1a] group-hover:underline">Mots Croisés</p>
          <p className="text-[0.625rem] text-[#666]">The mini 5x5 French grid.</p>
        </button>

        {/* Le Wordle */}
        <button
          onClick={() => onPlayGame('wordle')}
          className="border border-[#E5E5E5] p-2.5 hover:bg-[#FAF8F5] transition-colors block text-left group cursor-pointer w-full"
        >
          <div className="flex items-center space-x-1.5 mb-1">
            <div className="w-3 h-3 bg-[#1a1a1a]" />
            <div className="w-3 h-3 bg-[#fed000]" />
            <div className="w-3 h-3 bg-[#E5E5E5]" />
          </div>
          <p className="font-bold text-[#1a1a1a] group-hover:underline">Le Wordle</p>
          <p className="text-[0.625rem] text-[#666]">Find the hidden 5-letter word.</p>
        </button>

        {/* Connections / Liens Thématiques */}
        <button
          onClick={() => onPlayGame('connections')}
          className="border border-[#E5E5E5] p-2.5 hover:bg-[#FAF8F5] transition-colors block text-left group cursor-pointer w-full"
        >
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4 mb-1">
            <span className="bg-[#1a1a1a] block w-1.5 h-1.5" />
            <span className="bg-[#fed000] block w-1.5 h-1.5" />
            <span className="bg-[#1e3a8a] block w-1.5 h-1.5" />
            <span className="bg-[#b91c1c] block w-1.5 h-1.5" />
          </div>
          <p className="font-bold text-[#1a1a1a] group-hover:underline">Connections</p>
          <p className="text-[0.625rem] text-[#666]">Group 4 related concepts.</p>
        </button>

        {/* Spelling Bee / La Ruche */}
        <button
          onClick={() => onPlayGame('spellingbee')}
          className="border border-[#E5E5E5] p-2.5 hover:bg-[#FAF8F5] transition-colors block text-left group cursor-pointer w-full"
        >
          <span className="material-symbols-outlined text-base text-[#855B00] block mb-0.5">
            hexagon
          </span>
          <p className="font-bold text-[#1a1a1a] group-hover:underline">La Ruche</p>
          <p className="text-[0.625rem] text-[#666]">Make words with 7 letters.</p>
        </button>
      </div>
    </div>
  );
};
