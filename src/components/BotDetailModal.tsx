import React, { useState } from 'react';
import { BotItem, Review } from '../types';
import { 
  ChevronLeft, Star, ShieldCheck, ExternalLink, Bookmark, Check, 
  Share2, ThumbsUp, Server, Radio, Hash, Clock, Cpu, Heart, 
  MessageSquarePlus, AlertCircle, Copy, CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BotDetailModalProps {
  bot: BotItem;
  onClose: () => void;
  onVote: (botId: string) => void;
  hasVotedToday: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (botId: string) => void;
  onAddReview: (botId: string, review: Omit<Review, 'id' | 'date' | 'likes'>) => void;
}

export const BotDetailModal: React.FC<BotDetailModalProps> = ({
  bot,
  onClose,
  onVote,
  hasVotedToday,
  isBookmarked,
  onToggleBookmark,
  onAddReview
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [copiedPrefix, setCopiedPrefix] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const handleVote = (e: React.MouseEvent) => {
    if (!hasVotedToday) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      try {
        confetti({ particleCount: 50, spread: 70, origin: { x, y } });
      } catch (err) {}
      onVote(bot.id);
    }
  };

  const handleCopyPrefix = () => {
    navigator.clipboard.writeText(bot.prefix);
    setCopiedPrefix(true);
    setTimeout(() => setCopiedPrefix(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${bot.name} on TopBots`,
        text: bot.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    onAddReview(bot.id, {
      author: 'You (Alex_Dev)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      rating: newReviewRating,
      content: newReviewText.trim()
    });
    setNewReviewText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#131622] sm:rounded-3xl border border-[#2b3145] shadow-2xl overflow-hidden min-h-screen sm:min-h-0 sm:my-8 flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with controls */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-900 shrink-0">
          <img
            src={bot.banner}
            alt={bot.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131622] via-[#131622]/40 to-transparent" />

          {/* Back / Close button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/90 text-white backdrop-blur-md text-xs sm:text-sm font-semibold transition border border-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Directory</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                title="Share link"
                className="p-2 rounded-xl bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition border border-white/10"
              >
                {shareCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => onToggleBookmark(bot.id)}
                className={`p-2 rounded-xl backdrop-blur-md transition border border-white/10 ${
                  isBookmarked ? 'bg-indigo-600 text-white' : 'bg-black/60 text-white hover:bg-black/90'
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* Header Profile Section */}
        <div className="px-5 sm:px-8 -mt-16 sm:-mt-20 relative z-20 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            
            <div className="flex items-end gap-4">
              <div className="relative shrink-0">
                <img
                  src={bot.avatar}
                  alt={bot.name}
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl ring-4 ring-[#131622] object-cover bg-slate-900 shadow-2xl"
                />
                {bot.verified && (
                  <div className="absolute -bottom-1 -right-1 p-1 bg-indigo-500 rounded-lg text-white ring-2 ring-[#131622]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {bot.name}
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Created by <span className="text-slate-200 font-semibold">{bot.owner.name}</span>
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleVote}
                disabled={hasVotedToday}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  hasVotedToday
                    ? 'bg-[#1f2537] text-emerald-400 border border-emerald-500/30 cursor-default'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 active:scale-95'
                }`}
              >
                {hasVotedToday ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Upvoted</span>
                  </>
                ) : (
                  <>
                    <ThumbsUp className="w-4 h-4" />
                    <span>Upvote ({bot.votes.toLocaleString()})</span>
                  </>
                )}
              </button>

              <a
                href={bot.inviteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                <span>Invite to Server</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Quick Info Bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 py-3 px-4 rounded-2xl bg-[#191d2d] border border-[#262c3e] text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 block text-[11px]">Servers</span>
              <span className="font-bold text-white">{(bot.servers).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Monthly Votes</span>
              <span className="font-bold text-indigo-400">{bot.monthlyVotes.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Rating</span>
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {bot.rating.toFixed(1)} ({bot.reviewsCount})
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Prefix / Command</span>
              <div 
                onClick={handleCopyPrefix}
                className="font-mono text-white flex items-center gap-1 cursor-pointer hover:text-indigo-400"
                title="Click to copy prefix"
              >
                <span>{bot.prefix}</span>
                {copiedPrefix ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-4 border-b border-[#262c3e] mt-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm font-semibold border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Overview & Specs
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-semibold border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>User Reviews</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-[#242a3e] text-slate-300">
                {bot.reviews.length}
              </span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {activeTab === 'overview' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left 2 Cols: Main Description */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">About {bot.name}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {bot.description}
                  </p>
                </div>

                {/* Markdown long description */}
                <div className="p-5 rounded-2xl bg-[#181c2b] border border-[#272d40] text-sm text-slate-300 space-y-4">
                  <div className="whitespace-pre-line leading-relaxed font-sans">
                    {bot.longDescription}
                  </div>
                </div>

                {/* Features Pill Grid */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-3">Key Capabilities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {bot.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#181d2c] border border-[#282f42] text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 1 Col: Metadata & Links */}
              <div className="space-y-5">
                <div className="p-5 rounded-2xl bg-[#181c2b] border border-[#272d40] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Links</h4>
                  
                  <div className="space-y-2">
                    <a
                      href={bot.inviteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#212638] hover:bg-[#2b3249] text-xs font-semibold text-slate-200 transition"
                    >
                      <span>Invite Bot</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>

                    <a
                      href={bot.supportServerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#212638] hover:bg-[#2b3249] text-xs font-semibold text-slate-200 transition"
                    >
                      <span>Discord Support Server</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>

                    {bot.websiteUrl && (
                      <a
                        href={bot.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#212638] hover:bg-[#2b3249] text-xs font-semibold text-slate-200 transition"
                      >
                        <span>Official Website</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#181c2b] border border-[#272d40] space-y-3 text-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Technical Details</h4>
                  
                  <div className="flex justify-between py-1 border-b border-[#252a3a]">
                    <span className="text-slate-400">Shards</span>
                    <span className="font-semibold text-white">{bot.shards}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#252a3a]">
                    <span className="text-slate-400">Added Date</span>
                    <span className="font-semibold text-white">{bot.createdAt}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Safety Status</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Certified Safe
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Reviews Tab */
            <div className="space-y-6 max-w-2xl mx-auto">
              
              {/* Write Review Form */}
              <form onSubmit={handleSubmitReview} className="p-5 rounded-2xl bg-[#181c2b] border border-[#272d40] space-y-4">
                <h3 className="font-bold text-white text-sm">Leave a Public Review</h3>
                
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Your Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newReviewRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-amber-400 font-bold ml-2">
                      {newReviewRating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Your Experience</label>
                  <textarea
                    rows={3}
                    placeholder={`Tell server owners what you love about ${bot.name}...`}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    required
                    className="w-full bg-[#111420] border border-[#2e3549] rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition"
                  >
                    Post Review
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                {bot.reviews.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    No reviews yet. Be the first to review {bot.name}!
                  </div>
                ) : (
                  bot.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-[#171b29] border border-[#252a3b] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rev.avatar}
                            alt={rev.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <span className="text-xs font-bold text-white block">{rev.author}</span>
                            <span className="text-[10px] text-slate-500">{rev.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-10">
                        {rev.content}
                      </p>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
