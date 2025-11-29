
import { Game, Club, Match, NewsItem, FantasyPlayer, Tournament, ClubRanking, StreamChannel, ChatMessage, Poll } from './types';

export const GAMES: Game[] = [
  { id: 'lol', title: 'League of Legends', category: 'MOBA', prizePool: '$10,000,000', image: 'https://picsum.photos/800/450?random=1', status: 'Live' },
  { id: 'cs2', title: 'Counter-Strike 2', category: 'FPS', prizePool: '$8,000,000', image: 'https://picsum.photos/800/450?random=2', status: 'Upcoming' },
  { id: 'dota2', title: 'DOTA 2', category: 'MOBA', prizePool: '$15,000,000', image: 'https://picsum.photos/800/450?random=3', status: 'Live' },
  { id: 'tekken8', title: 'Tekken 8', category: 'Fighting', prizePool: '$2,000,000', image: 'https://picsum.photos/800/450?random=4', status: 'Completed' },
  { id: 'pubg', title: 'PUBG Mobile', category: 'Battle Royale', prizePool: '$5,000,000', image: 'https://picsum.photos/800/450?random=5', status: 'Upcoming' },
  { id: 'rl', title: 'Rocket League', category: 'Sports', prizePool: '$3,000,000', image: 'https://picsum.photos/800/450?random=6', status: 'Completed' },
  { id: 'sc2', title: 'StarCraft II', category: 'Strategy', prizePool: '$1,000,000', image: 'https://picsum.photos/800/450?random=7', status: 'Upcoming' },
  { id: 'sf6', title: 'Street Fighter 6', category: 'Fighting', prizePool: '$1,500,000', image: 'https://picsum.photos/800/450?random=8', status: 'Completed' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://picsum.photos/1920/1080?random=101',
    title: 'THE WORLD COMES TO RIYADH',
    subtitle: '$60,000,000+ Prize Pool. 20+ Games. History in the making.',
    cta: 'View Schedule',
    ctaLink: 'schedule'
  },
  {
    id: 2,
    image: 'https://picsum.photos/1920/1080?random=102',
    title: 'CLUB CHAMPIONSHIP',
    subtitle: 'One Club to Rule Them All. Who will take the crown?',
    cta: 'View Standings',
    ctaLink: 'ranking'
  },
  {
    id: 3,
    image: 'https://picsum.photos/1920/1080?random=103',
    title: 'FANTASY LEAGUE IS LIVE',
    subtitle: 'Draft your dream team and win exclusive rewards.',
    cta: 'Play Now',
    ctaLink: 'fantasy'
  }
];

export const CLUBS: Club[] = [
  { id: '1', name: 'Team Falcons', points: 5200, rank: 1, earnings: '$7,000,000', logo: '🦅', trend: 'stable' },
  { id: '2', name: 'Team Liquid', points: 4100, rank: 2, earnings: '$4,500,000', logo: '💧', trend: 'up' },
  { id: '3', name: 'G2 Esports', points: 3800, rank: 3, earnings: '$3,200,000', logo: '⚔️', trend: 'down' },
  { id: '4', name: 'T1', points: 3500, rank: 4, earnings: '$2,800,000', logo: '🔴', trend: 'up' },
  { id: '5', name: 'Vitality', points: 3100, rank: 5, earnings: '$2,100,000', logo: '🐝', trend: 'stable' },
];

export const CLUB_RANKINGS: ClubRanking[] = [
  { 
    id: '1', name: 'Team Falcons', points: 5200, rank: 1, earnings: '$7,000,000', logo: '🦅', trend: 'stable',
    breakdown: [{ gameId: 'cs2', points: 1000, rank: 1 }, { gameId: 'dota2', points: 800, rank: 2 }, { gameId: 'pubg', points: 1500, rank: 1 }]
  },
  { 
    id: '2', name: 'Team Liquid', points: 4100, rank: 2, earnings: '$4,500,000', logo: '💧', trend: 'up',
    breakdown: [{ gameId: 'dota2', points: 1000, rank: 1 }, { gameId: 'lol', points: 600, rank: 4 }, { gameId: 'cs2', points: 500, rank: 5 }]
  },
  { 
    id: '3', name: 'G2 Esports', points: 3800, rank: 3, earnings: '$3,200,000', logo: '⚔️', trend: 'down',
    breakdown: [{ gameId: 'cs2', points: 800, rank: 2 }, { gameId: 'lol', points: 800, rank: 2 }, { gameId: 'rl', points: 600, rank: 3 }]
  },
  { 
    id: '4', name: 'T1', points: 3500, rank: 4, earnings: '$2,800,000', logo: '🔴', trend: 'up',
    breakdown: [{ gameId: 'lol', points: 1000, rank: 1 }, { gameId: 'tekken8', points: 200, rank: 8 }]
  },
];

