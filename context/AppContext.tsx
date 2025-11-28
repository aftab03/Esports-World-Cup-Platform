
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  GAMES as INITIAL_GAMES, 
  MATCHES as INITIAL_MATCHES, 
  NEWS as INITIAL_NEWS, 
  CLUBS as INITIAL_CLUBS, 
  TOURNAMENTS as INITIAL_TOURNAMENTS, 
  FANTASY_PLAYERS as INITIAL_FANTASY_PLAYERS,
  CLUB_RANKINGS as INITIAL_CLUB_RANKINGS,
  MOCK_CHAT_MESSAGES,
  INITIAL_POLL
} from '../constants';
import { Game, Match, NewsItem, Club, Tournament, FantasyPlayer, ClubRanking, ChatMessage, Poll, AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [clubs, setClubs] = useState<Club[]>(INITIAL_CLUBS);
  const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);
  const [fantasyPlayers, setFantasyPlayers] = useState<FantasyPlayer[]>(INITIAL_FANTASY_PLAYERS);
  const [clubRankings, setClubRankings] = useState<ClubRanking[]>(INITIAL_CLUB_RANKINGS);
  
  // User State
  const [userFantasyTeam, setUserFantasyTeam] = useState<FantasyPlayer[]>([]);

  // Stream & Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [activePoll, setActivePoll] = useState<Poll | null>(INITIAL_POLL);
  const [viewerCount, setViewerCount] = useState(842105);

  // SIMULATE LIVE DATA UPDATES
  useEffect(() => {
    // 1. Match & Fantasy Updates (Every 2s)
    const matchInterval = setInterval(() => {
      setMatches(prevMatches => {
        return prevMatches.map(match => {
          if (match.status !== 'Live' || !match.details) return match;
          
          const newDetails = JSON.parse(JSON.stringify(match.details));
          const currentMapIdx = newDetails.currentMap - 1;
          
          if (newDetails.maps[currentMapIdx] && newDetails.maps[currentMapIdx].status === 'Live') {
             // Simulate score updates
             if (Math.random() > 0.8) {
                if (Math.random() > 0.5) newDetails.maps[currentMapIdx].scoreA += 1;
                else newDetails.maps[currentMapIdx].scoreB += 1;
             }
             
             // Simulate player stats updates (Kills/Deaths/Assists)
             if (Math.random() > 0.6) {
                // Pick random player from Team A
                const pA = newDetails.playersA[Math.floor(Math.random() * newDetails.playersA.length)];
                if (pA) {
                    pA.stats.kills += 1;
                    pA.stats.fantasyPoints += 3;
                    pA.stats.creepScore = (pA.stats.creepScore || 0) + Math.floor(Math.random() * 3);
                }

                // Pick random player from Team B
                const pB = newDetails.playersB[Math.floor(Math.random() * newDetails.playersB.length)];
                if (pB) {
                    pB.stats.deaths += 1;
                    pB.stats.fantasyPoints = Math.max(0, pB.stats.fantasyPoints - 1);
                }
             }
          }
          return { ...match, details: newDetails };
        });
      });
    }, 2000);

    // 2. Viewer Count Fluctuation (Every 3s)
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 500) - 200);
    }, 3000);

    // 3. Live Chat Simulation (Every 1.5s)
    const chatInterval = setInterval(() => {
      const randomMsg = {
        id: Date.now().toString() + Math.random(),
        user: `User${Math.floor(Math.random() * 1000)}`,
        text: ['POG', 'LUL', 'OMG!', 'Insane reflex', 'gg', 'EZ', 'What a throw', 'Faker!', 'Nice try'][Math.floor(Math.random() * 9)],
        color: ['#ff5555', '#55ff55', '#5555ff', '#ffff55', '#ff55ff'][Math.floor(Math.random() * 5)]
      };
      setChatMessages(prev => [...prev.slice(-49), randomMsg]);
    }, 1500);

    // 4. Poll Voting Simulation (Every 4s)
    const pollInterval = setInterval(() => {
       setActivePoll(prev => {
         if (!prev || !prev.isActive) return prev;
         const randomOptionIdx = Math.floor(Math.random() * prev.options.length);
         const newOptions = [...prev.options];
         newOptions[randomOptionIdx].votes += Math.floor(Math.random() * 10) + 1;
         
         const newTotal = newOptions.reduce((acc, curr) => acc + curr.votes, 0);
         newOptions.forEach(opt => {
           opt.percentage = Math.round((opt.votes / newTotal) * 100);
         });

         return { ...prev, options: newOptions, totalVotes: newTotal };
       });
    }, 1000);

    return () => {
      clearInterval(matchInterval);
      clearInterval(viewerInterval);
      clearInterval(chatInterval);
      clearInterval(pollInterval);
    };
  }, []);

  const updateMatch = (updatedMatch: Match) => {
    setMatches(prev => prev.map(m => m.id === updatedMatch.id ? updatedMatch : m));
  };

  const updateMatchStatus = (matchId: string, status: 'Live' | 'Finished' | 'Scheduled') => {
    setMatches(prev => prev.map(m => {
        if (m.id !== matchId) return m;
        // If we make a match Live, ensure game status is also Live
        if (status === 'Live') {
             setGames(gs => gs.map(g => g.id === m.gameId ? { ...g, status: 'Live' } : g));
        }
        return { ...m, status };
    }));
  };

  const addNews = (newsItem: NewsItem) => {
    setNews(prev => [newsItem, ...prev]);
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const updateFantasyPlayer = (player: FantasyPlayer) => {
    setFantasyPlayers(prev => prev.map(p => p.id === player.id ? player : p));
  };

  const addToFantasyTeam = (player: FantasyPlayer) => {
    if (userFantasyTeam.length >= 5) return;
    setUserFantasyTeam(prev => [...prev, player]);
  };

  const removeFromFantasyTeam = (playerId: string) => {
    setUserFantasyTeam(prev => prev.filter(p => p.id !== playerId));
  };

  const addChatMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      text,
      color: '#d4af37' // Gold color for current user
    };
    setChatMessages(prev => [...prev.slice(-49), newMsg]);
  };

  const votePoll = (optionId: string) => {
    setActivePoll(prev => {
      if (!prev) return null;
      const newOptions = prev.options.map(opt => 
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );
      const newTotal = newOptions.reduce((acc, curr) => acc + curr.votes, 0);
      newOptions.forEach(opt => {
         opt.percentage = Math.round((opt.votes / newTotal) * 100);
      });
      return { ...prev, options: newOptions, totalVotes: newTotal };
    });
  };

  return (
    <AppContext.Provider value={{
      games, matches, news, clubs, tournaments, fantasyPlayers, clubRankings,
      userFantasyTeam,
      chatMessages, activePoll, viewerCount,
      updateMatch, updateMatchStatus, addNews, deleteNews, updateFantasyPlayer, 
      addToFantasyTeam, removeFromFantasyTeam,
      addChatMessage, votePoll
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
