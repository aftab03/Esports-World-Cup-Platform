
import React, { useState } from 'react';
import { Users, Plus, Info, Award, Search, Shield, Crosshair, Trash2, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { FantasyPlayer } from '../types';

export const Fantasy: React.FC = () => {
  const { fantasyPlayers, matches, userFantasyTeam, addToFantasyTeam, removeFromFantasyTeam } = useAppContext();
  const MAX_BUDGET = 100; // in Millions
  const TEAM_SIZE = 5;

  const [activeTab, setActiveTab] = useState<'draft' | 'my-team' | 'leaderboard'>('draft');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  
  // Calculate live scores for selected players based on matches in Context
  const getLiveScore = (playerId: string) => {
    // Find player in any live match
    const liveMatch = matches.find(m => m.status === 'Live');
    if (!liveMatch || !liveMatch.details) return null;
    
    const pA = liveMatch.details.playersA.find(p => p.playerId === playerId);
    const pB = liveMatch.details.playersB.find(p => p.playerId === playerId);
    
    return pA ? pA.stats.fantasyPoints : pB ? pB.stats.fantasyPoints : null;
  };

  const currentSpend = userFantasyTeam.reduce((acc, p) => acc + p.cost, 0);
  const remainingBudget = MAX_BUDGET - currentSpend;
  const isTeamFull = userFantasyTeam.length >= TEAM_SIZE;

  const roles = ['All', 'Mid', 'Top', 'Jungle', 'ADC', 'Supp', 'AWP', 'Rifler'];

  const filteredPlayers = fantasyPlayers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.team.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || p.role === roleFilter;
    const isSelected = userFantasyTeam.find(sp => sp.id === p.id);
    return matchesSearch && matchesRole && !isSelected;
  });

  const handleAddPlayer = (player: FantasyPlayer) => {
    if (isTeamFull) return;
    if (player.cost > remainingBudget) {
      alert("Not enough budget!");
      return;
    }
    addToFantasyTeam(player);
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
        <div>
          <h1 className="text-5xl font-display font-black text-white mb-2">FANTASY EWC</h1>
          <p className="text-xl text-gray-400">Build your dream team. Compete with fans worldwide.</p>
        </div>
        
        {/* Status Bar */}
        <div className="bg-[#111] border border-white/10 p-4 rounded-xl flex gap-8 items-center shadow-lg">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Budget</div>
            <div className={`text-2xl font-mono font-bold ${remainingBudget < 15 ? 'text-red-500' : 'text-ewc-gold'}`}>
              ${remainingBudget}M
            </div>
          </div>
          <div className="w-px h-10 bg-white/10"></div>
          <div>
             <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Squad</div>
             <div className={`text-2xl font-mono font-bold ${isTeamFull ? 'text-green-500' : 'text-white'}`}>
               {userFantasyTeam.length}/{TEAM_SIZE}
             </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 mb-8">
        {[
          { id: 'draft', label: 'Draft Players', icon: Users },
          { id: 'my-team', label: 'My Team', icon: Shield },
          { id: 'leaderboard', label: 'Leaderboard', icon: Award }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-4 flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-ewc-gold text-white bg-white/5'
                : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === 'draft' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search player or team..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:border-ewc-gold/50 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  {roles.map(role => (
                    <button
                      key={role}
                      onClick={() => setRoleFilter(role)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap ${
                        roleFilter === role ? 'bg-ewc-gold text-black' : 'bg-[#111] border border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Player List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPlayers.map(player => (
                  <div key={player.id} className="bg-[#111] border border-white/10 rounded-xl p-4 hover:border-ewc-gold/30 transition-all flex items-center gap-4 group">
                    <img src={player.avatar} alt={player.name} className="w-12 h-12 rounded-full bg-gray-800" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg leading-none">{player.name}</h3>
                        <div className="text-ewc-gold font-mono font-bold">${player.cost}M</div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span className="bg-white/10 px-2 py-0.5 rounded text-gray-300">{player.team}</span>
                        <span>•</span>
                        <span>{player.role}</span>
                        <span>•</span>
                        <span>Avg: {player.avgPoints}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddPlayer(player)}
                      disabled={isTeamFull || player.cost > remainingBudget}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-ewc-gold hover:text-black hover:border-transparent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'my-team' && (
             <div className="space-y-6">
               <div className="bg-[#0f1812] border border-white/5 rounded-xl p-8 min-h-[500px] relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] flex flex-col items-center justify-center">
                 {userFantasyTeam.length === 0 ? (
                   <div className="text-center text-gray-500">
                     <Users size={48} className="mx-auto mb-4 opacity-50" />
                     <p>Your roster is empty.</p>
                     <button onClick={() => setActiveTab('draft')} className="mt-4 text-ewc-gold hover:underline">Draft Players</button>
                   </div>
                 ) : (
                   <div className="flex flex-wrap justify-center gap-8 w-full">
                     {userFantasyTeam.map(player => {
                       const livePoints = getLiveScore(player.id);
                       return (
                         <div key={player.id} className="relative flex flex-col items-center gap-2 group animate-fade-in-up">
                           <div className="relative">
                             <img 
                               src={player.avatar} 
                               alt={player.name} 
                               className="w-20 h-20 rounded-full border-2 border-ewc-gold bg-gray-900 object-cover" 
                             />
                             {livePoints !== null && (
                               <div className="absolute -top-2 -right-2 bg-ewc-accent text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse border-2 border-black">
                                 {livePoints} pts
                               </div>
                             )}
                             <button 
                               onClick={() => removeFromFantasyTeam(player.id)}
                               className="absolute -bottom-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                               <Trash2 size={12} />
                             </button>
                           </div>
                           <div className="text-center">
                             <div className="bg-black/80 px-3 py-1 rounded text-sm font-bold border border-white/10">
                               {player.name}
                             </div>
                             <div className="text-xs text-gray-400 mt-1">{player.team}</div>
                             <div className="text-xs text-ewc-gold font-mono">${player.cost}M</div>
                           </div>
                         </div>
                       );
                     })}
                     {/* Empty Slots */}
                     {Array.from({ length: TEAM_SIZE - userFantasyTeam.length }).map((_, i) => (
                       <div key={i} className="flex flex-col items-center gap-2 opacity-50">
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center bg-black/20">
                            <Plus size={24} className="text-gray-500" />
                          </div>
                          <div className="text-xs text-gray-500">Empty Slot</div>
                       </div>
                     ))}
                   </div>
                 )}
               </div>

               {userFantasyTeam.length > 0 && (
                 <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="text-ewc-accent" size={20} /> Real-Time Scoring
                    </h3>
                    <div className="space-y-3">
                      {userFantasyTeam.map(player => {
                        const liveScore = getLiveScore(player.id);
                        const displayScore = liveScore !== null ? liveScore : player.avgPoints;
                        const isLive = liveScore !== null;
                        
                        return (
                          <div key={player.id} className="flex justify-between items-center border-b border-white/5 pb-2">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-sm">{player.name}</span>
                              {isLive && <span className="text-[10px] bg-red-500 text-white px-1.5 rounded animate-pulse">LIVE</span>}
                            </div>
                            <div className="flex items-center gap-8 text-sm">
                              <div className="font-mono font-bold text-ewc-gold">{displayScore.toFixed(1)} pts</div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="pt-2 flex justify-between items-center text-lg font-bold">
                        <span>Total Points</span>
                        <span className="text-ewc-gold">
                            {userFantasyTeam.reduce((acc, p) => acc + (getLiveScore(p.id) || p.avgPoints), 0).toFixed(1)}
                        </span>
                      </div>
                    </div>
                 </div>
               )}
             </div>
          )}
          
          {activeTab === 'leaderboard' && (
            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
               <div className="p-8 text-center text-gray-400">
                 <Award size={48} className="mx-auto mb-4 opacity-50" />
                 <p>Leaderboards update every Tuesday after the gameweek concludes.</p>
               </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Award className="text-yellow-400" /> Weekly Prizes</h3>
            <p className="text-sm text-gray-300 mb-4">Top the leaderboard this week to win exclusive skins and merchandise!</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-black/30 p-2 rounded border border-white/5">
                <div className="w-8 h-8 rounded bg-yellow-500 text-black font-bold flex items-center justify-center shadow-lg">1</div>
                <div className="text-sm font-medium">VIP Finals Ticket + 50k Points</div>
              </div>
              <div className="flex items-center gap-3 bg-black/30 p-2 rounded border border-white/5">
                <div className="w-8 h-8 rounded bg-gray-400 text-black font-bold flex items-center justify-center shadow-lg">2</div>
                <div className="text-sm font-medium">$500 Store Credit</div>
              </div>
              <div className="flex items-center gap-3 bg-black/30 p-2 rounded border border-white/5">
                <div className="w-8 h-8 rounded bg-orange-700 text-black font-bold flex items-center justify-center shadow-lg">3</div>
                <div className="text-sm font-medium">Exclusive EWC Jersey</div>
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Info size={18} className="text-blue-400" /> Scoring Rules</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <Crosshair size={16} className="text-ewc-gold shrink-0" />
                <span>Kill: <span className="text-white">+3 pts</span></span>
              </li>
              <li className="flex gap-2">
                <Shield size={16} className="text-ewc-gold shrink-0" />
                <span>Death: <span className="text-white">-1 pt</span></span>
              </li>
              <li className="flex gap-2">
                <Plus size={16} className="text-ewc-gold shrink-0" />
                <span>Assist: <span className="text-white">+1.5 pts</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
