export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
}

export interface BotItem {
  id: string;
  type: 'bot';
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  avatar: string;
  banner: string;
  tags: string[];
  votes: number;
  monthlyVotes: number;
  servers: number;
  shards: number;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  featured?: boolean;
  promoted?: boolean;
  prefix: string;
  owner: {
    name: string;
    avatar: string;
    id: string;
  };
  inviteUrl: string;
  supportServerUrl: string;
  websiteUrl?: string;
  githubUrl?: string;
  features: string[];
  reviews: Review[];
  createdAt: string;
  badges: string[];
}

export interface ServerItem {
  id: string;
  type: 'server';
  name: string;
  tagline: string;
  description: string;
  avatar: string;
  banner: string;
  tags: string[];
  votes: number;
  members: number;
  online: number;
  featured?: boolean;
  promoted?: boolean;
  inviteUrl: string;
  owner: {
    name: string;
    avatar: string;
  };
  features: string[];
  badges: string[];
}

export type Category = 
  | 'All'
  | 'Music'
  | 'Moderation'
  | 'Anime'
  | 'Gaming'
  | 'Economy'
  | 'Fun'
  | 'Leveling'
  | 'Utility'
  | 'Roleplay'
  | 'Cryptocurrency';
