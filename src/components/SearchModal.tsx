import React, { useState } from 'react';
import { Article } from '../types';

interface SearchModalProps {
  articles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  articles,
  onClose,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.deck.toLowerCase().includes(query.toLowerCase()) ||
          a.byline.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase()) ||
          (a.city && a.city.toLowerCase().includes(query.toLowerCase())) ||
          (a.kicker && a.kicker.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-12 sm:pt-20">
      <div className="bg-white border border-[#1a1a1a] max-w-2xl w-full p-6 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center space-x-2 border-b border-[#1a1a1a] pb-2">
          <span className="material-symbols-outlined text-2xl text-[#1a1a1a]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Le Monde in English: topics, journalists, cities..."
            className="w-full text-lg font-serif text-[#1a1a1a] placeholder:text-[#999] outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#999] hover:text-[#1a1a1a] text-sm cursor-pointer p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#1a1a1a] hover:text-[#666] text-xl font-bold p-1 cursor-pointer ml-2"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        {!query && (
          <div className="space-y-2 pt-2 font-sans text-xs">
            <span className="text-[#666] font-bold uppercase tracking-wider block">
              Suggested Topics & In-Depth Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'European Security',
                'National Assembly',
                'Chamonix Glaciers',
                'Cannes Cinema',
                'Alain Frachon',
                'Notre-Dame Restoration',
                'ECB Frankfurt',
                'Luxury Investigation'
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E5E5] text-[#1a1a1a] hover:bg-[#F0EDE6] transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="space-y-3 pt-2">
            <p className="text-xs font-sans text-[#666]">
              Found {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} matching "{query}"
            </p>

            {filtered.length === 0 ? (
              <div className="py-8 text-center text-[#666] font-serif">
                No matching articles found in Le Monde in English archive.
              </div>
            ) : (
              <div className="divide-y divide-[#E5E5E5] border-t border-[#E5E5E5]">
                {filtered.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="py-3 hover:bg-[#FAF8F5] p-2 cursor-pointer transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between text-[0.625rem] font-sans text-[#666]">
                      <span className="font-bold text-[#1a1a1a] uppercase">
                        {art.kicker || art.category}
                      </span>
                      <span>{art.readTime}</span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#1a1a1a] hover:underline">
                      {art.title}
                    </h4>
                    <p className="text-xs font-serif text-[#444] line-clamp-2">
                      {art.deck}
                    </p>
                    <div className="text-[0.6875rem] font-sans text-[#777]">
                      By {art.byline} {art.city ? `· ${art.city}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