export const FANTASY_PLAYERS: FantasyPlayer[] = [
  { id: 'p1', name: 'Faker', team: 'T1', role: 'Mid', cost: 15, avgPoints: 24.5, game: 'League of Legends', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Faker&background=ff0000&color=fff' },
  { id: 'p2', name: 'S1mple', team: 'Falcons', role: 'AWP', cost: 14, avgPoints: 22.1, game: 'CS2', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=S1mple&background=00ff00&color=000' },
  { id: 'p3', name: 'Chovy', team: 'Gen.G', role: 'Mid', cost: 13, avgPoints: 21.8, game: 'League of Legends', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Chovy&background=0000ff&color=fff' },
  { id: 'p4', name: 'Zywoo', team: 'Vitality', role: 'AWP', cost: 14, avgPoints: 23.0, game: 'CS2', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Zywoo&background=ffff00&color=000' },
  { id: 'p5', name: 'Caps', team: 'G2', role: 'Mid', cost: 12, avgPoints: 19.5, game: 'League of Legends', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Caps&background=ff00ff&color=fff' },
  { id: 'p6', name: 'Keria', team: 'T1', role: 'Supp', cost: 11, avgPoints: 18.2, game: 'League of Legends', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Keria&background=ff0000&color=fff' },
  { id: 'p7', name: 'Zeus', team: 'T1', role: 'Top', cost: 13, avgPoints: 20.5, game: 'League of Legends', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Zeus&background=ff0000&color=fff' },
  { id: 'p8', name: 'Oner', team: 'T1', role: 'Jungle', cost: 12, avgPoints: 19.0, game: 'League of Legends', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Oner&background=ff0000&color=fff' },
  { id: 'p9', name: 'Gumayusi', team: 'T1', role: 'ADC', cost: 14, avgPoints: 22.0, game: 'League of Legends', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Gumayusi&background=ff0000&color=fff' },
  { id: 'p10', name: 'Canyon', team: 'Gen.G', role: 'Jungle', cost: 13, avgPoints: 21.2, game: 'League of Legends', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Canyon&background=0000ff&color=fff' },
  { id: 'p11', name: 'Peyz', team: 'Gen.G', role: 'ADC', cost: 12, avgPoints: 20.8, game: 'League of Legends', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Peyz&background=0000ff&color=fff' },
  { id: 'p12', name: 'Kiin', team: 'Gen.G', role: 'Top', cost: 11, avgPoints: 18.5, game: 'League of Legends', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Kiin&background=0000ff&color=fff' },
  { id: 'p13', name: 'Lehends', team: 'Gen.G', role: 'Supp', cost: 10, avgPoints: 17.5, game: 'League of Legends', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Lehends&background=0000ff&color=fff' },
  { id: 'p14', name: 'Niko', team: 'G2', role: 'Rifler', cost: 13, avgPoints: 20.1, game: 'CS2', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Niko&background=ff00ff&color=fff' },
  { id: 'p15', name: 'm0NESY', team: 'G2', role: 'AWP', cost: 14, avgPoints: 23.5, game: 'CS2', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=m0NESY&background=ff00ff&color=fff' },
];

export const MATCHES: Match[] = [
  { 
    id: 'm1', 
    gameId: 'lol', 
    teamA: 'T1', 
    teamB: 'Gen.G', 
    scoreA: 2, 
    scoreB: 1, 
    time: 'Live', 
    status: 'Live', 
    stage: 'Semi-Finals',
    details: {
      currentMap: 4,
      maxMaps: 5,
      maps: [
        { id: 1, scoreA: 18, scoreB: 12, winner: 'A', status: 'Finished' },
        { id: 2, scoreA: 5, scoreB: 22, winner: 'B', status: 'Finished' },
        { id: 3, scoreA: 24, scoreB: 20, winner: 'A', status: 'Finished' },
        { id: 4, scoreA: 4, scoreB: 3, status: 'Live' }
      ],
      playersA: [
        { playerId: 'p1', stats: { kills: 2, deaths: 0, assists: 2, creepScore: 145, fantasyPoints: 12.5 } },
        { playerId: 'p7', stats: { kills: 1, deaths: 1, assists: 1, creepScore: 120, fantasyPoints: 8.0 } },
        { playerId: 'p8', stats: { kills: 0, deaths: 0, assists: 3, creepScore: 95, fantasyPoints: 9.5 } },
        { playerId: 'p9', stats: { kills: 1, deaths: 0, assists: 1, creepScore: 160, fantasyPoints: 11.0 } },
        { playerId: 'p6', stats: { kills: 0, deaths: 1, assists: 3, creepScore: 20, fantasyPoints: 7.5 } },
      ],
      playersB: [
        { playerId: 'p3', stats: { kills: 1, deaths: 1, assists: 1, creepScore: 150, fantasyPoints: 9.0 } },
        { playerId: 'p12', stats: { kills: 0, deaths: 1, assists: 2, creepScore: 110, fantasyPoints: 6.5 } },
        { playerId: 'p10', stats: { kills: 1, deaths: 1, assists: 1, creepScore: 100, fantasyPoints: 8.5 } },
        { playerId: 'p11', stats: { kills: 1, deaths: 1, assists: 0, creepScore: 155, fantasyPoints: 10.0 } },
        { playerId: 'p13', stats: { kills: 0, deaths: 0, assists: 3, creepScore: 15, fantasyPoints: 8.0 } },
      ]
    }
  },
  { id: 'm2', gameId: 'dota2', teamA: 'Liquid', teamB: 'Spirit', scoreA: 0, scoreB: 0, time: '18:00 UTC', status: 'Scheduled', stage: 'Group Stage' },
  { id: 'm3', gameId: 'cs2', teamA: 'FaZe', teamB: 'Navi', scoreA: 16, scoreB: 14, time: 'Finished', status: 'Finished', stage: 'Grand Final' },
];

export const TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    gameId: 'lol',
    name: 'League of Legends Championship',
    status: 'Live',
    bracket: [
      // Quarter Finals
      { id: 'q1', round: 0, teamA: 'T1', teamB: 'BLG', scoreA: 3, scoreB: 1, winner: 'A', status: 'Finished' },
      { id: 'q2', round: 0, teamA: 'Gen.G', teamB: 'TES', scoreA: 3, scoreB: 0, winner: 'A', status: 'Finished' },
      { id: 'q3', round: 0, teamA: 'G2', teamB: 'HLE', scoreA: 3, scoreB: 2, winner: 'A', status: 'Finished' },
      { id: 'q4', round: 0, teamA: 'Liquid', teamB: 'WBG', scoreA: 1, scoreB: 3, winner: 'B', status: 'Finished' },
      // Semi Finals
      { id: 's1', round: 1, teamA: 'T1', teamB: 'Gen.G', scoreA: 2, scoreB: 1, status: 'Live' },
      { id: 's2', round: 1, teamA: 'G2', teamB: 'WBG', status: 'Scheduled' },
      // Final
      { id: 'f1', round: 2, teamA: 'TBD', teamB: 'TBD', status: 'Scheduled' },
    ]
  },
  {
    id: 't2',
    gameId: 'cs2',
    name: 'CS2 Major Riyadh',
    status: 'Upcoming',
    bracket: []
  }
];

export const NEWS: NewsItem[] = [
  { id: 'n1', title: 'Falcons Secure Club Championship Lead', summary: 'With a dominant performance in Warzone, Team Falcons extends their lead.', category: 'Club Championship', image: 'https://picsum.photos/600/400?random=10', date: '2h ago' },
  { id: 'n2', title: 'New Format Announced for CS2 Finals', summary: 'The organizers have revealed a double-elimination bracket for the playoffs.', category: 'Competitions', image: 'https://picsum.photos/600/400?random=11', date: '5h ago' },
  { id: 'n3', title: 'Fantasy League: Week 4 Top Picks', summary: 'Our analysts break down the best value players for the upcoming MOBA week.', category: 'Fantasy', image: 'https://picsum.photos/600/400?random=12', date: '1d ago' },
];

export const STREAM_CHANNELS: StreamChannel[] = [
  { id: 'main', name: 'Main Broadcast', type: 'Main', viewers: 842000 },
  { id: 'teamA', name: 'T1 Perspective', type: 'POV', viewers: 120000 },
  { id: 'teamB', name: 'Gen.G Perspective', type: 'POV', viewers: 95000 },
  { id: 'map', name: 'Tactical Map', type: 'Map', viewers: 45000 },
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: '1', user: 'FakerFan99', text: 'WHAT WAS THAT PLAY?!', color: '#ff4444' },
  { id: '2', user: 'EsportsEnjoyer', text: 'T1 fighting!!!', color: '#ffffff' },
  { id: '3', user: 'GenG_Win', text: 'Chovy is farming so well', color: '#4488ff' },
  { id: '4', user: 'ModBot', text: 'Welcome to the official stream! Be respectful.', isMod: true, color: '#00ff88' },
  { id: '5', user: 'SilverScrapes', text: 'Game 5 incoming?', color: '#aaaaaa' },
];

export const INITIAL_POLL: Poll = {
  id: 'p1',
  question: 'Who wins Map 4?',
  isActive: true,
  totalVotes: 15420,
  options: [
    { id: 'opt1', label: 'T1', votes: 8420, percentage: 54 },
    { id: 'opt2', label: 'Gen.G', votes: 7000, percentage: 46 }
  ]
};
