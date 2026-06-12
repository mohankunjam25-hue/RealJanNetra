// Governance Hierarchy Types
export type AdministrativeLevel = 'central' | 'state' | 'district' | 'block' | 'village';

export interface UserLocation {
  state: string;
  district: string;
  block?: string;
  village?: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  level: AdministrativeLevel;
  imageUrl?: string;
  verified: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  type: string; // e.g., 'Financial', 'Health', 'Education'
  level: AdministrativeLevel;
  description: string;
  link?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  location: UserLocation;
  voiceCount: number;
  championsCount: number;
  alliesCount: number;
  contributionScore: number;
  reputationScore: number;
  joinedDate: string;
  isVerified: boolean;
  interests: string[];
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
}
