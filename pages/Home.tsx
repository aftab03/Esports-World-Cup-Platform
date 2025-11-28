
import React, { useState, useEffect } from 'react';
import { Play, Calendar, Trophy, ArrowRight, TrendingUp, Target, Shield, Clock } from 'lucide-react';
import { NavSection, Match } from '../types';
import { useAppContext } from '../context/AppContext';
import { StreamPlayer } from '../components/StreamPlayer';
import { LiveChat } from '../components/LiveChat';

interface HomeProps {
  onNavigate: (section: NavSection) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { matches, games, clubs, news, fantasyPlayers, viewerCount } = useAppContext();
  
  // Find the live match from global state (updated by Context)
  const liveMatch = matches.find(m => m.status === 'Live');
  const [showStats, setShowStats] = useState(false);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Dynamic Hero Section */}
      {liveMatch ? (
         // LIVE MATCH STREAMING MODE
         <section className="pt-24 pb-8 max-w-[1600px] mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
               {/* Main Stream Area */}
               <div className="lg:col-span-3">
                  <StreamPlayer viewerCount={viewerCount} />
                  
                  {/* Match Info Bar */}
                  <div className="mt-4 bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                     <div className="flex items-center gap-6">
                        <div className="text-center">
                           <div className="text-3xl font-bold font-display">{liveMatch.teamA}</div>
                           <div className="text-2xl font-mono font-bold text-ewc-gold">{liveMatch.scoreA}</div>
                        </div>
                        <div className="text-sm font-bold text-gray-500 uppercase">VS</div>
                        <div className="text-center">
                           <div className="text-3xl font-bold font-display">{liveMatch.teamB}</div>
                           <div className="text-2xl font-mono font-bold text-ewc-gold">{liveMatch.scoreB}</div>
                        </div>
                     </div>
                     <div className="h-10 w-px bg-white/10 hidden md:block"></div>
                     <div className="flex items-center gap-4">
                        <div className="text-right">
                           <div className="text-sm font-bold text-white">{games.find(g => g.id === liveMatch.gameId)?.title}</div>
                           <div className="text-xs text-gray-400">{liveMatch.stage} • Best of {liveMatch.details?.maxMaps}</div>
                        </div>
                        <img src={games.find(g => g.id === liveMatch.gameId)?.image} className="w-12 h-12 rounded object-cover border border-white/10" alt=""/>
                     </div>
                     <div className="h-10 w-px bg-white/10 hidden md:block"></div>
                     <button 
                        onClick={() => setShowStats(!showStats)}
                        className={`px-6 py-2 rounded font-bold border transition-all ${
                           showStats ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-ewc-gold hover:text-ewc-gold'
                        }`}
                     >
                        {showStats ? 'Hide Stats' : 'View Stats'}
                     </button>
                  </div>

                  {/* Collapsible Stats Panel */}
                  {showStats && liveMatch.details && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-down">
                      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                        <div className="bg-white/5 p-3 font-bold text-center border-b border-white/10 text-sm">{liveMatch.teamA}</div>
                        <table className="w-full text-xs text-left">
                          <thead className="text-gray-500 bg-black/20">
                            <tr><th className="p-2">Player</th><th className="p-2 text-center">K</th><th className="p-2 text-center">D</th><th className="p-2 text-center">A</th></tr>
                          </thead>
                          <tbody>
                            {liveMatch.details.playersA.map((p, i) => (
                               <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                  <td className="p-2 font-bold">{fantasyPlayers.find(fp => fp.id === p.playerId)?.name || 'Player'}</td>
                                  <td className="p-2 text-center text-white">{p.stats.kills}</td>
                                  <td className="p-2 text-center text-gray-500">{p.stats.deaths}</td>
                                  <td className="p-2 text-center text-gray-500">{p.stats.assists}</td>
                               </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                        <div className="bg-white/5 p-3 font-bold text-center border-b border-white/10 text-sm">{liveMatch.teamB}</div>
                         <table className="w-full text-xs text-left">
                          <thead className="text-gray-500 bg-black/20">
                            <tr><th className="p-2">Player</th><th className="p-2 text-center">K</th><th className="p-2 text-center">D</th><th className="p-2 text-center">A</th></tr>
                          </thead>
                          <tbody>
                            {liveMatch.details.playersB.map((p, i) => (
                               <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                  <td className="p-2 font-bold">{fantasyPlayers.find(fp => fp.id === p.playerId)?.name || 'Player'}</td>
                                  <td className="p-2 text-center text-white">{p.stats.kills}</td>
                                  <td className="p-2 text-center text-gray-500">{p.stats.deaths}</td>
                                  <td className="p-2 text-center text-gray-500">{p.stats.assists}</td>
                               </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
               </div>

               {/* Live Chat Column */}
               <div className="hidden lg:block lg:col-span-1">
                  <LiveChat />
               </div>
            </div>
         </section>
      ) : (
         // DEFAULT HERO (NO LIVE MATCH)
         <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 z-0">
             <img 
               src="https://picsum.photos/1920/1080?random=99" 
               alt="Hero Background" 
               className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
           </div>
           
           <div className="relative z-10 text-center max-w-5xl px-4">
             <h2 className="text-ewc-gold font-display font-bold tracking-[0.2em] mb-4 text-lg md:text-xl uppercase animate-fade-in-down">
               The World's Largest Esports Festival
             </h2>
             <h1 className="text-5xl md:text-9xl font-black text-white font-display mb-6 leading-none tracking-tighter shadow-xl">
               ESPORTS <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-ewc-gold to-yellow-200">WORLD CUP</span>
             </h1>
             <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
               $60,000,000+ Prize Pool. 20+ Games. 8 Weeks.
               <br/><span className="text-ewc-gold font-bold">History is being written in Riyadh.</span>
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button onClick={() => onNavigate(NavSection.SCHEDULE)} className="px-8 py-4 bg-ewc-gold text-black font-bold text-lg rounded hover:bg-white transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                 <Calendar size={20} />
                 View Schedule
               </button>
               <button onClick={() => onNavigate(NavSection.COMPETITIONS)} className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                 <Trophy size={20} />
                 Explore Games
               </button>
             </div>
           </div>
         </section>
      )}

      {/* Competitions Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold font-display mb-2">Featured Competitions</h2>
            <div className="w-20 h-1 bg-ewc-gold"></div>
          </div>
          <button onClick={() => onNavigate(NavSection.COMPETITIONS)} className="text-ewc-gold flex items-center gap-2 hover:text-white transition-colors">
            View All Games <ArrowRight size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.slice(0, 3).map(game => (
            <div key={game.id} className="group relative overflow-hidden rounded-xl h-64 border border-white/10 cursor-pointer">
              <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <span className="px-2 py-1 bg-ewc-gold text-black text-xs font-bold rounded mb-2 inline-block">
                  {game.prizePool}
                </span>
                <h3 className="text-2xl font-bold font-display text-white mb-1">{game.title}</h3>
                <p className="text-gray-400 text-sm">{game.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Club Championship Leaderboard */}
      <section className="bg-[#111] py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <span className="text-ewc-gold font-bold tracking-widest uppercase mb-2 block">Club Championship</span>
              <h2 className="text-4xl font-display font-bold mb-6">Who Will Rule Them All?</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                The Club Championship is a unique cross-game competition awarding a total of $20M to the top 16 clubs. Every match counts towards the ultimate title.
              </p>
              <button onClick={() => onNavigate(NavSection.RANKING)} className="px-6 py-3 border border-white/20 rounded hover:bg-white hover:text-black transition-all">
                View Full Standings
              </button>
            </div>
            
            <div className="md:w-2/3 w-full">
              <div className="bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-sm text-gray-500 font-medium">
                  <div className="col-span-1 text-center">Rank</div>
                  <div className="col-span-5">Club</div>
                  <div className="col-span-3 text-right">Points</div>
                  <div className="col-span-3 text-right">Earnings</div>
                </div>
                {clubs.slice(0, 5).map((club, idx) => (
                  <div key={club.id} className={`grid grid-cols-12 gap-4 p-4 items-center border-b border-white/5 hover:bg-white/5 transition-colors ${idx === 0 ? 'bg-ewc-gold/5' : ''}`}>
                    <div className="col-span-1 text-center font-bold text-lg text-gray-400">
                      {idx === 0 ? '👑' : `#${club.rank}`}
                    </div>
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xl">
                        {club.logo}
                      </div>
                      <span className={`font-bold ${idx === 0 ? 'text-ewc-gold' : 'text-white'}`}>{club.name}</span>
                    </div>
                    <div className="col-span-3 text-right font-mono font-bold text-ewc-gold">{club.points.toLocaleString()} pts</div>
                    <div className="col-span-3 text-right text-gray-400 text-sm">{club.earnings}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-3xl font-bold font-display">Latest Updates</h2>
           <button onClick={() => onNavigate(NavSection.NEWS)} className="text-gray-400 hover:text-white">View All News</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.slice(0, 3).map(n => (
            <div key={n.id} className="bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-ewc-gold/50 transition-colors group cursor-pointer" onClick={() => onNavigate(NavSection.NEWS)}>
              <div className="h-48 overflow-hidden">
                <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3 text-xs text-gray-500 uppercase tracking-wider">
                  <span className="text-ewc-gold">{n.category}</span>
                  <span>{n.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-ewc-gold transition-colors">{n.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{n.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
