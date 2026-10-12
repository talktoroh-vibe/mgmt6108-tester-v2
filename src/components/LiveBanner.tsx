import React from 'react';

interface LiveBannerProps {
  onOpenLiveStory: () => void;
}

export const LiveBanner: React.FC<LiveBannerProps> = ({ onOpenLiveStory }) => {
  return (
    <aside
      onClick={onOpenLiveStory}
      className="w-full max-w-7xl mx-auto px-4 py-2 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FAFAFA] cursor-pointer hover:bg-[#F5F5F5] transition-colors"
      role="region"
      aria-label="Live continuous coverage"
    >
      <div className="flex items-center space-x-3 overflow-hidden">
        <span className="inline-flex items-center px-2 py-0.5 text-[0.625rem] font-bold tracking-widest bg-[#c51118] text-white uppercase shrink-0">
          EN DIRECT · LIVE
        </span>
        <span className="text-[0.6875rem] uppercase font-bold text-[#1a1a1a] tracking-wider hidden sm:inline shrink-0 font-sans">
          European Summit:
        </span>
        <p className="text-[0.75rem] truncate text-[#1a1a1a] font-serif hover:underline">
          Macron convenes allied leaders at the Élysée for emergency defense deliberations
        </p>
      </div>
      <div className="flex items-center space-x-2 text-[0.6875rem] text-[#666666] shrink-0 pl-2 font-sans">
        <span className="hidden md:inline">Updated 6m ago</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </div>
    </aside>
  );
};
