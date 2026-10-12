import React from 'react';
import { Article } from '../types';

interface BookmarksModalProps {
  bookmarks: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  bookmarks,
  onClose,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#1a1a1a] max-w-xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center border-b border-[#1a1a1a] pb-3">
          <div>
            <span className="text-[0.6875rem] font-sans uppercase font-bold text-[#855B00] tracking-wider block">
              Personal Reading List
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1a1a1a]">
              Saved Articles ({bookmarks.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#1a1a1a] hover:text-[#666] font-bold text-xl p-1 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {bookmarks.length === 0 ? (
          <div className="py-12 text-center space-y-2 font-sans">
            <span className="material-symbols-outlined text-4xl text-[#bbb]">bookmark_border</span>
            <p className="text-sm font-serif text-[#555]">Your reading list is currently empty.</p>
            <p className="text-xs text-[#888]">
              Bookmark stories throughout Le Monde in English to curate your reading queue.
            </p>
          </div>
        ) : (
          <div className="space-y-3 divide-y divide-[#E5E5E5]">
            {bookmarks.map((art) => (
              <div key={art.id} className="pt-3 flex items-start justify-between space-x-3">
                <div
                  onClick={() => onSelectArticle(art)}
                  className="space-y-1 cursor-pointer group flex-1"
                >
                  <span className="text-[0.625rem] font-sans font-bold uppercase tracking-wider text-[#666]">
                    {art.category} · {art.readTime}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#1a1a1a] group-hover:underline leading-snug">
                    {art.title}
                  </h4>
                  <p className="text-xs text-[#555] font-serif line-clamp-2 leading-relaxed">
                    {art.deck}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveBookmark(art.id)}
                  className="text-[#999] hover:text-[#c51118] p-1 cursor-pointer"
                  title="Remove from saved articles"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {bookmarks.length > 0 && (
          <div className="border-t border-[#E5E5E5] pt-3 flex justify-between items-center text-xs font-sans">
            <button
              onClick={onClearAll}
              className="text-[#c51118] hover:underline font-semibold cursor-pointer"
            >
              Clear all bookmarks
            </button>
            <button
              onClick={onClose}
              className="bg-[#1a1a1a] text-white px-4 py-2 font-bold uppercase tracking-wider hover:bg-[#333] cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
