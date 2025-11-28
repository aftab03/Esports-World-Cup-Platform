
import React, { useState } from 'react';
import { Clock, Filter, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Schedule: React.FC = () => {
  const { games } = useAppContext();
  const [selectedGameFilter, setSelectedGameFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const days = Array.from({length: 7}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      date: d.getDate(),
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: d.toLocaleDateString('en-US'),
      active: i === selectedDateIndex
    };
  });

  // Mock schedule data for different days based on selected index
  const getMockEventsForDay = (index: number) => {
      const baseEvents = [
        { time: '14:00', game: 'DOTA 2', round: 'Group Stage - Group A', t1: 'Team Liquid', t2: 'Team Spirit', status: 'Upcoming' },
        { time: '16:30', game: 'League of Legends', round: 'Semi-Final 1', t1: 'Gen.G', t2: 'T1', status: 'Live' },
        { time: '19:00', game: 'Counter-Strike 2', round: 'Quarter-Final', t1: 'FaZe', t2: 'G2', status: 'Upcoming' },
        { time: '21:00', game: 'Rocket League', round: 'Grand Final', t1: 'Vitality', t2: 'BDS', status: 'Upcoming' },
        { time: '22:30', game: 'Tekken 8', round: 'Top 8', t1: 'Arslan Ash', t2: 'Knee', status: 'Upcoming' },
      ];
      
      // Shift events slightly for other days to simulate variety
      if (index === 0) return baseEvents;
      if (index === 1) return [
        { time: '12:00', game: 'StarCraft II', round: 'Round of 16', t1: 'Serral', t2: 'Maru', status: 'Upcoming' },
        { time: '15:00', game: 'PUBG Mobile', round: 'Grand Finals - Day 1', t1: 'Falcons', t2: 'Navi', status: 'Upcoming' },
        { time: '18:00', game: 'Street Fighter 6', round: 'Pools', t1: 'MenaRD', t2: 'Punk', status: 'Upcoming' },
      ];
      return [
        { time: '14:00', game: 'DOTA 2', round: 'Playoffs', t1: 'TBD', t2: 'TBD', status: 'Upcoming' },
        { time: '17:00', game: 'League of Legends', round: 'Grand Final', t1: 'TBD', t2: 'TBD', status: 'Upcoming' },
      ];
  };

  const allEvents = getMockEventsForDay(selectedDateIndex);

  const filteredEvents = selectedGameFilter 
    ? allEvents.filter(e => e.game === selectedGameFilter)
    : allEvents;

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-5xl font-display font-black text-white mb-8">SCHEDULE</h1>
      
      {/* Date Scroller */}
      <div className="flex gap-2 overflow-x-auto pb-6 mb-8 custom-scrollbar">
        {days.map((d, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedDateIndex(i)}
            className={`flex flex-col items-center justify-center min-w-[80px] h-20 rounded-xl border cursor-pointer transition-all ${
              d.active 
              ? 'bg-ewc-gold text-black border-ewc-gold scale-105' 
              : 'bg-[#111] border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-sm font-medium uppercase">{d.day}</span>
            <span className="text-2xl font-bold font-display">{d.date}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6 relative">
        <h2 className="text-xl font-bold">Matches for {days[selectedDateIndex].fullDate}</h2>
        <div className="relative">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`text-sm px-4 py-2 rounded-full border flex items-center gap-2 transition-all ${showFilters ? 'bg-white text-black border-white' : 'text-ewc-gold border-ewc-gold/30 hover:border-ewc-gold'}`}
          >
            <Filter size={14} /> {selectedGameFilter || 'Filter by Game'}
          </button>
          
          {showFilters && (
            <div className="absolute right-0 top-12 w-64 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-20 p-2 animate-fade-in-up">
              <button 
                 onClick={() => { setSelectedGameFilter(null); setShowFilters(false); }}
                 className="w-full text-left px-3 py-2 rounded hover:bg-white/10 text-sm flex justify-between"
              >
                <span>All Games</span>
                {!selectedGameFilter && <Check size={14} className="text-ewc-gold" />}
              </button>
              {games.map(g => (
                <button 
                  key={g.id}
                  onClick={() => { setSelectedGameFilter(g.title); setShowFilters(false); }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-white/10 text-sm flex justify-between"
                >
                  <span>{g.title}</span>
                  {selectedGameFilter === g.title && <Check size={14} className="text-ewc-gold" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4 animate-fade-in">
        {filteredEvents.length === 0 ? (
           <div className="text-center py-12 text-gray-500 bg-[#111] rounded-xl border border-white/5">
             No matches scheduled for this filter on this day.
           </div>
        ) : filteredEvents.map((evt, idx) => (
          <div key={idx} className="bg-[#111] border border-white/5 rounded-xl p-0 md:p-6 hover:border-ewc-gold/30 transition-all group overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-6">
               <div className="w-full md:w-32 flex md:flex-col justify-between md:justify-center items-center gap-1 bg-white/5 md:bg-transparent p-3 md:p-0">
                 <div className="flex items-center gap-2 text-white font-mono text-lg">
                   <Clock size={16} className="text-ewc-gold" /> {evt.time}
                 </div>
                 {evt.status === 'Live' && (
                   <span className="text-xs font-bold text-black bg-ewc-accent px-2 py-0.5 rounded animate-pulse">LIVE</span>
                 )}
               </div>
               
               <div className="flex-1 w-full px-4 md:px-0 pb-4 md:pb-0">
                  <div className="flex justify-between items-center text-xs text-gray-500 uppercase tracking-wider mb-3">
                    <span className="text-ewc-gold font-bold">{evt.game}</span>
                    <span>{evt.round}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 text-right font-bold text-lg md:text-xl group-hover:text-white transition-colors text-gray-200">{evt.t1}</div>
                    <div className="px-3 text-gray-600 font-bold text-sm">VS</div>
                    <div className="flex-1 text-left font-bold text-lg md:text-xl group-hover:text-white transition-colors text-gray-200">{evt.t2}</div>
                  </div>
               </div>
               
               <div className="w-full md:w-auto p-4 md:p-0 border-t md:border-t-0 border-white/5 flex justify-center">
                 <button className={`px-6 py-2 rounded text-sm font-bold w-full md:w-auto transition-all ${
                   evt.status === 'Live' 
                   ? 'bg-ewc-accent text-black hover:bg-white shadow-[0_0_15px_rgba(0,255,136,0.2)]' 
                   : 'bg-white/5 text-white hover:bg-white/10 hover:text-ewc-gold'
                 }`}>
                   {evt.status === 'Live' ? 'Watch Stream' : 'Set Reminder'}
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
