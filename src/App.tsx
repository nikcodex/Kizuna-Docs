import React, { useState, useMemo } from 'react';
import { INITIAL_BOTS, INITIAL_SERVERS, CATEGORIES } from './data/mockData';
import { BotItem, ServerItem, Review } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BotCard } from './components/BotCard';
import { ServerCard } from './components/ServerCard';
import { BotDetailModal } from './components/BotDetailModal';
import { SubmitBotModal } from './components/SubmitBotModal';
import { Footer } from './components/Footer';
import { 
  Sparkles, Flame, Shield, Compass, Bookmark, PlusCircle, 
  ArrowUpDown, Filter, ChevronRight, CheckCircle, Info, Heart
} from 'lucide-react';

export const App: React.FC = () => {
  // Primary state
  const [currentTab, setCurrentTab] = useState<'explore' | 'servers' | 'tags' | 'bookmarks' | 'add'>('explore');
  const [bots, setBots] = useState<BotItem[]>(() => {
    try {
      const saved = localStorage.getItem('topbots_bots_v2');
      return saved ? JSON.parse(saved) : INITIAL_BOTS;
    } catch (e) {
      return INITIAL_BOTS;
    }
  });
  const [servers, setServers] = useState<ServerItem[]>(() => {
    try {
      const saved = localStorage.getItem('topbots_servers_v2');
      return saved ? JSON.parse(saved) : INITIAL_SERVERS;
    } catch (e) {
      return INITIAL_SERVERS;
    }
  });

  // User state
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'votes' | 'rating' | 'servers' | 'recent'>('votes');
  
  // Interaction tracking (LocalStorage)
  const [bookmarkedBotIds, setBookmarkedBotIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('topbots_bookmarks_v2');
      return saved ? JSON.parse(saved) : ['kizuna-music'];
    } catch (e) {
      return ['kizuna-music'];
    }
  });

  const [votedBotIds, setVotedBotIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('topbots_voted_bots_v2');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [votedServerIds, setVotedServerIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('topbots_voted_servers_v2');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Modal states
  const [selectedBotModal, setSelectedBotModal] = useState<BotItem | null>(null);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  // Sync to local storage
  const saveBots = (newBots: BotItem[]) => {
    setBots(newBots);
    localStorage.setItem('topbots_bots_v2', JSON.stringify(newBots));
  };

  const handleToggleBookmark = (botId: string) => {
    let next: string[];
    if (bookmarkedBotIds.includes(botId)) {
      next = bookmarkedBotIds.filter((id) => id !== botId);
    } else {
      next = [...bookmarkedBotIds, botId];
    }
    setBookmarkedBotIds(next);
    localStorage.setItem('topbots_bookmarks_v2', JSON.stringify(next));
  };

  const handleVoteBot = (botId: string) => {
    if (votedBotIds.includes(botId)) return;
    const nextVoted = [...votedBotIds, botId];
    setVotedBotIds(nextVoted);
    localStorage.setItem('topbots_voted_bots_v2', JSON.stringify(nextVoted));

    const updated = bots.map((b) => {
      if (b.id === botId) {
        return {
          ...b,
          votes: b.votes + 1,
          monthlyVotes: b.monthlyVotes + 1,
        };
      }
      return b;
    });
    saveBots(updated);

    if (selectedBotModal && selectedBotModal.id === botId) {
      setSelectedBotModal({
        ...selectedBotModal,
        votes: selectedBotModal.votes + 1,
        monthlyVotes: selectedBotModal.monthlyVotes + 1
      });
    }
  };

  const handleVoteServer = (serverId: string) => {
    if (votedServerIds.includes(serverId)) return;
    const nextVoted = [...votedServerIds, serverId];
    setVotedServerIds(nextVoted);
    localStorage.setItem('topbots_voted_servers_v2', JSON.stringify(nextVoted));

    const updated = servers.map((s) => {
      if (s.id === serverId) {
        return { ...s, votes: s.votes + 1 };
      }
      return s;
    });
    setServers(updated);
    localStorage.setItem('topbots_servers_v2', JSON.stringify(updated));
  };

  const handleAddReview = (botId: string, newReview: Omit<Review, 'id' | 'date' | 'likes'>) => {
    const fullReview: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      likes: 0
    };

    const updated = bots.map((b) => {
      if (b.id === botId) {
        const nextReviews = [fullReview, ...b.reviews];
        const avg = nextReviews.reduce((acc, r) => acc + r.rating, 0) / nextReviews.length;
        return {
          ...b,
          reviews: nextReviews,
          reviewsCount: nextReviews.length,
          rating: Number(avg.toFixed(1))
        };
      }
      return b;
    });

    saveBots(updated);

    if (selectedBotModal && selectedBotModal.id === botId) {
      const match = updated.find((b) => b.id === botId);
      if (match) setSelectedBotModal(match);
    }
  };

  const handleAddNewBot = (newBot: BotItem) => {
    const next = [newBot, ...bots];
    saveBots(next);
    setCurrentTab('explore');
    setSelectedBotModal(newBot);
  };

  // Filtered bots
  const filteredBots = useMemo(() => {
    let result = [...bots];

    // Bookmarks only
    if (currentTab === 'bookmarks') {
      result = result.filter((b) => bookmarkedBotIds.includes(b.id));
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((b) => b.tags.includes(selectedCategory));
    }

    // Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.tagline.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          b.tags.some((t) => t.toLowerCase().includes(query)) ||
          b.owner.name.toLowerCase().includes(query)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'votes') return b.votes - a.votes;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'servers') return b.servers - a.servers;
      if (sortBy === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });

    return result;
  }, [bots, currentTab, bookmarkedBotIds, selectedCategory, searchQuery, sortBy]);

  // Filtered servers
  const filteredServers = useMemo(() => {
    let result = [...servers];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.tagline.toLowerCase().includes(query) ||
          s.tags.some((t) => t.toLowerCase().includes(query))
      );
    }
    return result.sort((a, b) => b.votes - a.votes);
  }, [servers, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f111a] text-slate-100 font-sans antialiased selection:bg-indigo-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookmarksCount={bookmarkedBotIds.length}
        onOpenSubmitModal={() => setSubmitModalOpen(true)}
        userLoggedIn={userLoggedIn}
        onToggleLogin={() => setUserLoggedIn(!userLoggedIn)}
        onNavigateHome={() => {
          setCurrentTab('explore');
          setSelectedCategory('All');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Hero Banner (Only on Explore & Servers tab) */}
      {(currentTab === 'explore' || currentTab === 'servers') && (
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          totalBots={bots.length}
          totalServers={servers.length}
          onExploreClick={() => {
            const el = document.getElementById('browse-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Main App Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="browse-section">
        
        {/* TAB 1: Explore Bots */}
        {currentTab === 'explore' && (
          <div className="space-y-8">
            
            {/* Category Filter Pills Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm font-semibold">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-[#171a26] hover:bg-[#222738] text-slate-300 border border-[#272d3f]'
                    }`}
                  >
                    {cat === 'All' ? '🌟 All Bots' : cat}
                  </button>
                );
              })}
            </div>

            {/* Sub-header Bar: Result count & Sort controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>{selectedCategory === 'All' ? 'Trending Discord Bots' : `${selectedCategory} Bots`}</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#1e2335] text-indigo-400 border border-indigo-500/20">
                    {filteredBots.length} results
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Ranked by verified user votes, active guilds, and authentic reviews.
                </p>
              </div>

              {/* Sort By selector */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#171a26] border border-[#2c3245] text-xs font-semibold text-white rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="votes">Most Votes</option>
                  <option value="servers">Most Servers</option>
                  <option value="rating">Highest Rated</option>
                  <option value="recent">Recently Added</option>
                </select>
              </div>
            </div>

            {/* Bots Grid */}
            {filteredBots.length === 0 ? (
              <div className="py-20 text-center rounded-3xl bg-[#141724]/60 border border-[#252a3b] p-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                  <Info className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">No bots found matching your filters</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
                  Try adjusting your search query, selecting another category, or list your own bot right now!
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#22283a] text-slate-200 text-xs font-bold hover:bg-[#2c344c] transition"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setSubmitModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
                  >
                    Add a New Bot
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredBots.map((bot) => (
                  <BotCard
                    key={bot.id}
                    bot={bot}
                    onSelect={(b) => setSelectedBotModal(b)}
                    onVote={handleVoteBot}
                    hasVotedToday={votedBotIds.includes(bot.id)}
                    isBookmarked={bookmarkedBotIds.includes(bot.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            )}

            {/* Promoted / Kizuna Spotlight Section */}
            <div className="mt-12 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-[#141724] border border-indigo-500/20 p-6 sm:p-8 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    👑 Featured Bot of the Month
                  </span>
                  <h3 className="text-2xl font-black text-white">Kizuna Music — Lossless Audio Engine</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                    Experience studio-fidelity streaming in your voice channels with custom Rust DSP equalization, 24/7 radio persistence, and zero buffer lag.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      const kiz = bots.find((b) => b.id === 'kizuna-music');
                      if (kiz) setSelectedBotModal(kiz);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer"
                  >
                    View Specs & Reviews
                  </button>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#23283a] hover:bg-[#2d344a] text-slate-200 font-bold text-xs sm:text-sm border border-[#313950] transition"
                  >
                    Invite Now
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Discord Servers */}
        {currentTab === 'servers' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Public Discord Communities
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Discover vibrant gaming squads, anime hubs, developer roundtables, and chill study cafés.
                </p>
              </div>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20"
              >
                List Your Server
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredServers.map((server) => (
                <ServerCard
                  key={server.id}
                  server={server}
                  onVote={handleVoteServer}
                  hasVotedToday={votedServerIds.includes(server.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Tags & Topics */}
        {currentTab === 'tags' && (
          <div className="space-y-8 py-4">
            <div>
              <h2 className="text-2xl font-black text-white">Browse by Topic & Category</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Pinpoint bots designed specifically for your community's favorite focus areas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => {
                const count = bots.filter((b) => b.tags.includes(cat)).length;
                return (
                  <div
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentTab('explore');
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="p-5 rounded-2xl bg-[#161925] border border-[#262c3e] hover:border-indigo-500/50 hover:bg-[#1a1e2d] transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition">
                        {cat}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {count} bot{count === 1 ? '' : 's'} available
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-[#222738] group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-slate-400 transition">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: Bookmarks / Saved Bots */}
        {currentTab === 'bookmarks' && (
          <div className="space-y-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-indigo-400 fill-indigo-400" />
                  Your Bookmarked Bots ({bookmarkedBotIds.length})
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Keep track of your favorite bots to invite or vote for later.
                </p>
              </div>

              {bookmarkedBotIds.length > 0 && (
                <button
                  onClick={() => {
                    setBookmarkedBotIds([]);
                    localStorage.setItem('topbots_bookmarks', JSON.stringify([]));
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {filteredBots.length === 0 ? (
              <div className="py-20 text-center rounded-3xl bg-[#141724]/60 border border-[#252a3b] p-8">
                <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No bookmarked bots</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
                  Click the bookmark icon on any bot card to save them here for quick access.
                </p>
                <button
                  onClick={() => setCurrentTab('explore')}
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition"
                >
                  Browse Top Bots
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredBots.map((bot) => (
                  <BotCard
                    key={bot.id}
                    bot={bot}
                    onSelect={(b) => setSelectedBotModal(b)}
                    onVote={handleVoteBot}
                    hasVotedToday={votedBotIds.includes(bot.id)}
                    isBookmarked={true}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Bot Detail Full Modal */}
      {selectedBotModal && (
        <BotDetailModal
          bot={selectedBotModal}
          onClose={() => setSelectedBotModal(null)}
          onVote={handleVoteBot}
          hasVotedToday={votedBotIds.includes(selectedBotModal.id)}
          isBookmarked={bookmarkedBotIds.includes(selectedBotModal.id)}
          onToggleBookmark={handleToggleBookmark}
          onAddReview={handleAddReview}
        />
      )}

      {/* Add New Bot Modal */}
      {submitModalOpen && (
        <SubmitBotModal
          onClose={() => setSubmitModalOpen(false)}
          onSubmit={handleAddNewBot}
        />
      )}

      {/* Global Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentTab('explore');
        }}
        onOpenSubmitModal={() => setSubmitModalOpen(true)}
      />

    </div>
  );
};
