import React, { useState } from 'react';
import { BotItem } from '../types';
import { ChevronUp, Star, ShieldCheck, ExternalLink, Bookmark, Check, Users, Server, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BotCardProps {
  bot: BotItem;
  onSelect: (bot: BotItem) => void;
  onVote: (botId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (botId: string) => void;
  hasVotedToday: boolean;
}

export const BotCard: React.FC<BotCardProps> = ({
  bot,
  onSelect,
  onVote,
  isBookmarked,
  onToggleBookmark,
  hasVotedToday
}) => {
  const [voteCountAnim, setVoteCountAnim] = useState(false);

  const handleVoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasVotedToday) {
      // trigger confetti around button
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { x, y }
        });
      } catch (err) {
        // ignore if not supported
      }

      setVoteCountAnim(true);
      setTimeout(() => setVoteCountAnim(false), 600);
      onVote(bot.id);
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(bot.id);
  };

  const handleInviteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(bot.inviteUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onSelect(bot)}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#161925] border border-[#262c3e] hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Banner thumbnail */}
      <div className="relative h-28 w-full overflow-hidden bg-slate-800">
        <img
          src={bot.banner}
          alt={`${bot.name} banner`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-85"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161925] via-transparent to-black/40" />

        {/* Featured / Promoted badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {bot.promoted && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-black shadow-sm">
              Promoted
            </span>
          )}
          {bot.featured && !bot.promoted && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Bookmark button */}
        <button
          onClick={handleBookmarkClick}
          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Bot'}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-xl backdrop-blur-md transition-all ${
            isBookmarked
              ? 'bg-indigo-600 text-white'
              : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/70'
          }`}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Avatar & Title Row */}
        <div className="flex items-start gap-3.5 -mt-10 mb-3 relative z-10">
          <div className="relative shrink-0">
            <img
              src={bot.avatar}
              alt={bot.name}
              className="w-14 h-14 rounded-2xl ring-4 ring-[#161925] object-cover bg-slate-900 shadow-lg"
              loading="lazy"
            />
            {bot.verified && (
              <div
                title="Verified Bot"
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center ring-2 ring-[#161925]"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 pt-6 sm:pt-6">
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-indigo-400 transition-colors truncate">
                {bot.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {bot.rating.toFixed(1)}
              </span>
              <span>•</span>
              <span className="truncate">{(bot.servers).toLocaleString()} servers</span>
            </div>
          </div>
        </div>

        {/* Short Tagline */}
        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4 flex-1">
          {bot.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {bot.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-0.5 rounded-lg bg-[#202535] text-slate-300 font-medium border border-[#2d344a]"
            >
              {tag}
            </span>
          ))}
          {bot.tags.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#202535] text-slate-400">
              +{bot.tags.length - 3}
            </span>
          )}
        </div>

        {/* Bottom Actions: Upvote & Invite */}
        <div className="pt-3 border-t border-[#232838] flex items-center gap-2">
          {/* Vote Button */}
          <button
            onClick={handleVoteClick}
            disabled={hasVotedToday}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              hasVotedToday
                ? 'bg-[#1e2434] text-emerald-400 border border-emerald-500/30 cursor-default'
                : 'bg-[#22283a] hover:bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-600/30 border border-[#2e364e] active:scale-95'
            }`}
          >
            {hasVotedToday ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Voted</span>
              </>
            ) : (
              <>
                <ChevronUp className={`w-4 h-4 text-indigo-400 group-hover:text-white ${voteCountAnim ? 'animate-bounce' : ''}`} />
                <span>Vote</span>
              </>
            )}
            <span className="ml-1 text-slate-400 font-normal">
              ({bot.votes.toLocaleString()})
            </span>
          </button>

          {/* Invite Button */}
          <button
            onClick={handleInviteClick}
            title="Invite to Discord"
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#202638] hover:bg-[#2c334d] text-slate-200 hover:text-white border border-[#2d354b] transition flex items-center gap-1 text-xs font-semibold"
          >
            <span className="hidden sm:inline">Invite</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
