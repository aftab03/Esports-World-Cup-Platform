
import React, { useState } from 'react';
import { Search, Trophy, ArrowLeft, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BracketMatch } from '../types';

export const Competitions: React.FC = () => {
  const { games, tournaments } = useAppContext();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'FPS', 'MOBA', 'Battle Royale', 'Fighting', 'Sports'];

  const filteredGames = filter === 'All' ? games : games.filter(g => g.category === filter);
  const selectedTournament = tournaments.find(t => t.gameId === selectedGameId);

  // Bracket Render Helper
  const BracketColumn = ({ title, matches }: { title: string, matches: BracketMatch[] }) => (
    <div className="flex flex-col gap-8 min-w-[250px]">
      <div className="text-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{title}</div>
      <div className="flex flex-col justify-around h-full gap-8">
        {matches.map(match => (
           <div key={match.id} className="bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden relative">
             {match.status === 'Live' && <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 animate-pulse m-2 rounded-full"></div>}
             <div className={`p-3 flex justify-between items-center ${match.winner === 'A' ? 'bg-ewc-gold/10' : ''}`}>
                <span className={`font-bold ${match.winner === 'A' ? 'text-ewc-gold' : 'text-white'}`}>{match.teamA || 'TBD'}</span>
                <span className="font-mono">{match.scoreA ?? '-'}</span>
             </div>
             <div className="h-px bg-white/5"></div>
             <div className={`p-3 flex justify-between items-center ${match.winner === 'B' ? 'bg-ewc-gold/10' : ''}`}>
                <span className={`font-bold ${match.winner === 'B' ? 'text-ewc-gold' : 'text-white'}`}>{match.teamB || 'TBD'}</span>
                <span className="font-mono">{match.scoreB ?? '-'}</span>
             </div>
           </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      
      {/* Detail View */}
      {selectedGameId ? (
         <div className="animate-fade-in">
            <button 
              onClick={() => setSelectedGameId(null)} 
              className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} /> Back to Games
            </button>
            
            {/* Tournament Header */}
            <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden mb-8">
              <div className="h-48 md:h-64 relative">
                 <img 
                   src={games.find(g => g.id === selectedGameId)?.image} 
                   className="w-full h-full object-cover opacity-50" 
                   alt=""
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8">
                    <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-2">
                      {selectedTournament?.name || 'Tournament Details'}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm font-medium">
                      <span className="bg-ewc-gold text-black px-3 py-1 rounded font-bold">{selectedTournament?.status}</span>
                      <span className="bg-white/10 px-3 py-1 rounded text-white border border-white/10 flex items-center gap-2">
                         <Trophy size={14} className="text-ewc-gold" /> $10,000,000 Prize Pool
                      </span>
                      <span className="bg-white/10 px-3 py-1 rounded text-white border border-white/10 flex items-center gap-2">
                         <Calendar size={14} /> July 14 - July 21
                      </span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Bracket Visualization */}
            {selectedTournament && selectedTournament.bracket.length > 0 ? (
              <div className="overflow-x-auto custom-scrollbar pb-8">
                <div className="flex gap-16 min-w-[800px] px-4">
                  <BracketColumn title="Quarter Finals" matches={selectedTournament.bracket.filter(m => m.round === 0)} />
                  <div className="flex items-center justify-center pt-8 opacity-20"><ArrowLeft size={32} className="rotate-180"/></div>
                  <BracketColumn title="Semi Finals" matches={selectedTournament.bracket.filter(m => m.round === 1)} />
                  <div className="flex items-center justify-center pt-8 opacity-20"><ArrowLeft size={32} className="rotate-180"/></div>
                  <BracketColumn title="Grand Final" matches={selectedTournament.bracket.filter(m => m.round === 2)} />
                </div>
              </div>
            ) : (
               <div className="text-center py-20 bg-[#111] rounded-xl border border-white/5 text-gray-500">
                  <Trophy size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Bracket information is not yet available for this tournament.</p>
               </div>
            )}

         </div>
      ) : (
        /* Grid View */
        <>
          <div className="mb-12 animate-fade-in-down">
            <h1 className="text-5xl font-display font-black text-white mb-4">COMPETITIONS</h1>
            <p className="text-xl text-gray-400">20+ Games. The World's Best Clubs. One Champion.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8 justify-between items-center animate-fade-in">
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto custom-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    filter === cat 
                    ? 'bg-ewc-gold text-black' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search game..." 
                className="w-full bg-[#111] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:border-ewc-gold/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
            {filteredGames.map(game => (
              <div 
                key={game.id} 
                onClick={() => setSelectedGameId(game.id)}
                className="bg-[#111] rounded-xl overflow-hidden border border-white/5 group hover:border-ewc-gold/50 transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative h-48">
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${
                      game.status === 'Live' ? 'bg-ewc-accent text-black animate-pulse' : 
                      game.status === 'Completed' ? 'bg-gray-700 text-gray-300' : 'bg-ewc-gold text-black'
                    }`}>
                      {game.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="px-4 py-2 border border-white text-white font-bold rounded uppercase tracking-wider text-sm">View Details</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{game.category}</div>
                  <h3 className="text-xl font-bold font-display text-white mb-3">{game.title}</h3>
                  <div className="flex items-center gap-2 text-ewc-gold text-sm font-mono bg-ewc-gold/5 p-2 rounded border border-ewc-gold/10">
                    <Trophy size={14} />
                    <span>{game.prizePool}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
