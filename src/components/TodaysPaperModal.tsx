import React from 'react';
import { Article } from '../types';

interface TodaysPaperModalProps {
  articles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const TodaysPaperModal: React.FC<TodaysPaperModalProps> = ({
  articles,
  onClose,
  onSelectArticle
}) => {
  const sections = [
    { name: 'Cahier 1: International & European Affairs', filter: (a: Article) => a.category === 'International' },
    { name: 'Cahier 2: France & National Politics', filter: (a: Article) => a.category === 'France' },
    { name: 'Cahier 3: Economy & Ecological Transition', filter: (a: Article) => a.category === 'Economy' || a.category === 'Environment' },
    { name: 'Cahier 4: Culture, Ideas & Opinions', filter: (a: Article) => a.category === 'Culture' || a.category === 'Opinion' || a.category === 'Society' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#1a1a1a] max-w-3xl w-full p-6 space-y-6 max-h-[88vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-start border-b border-[#1a1a1a] pb-4">
          <div>
            <div className="flex items-baseline space-x-2">
              <span
                style={{ fontFamily: '"UnifrakturMaguntia", serif' }}
                className="text-2xl text-[#1a1a1a]"
              >
                Le Monde
              </span>
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#855B00]">
                L’Édition du Jour (Digital Replica)
              </span>
            </div>
            <h3
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-1"
            >
              Today’s Paper — Monday, October 12, 2026
            </h3>
            <p className="text-xs font-sans text-[#666]">
              Issue No. 24,812 · Available daily from 2:00 PM CET in Paris
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#1a1a1a] hover:text-[#666] text-xl font-bold p-1 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {sections.map((sec) => {
            const secArticles = articles.filter(sec.filter);
            return (
              <div key={sec.name} className="space-y-2">
                <div className="border-b border-[#1a1a1a] pb-1">
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#1a1a1a]">{sec.name}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {secArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => onSelectArticle(art)}
                      className="border border-[#E5E5E5] p-3 hover:bg-[#FAF8F5] transition-colors cursor-pointer space-y-1 group"
                    >
                      <div className="flex items-center justify-between text-[0.625rem] font-sans text-[#666]">
                        <span className="font-bold text-[#1a1a1a] uppercase">{art.kicker || art.category}</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h5 className="font-serif font-bold text-sm text-[#1a1a1a] group-hover:underline line-clamp-2 leading-snug">
                        {art.title}
                      </h5>
                      <p className="text-[0.6875rem] font-serif text-[#555] line-clamp-2 leading-relaxed">
                        {art.deck}
                      </p>
                      <div className="text-[0.625rem] font-sans text-[#777] pt-1">
                        By {art.byline}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-[#E5E5E5] pt-4 flex justify-between items-center text-xs font-sans text-[#666]">
          <span>Full PDF replica download available for digital subscribers</span>
          <button
            onClick={onClose}
            className="bg-[#1a1a1a] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#333] cursor-pointer"
          >
            Back to Front Page
          </button>
        </div>
      </div>
    </div>
  );
};
