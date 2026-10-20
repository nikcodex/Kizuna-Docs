import { BotItem, ServerItem } from '../types';

// Fast, inline lightweight high-contrast SVG gradients and avatars
// Zero network request delay, renders instantly (0ms)
const createAvatarSvg = (emoji: string, bgFrom: string, bgTo: string) => 
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${encodeURIComponent(bgFrom)}"/><stop offset="100%" stop-color="${encodeURIComponent(bgTo)}"/></linearGradient></defs><rect width="100%" height="100%" rx="36" fill="url(%23g)"/><text x="50%" y="54%" font-size="70" text-anchor="middle" dominant-baseline="central">${encodeURIComponent(emoji)}</text></svg>`;

const createBannerSvg = (color1: string, color2: string, patternEmoji: string) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="240" viewBox="0 0 800 240"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${encodeURIComponent(color1)}"/><stop offset="100%" stop-color="${encodeURIComponent(color2)}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg)"/><circle cx="700" cy="40" r="140" fill="white" opacity="0.06"/><circle cx="100" cy="220" r="100" fill="black" opacity="0.15"/><text x="88%" y="70%" font-size="64" opacity="0.25" text-anchor="middle">${encodeURIComponent(patternEmoji)}</text></svg>`;

export const INITIAL_BOTS: BotItem[] = [
  {
    id: 'kizuna-music',
    type: 'bot',
    name: 'Kizuna Music',
    tagline: 'Ultra high-fidelity lossless Discord audio streamer powered by custom Rust audio core.',
    description: 'The premier music companion for Discord servers. Supports Spotify, Apple Music, YouTube 4K Audio, SoundCloud, lossless FLAC, 24/7 radio mode, rich bass boost & customizable audio equalizer.',
    longDescription: `### Why choose Kizuna Music?
Kizuna Music is engineered from scratch in Rust to provide jitter-free, studio-grade 320kbps and 24-bit FLAC audio playback. With zero latency buffering and support for over 15 major streaming platforms, it ensures your community stays entertained without dropouts.

#### Key Features:
- 🎶 **Lossless Audio Streaming**: High-grade bit-perfect streams with custom DSP equalization filters.
- 🎚️ **Pro Audio Filters**: Bassboost (up to 12 levels), 8D Surround, Nightcore, Vaporwave, and Karaoke vocal isolation.
- 📻 **24/7 Continuous Play**: Server voice channel persistence so your lounge never goes quiet.
- 📱 **Web Dashboard & Mobile Remote**: Control your queue seamlessly from your phone or browser.
- 👥 **Shared DJ Queue**: Vote skip, DJ roles, autoplay recommendation engine, and synchronized lyrics display.`,
    avatar: createAvatarSvg('🎵', '#6366f1', '#a855f7'),
    banner: createBannerSvg('#1e1b4b', '#4338ca', '🎧'),
    tags: ['Music', 'Utility', 'Fun'],
    votes: 48920,
    monthlyVotes: 14210,
    servers: 245000,
    shards: 320,
    rating: 4.9,
    reviewsCount: 3840,
    verified: true,
    featured: true,
    promoted: true,
    prefix: '/ (Slash commands)',
    owner: {
      name: 'Kizuna Dev Team',
      avatar: createAvatarSvg('⚡', '#3b82f6', '#1d4ed8'),
      id: '992019283741'
    },
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=123456789&scope=bot%20applications.commands',
    supportServerUrl: 'https://discord.gg/kizuna',
    websiteUrl: 'https://kizuna-audio.org',
    githubUrl: 'https://github.com/nikcodex/Kizuna-Docs',
    features: ['Lossless 24-bit FLAC', 'Spotify & Apple Music', 'Zero-Lag Rust Engine', 'Lyrics in Real-Time', 'Web Controller'],
    badges: ['Top Pick', 'Certified', 'Partner'],
    createdAt: '2023-01-15',
    reviews: [
      {
        id: 'rev-1',
        author: 'AetherGamer',
        avatar: createAvatarSvg('🎮', '#ec4899', '#f43f5e'),
        rating: 5,
        date: '2 days ago',
        content: 'Hands down the crispest audio quality of any Discord bot. The bass boost filter is unmatched and no ads whatsoever!',
        likes: 142
      },
      {
        id: 'rev-2',
        author: 'SakuraSound',
        avatar: createAvatarSvg('🌸', '#f472b6', '#db2777'),
        rating: 5,
        date: '1 week ago',
        content: 'The 24/7 feature actually never drops connection. Setup was instantaneous with slash commands.',
        likes: 67
      }
    ]
  },
  {
    id: 'aegis-sentinel',
    type: 'bot',
    name: 'Aegis Sentinel',
    tagline: 'Next-generation AI moderation, anti-raid, raid-shield, automod and scam token protection.',
    description: 'Keep your server completely safe with neural automodding. Detects malicious links, token grabbers, raid waves, and spam in under 20 milliseconds.',
    longDescription: `### The Fortified Guardian for Discord Communities
Aegis Sentinel leverages deep learning sentiment and threat classification to insulate your Discord community against malicious actors, compromised accounts, crypto phishing links, and coordinated raid attacks.

#### Key Features:
- 🛡️ **Machine Learning Automod**: Auto-quarantine phishing links and zero-day malicious domains before members click.
- ⚡ **Panic Mode & Lockdown**: One-click raid suppression with customizable verification CAPTCHAs.
- 📋 **Audit Trail Logging**: Beautiful visual audit logs sent directly to your security channel.
- 🚫 **Anti-Nuke Protection**: Strict permissions barrier preventing unauthorized role modifications or mass bans.`,
    avatar: createAvatarSvg('🛡️', '#059669', '#0d9488'),
    banner: createBannerSvg('#064e3b', '#0f766e', '⚔️'),
    tags: ['Moderation', 'Utility'],
    votes: 38120,
    monthlyVotes: 11200,
    servers: 182000,
    shards: 240,
    rating: 4.8,
    reviewsCount: 2410,
    verified: true,
    featured: true,
    prefix: '!aegis or /',
    owner: {
      name: 'CyberShield Labs',
      avatar: createAvatarSvg('🤖', '#3b82f6', '#2563eb'),
      id: '883920194812'
    },
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=987654321&scope=bot',
    supportServerUrl: 'https://discord.gg/aegis',
    websiteUrl: 'https://aegis-security.io',
    features: ['AI Anti-Scam', 'Raid-Shield 2.0', 'Mass Ping Prevention', 'Automated Verification'],
    badges: ['Security Verified', 'Popular'],
    createdAt: '2022-09-10',
    reviews: [
      {
        id: 'rev-3',
        author: 'VortexAdmin',
        avatar: createAvatarSvg('⚡', '#f59e0b', '#d97706'),
        rating: 5,
        date: '3 days ago',
        content: 'Saved our 50,000 member server from a massive webhook raid last Tuesday. Best anti-raid bot without question.',
        likes: 98
      }
    ]
  },
  {
    id: 'nekoverse-anime',
    type: 'bot',
    name: 'NekoVerse',
    tagline: 'The ultimate anime RPG, card gacha collector, waifu marriage, and community minigames!',
    description: 'Summon over 10,000 anime characters, battle mythical bosses, trade rare holographic cards, customize your anime profile card, and level up with friends.',
    longDescription: `### Step into the NekoVerse!
Collect, trade, battle, and showcase your anime favorites with one of the most vibrant gamified economies on Discord!

#### Key Highlights:
- 🎴 **Gacha Card Collection**: Thousands of animated cards across popular anime series with varying rarities.
- ⚔️ **Dungeon Crawling & Guild Battles**: Form alliances with guildmates and challenge raid bosses for epic loot.
- 💍 **Waifu / Husbando Marriage**: Marry your top characters, set up custom marriage profiles and rings.
- 🎨 **Profile Customization**: Level badges, animated background wallpapers, and leaderboards.`,
    avatar: createAvatarSvg('🐱', '#f43f5e', '#fb7185'),
    banner: createBannerSvg('#881337', '#e11d48', '✨'),
    tags: ['Anime', 'Economy', 'Gaming', 'Fun'],
    votes: 42190,
    monthlyVotes: 12890,
    servers: 195000,
    shards: 280,
    rating: 4.9,
    reviewsCount: 3120,
    verified: true,
    featured: true,
    prefix: 'n!',
    owner: {
      name: 'Studio Neko',
      avatar: createAvatarSvg('🐾', '#ec4899', '#be185d'),
      id: '772183948123'
    },
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=112233445&scope=bot',
    supportServerUrl: 'https://discord.gg/nekoverse',
    websiteUrl: 'https://nekoverse.gg',
    features: ['10,000+ Cards', 'RPG Battles', 'Global Economy', 'Animated Profiles'],
    badges: ['Top Anime', 'Verified'],
    createdAt: '2021-11-20',
    reviews: [
      {
        id: 'rev-4',
        author: 'OtakuSupreme',
        avatar: createAvatarSvg('🍙', '#a855f7', '#7e22ce'),
        rating: 5,
        date: '5 days ago',
        content: 'Addictive gacha mechanics and the art is stunning! Everyone in our guild is addicted to the battle mode.',
        likes: 54
      }
    ]
  },
  {
    id: 'crypto-pulse',
    type: 'bot',
    name: 'CryptoPulse',
    tagline: 'Live crypto tickers, gas trackers, portfolio alerts, DEX swaps, and NFT floor price feeds.',
    description: 'Instant prices for over 15,000 tokens on Solana, Ethereum, Bitcoin, Base, and Arbitrum. Set customized price drop/pump alerts for your traders.',
    longDescription: `### All-in-One Financial Intelligence for Web3 Servers
CryptoPulse feeds real-time candlestick charts, order book depths, gas price trackers, and whale alert notifications straight to your channels.`,
    avatar: createAvatarSvg('💎', '#0284c7', '#2563eb'),
    banner: createBannerSvg('#082f49', '#0284c7', '📈'),
    tags: ['Cryptocurrency', 'Economy', 'Utility'],
    votes: 19400,
    monthlyVotes: 6100,
    servers: 78000,
    shards: 95,
    rating: 4.7,
    reviewsCount: 1140,
    verified: true,
    prefix: 'c!',
    owner: {
      name: 'PulseFi Inc.',
      avatar: createAvatarSvg('🚀', '#10b981', '#059669'),
      id: '661829384712'
    },
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=556677889&scope=bot',
    supportServerUrl: 'https://discord.gg/cryptopulse',
    features: ['15,000+ Tokens', 'Live Solana/ETH Gas', 'Whale Tracking', 'Custom Alerts'],
    badges: ['Verified'],
    createdAt: '2023-04-12',
    reviews: []
  },
  {
    id: 'level-up-master',
    type: 'bot',
    name: 'LevelUp Master',
    tagline: 'Rewarding XP progression, voice XP, customizable rank cards, and role multipliers.',
    description: 'Gamify your server engagement. Let members earn experience by texting, joining voice channels, attending events, and unlock exclusive VIP roles.',
    longDescription: `### The Most Advanced Server Leveling Engine
LevelUp Master keeps members active and talking. Reward your most loyal chatters with vanity roles, custom rank cards, and leaderboard rivalries.`,
    avatar: createAvatarSvg('🏆', '#eab308', '#ca8a04'),
    banner: createBannerSvg('#713f12', '#ca8a04', '⭐'),
    tags: ['Leveling', 'Utility', 'Fun'],
    votes: 28900,
    monthlyVotes: 8750,
    servers: 140000,
    shards: 180,
    rating: 4.8,
    reviewsCount: 1890,
    verified: true,
    prefix: 'lvl!',
    owner: {
      name: 'Zenith Apps',
      avatar: createAvatarSvg('👑', '#d97706', '#b45309'),
      id: '445566778899'
    },
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=334455667&scope=bot',
    supportServerUrl: 'https://discord.gg/levelup',
    features: ['Voice XP Tracking', 'Canva Rank Cards', 'Auto-Role Rewards', 'Leaderboard Web Viewer'],
    badges: ['Verified', 'Popular'],
    createdAt: '2022-03-01',
    reviews: []
  },
  {
    id: 'dungeon-crawler-rpg',
    type: 'bot',
    name: 'Chronicles RPG',
    tagline: 'Text-based MMORPG with multiplayer raids, loot crafting, pets, and open PvP arena.',
    description: 'Embark on endless fantasy adventures right in your Discord channels. Forge legendary weapons, tame mythical dragons, and conquer dungeons.',
    longDescription: `### Turn Discord into a Full Fantasy Realm
Experience deep narrative questlines, tactical turn-based combat, guilds, player marketplaces, and world boss events.`,
    avatar: createAvatarSvg('⚔️', '#8b5cf6', '#6d28d9'),
    banner: createBannerSvg('#4c1d95', '#7c3aed', '🐉'),
    tags: ['Gaming', 'Roleplay', 'Fun'],
    votes: 22100,
    monthlyVotes: 7300,
    servers: 92000,
    shards: 110,
    rating: 4.7,
    reviewsCount: 1430,
    verified: true,
    prefix: 'rpg!',
    owner: {
      name: 'Mythic Forge',
      avatar: createAvatarSvg('🛡️', '#6366f1', '#4338ca'),
      id: '112233990011'
    },
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=667788990&scope=bot',
    supportServerUrl: 'https://discord.gg/chroniclesrpg',
    features: ['Live PvP Battles', '500+ Weapons & Armor', 'Guild Raids', 'Interactive Pet Hatching'],
    badges: ['Verified'],
    createdAt: '2023-08-14',
    reviews: []
  },
  {
    id: 'meme-station',
    type: 'bot',
    name: 'MemeStation Deluxe',
    tagline: 'Fresh memes directly from Reddit/TikTok, custom image generators, soundboards, and trivia.',
    description: 'Spice up dead chats with viral memes, roast commands, trivia showdowns, and high-energy interactive soundboard effects.',
    longDescription: `### The Chat Reviver Bot
Never let a silence linger. MemeStation Deluxe brings millions of up-to-date memes, customizable image caption generators, and mini party games.`,
    avatar: createAvatarSvg('🤣', '#f97316', '#ea580c'),
    banner: createBannerSvg('#7c2d12', '#c2410c', '🔥'),
    tags: ['Fun', 'Utility'],
    votes: 18450,
    monthlyVotes: 5900,
    servers: 85000,
    shards: 90,
    rating: 4.6,
    reviewsCount: 920,
    verified: true,
    prefix: 'meme!',
    owner: {
      name: 'Comedy Hub',
      avatar: createAvatarSvg('🎭', '#f59e0b', '#d97706'),
      id: '223344556677'
    },
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=778899001&scope=bot',
    supportServerUrl: 'https://discord.gg/memestation',
    features: ['Meme Generator', 'Daily Trivia Challenges', 'Soundboard Drops', 'Custom Reactions'],
    badges: ['Fun Pick'],
    createdAt: '2022-06-22',
    reviews: []
  },
  {
    id: 'ticket-flow',
    type: 'bot',
    name: 'TicketFlow Pro',
    tagline: 'Streamlined customer support tickets, transcripts with cloud viewer, buttons, and custom forms.',
    description: 'Transform your Discord into a professional customer help desk with dropdown menus, private staff channels, HTML transcripts, and auto-closers.',
    longDescription: `### Professional Customer Support on Discord
TicketFlow Pro is trusted by web3 projects, gaming studios, and communities to handle thousands of inquiries smoothly without clutter.`,
    avatar: createAvatarSvg('🎫', '#14b8a6', '#0f766e'),
    banner: createBannerSvg('#134e4a', '#0d9488', '📩'),
    tags: ['Utility', 'Moderation'],
    votes: 24700,
    monthlyVotes: 7920,
    servers: 110000,
    shards: 140,
    rating: 4.9,
    reviewsCount: 1670,
    verified: true,
    prefix: '/ticket',
    owner: {
      name: 'Flow Systems',
      avatar: createAvatarSvg('💼', '#0284c7', '#0369a1'),
      id: '334455112233'
    },
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=889900112&scope=bot',
    supportServerUrl: 'https://discord.gg/ticketflow',
    features: ['HTML Web Transcripts', 'Multi-Category Menus', 'Automated SLA Timers', 'Private Staff Pings'],
    badges: ['Enterprise', 'Verified'],
    createdAt: '2022-01-19',
    reviews: []
  }
];

