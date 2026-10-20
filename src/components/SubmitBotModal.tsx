import React, { useState } from 'react';
import { X, Plus, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { BotItem } from '../types';
import confetti from 'canvas-confetti';

interface SubmitBotModalProps {
  onClose: () => void;
  onSubmit: (bot: BotItem) => void;
}

const AVAILABLE_TAGS = ['Music', 'Moderation', 'Anime', 'Gaming', 'Economy', 'Fun', 'Leveling', 'Utility', 'Roleplay', 'Cryptocurrency'];

export const SubmitBotModal: React.FC<SubmitBotModalProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [prefix, setPrefix] = useState('/');
  const [inviteUrl, setInviteUrl] = useState('');
  const [supportServerUrl, setSupportServerUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80');
  const [banner, setBanner] = useState('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Utility']);
  const [featuresInput, setFeaturesInput] = useState('Custom commands, 24/7 uptime, Dashboard');

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      if (selectedTags.length > 1) {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      }
    } else {
      if (selectedTags.length < 4) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !tagline.trim()) return;

    const newBot: BotItem = {
      id: `bot-${Date.now()}`,
      type: 'bot',
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim() || tagline.trim(),
      longDescription: `### About ${name.trim()}\n${description.trim() || tagline.trim()}\n\nEquipped with lightning fast response times and 99.9% uptime.`,
      avatar: avatar.trim(),
      banner: banner.trim(),
      tags: selectedTags,
      votes: 1,
      monthlyVotes: 1,
      servers: 1,
      shards: 1,
      rating: 5.0,
      reviewsCount: 1,
      verified: true,
      prefix: prefix.trim() || '/',
      owner: {
        name: 'Alex_Dev',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        id: '123456789'
      },
      inviteUrl: inviteUrl.trim() || 'https://discord.com/oauth2/authorize',
      supportServerUrl: supportServerUrl.trim() || 'https://discord.gg',
      websiteUrl: websiteUrl.trim() || undefined,
      features: featuresInput.split(',').map((s) => s.trim()).filter(Boolean),
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: 'Alex_Dev',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
          rating: 5,
          date: 'Just now',
          content: 'Just launched on TopBots! Feedback and community suggestions are welcome.',
          likes: 0
        }
      ],
      createdAt: 'Just now',
      badges: ['Newly Added', 'Community']
    };

    confetti({ particleCount: 70, spread: 80 });
    onSubmit(newBot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#141724] rounded-3xl border border-[#2b3145] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#232838]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">List Your Discord Bot</h2>
              <p className="text-xs text-slate-400">Get discovered by millions of Discord server owners.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1e2233] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs sm:text-sm">
          {/* Bot Name & Prefix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Bot Name *</label>
              <input
                type="text"
                placeholder="e.g. SonicBeats"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#1b1f2e] border border-[#2d344b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Prefix / Slash *</label>
              <input
                type="text"
                placeholder="e.g. / or !"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                required
                className="w-full bg-[#1b1f2e] border border-[#2d344b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Short Tagline */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Short Tagline * (max 100 chars)</label>
            <input
              type="text"
              maxLength={120}
              placeholder="e.g. The cleanest music experience with zero latency playback."
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              required
              className="w-full bg-[#1b1f2e] border border-[#2d344b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Full description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Detailed Description</label>
            <textarea
              rows={3}
              placeholder="Describe what your bot does, supported commands, setup steps..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#1b1f2e] border border-[#2d344b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Categories / Tags selector */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Categories (Select 1 to 4 tags)</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-[#1b1f2e] text-slate-300 hover:bg-[#252b3e] border border-[#2d344b]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Invite URL & Support Server */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">OAuth2 Invite Link *</label>
              <input
                type="url"
                placeholder="https://discord.com/oauth2/authorize..."
                value={inviteUrl}
                onChange={(e) => setInviteUrl(e.target.value)}
                required
                className="w-full bg-[#1b1f2e] border border-[#2d344b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Discord Support Server</label>
              <input
                type="url"
                placeholder="https://discord.gg/your-server"
                value={supportServerUrl}
                onChange={(e) => setSupportServerUrl(e.target.value)}
                className="w-full bg-[#1b1f2e] border border-[#2d344b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Key Features input */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Key Features (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. 24/7 Voice, Equalizer, Spotify Support, Web Dashboard"
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              className="w-full bg-[#1b1f2e] border border-[#2d344b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-[#232838] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#1f2436] font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition active:scale-95"
            >
              Publish Bot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
