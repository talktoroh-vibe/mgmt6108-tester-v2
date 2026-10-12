import React, { useState } from 'react';
import { Category } from '../types';

interface HeaderProps {
  currentCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenAuth: () => void;
  onOpenSubscribe: () => void;
  onOpenMarketWeather: (tab: 'market' | 'weather') => void;
  onOpenTodaysPaper: () => void;
  bookmarksCount: number;
  currentEdition: string;
  onSelectEdition: (edition: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenBookmarks,
  onOpenAuth,
  onOpenSubscribe,
  onOpenMarketWeather,
  onOpenTodaysPaper,
  bookmarksCount,
  currentEdition,
  onSelectEdition
}) => {
  const [showEditionDropdown, setShowEditionDropdown] = useState(false);

  const sections: { label: string; cat: Category | 'All' }[] = [
    { label: 'All Stories', cat: 'All' },
    { label: 'International', cat: 'International' },
    { label: 'France', cat: 'France' },
    { label: 'Economy', cat: 'Economy' },
    { label: 'Environment', cat: 'Environment' },
    { label: 'Culture', cat: 'Culture' },
    { label: 'Opinion', cat: 'Opinion' },
    { label: 'Society', cat: 'Society' },
    { label: 'Sports', cat: 'Sports' },
    { label: 'Podcasts', cat: 'Podcasts' },
    { label: 'Games', cat: 'Games' }
  ];

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#E5E5E5] text-[#1a1a1a]">
      {/* 1. TOP UTILITY MICRO BAR */}
      <div className="w-full max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-[0.6875rem] font-sans border-b border-[#E5E5E5] text-[#555555]">
        {/* Left: Search & Edition Switcher */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-1.5 hover:text-black transition-colors cursor-pointer"
            aria-label="Search Le Monde"
          >
            <span className="material-symbols-outlined text-base">search</span>
            <span className="font-semibold tracking-wider uppercase text-[0.6875rem]">Search</span>
          </button>

          <span className="text-[#E5E5E5]">|</span>

          {/* Edition Selector */}
          <div className="relative">
            <button
              onClick={() => setShowEditionDropdown(!showEditionDropdown)}
              className="flex items-center space-x-1 font-semibold text-[#1a1a1a] hover:underline cursor-pointer"
            >
              <span>{currentEdition === 'FR' ? 'Édition française' : 'English edition'}</span>
              <span className="material-symbols-outlined text-xs">arrow_drop_down</span>
            </button>

            {showEditionDropdown && (
              <div className="absolute left-0 mt-1.5 w-44 bg-white border border-[#E5E5E5] shadow-lg py-1 z-50 text-xs">
                <button
                  onClick={() => {
                    onSelectEdition('EN');
                    setShowEditionDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#F8F8F8] flex items-center justify-between ${
                    currentEdition !== 'FR' ? 'font-bold text-[#1a1a1a]' : 'text-[#666]'
                  }`}
                >
                  <span>English edition</span>
                  {currentEdition !== 'FR' && <span className="text-[#c51118]">✓</span>}
                </button>
                <button
                  onClick={() => {
                    onSelectEdition('FR');
                    setShowEditionDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#F8F8F8] flex items-center justify-between ${
                    currentEdition === 'FR' ? 'font-bold text-[#1a1a1a]' : 'text-[#666]'
                  }`}
                >
                  <span>Édition française</span>
                  {currentEdition === 'FR' && <span className="text-[#c51118]">✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: Live Date & Today's Paper Link */}
        <div className="hidden md:flex items-center space-x-3 text-center">
          <span className="font-serif italic text-[#333]">Monday, October 12, 2026</span>
          <span className="text-[#E5E5E5]">·</span>
          <button
            onClick={onOpenTodaysPaper}
            className="hover:underline font-sans font-medium text-[#1a1a1a] cursor-pointer"
          >
            Today’s Paper (L’Édition du Jour)
          </button>
        </div>

        {/* Right: Market, Weather, Subscribe & Log in */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-3 border-r border-[#E5E5E5] pr-3">
            <button
              onClick={() => onOpenMarketWeather('market')}
              className="flex items-center space-x-1 hover:text-black cursor-pointer"
            >
              <span className="font-bold text-[#1a1a1a]">CAC 40</span>
              <span className="text-[#107c41] font-semibold">+0.42%</span>
            </button>
            <button
              onClick={() => onOpenMarketWeather('weather')}
              className="flex items-center space-x-1 hover:text-black cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">wb_cloudy</span>
              <span>17°C Paris</span>
            </button>
          </div>

          <button
            onClick={onOpenBookmarks}
            className="relative hover:text-black transition-colors cursor-pointer p-1"
            title="Saved Articles"
            aria-label="Bookmarks"
          >
            <span className="material-symbols-outlined text-base">bookmark</span>
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c51118] text-white text-[0.5625rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Signature Le Monde Golden Subscribe Button */}
          <button
            onClick={onOpenSubscribe}
            className="bg-[#fed000] hover:bg-[#e5bc00] text-[#1a1a1a] text-[0.6875rem] font-bold px-3 py-1.5 transition-colors cursor-pointer uppercase tracking-wider rounded-none"
          >
            Subscribe from €1
          </button>

          <button
            onClick={onOpenAuth}
            className="border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white text-[0.6875rem] font-bold px-2.5 py-1.5 transition-colors cursor-pointer uppercase tracking-wider rounded-none"
          >
            Log in
          </button>
        </div>
      </div>

      {/* 2. LE MONDE MASTHEAD */}
      <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col items-center justify-center text-center">
        <button
          onClick={() => onSelectCategory('All')}
          className="inline-flex items-baseline justify-center group focus:outline-none cursor-pointer"
          aria-label="Le Monde in English - Home"
        >
          <span
            style={{ fontFamily: '"UnifrakturMaguntia", serif' }}
            className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1a1a1a] select-none leading-none group-hover:opacity-90 transition-opacity"
          >
            Le Monde
          </span>
          <span className="ml-2.5 sm:ml-3 text-xl sm:text-2xl md:text-3xl font-serif italic font-light text-[#555555] select-none">
            in English
          </span>
        </button>

        <p className="mt-1.5 text-[0.625rem] sm:text-[0.6875rem] font-sans uppercase tracking-[0.18em] text-[#737373]">
          The international edition of France’s newspaper of record
        </p>
      </div>

      {/* 3. REFINED HAIRLINE DOUBLE RULE */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="border-t border-b border-[#1a1a1a] py-0.5" />
      </div>

      {/* 4. PRIMARY SECTIONS NAVIGATION */}
      <nav className="w-full max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between overflow-x-auto text-[0.75rem] font-sans font-semibold border-b border-[#E5E5E5] no-scrollbar">
        <div className="flex items-center space-x-6 sm:space-x-7 whitespace-nowrap py-1">
          {sections.map(({ label, cat }) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`cursor-pointer transition-colors pb-0.5 uppercase tracking-wide ${
                currentCategory === cat
                  ? 'text-[#1a1a1a] border-b-2 border-[#1a1a1a] font-bold'
                  : 'text-[#555555] hover:text-[#1a1a1a]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};
