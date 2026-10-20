import React, { useState } from 'react';
import { Search, Compass, ShieldCheck, Flame, PlusCircle, Bookmark, Menu, X, Bell, User, Sparkles, ExternalLink, Moon, LogIn, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentTab: 'explore' | 'servers' | 'tags' | 'bookmarks' | 'add';
  setCurrentTab: (tab: 'explore' | 'servers' | 'tags' | 'bookmarks' | 'add') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  bookmarksCount: number;
  onOpenSubmitModal: () => void;
  userLoggedIn: boolean;
  onToggleLogin: () => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  bookmarksCount,
  onOpenSubmitModal,
  userLoggedIn,
  onToggleLogin,
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#232736] bg-[#11141e]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button 
              onClick={onNavigateHome}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                  TopBots
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v2.0
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setCurrentTab('explore')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'explore'
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-[#1a1e2d]'
                }`}
              >
                Explore Bots
              </button>
              <button
                onClick={() => setCurrentTab('servers')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'servers'
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-[#1a1e2d]'
                }`}
              >
                Discord Servers
              </button>
              <button
                onClick={() => setCurrentTab('tags')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'tags'
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-[#1a1e2d]'
                }`}
              >
                Tags & Topics
              </button>
            </nav>
          </div>

          {/* Search bar (Header Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search 10,000+ Discord bots, music, anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181c28] border border-[#2c3245] text-sm text-slate-100 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Saved Bookmarks */}
            <button
              onClick={() => setCurrentTab('bookmarks')}
              title="Saved Bots"
              className={`relative p-2 rounded-xl transition ${
                currentTab === 'bookmarks'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-[#1c202e]'
              }`}
            >
              <Bookmark className="w-5 h-5" />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Add Bot button */}
            <button
              onClick={onOpenSubmitModal}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Bot</span>
            </button>

            {/* User Profile / Discord Auth */}
            {userLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#1c202e] border border-transparent hover:border-[#2e3447] transition"
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                    alt="Discord Avatar"
                    className="w-8 h-8 rounded-lg ring-2 ring-emerald-500/80 object-cover"
                  />
                  <div className="hidden xl:block text-left">
                    <div className="text-xs font-semibold text-white leading-tight">Alex_Dev</div>
                    <div className="text-[10px] text-emerald-400 leading-tight flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                      Online
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#171a25] border border-[#2b3144] shadow-2xl py-2 z-50 text-sm">
                    <div className="px-4 py-2 border-b border-[#252a3a]">
                      <p className="font-semibold text-white">Alex_Dev#1337</p>
                      <p className="text-xs text-slate-400">ID: 8847291038291</p>
                    </div>
                    <button
                      onClick={() => {
                        onOpenSubmitModal();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-slate-200 hover:bg-[#202534] flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4 text-indigo-400" />
                      Submit New Bot
                    </button>
                    <button
                      onClick={() => {
                        setCurrentTab('bookmarks');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-slate-200 hover:bg-[#202534] flex items-center gap-2"
                    >
                      <Bookmark className="w-4 h-4 text-amber-400" />
                      Bookmarked Bots ({bookmarksCount})
                    </button>
                    <div className="my-1 border-t border-[#252a3a]"></div>
                    <button
                      onClick={() => {
                        onToggleLogin();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                    >
                      <LogIn className="w-4 h-4 rotate-180" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onToggleLogin}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-semibold shadow-md shadow-[#5865F2]/20 transition-all active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login with Discord</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}

            {/* Mobile hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1a1e2d] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#232736] bg-[#131622] px-4 pt-3 pb-5 space-y-3">
          <div className="relative w-full mb-3">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search bots, music, servers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1b202e] border border-[#2b3145] text-sm text-slate-100 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setCurrentTab('explore');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-sm font-medium text-left flex items-center gap-2 ${
                currentTab === 'explore'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-[#181c28] text-slate-300'
              }`}
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              Explore Bots
            </button>
            <button
              onClick={() => {
                setCurrentTab('servers');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-sm font-medium text-left flex items-center gap-2 ${
                currentTab === 'servers'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-[#181c28] text-slate-300'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-400" />
              Discord Servers
            </button>
            <button
              onClick={() => {
                setCurrentTab('tags');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-sm font-medium text-left flex items-center gap-2 ${
                currentTab === 'tags'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-[#181c28] text-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              Categories
            </button>
            <button
              onClick={() => {
                onOpenSubmitModal();
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-sm font-medium text-left flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            >
              <PlusCircle className="w-4 h-4" />
              Add Your Bot
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
