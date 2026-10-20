import React from 'react';
import { ServerItem } from '../types';
import { Users, ExternalLink, ChevronUp, Check, ShieldCheck, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ServerCardProps {
  server: ServerItem;
  onVote: (serverId: string) => void;
  hasVotedToday: boolean;
}

export const ServerCard: React.FC<ServerCardProps> = ({
  server,
  onVote,
  hasVotedToday
}) => {
  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasVotedToday) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { x, y }
        });
      } catch (e) {}
      onVote(server.id);
    }
  };

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(server.inviteUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#161925] border border-[#262c3e] hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden">
      {/* Banner */}
      <div className="relative h-28 w-full overflow-hidden bg-slate-800">
        <img
          src={server.banner}
          alt={server.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-85"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161925] via-transparent to-black/40" />

        {/* Member Count Pill */}
        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-slate-200 flex items-center gap-1.5 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          <span>{server.online.toLocaleString()} online</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-3.5 -mt-10 mb-3 relative z-10">
          <img
            src={server.avatar}
            alt={server.name}
            className="w-14 h-14 rounded-2xl ring-4 ring-[#161925] object-cover bg-slate-900 shadow-lg"
            loading="lazy"
          />
          <div className="flex-1 min-w-0 pt-6">
            <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-indigo-400 transition-colors truncate">
              {server.name}
            </h3>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Users className="w-3.5 h-3.5" />
              <span>{server.members.toLocaleString()} members</span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4 flex-1">
          {server.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {server.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-0.5 rounded-lg bg-[#202535] text-slate-300 font-medium border border-[#2d344a]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#232838] flex items-center gap-2">
          <button
            onClick={handleVote}
            disabled={hasVotedToday}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              hasVotedToday
                ? 'bg-[#1e2434] text-emerald-400 border border-emerald-500/30'
                : 'bg-[#22283a] hover:bg-indigo-600 text-white border border-[#2e364e]'
            }`}
          >
            {hasVotedToday ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Voted</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                <span>Vote</span>
              </>
            )}
            <span className="text-slate-400 font-normal">({server.votes.toLocaleString()})</span>
          </button>

          <button
            onClick={handleJoin}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm transition shadow-md shadow-indigo-600/20"
          >
            <span>Join</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
