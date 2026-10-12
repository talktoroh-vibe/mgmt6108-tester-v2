import React, { useState } from 'react';
import { ARTICLES, LIVE_DISPATCHES } from './data/articles';
import { Article, AudioTrack, Category } from './types';
import { Header } from './components/Header';
import { LiveBanner } from './components/LiveBanner';
import { MidtermTracker } from './components/MidtermTracker';
import { GamesWidget } from './components/GamesWidget';
import { AudioPodcastsWidget } from './components/AudioPodcastsWidget';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { GamesModal } from './components/GamesModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { BookmarksModal } from './components/BookmarksModal';
import { SearchModal } from './components/SearchModal';
import { SubscribeModal } from './components/SubscribeModal';
import { AuthModal } from './components/AuthModal';
import { MarketWeatherModal } from './components/MarketWeatherModal';
import { TodaysPaperModal } from './components/TodaysPaperModal';

export default function App() {
  // Navigation & Filtering
  const [currentCategory, setCurrentCategory] = useState<Category | 'All'>('All');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentEdition, setCurrentEdition] = useState<string>('EN');

  // Modals & Drawers
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [activeGame, setActiveGame] = useState<'wordle' | 'connections' | 'spellingbee' | 'mini' | null>(null);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [marketWeatherTab, setMarketWeatherTab] = useState<'market' | 'weather' | null>(null);
  const [showTodaysPaper, setShowTodaysPaper] = useState(false);

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  // Audio Player State
  const [currentAudio, setCurrentAudio] = useState<AudioTrack | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleBookmark = (article: Article) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === article.id);
      if (exists) {
        return prev.filter((b) => b.id !== article.id);
      } else {
        return [...prev, article];
      }
    });
  };

  const playPodcastTrack = (track: AudioTrack) => {
    if (currentAudio?.id === track.id) {
      setIsPlayingAudio(!isPlayingAudio);
    } else {
      setCurrentAudio(track);
      setIsPlayingAudio(true);
    }
  };

  const playArticleAudio = (article: Article) => {
    const track: AudioTrack = {
      id: `audio-${article.id}`,
      title: article.title,
      show: 'LE MONDE AUDIO',
      host: `Reported by ${article.byline}`,
      duration: article.readTime,
      description: article.deck,
      date: article.publishDate,
      accentColor: '#1a1a1a'
    };
    setCurrentAudio(track);
    setIsPlayingAudio(true);
  };

  // Filter articles based on Department or Topic
  const isFiltering = currentCategory !== 'All' || selectedTopic !== null;

  const filteredArticles = ARTICLES.filter((art) => {
    if (currentCategory !== 'All' && art.category !== currentCategory) {
      return false;
    }
    if (selectedTopic) {
      const topicLower = selectedTopic.toLowerCase();
      const match =
        art.title.toLowerCase().includes(topicLower) ||
        art.deck.toLowerCase().includes(topicLower) ||
        (art.kicker && art.kicker.toLowerCase().includes(topicLower)) ||
        (art.subCategory && art.subCategory.toLowerCase().includes(topicLower)) ||
        (art.city && art.city.toLowerCase().includes(topicLower));
      if (!match) return false;
    }
    return true;
  });

  // Story lookups from the dataset
  const leadStory = ARTICLES.find((a) => a.id === 'elysee-european-security-summit') || ARTICLES[0];
  const assemblyStory = ARTICLES.find((a) => a.id === 'french-national-assembly-budget') || ARTICLES[1];
  const glacierStory = ARTICLES.find((a) => a.id === 'chamonix-glaciers-climate-emergency') || ARTICLES[2];
  const cannesStory = ARTICLES.find((a) => a.id === 'cannes-french-cinema-auteur-tradition') || ARTICLES[3];
  const investigationStory = ARTICLES.find((a) => a.id === 'investigation-european-luxury-supply-chains') || ARTICLES[4];
  const opinion1 = ARTICLES.find((a) => a.id === 'opinion-alain-frachon-strategic-autonomy') || ARTICLES[5];
  const opinion2 = ARTICLES.find((a) => a.id === 'opinion-sylvie-kauffmann-eastern-europe-pivot') || ARTICLES[6];
  const notreDameStory = ARTICLES.find((a) => a.id === 'notre-dame-cathedral-living-heritage') || ARTICLES[7];
  const ecbStory = ARTICLES.find((a) => a.id === 'ecb-frankfurt-growth-monetary-policy') || ARTICLES[8];
  const sportsStory = ARTICLES.find((a) => a.id === 'sports-french-football-academies-future') || ARTICLES[9];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1a1a1a] flex flex-col font-serif selection:bg-[#fff0a6] selection:text-black">
      {/* ==================== HEADER ==================== */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setSelectedTopic(null);
        }}
        onOpenSearch={() => setShowSearch(true)}
        onOpenBookmarks={() => setShowBookmarks(true)}
        onOpenAuth={() => setShowAuth(true)}
        onOpenSubscribe={() => setShowSubscribe(true)}
        onOpenMarketWeather={(tab) => setMarketWeatherTab(tab)}
        onOpenTodaysPaper={() => setShowTodaysPaper(true)}
        bookmarksCount={bookmarks.length}
        currentEdition={currentEdition}
        onSelectEdition={(ed) => setCurrentEdition(ed)}
      />

      {/* ==================== EN DIRECT / LIVE BANNER ==================== */}
      <LiveBanner onOpenLiveStory={() => setReadingArticle(leadStory)} />

      {/* ==================== MAIN BROADSHEET CANVAS ==================== */}
      <main className="w-full max-w-7xl mx-auto px-4 py-6 flex-1">
        {/* Top Sub-Navigation Quick Topics (À la une) */}
        <div className="flex items-center space-x-3 pb-3 mb-6 border-b border-[#E5E5E5] text-[0.6875rem] font-sans overflow-x-auto text-[#666] no-scrollbar">
          <span className="font-bold text-[#1a1a1a] uppercase tracking-wider shrink-0">
            In the news
          </span>
          <span className="text-[#E5E5E5]">|</span>
          {[
            'European Security',
            'French Assembly',
            'Chamonix Glaciers',
            'Cannes Cinema',
            'ECB Frankfurt',
            'Luxury Investigation'
          ].map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
              className={`whitespace-nowrap transition-colors cursor-pointer ${
                selectedTopic === topic
                  ? 'text-[#1a1a1a] font-bold border-b border-[#1a1a1a]'
                  : 'hover:text-[#1a1a1a]'
              }`}
            >
              {topic}
            </button>
          ))}
          {selectedTopic && (
            <button
              onClick={() => setSelectedTopic(null)}
              className="text-[#c51118] font-bold hover:underline ml-2 cursor-pointer shrink-0"
            >
              ✕ Clear Filter
            </button>
          )}
        </div>

        {/* ================= FILTERED VIEW (IF CATEGORY OR TOPIC SELECTED) ================= */}
        {isFiltering ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#1a1a1a] pb-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1a1a1a]">
                {selectedTopic ? `Topic: ${selectedTopic}` : `${currentCategory} Coverage`}
              </h2>
              <button
                onClick={() => {
                  setCurrentCategory('All');
                  setSelectedTopic(null);
                }}
                className="text-xs font-sans text-[#1a1a1a] hover:underline font-bold cursor-pointer"
              >
                ← Return to Front Page
              </button>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="py-16 text-center text-[#666] font-sans">
                <p className="text-lg font-serif">No articles currently published in this section.</p>
                <button
                  onClick={() => {
                    setCurrentCategory('All');
                    setSelectedTopic(null);
                  }}
                  className="mt-3 bg-[#1a1a1a] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  View All Front Page Stories
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => setReadingArticle(art)}
                    className="border border-[#E5E5E5] p-4 hover:shadow-xs transition-shadow cursor-pointer space-y-3 flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      {art.imageUrl && (
                        <div className="overflow-hidden bg-[#FAF8F5]">
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="w-full h-44 object-cover border border-[#E5E5E5] group-hover:scale-[1.01] transition-transform duration-200"
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between text-[0.625rem] font-sans font-bold uppercase tracking-wider text-[#666]">
                        <div className="flex items-center space-x-1.5">
                          <span className={art.kickerHighlight ? 'text-[#c51118]' : 'text-[#1a1a1a]'}>
                            {art.kicker || art.category}
                          </span>
                          {art.isSubscriberOnly && (
                            <span className="bg-[#FFF9DB] text-[#855B00] px-1 py-0.2 border border-[#F0D680]">
                              Subscriber
                            </span>
                          )}
                        </div>
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-[#1a1a1a] group-hover:underline leading-snug">
                        {art.title}
                      </h3>
                      <p className="font-serif text-xs text-[#444] line-clamp-3 leading-relaxed">
                        {art.deck}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between text-[0.6875rem] font-sans text-[#666]">
                      <span>By {art.byline}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(art);
                        }}
                        className="hover:text-black p-1 cursor-pointer"
                        title="Save article"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {bookmarks.some((b) => b.id === art.id) ? 'bookmark_added' : 'bookmark'}
                        </span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ================= CLASSIC LE MONDE FRONT PAGE BROADSHEET ================= */
          <div className="space-y-12">
            {/* ================= 1. HERO LEAD PACKAGE & CONTINUOUS WIRE ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-8">
              {/* LEFT & CENTER: THE LEAD STORY & SECONDARY FEATURES (Cols 1-8) */}
              <div className="lg:col-span-8 space-y-8 rule-gutter-right pr-0 lg:pr-8">
                {/* Major Lead Story Unit */}
                <article className="space-y-3 pb-8 border-b border-[#E5E5E5]">
                  <div className="flex items-center justify-between text-[0.6875rem] font-sans uppercase text-[#666]">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#1a1a1a] font-bold tracking-wider">
                        {leadStory.kicker} · {leadStory.subCategory}
                      </span>
                      {leadStory.isSubscriberOnly && (
                        <span className="bg-[#FFF9DB] text-[#855B00] font-bold text-[0.625rem] px-1.5 py-0.5 border border-[#F0D680]">
                          RESERVED FOR SUBSCRIBERS
                        </span>
                      )}
                    </div>
                    <span>{leadStory.readTime}</span>
                  </div>

                  <h1
                    onClick={() => setReadingArticle(leadStory)}
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    className="text-3xl sm:text-4xl md:text-[2.65rem] font-bold leading-[1.15] text-[#1a1a1a] hover:underline cursor-pointer"
                  >
                    {leadStory.title}
                  </h1>

                  {/* High Impact Lead Photojournalism Image */}
                  <div
                    onClick={() => setReadingArticle(leadStory)}
                    className="relative overflow-hidden bg-[#FAF8F5] cursor-pointer group border border-[#E5E5E5]"
                  >
                    <img
                      className="w-full h-80 sm:h-96 object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      alt={leadStory.imageAlt}
                      src={leadStory.imageUrl}
                    />
                    <div className="p-1.5 text-right text-[0.625rem] font-sans text-[#777] bg-white border-t border-[#E5E5E5]">
                      {leadStory.imageCredit}
                    </div>
                  </div>

                  <p className="text-base sm:text-lg font-serif text-[#222] leading-relaxed">
                    {leadStory.deck}
                  </p>

                  <div className="pt-2 text-[0.6875rem] font-sans text-[#666] flex items-center justify-between border-t border-[#E5E5E5]">
                    <span>
                      By <strong className="text-[#1a1a1a]">{leadStory.byline}</strong> in {leadStory.city}
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => playArticleAudio(leadStory)}
                        className="hover:text-black flex items-center space-x-1 cursor-pointer"
                        title="Listen to story"
                      >
                        <span className="material-symbols-outlined text-sm">volume_up</span>
                        <span className="font-semibold uppercase text-[0.625rem]">Listen (7m)</span>
                      </button>
                      <button
                        onClick={() => toggleBookmark(leadStory)}
                        className="hover:text-black cursor-pointer p-0.5"
                        title="Bookmark story"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {bookmarks.some((b) => b.id === leadStory.id) ? 'bookmark_added' : 'bookmark'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Related Links */}
                  <div className="pt-2 space-y-1.5 font-sans text-xs">
                    {leadStory.relatedLinks?.map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => setReadingArticle(leadStory)}
                        className="block text-[#1a1a1a] hover:underline font-semibold text-left cursor-pointer"
                      >
                        <span className="text-[#c51118] mr-1">›</span> {link.title}
                      </button>
                    ))}
                  </div>
                </article>

                {/* Sub-Lead 2-Column Grid: French Politics & Environment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                  {/* French National Assembly Story */}
                  <article
                    onClick={() => setReadingArticle(assemblyStory)}
                    className="space-y-2.5 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="overflow-hidden border border-[#E5E5E5]">
                        <img
                          src={assemblyStory.imageUrl}
                          alt={assemblyStory.title}
                          className="w-full h-44 object-cover group-hover:scale-[1.01] transition-transform duration-200"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[0.625rem] font-sans text-[#666]">
                        <span className="font-bold uppercase tracking-wider text-[#1a1a1a]">
                          {assemblyStory.kicker}
                        </span>
                        <span className="bg-[#FFF9DB] text-[#855B00] px-1 font-bold border border-[#F0D680]">
                          Subscriber
                        </span>
                      </div>
                      <h3
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                        className="text-xl font-bold text-[#1a1a1a] group-hover:underline leading-snug"
                      >
                        {assemblyStory.title}
                      </h3>
                      <p className="text-xs font-serif text-[#444] line-clamp-3 leading-relaxed">
                        {assemblyStory.deck}
                      </p>
                    </div>
                    <div className="text-[0.6875rem] font-sans text-[#777] pt-2 border-t border-[#E5E5E5]">
                      By {assemblyStory.byline} in {assemblyStory.city} · {assemblyStory.readTime}
                    </div>
                  </article>

                  {/* Chamonix Glaciers Story */}
                  <article
                    onClick={() => setReadingArticle(glacierStory)}
                    className="space-y-2.5 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="overflow-hidden border border-[#E5E5E5]">
                        <img
                          src={glacierStory.imageUrl}
                          alt={glacierStory.title}
                          className="w-full h-44 object-cover group-hover:scale-[1.01] transition-transform duration-200"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[0.625rem] font-sans text-[#666]">
                        <span className="font-bold uppercase tracking-wider text-[#c51118]">
                          {glacierStory.kicker}
                        </span>
                        <span>{glacierStory.readTime}</span>
                      </div>
                      <h3
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                        className="text-xl font-bold text-[#1a1a1a] group-hover:underline leading-snug"
                      >
                        {glacierStory.title}
                      </h3>
                      <p className="text-xs font-serif text-[#444] line-clamp-3 leading-relaxed">
                        {glacierStory.deck}
                      </p>
                    </div>
                    <div className="text-[0.6875rem] font-sans text-[#777] pt-2 border-t border-[#E5E5E5]">
                      By {glacierStory.byline} in {glacierStory.city} · {glacierStory.readTime}
                    </div>
                  </article>
                </div>
              </div>

              {/* RIGHT RAIL: "EN CONTINU" CONTINUOUS NEWS WIRE & BAROMETER (Cols 9-12) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Continuous Wire Feed Box */}
                <div className="border border-[#E5E5E5] bg-[#FAF8F5] p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#c51118]" />
                      <span className="text-[0.6875rem] font-sans uppercase font-bold tracking-widest text-[#1a1a1a]">
                        EN CONTINU · THE LATEST
                      </span>
                    </div>
                    <span className="text-[0.625rem] font-sans text-[#666] font-medium">Paris Time (CET)</span>
                  </div>

                  {/* Wire Items */}
                  <div className="divide-y divide-[#E5E5E5]">
                    {LIVE_DISPATCHES.map((item, index) => (
                      <article
                        key={index}
                        onClick={() => setReadingArticle(leadStory)}
                        className="py-3 hover:bg-[#F3F0EA] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center space-x-2 text-[0.625rem] font-sans text-[#666] mb-1">
                          <span className="font-mono font-bold text-[#1a1a1a]">{item.time}</span>
                          <span>·</span>
                          <span className="uppercase tracking-wider font-semibold">{item.category}</span>
                          {item.isImportant && (
                            <span className="text-[#c51118] font-bold">Important</span>
                          )}
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-[#1a1a1a] group-hover:underline leading-snug">
                          {item.title}
                        </h4>
                      </article>
                    ))}
                  </div>

                  <button
                    onClick={() => setReadingArticle(leadStory)}
                    className="w-full text-center text-xs font-sans font-bold text-[#1a1a1a] hover:underline pt-1 cursor-pointer block"
                  >
                    View complete 24h wire feed ›
                  </button>
                </div>

                {/* French National Assembly Barometer Widget */}
                <MidtermTracker />

                {/* Quick Podcast Audio Widget */}
                <AudioPodcastsWidget
                  onPlayTrack={playPodcastTrack}
                  onOpenAllPodcasts={() => setCurrentCategory('Podcasts')}
                  currentTrackId={currentAudio?.id}
                  isPlaying={isPlayingAudio}
                />
              </div>
            </div>

            {/* ================= 2. GRANDES ENQUÊTES / IN-DEPTH INVESTIGATION ================= */}
            <section className="border-t-2 border-[#1a1a1a] pt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2">
                <div className="flex items-center space-x-3">
                  <span className="bg-[#1a1a1a] text-white text-[0.6875rem] font-sans uppercase font-bold tracking-widest px-2.5 py-0.5">
                    GRANDES ENQUÊTES
                  </span>
                  <span className="font-serif italic text-sm text-[#555]">
                    Le Monde Investigative Journalism
                  </span>
                </div>
                <span className="text-xs font-sans text-[#855B00] font-bold uppercase tracking-wider">
                  Subscriber Special
                </span>
              </div>

              <div
                onClick={() => setReadingArticle(investigationStory)}
                className="bg-[#FAF8F5] border border-[#E5E5E5] p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center cursor-pointer hover:bg-[#F5F2EA] transition-colors group"
              >
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-sans uppercase tracking-wider text-[#666]">
                    <span className="font-bold text-[#1a1a1a]">{investigationStory.kicker}</span>
                    <span>·</span>
                    <span>{investigationStory.readTime}</span>
                  </div>
                  <h2
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a] group-hover:underline leading-tight"
                  >
                    {investigationStory.title}
                  </h2>
                  <p className="text-sm sm:text-base font-serif text-[#333] leading-relaxed">
                    {investigationStory.deck}
                  </p>
                  <div className="text-xs font-sans text-[#666] pt-1">
                    By <strong className="text-[#1a1a1a]">{investigationStory.byline}</strong> · {investigationStory.city}
                  </div>
                </div>

                <div className="lg:col-span-4 border-l-0 lg:border-l border-[#E5E5E5] pl-0 lg:pl-6 space-y-3">
                  <span className="text-[0.6875rem] font-sans uppercase font-bold tracking-widest text-[#855B00] block">
                    Key Investigation Takeaways
                  </span>
                  <ul className="space-y-2 text-xs font-serif text-[#444]">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#c51118] font-bold">›</span>
                      <span>Extensive documentation of subcontracting chains across Tuscany and Grasse</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#c51118] font-bold">›</span>
                      <span>Impact of new European Union mandatory corporate diligence directives</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#c51118] font-bold">›</span>
                      <span>The economic reality behind traditional artisanal heritage claims</span>
                    </li>
                  </ul>
                  <span className="text-xs font-sans font-bold text-[#1a1a1a] group-hover:underline block pt-1">
                    Read the complete 6-month report ›
                  </span>
                </div>
              </div>
            </section>

            {/* ================= 3. OPINIONS & EUROPEAN DEBATES ================= */}
            <section className="border-t-2 border-[#1a1a1a] pt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-serif font-bold text-[#1a1a1a]">
                    Opinions & European Debates
                  </span>
                  <span className="text-[#E5E5E5]">|</span>
                  <span className="text-xs font-sans text-[#666]">
                    Analysis from France's foremost thinkers and editors
                  </span>
                </div>
                <button
                  onClick={() => setCurrentCategory('Opinion')}
                  className="text-xs font-sans font-bold text-[#1a1a1a] hover:underline cursor-pointer"
                >
                  All Opinions ›
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1: Alain Frachon */}
                <article
                  onClick={() => setReadingArticle(opinion1)}
                  className="p-6 bg-[#FAF8F5] border border-[#E5E5E5] space-y-3 cursor-pointer hover:bg-[#F5F2EA] transition-colors group flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-3">
                      {opinion1.authorAvatar && (
                        <img
                          src={opinion1.authorAvatar}
                          alt={opinion1.byline}
                          className="w-12 h-12 rounded-full object-cover border border-[#E5E5E5]"
                        />
                      )}
                      <div>
                        <span className="block font-bold text-sm font-sans text-[#1a1a1a]">
                          {opinion1.byline}
                        </span>
                        <span className="text-[0.6875rem] font-sans text-[#777]">
                          {opinion1.authorRole}
                        </span>
                      </div>
                    </div>

                    <h3
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                      className="text-xl sm:text-2xl font-bold text-[#1a1a1a] group-hover:underline leading-snug pt-1"
                    >
                      {opinion1.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-serif text-[#444] leading-relaxed">
                      {opinion1.deck}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-sans text-[#666]">
                    <span className="italic font-serif">« Strategic autonomy is not an option; it is survival »</span>
                    <span className="font-bold text-[#1a1a1a] group-hover:underline">Read column ›</span>
                  </div>
                </article>

                {/* Column 2: Sylvie Kauffmann */}
                <article
                  onClick={() => setReadingArticle(opinion2)}
                  className="p-6 bg-[#FAF8F5] border border-[#E5E5E5] space-y-3 cursor-pointer hover:bg-[#F5F2EA] transition-colors group flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center font-serif text-lg font-bold">
                        SK
                      </div>
                      <div>
                        <span className="block font-bold text-sm font-sans text-[#1a1a1a]">
                          {opinion2.byline}
                        </span>
                        <span className="text-[0.6875rem] font-sans text-[#777]">
                          {opinion2.authorRole}
                        </span>
                      </div>
                    </div>

                    <h3
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                      className="text-xl sm:text-2xl font-bold text-[#1a1a1a] group-hover:underline leading-snug pt-1"
                    >
                      {opinion2.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-serif text-[#444] leading-relaxed">
                      {opinion2.deck}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-sans text-[#666]">
                    <span className="italic font-serif">« The moral center of gravity has shifted East »</span>
                    <span className="font-bold text-[#1a1a1a] group-hover:underline">Read analysis ›</span>
                  </div>
                </article>
              </div>
            </section>

            {/* ================= 4. CULTURE, CINEMA & HERITAGE ================= */}
            <section className="border-t-2 border-[#1a1a1a] pt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-serif font-bold text-[#1a1a1a]">
                    Culture & French Art de Vivre
                  </span>
                  <span className="text-[#E5E5E5]">|</span>
                  <span className="text-xs font-sans text-[#666]">
                    Cinema, literature, heritage, and lifestyle
                  </span>
                </div>
                <button
                  onClick={() => setCurrentCategory('Culture')}
                  className="text-xs font-sans font-bold text-[#1a1a1a] hover:underline cursor-pointer"
                >
                  More Culture ›
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Story 1: Cannes Film Festival & French Cinema */}
                <article
                  onClick={() => setReadingArticle(cannesStory)}
                  className="border border-[#E5E5E5] p-4 space-y-3 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="overflow-hidden bg-[#FAF8F5]">
                      <img
                        src={cannesStory.imageUrl}
                        alt={cannesStory.title}
                        className="w-full h-48 object-cover group-hover:scale-[1.01] transition-transform duration-200"
                      />
                    </div>
                    <span className="text-[0.625rem] font-sans font-bold uppercase tracking-wider text-[#1a1a1a] block">
                      {cannesStory.kicker} · {cannesStory.city}
                    </span>
                    <h4
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                      className="text-lg font-bold text-[#1a1a1a] group-hover:underline leading-snug"
                    >
                      {cannesStory.title}
                    </h4>
                    <p className="text-xs font-serif text-[#555] line-clamp-3 leading-relaxed">
                      {cannesStory.deck}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E5E5E5] text-[0.6875rem] font-sans text-[#777]">
                    By {cannesStory.byline} · {cannesStory.readTime}
                  </div>
                </article>

                {/* Story 2: Notre-Dame Woodcraft Legacy */}
                <article
                  onClick={() => setReadingArticle(notreDameStory)}
                  className="border border-[#E5E5E5] p-4 space-y-3 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[0.625rem] font-sans font-bold uppercase tracking-wider text-[#855B00] block">
                      HERITAGE & CRAFTSMANSHIP · PARIS
                    </span>
                    <h4
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                      className="text-lg font-bold text-[#1a1a1a] group-hover:underline leading-snug"
                    >
                      {notreDameStory.title}
                    </h4>
                    <p className="text-xs font-serif text-[#555] line-clamp-4 leading-relaxed">
                      {notreDameStory.deck}
                    </p>
                    <blockquote className="font-serif italic text-xs text-[#333] pt-2 border-l-2 border-[#1a1a1a] pl-2.5">
                      « We reconnected modern society with the humility and eternity of ancient craftsmanship. »
                    </blockquote>
                  </div>
                  <div className="pt-2 border-t border-[#E5E5E5] text-[0.6875rem] font-sans text-[#777]">
                    By {notreDameStory.byline} · {notreDameStory.readTime}
                  </div>
                </article>

                {/* Games Widget */}
                <div>
                  <GamesWidget onPlayGame={(g) => setActiveGame(g)} />
                </div>
              </div>
            </section>

            {/* ================= 5. ECONOMY & SPORTS BRIEFING ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t-2 border-[#1a1a1a] pt-6">
              {/* Economy Story */}
              <article
                onClick={() => setReadingArticle(ecbStory)}
                className="p-4 border border-[#E5E5E5] space-y-2 cursor-pointer group hover:bg-[#FAF8F5] transition-colors"
              >
                <div className="flex items-center justify-between text-[0.625rem] font-sans text-[#666]">
                  <span className="font-bold uppercase tracking-wider text-[#1a1a1a]">{ecbStory.kicker}</span>
                  <span>{ecbStory.readTime}</span>
                </div>
                <h4
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-lg font-bold text-[#1a1a1a] group-hover:underline leading-snug"
                >
                  {ecbStory.title}
                </h4>
                <p className="text-xs font-serif text-[#555] leading-relaxed">
                  {ecbStory.deck}
                </p>
                <span className="text-[0.6875rem] font-sans text-[#777] block pt-1">
                  By {ecbStory.byline} in {ecbStory.city}
                </span>
              </article>

              {/* Sports Story */}
              <article
                onClick={() => setReadingArticle(sportsStory)}
                className="p-4 border border-[#E5E5E5] space-y-2 cursor-pointer group hover:bg-[#FAF8F5] transition-colors"
              >
                <div className="flex items-center justify-between text-[0.625rem] font-sans text-[#666]">
                  <span className="font-bold uppercase tracking-wider text-[#1a1a1a]">{sportsStory.kicker}</span>
                  <span>{sportsStory.readTime}</span>
                </div>
                <h4
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-lg font-bold text-[#1a1a1a] group-hover:underline leading-snug"
                >
                  {sportsStory.title}
                </h4>
                <p className="text-xs font-serif text-[#555] leading-relaxed">
                  {sportsStory.deck}
                </p>
                <span className="text-[0.6875rem] font-sans text-[#777] block pt-1">
                  By {sportsStory.byline} in {sportsStory.city}
                </span>
              </article>
            </div>

            {/* ================= 6. SUBSCRIBER CALLOUT BANNER ================= */}
            <div className="bg-[#FFF9DB] border border-[#F0D680] p-6 text-center space-y-3">
              <span className="text-[0.6875rem] font-sans font-bold uppercase tracking-widest text-[#855B00] block">
                Independent Journalism from Paris to the World
              </span>
              <h3
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]"
              >
                Subscribe to Le Monde in English from €1 / month
              </h3>
              <p className="max-w-2xl mx-auto text-xs sm:text-sm font-serif text-[#444] leading-relaxed">
                Enjoy unlimited digital access to French and European investigative reporting, translated daily by professional journalists. No commitment, cancel anytime.
              </p>
              <button
                onClick={() => setShowSubscribe(true)}
                className="inline-block bg-[#1a1a1a] hover:bg-[#333] text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 transition-colors cursor-pointer"
              >
                Subscribe from €1
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ==================== FOOTER ==================== */}
      <Footer onSelectCategory={(cat) => setCurrentCategory(cat)} />

      {/* ==================== PERSISTENT AUDIO PLAYER BAR ==================== */}
      <AudioPlayerBar
        track={currentAudio}
        isPlaying={isPlayingAudio}
        onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
        onClose={() => {
          setIsPlayingAudio(false);
          setCurrentAudio(null);
        }}
      />

      {/* ==================== MODALS ==================== */}
      <ArticleModal
        article={readingArticle}
        onClose={() => setReadingArticle(null)}
        isBookmarked={readingArticle ? bookmarks.some((b) => b.id === readingArticle.id) : false}
        onToggleBookmark={toggleBookmark}
        onPlayArticleAudio={playArticleAudio}
      />

      {activeGame && (
        <GamesModal
          initialGame={activeGame}
          onClose={() => setActiveGame(null)}
        />
      )}

      {showBookmarks && (
        <BookmarksModal
          bookmarks={bookmarks}
          onClose={() => setShowBookmarks(false)}
          onSelectArticle={(art) => {
            setReadingArticle(art);
            setShowBookmarks(false);
          }}
          onRemoveBookmark={(id) => setBookmarks((prev) => prev.filter((b) => b.id !== id))}
          onClearAll={() => setBookmarks([])}
        />
      )}

      {showSearch && (
        <SearchModal
          articles={ARTICLES}
          onClose={() => setShowSearch(false)}
          onSelectArticle={(art) => {
            setReadingArticle(art);
            setShowSearch(false);
          }}
        />
      )}

      {showSubscribe && (
        <SubscribeModal onClose={() => setShowSubscribe(false)} />
      )}

      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} />
      )}

      {marketWeatherTab && (
        <MarketWeatherModal
          initialTab={marketWeatherTab}
          onClose={() => setMarketWeatherTab(null)}
        />
      )}

      {showTodaysPaper && (
        <TodaysPaperModal
          articles={ARTICLES}
          onClose={() => setShowTodaysPaper(false)}
          onSelectArticle={(art) => {
            setReadingArticle(art);
            setShowTodaysPaper(false);
          }}
        />
      )}
    </div>
  );
}
