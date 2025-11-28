
import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Gamepad2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

type RankingTab = 'club' | 'game';

export const RankingPage: React.FC = () => {
  const { clubRankings, games } = useAppContext();
  const [activeTab, setActiveTab] = useState<RankingTab>('club');
  const [selectedGame, setSelectedGame] = useState<string>(games[0].id);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Medal className="text-yellow-400" size={24} />;
      case 2: return <Medal className="text-gray-300" size={24} />;
      case 3: return <Medal className="text-orange-700" size={24} />;
      default: return <span className="font-mono font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="text-green-500" />;
      case 'down': return <TrendingDown size={16} className="text-red-500" />;
      default: return <Minus size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-display font-black text-white mb-4 uppercase">
          {activeTab === 'club' ? 'Club Championship' : 'Game Standings'}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {activeTab === 'club' 
            ? 'The ultimate test of an esports organization. Points are aggregated across all 20+ game titles to crown the best club in the world.' 
            : 'See who dominates the server in each specific discipline.'}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-[#111] p-1 rounded-full border border-white/10 flex">
          <button
            onClick={() => setActiveTab('club')}
            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'club' 
              ? 'bg-ewc-gold text-black shadow-lg' 
              : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trophy size={18} /> Club Championship
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'game' 
              ? 'bg-ewc-gold text-black shadow-lg' 
              : 'text-gray-400 hover:text-white'
            }`}
          >
            <Gamepad2 size={18} /> Game Standings
          </button>
        </div>
      </div>

      {/* CLUB CHAMPIONSHIP CONTENT */}
      {activeTab === 'club' && (
        <div className="animate-fade-in-up">
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 p-6 bg-white/5 border-b border-white/10 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-4 md:col-span-5">Club</div>
              <div className="col-span-2 text-center">Trend</div>
              <div className="col-span-3 md:col-span-2 text-right">Points</div>
              <div className="hidden md:block col-span-2 text-right">Earnings</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {clubRankings.map((club) => (
                <div key={club.id} className="group hover:bg-white/5 transition-colors">
                  {/* Main Row */}
                  <div className="grid grid-cols-12 gap-4 p-6 items-center">
                    <div className="col-span-1 flex justify-center">{getRankIcon(club.rank)}</div>
                    <div className="col-span-4 md:col-span-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl shadow-inner border border-white/5">
                        {club.logo}
                      </div>
                      <div>
                        <div className="font-bold text-lg md:text-xl text-white group-hover:text-ewc-gold transition-colors">{club.name}</div>
                        <div className="text-xs text-gray-500 font-mono">ID: {club.id}</div>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center">{getTrendIcon(club.trend)}</div>
                    <div className="col-span-3 md:col-span-2 text-right font-mono font-bold text-ewc-gold text-xl">
                      {club.points.toLocaleString()}
                    </div>
                    <div className="hidden md:block col-span-2 text-right text-gray-400 font-mono">
                      {club.earnings}
                    </div>
                  </div>

                  {/* Breakdown Expansion (Visual Only for now) */}
                  <div className="bg-black/20 px-6 py-3 ml-16 mr-6 mb-4 rounded border border-white/5 hidden group-hover:block animate-fade-in">
                     <div className="flex gap-6 overflow-x-auto text-xs pb-2 custom-scrollbar">
                        {club.breakdown.map((bd, i) => {
                          const gameName = games.find(g => g.id === bd.gameId)?.title || bd.gameId;
                          return (
                            <div key={i} className="flex flex-col min-w-[100px]">
                               <span className="text-gray-500 uppercase font-bold text-[10px]">{gameName}</span>
                               <span className="text-white font-mono">#{bd.rank} • {bd.points} pts</span>
                            </div>
                          )
                        })}
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GAME STANDINGS CONTENT */}
      {activeTab === 'game' && (
        <div className="animate-fade-in-up">
           <div className="flex gap-4 overflow-x-auto pb-6 mb-6 custom-scrollbar">
              {games.map(game => (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all min-w-[200px] ${
                    selectedGame === game.id
                      ? 'bg-ewc-gold text-black border-ewc-gold transform scale-105'
                      : 'bg-[#111] text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                   <img src={game.image} className="w-8 h-8 rounded object-cover" alt="" />
                   <span className="font-bold whitespace-nowrap">{game.title}</span>
                </button>
              ))}
           </div>

           <div className="bg-[#111] border border-white/10 rounded-2xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
              <Gamepad2 size={64} className="text-gray-600 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Standings for {games.find(g => g.id === selectedGame)?.title}</h3>
              <p className="text-gray-500 mb-8">Detailed individual game standings are being aggregated from the live server.</p>
              
              <div className="w-full max-w-2xl bg-black/40 rounded-lg overflow-hidden border border-white/5">
                 <div className="grid grid-cols-3 p-4 bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-500">
                    <div>Rank</div>
                    <div>Team</div>
                    <div className="text-right">Win/Loss</div>
                 </div>
                 {/* Mock rows for selected game */}
                 {[1, 2, 3, 4, 5].map(rank => (
                   <div key={rank} className="grid grid-cols-3 p-4 border-t border-white/5 items-center">
                      <div className="font-mono text-gray-400">#{rank}</div>
                      <div className="font-bold text-white">
                         {rank === 1 ? 'Gen.G' : rank === 2 ? 'T1' : rank === 3 ? 'G2' : 'Team Liquid'}
                      </div>
                      <div className="text-right font-mono text-ewc-gold">
                         {10 - rank}W - {rank}L
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