export const INITIAL_SERVERS: ServerItem[] = [
  {
    id: 'nexus-gamers',
    type: 'server',
    name: 'Nexus Gaming Lounge',
    tagline: 'The warmest gaming community for Valorant, Minecraft, GTA, and League players.',
    description: 'Looking for a squad, fun game nights, tournaments with cash prizes, and lively voice calls? Step into Nexus Gaming Lounge!',
    avatar: createAvatarSvg('🎯', '#8b5cf6', '#6366f1'),
    banner: createBannerSvg('#312e81', '#4f46e5', '🎮'),
    tags: ['Gaming', 'Fun', 'Anime'],
    votes: 31200,
    members: 89400,
    online: 24500,
    featured: true,
    promoted: true,
    inviteUrl: 'https://discord.gg/nexus-gaming',
    owner: {
      name: 'Kaelen',
      avatar: createAvatarSvg('👑', '#a855f7', '#7c3aed')
    },
    features: ['Weekly Tournaments', 'Dedicated LFG Channels', 'High Quality Voice Rooms', 'Friendly Moderation'],
    badges: ['Featured', 'Partner']
  },
  {
    id: 'anime-sanctuary',
    type: 'server',
    name: 'Anime Sanctuary & Lounge',
    tagline: 'Seasonal anime watch parties, manga discussions, giveaways, and aesthetic emotes.',
    description: 'Join over 120k anime fans! Enjoy 500+ custom stickers and animated emojis, weekly simulcasts, karaoke stages, and chill lo-fi channels.',
    avatar: createAvatarSvg('🌸', '#ec4899', '#f43f5e'),
    banner: createBannerSvg('#831843', '#be185d', '⛩️'),
    tags: ['Anime', 'Roleplay', 'Fun'],
    votes: 45600,
    members: 128000,
    online: 38200,
    featured: true,
    inviteUrl: 'https://discord.gg/anime-sanctuary',
    owner: {
      name: 'YukiChan',
      avatar: createAvatarSvg('🍡', '#f472b6', '#db2777')
    },
    features: ['500+ Aesthetic Emotes', 'Weekly Anime Screenings', 'Manga Reading Club', 'Active Roleplay'],
    badges: ['Top Server', 'Verified']
  },
  {
    id: 'developer-hub',
    type: 'server',
    name: 'Developers & Code Hub',
    tagline: 'Collaborate with software engineers, web devs, AI builders, and open-source creators.',
    description: 'Get code reviews, debug errors, discover open-source bounties, and showcase your side projects to thousands of tech enthusiasts.',
    avatar: createAvatarSvg('💻', '#0284c7', '#2563eb'),
    banner: createBannerSvg('#0c4a6e', '#0369a1', '⚡'),
    tags: ['Utility', 'Gaming'],
    votes: 21400,
    members: 67000,
    online: 18900,
    inviteUrl: 'https://discord.gg/developer-hub',
    owner: {
      name: 'TechLead Dan',
      avatar: createAvatarSvg('🚀', '#10b981', '#059669')
    },
    features: ['Help Channels for React/Python/Rust', 'Job Board & Freelance gigs', 'Hackathons', 'Project Showcase'],
    badges: ['Community']
  },
  {
    id: 'lofi-cafe',
    type: 'server',
    name: 'Lo-Fi Chill Café',
    tagline: '24/7 lo-fi study radio, homework help, aesthetic vibe, and wholesome people.',
    description: 'The cozy corner of Discord for studying, working remotely, relaxing, and listening to smooth chillhop beats with friendly souls.',
    avatar: createAvatarSvg('☕', '#b45309', '#d97706'),
    banner: createBannerSvg('#451a03', '#92400e', '🎧'),
    tags: ['Music', 'Fun'],
    votes: 18900,
    members: 54000,
    online: 14200,
    inviteUrl: 'https://discord.gg/lofi-cafe',
    owner: {
      name: 'Mochi',
      avatar: createAvatarSvg('🍵', '#10b981', '#047857')
    },
    features: ['24/7 Lo-Fi Stages', 'Pomodoro Study Rooms', 'Friendly Late Night Talks'],
    badges: ['Cozy']
  }
];

export const CATEGORIES: string[] = [
  'All',
  'Music',
  'Moderation',
  'Anime',
  'Gaming',
  'Economy',
  'Fun',
  'Leveling',
  'Utility',
  'Roleplay',
  'Cryptocurrency'
];
