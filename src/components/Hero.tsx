import React from 'react';
import { Search, Flame, Shield, Music, Sparkles, TrendingUp, Users } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  totalBots: number;
  totalServers: number;
  onExploreClick: () => void;
}

const POPULAR_SEARCHES = ['Music', 'Aegis', 'Economy', 'Anime', 'Moderation', 'Roleplay'];

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  totalBots,
  totalServers,
  onExploreClick
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-[#232736]/70">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e2333]/90 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>The Next-Generation Discord Discovery Hub</span>
          <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
            Live
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
          Discover the best{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Discord Bots
          </span>{' '}
          & Communities
        </h1>

        <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Level up your Discord server with top-rated music bots, automated anti-raid shields, AI moderation, RPG economies, and vibrant communities.
        </p>

        {/* Search Input Bar */}
        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative flex items-center bg-[#171b26] border border-[#2e3448] rounded-2xl shadow-2xl p-2 sm:p-2.5">
              <Search className="w-5 h-5 text-slate-400 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search bots by name, category, or features (e.g. 'music', 'moderation')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none px-2"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white font-medium"
                >
                  Clear
                </button>
              ) : null}
              <button
                onClick={onExploreClick}
                className="ml-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all shrink-0 cursor-pointer active:scale-95"
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick tags / popular terms */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-500 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> Popular:
            </span>
            {POPULAR_SEARCHES.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  setSelectedCategory(tag === 'Aegis' ? 'Moderation' : tag);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#1a1e2b] hover:bg-[#252b3d] text-slate-300 hover:text-indigo-300 border border-[#2b3145] transition-colors cursor-pointer"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          <div className="p-3 sm:p-4 rounded-2xl bg-[#141824]/80 border border-[#232838] flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-black text-indigo-400">10,000+</span>
            <span className="text-xs text-slate-400 mt-1 font-medium">Verified Bots</span>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-[#141824]/80 border border-[#232838] flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-black text-purple-400">5,400+</span>
            <span className="text-xs text-slate-400 mt-1 font-medium">Servers Listed</span>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-[#141824]/80 border border-[#232838] flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-black text-emerald-400">4.8M+</span>
            <span className="text-xs text-slate-400 mt-1 font-medium">Monthly Votes</span>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-[#141824]/80 border border-[#232838] flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-black text-amber-400">99.98%</span>
            <span className="text-xs text-slate-400 mt-1 font-medium">Uptime Guarantee</span>
          </div>
        </div>

      </div>
    </div>
  );
};
