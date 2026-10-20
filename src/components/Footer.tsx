import React from 'react';
import { Sparkles, MessageSquare, ExternalLink, Globe, Shield } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenSubmitModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenSubmitModal }) => {
  return (
    <footer className="mt-20 border-t border-[#212636] bg-[#0d0f17] text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">TopBots</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier directory to discover, rate, and grow top Discord bots and public server communities.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-2">
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick categories */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Popular Categories</h4>
            <ul className="space-y-2 text-xs">
              {['Music', 'Moderation', 'Gaming', 'Economy', 'Anime'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-400 transition cursor-pointer"
                  >
                    {cat} Discord Bots
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Developers & Partners</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenSubmitModal} className="hover:text-indigo-400 transition cursor-pointer">
                  Submit a Discord Bot
                </button>
              </li>
              <li>
                <a href="#api" className="hover:text-indigo-400 transition">
                  Webhooks & API Docs
                </a>
              </li>
              <li>
                <a href="#badges" className="hover:text-indigo-400 transition">
                  Dynamic Vote Badges
                </a>
              </li>
              <li>
                <a href="#guidelines" className="hover:text-indigo-400 transition">
                  Bot Verification Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Status */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-300">All Systems Operational</span>
              </li>
              <li><a href="#terms" className="hover:text-indigo-400 transition">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
              <li><a href="#discord" className="hover:text-indigo-400 transition">Discord Guidelines</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#1d2231] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TopBots Discovery. Not affiliated with Discord Inc.
          </div>
          <div className="flex items-center gap-1">
            Built with high performance for Discord Communities worldwide.
          </div>
        </div>
      </div>
    </footer>
  );
};
