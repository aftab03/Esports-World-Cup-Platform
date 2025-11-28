
export interface Game {
  id: string;
  title: string;
  category: 'FPS' | 'MOBA' | 'Battle Royale' | 'Fighting' | 'Strategy' | 'Sports';
  prizePool: string;
  image: string;
  status: 'Live' | 'Upcoming' | 'Completed';
}

export interface Club {
  id: string;
  name: string;
  points: number;
  rank: number;
  earnings: string;
  logo: string;
  trend: 'up' | 'down' | 'stable';
}

export interface ClubRanking extends Club {
  breakdown: { gameId: string; points: number; rank: number }[];
}

export interface PlayerStats {
  kills: number;
  deaths: number;
  assists: number;
  creepScore?: number; // MOBA specific
  damage?: number;
  fantasyPoints: number;
}

export interface MatchDetails {
  currentMap: number;
  maxMaps: number;
  maps: {
    id: number;
    winner?: 'A' | 'B';
    scoreA: number; // e.g. Rounds won
    scoreB: number;
    status: 'Finished' | 'Live' | 'Scheduled';
  }[];
  playersA: { playerId: string; stats: PlayerStats }[];
  playersB: { playerId: string; stats: PlayerStats }[];
}

export interface Match {
  id: string;
  gameId: string;
  teamA: string;
  teamB: string;
  scoreA?: number; // Maps won
  scoreB?: number;
  time: string;
  status: 'Live' | 'Scheduled' | 'Finished';
  stage: string;
  details?: MatchDetails;
}

export interface BracketMatch {
  id: string;
  round: number; // 0 = Quarter, 1 = Semi, 2 = Final
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  winner?: 'A' | 'B';
  status: 'Scheduled' | 'Live' | 'Finished';
}

export interface Tournament {
  id: string;
  gameId: string;
  name: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  bracket: BracketMatch[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  date: string;
}

export interface FantasyPlayer {
  id: string;
  name: string;
  team: string;
  role: string;
  cost: number;
  avgPoints: number;
  game: string;
  avatar?: string;
  status: 'Active' | 'Bench' | 'Injured';
  liveStats?: PlayerStats; // For real-time scoring
}

// --- STREAMING & CHAT TYPES ---
export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  isMod?: boolean;
  color?: string; // Hex color for username
}

export interface StreamChannel {
  id: string;
  name: string;
  type: 'Main' | 'POV' | 'Map' | 'Stats';
  viewers: number;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
  percentage: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  isActive: boolean;
  totalVotes: number;
}

export enum NavSection {
  HOME = 'home',
  COMPETITIONS = 'competitions',
  FANTASY = 'fantasy',
  RANKING = 'ranking',
  SCHEDULE = 'schedule',
  NEWS = 'news',
  FESTIVAL = 'festival',
  GALLERY = 'gallery',
  PARTNERS = 'partners',
  ADMIN = 'admin'
}

export interface AppContextType {
  games: Game[];
  matches: Match[];
  news: NewsItem[];
  clubs: Club[];
  tournaments: Tournament[];
  fantasyPlayers: FantasyPlayer[];
  clubRankings: ClubRanking[];
  
  // User Data
  userFantasyTeam: FantasyPlayer[];
  
  // Stream & Chat State
  chatMessages: ChatMessage[];
  activePoll: Poll | null;
  viewerCount: number;
  
  // Actions
  updateMatch: (updatedMatch: Match) => void;
  updateMatchStatus: (matchId: string, status: 'Live' | 'Finished' | 'Scheduled') => void;
  addNews: (newsItem: NewsItem) => void;
  deleteNews: (id: string) => void;
  updateFantasyPlayer: (player: FantasyPlayer) => void;
  addToFantasyTeam: (player: FantasyPlayer) => void;
  removeFromFantasyTeam: (playerId: string) => void;
  addChatMessage: (text: string) => void;
  votePoll: (optionId: string) => void;
}
