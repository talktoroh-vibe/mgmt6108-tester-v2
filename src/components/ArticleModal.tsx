import React, { useState } from 'react';
import { Article, Comment } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  onPlayArticleAudio?: (article: Article) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onPlayArticleAudio
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [showFrenchOriginal, setShowFrenchOriginal] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c-1',
      author: 'Antoine de Rochebrune',
      location: 'Paris, France',
      date: '2 hours ago',
      content: 'An exceptionally thorough analysis of European defense dynamics. The diplomatic friction between Paris and Berlin is captured with real nuance.',
      likes: 38
    },
    {
      id: 'c-2',
      author: 'Eleanor Vance',
      location: 'Oxford, UK',
      date: '3 hours ago',
      content: 'Crucial perspective from the Élysée that is rarely reported in English-language domestic media. Having this translated directly from Le Monde is invaluable.',
      likes: 24
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [showShareToast, setShowShareToast] = useState(false);

  if (!article) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: commentAuthor.trim() || 'Verified Subscriber',
      location: 'Brussels, Belgium',
      date: 'Just now',
      content: newCommentText.trim(),
      likes: 1
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white max-w-4xl w-full border border-[#1a1a1a] max-h-[92vh] overflow-y-auto relative my-auto shadow-2xl">
        {/* Sticky Utility Reading Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] px-4 sm:px-6 py-2.5 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <span
              style={{ fontFamily: '"UnifrakturMaguntia", serif' }}
              className="font-normal text-xl text-[#1a1a1a] hidden sm:inline"
            >
              Le Monde
            </span>
            <span className="text-xs font-serif italic text-[#666] hidden sm:inline">
              in English
            </span>
            <span className="text-[#E5E5E5] hidden sm:inline">|</span>
            <span className="text-xs font-sans text-[#666] uppercase tracking-wider">
              {article.category} {article.subCategory ? `› ${article.subCategory}` : ''}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-sans">
            {/* Font Size Adjuster */}
            <div className="flex items-center border border-[#E5E5E5] px-1.5 py-0.5 space-x-1">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1 font-bold ${fontSize === 'normal' ? 'text-[#1a1a1a]' : 'text-[#888]'}`}
                title="Standard font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1 font-bold text-sm ${fontSize === 'large' ? 'text-[#1a1a1a]' : 'text-[#888]'}`}
                title="Larger font size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-1 font-bold text-base ${fontSize === 'xlarge' ? 'text-[#1a1a1a]' : 'text-[#888]'}`}
                title="Extra large font size"
              >
                A++
              </button>
            </div>

            {/* Listen button */}
            {onPlayArticleAudio && (
              <button
                onClick={() => onPlayArticleAudio(article)}
                className="flex items-center space-x-1 px-2.5 py-1 border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors cursor-pointer"
                title="Listen to story"
              >
                <span className="material-symbols-outlined text-sm">volume_up</span>
                <span className="hidden md:inline font-bold uppercase tracking-wider text-[0.625rem]">
                  Listen
                </span>
              </button>
            )}

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article)}
              className={`p-1.5 border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                  : 'border-[#E5E5E5] text-[#1a1a1a] hover:bg-[#F5F5F5]'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Save article'}
            >
              <span className="material-symbols-outlined text-sm">
                {isBookmarked ? 'bookmark_added' : 'bookmark'}
              </span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 border border-[#E5E5E5] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
              title="Share article link"
            >
              <span className="material-symbols-outlined text-sm">share</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="text-[#1a1a1a] hover:text-[#666] p-1 font-bold text-xl cursor-pointer"
              aria-label="Close article"
            >
              ✕
            </button>
          </div>
        </div>

        {showShareToast && (
          <div className="bg-[#1a1a1a] text-white text-xs px-4 py-2 text-center font-sans">
            Link copied to clipboard
          </div>
        )}

        {/* Article Body */}
        <article className="p-6 sm:p-10 max-w-2xl mx-auto space-y-6">
          {/* Header Metadata */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-sans uppercase tracking-widest text-[#666]">
              <div className="flex items-center space-x-2">
                <span className={`font-bold ${article.kickerHighlight ? 'text-[#c51118]' : 'text-[#1a1a1a]'}`}>
                  {article.kicker || article.category}
                </span>
                {article.isSubscriberOnly && (
                  <span className="bg-[#FFF9DB] text-[#855B00] font-bold text-[0.625rem] px-1.5 py-0.5 tracking-wider border border-[#F0D680]">
                    SUBSCRIBER-ONLY
                  </span>
                )}
              </div>
              <span>{article.readTime}</span>
            </div>

            <h1
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#1a1a1a]"
            >
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl font-serif text-[#444] leading-relaxed">
              {article.deck}
            </p>

            <div className="pt-2 pb-4 border-b border-[#E5E5E5] flex items-center justify-between text-xs font-sans text-[#666]">
              <div>
                <span className="block font-bold text-[#1a1a1a]">
                  By {article.byline} {article.city ? `in ${article.city}` : ''}
                </span>
                {article.authorRole && <span className="block text-[#777]">{article.authorRole} · Le Monde</span>}
              </div>
              <time className="text-[#777]">{article.publishDate}</time>
            </div>
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <figure className="space-y-1.5">
              <img
                src={article.imageUrl}
                alt={article.imageAlt || article.title}
                className="w-full object-cover max-h-[460px] border border-[#E5E5E5]"
              />
              <figcaption className="text-xs font-sans text-[#666] flex justify-between">
                <span>{article.imageCredit || 'Le Monde'}</span>
              </figcaption>
            </figure>
          )}

          {/* Bilingual French Original Toggle */}
          {article.frenchExcerpt && (
            <div className="p-4 bg-[#FAF8F5] border border-[#E5E5E5] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[0.6875rem] font-sans font-bold uppercase tracking-wider text-[#855B00]">
                  Original French Text (Édition Française)
                </span>
                <button
                  onClick={() => setShowFrenchOriginal(!showFrenchOriginal)}
                  className="text-xs font-sans font-semibold text-[#1a1a1a] hover:underline cursor-pointer"
                >
                  {showFrenchOriginal ? 'Hide French excerpt' : 'Show original French'}
                </button>
              </div>
              {showFrenchOriginal && (
                <blockquote className="font-serif italic text-sm text-[#333] leading-relaxed pt-1 border-t border-[#E5E5E5]">
                  « {article.frenchExcerpt} »
                </blockquote>
              )}
            </div>
          )}

          {/* Main Paragraphs */}
          <div className={`space-y-4 font-serif text-[#1a1a1a] ${getFontSizeClass()}`}>
            {article.paragraphs.map((para, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 leading-relaxed'
                    : 'leading-relaxed'
                }
              >
                {para}
              </p>
            ))}
          </div>

          {/* Pull Quote */}
          {article.pullQuote && (
            <div className="my-8 py-6 border-t border-b border-[#1a1a1a] text-center space-y-2">
              <p className="font-serif italic text-xl sm:text-2xl text-[#1a1a1a] leading-relaxed">
                « {article.pullQuote} »
              </p>
              {article.pullQuoteAuthor && (
                <p className="text-xs font-sans uppercase tracking-widest text-[#666]">
                  — {article.pullQuoteAuthor}
                </p>
              )}
            </div>
          )}

          {/* Related Stories */}
          {article.relatedLinks && article.relatedLinks.length > 0 && (
            <div className="p-4 bg-[#F8F8F8] border border-[#E5E5E5] space-y-2">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#1a1a1a]">
                Read More on This Topic
              </h4>
              <ul className="space-y-1.5 text-xs font-sans">
                {article.relatedLinks.map((link, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-[#c51118] font-bold">›</span>
                    <span className="text-[#1a1a1a] hover:underline cursor-pointer font-medium">
                      {link.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Subscribers Signature Ribbon */}
          <div className="p-4 bg-[#FFF9DB] border border-[#F0D680] text-center space-y-2">
            <span className="text-xs font-sans uppercase font-bold tracking-wider text-[#855B00] block">
              Independent Journalism · Le Monde in English
            </span>
            <p className="text-xs font-serif text-[#1a1a1a]">
              Support 500 journalists in Paris and 50 correspondents around the world.
            </p>
            <span className="inline-block text-xs font-sans font-bold text-[#1a1a1a] underline cursor-pointer">
              Subscribe from €1 / month
            </span>
          </div>

          {/* Reader Comments Section */}
          <section className="pt-8 border-t border-[#E5E5E5] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-2xl text-[#1a1a1a]">
                Reader Comments ({comments.length})
              </h3>
              <span className="text-xs font-sans text-[#666]">Moderated community</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-3 bg-[#FAF8F5] p-4 border border-[#E5E5E5]">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Your Name / City"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="bg-white border border-[#E5E5E5] px-3 py-1.5 text-xs font-sans focus:outline-none focus:border-[#1a1a1a] flex-1"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Share your perspective on this analysis..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full bg-white border border-[#E5E5E5] p-3 text-xs font-sans focus:outline-none focus:border-[#1a1a1a]"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1a1a1a] hover:bg-[#333] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 transition-colors cursor-pointer"
                >
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="divide-y divide-[#E5E5E5] border-t border-[#E5E5E5]">
              {comments.map((comment) => (
                <div key={comment.id} className="py-4 space-y-1.5 font-sans">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1a1a1a]">{comment.author}</span>
                    <span className="text-[#888]">{comment.date}</span>
                  </div>
                  <p className="text-xs text-[#333] font-serif leading-relaxed">{comment.content}</p>
                  <div className="flex items-center space-x-1 text-[0.6875rem] text-[#666]">
                    <span className="material-symbols-outlined text-xs">thumb_up</span>
                    <span>{comment.likes} recommends</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};
