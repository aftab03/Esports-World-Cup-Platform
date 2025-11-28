
import React, { useState } from 'react';
import { 
  LayoutDashboard, Trophy, Users, FileText, Settings, Activity, 
  DollarSign, Server, AlertCircle, Edit, Trash, Plus, Search, 
  BarChart3, CheckCircle, Clock, PlayCircle, StopCircle
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Match } from '../types';

type AdminTab = 'overview' | 'competitions' | 'content' | 'users' | 'settings';

export const Admin: React.FC = () => {
  const { matches, games, news, updateMatch, updateMatchStatus, addNews, deleteNews } = useAppContext();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Simple state for editing score
  const [editingMatch, setEditingMatch] = useState<string | null>(null);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const handleUpdateScore = (match: Match) => {
    updateMatch({ ...match, scoreA, scoreB });
    setEditingMatch(null);
  };

  const handleStatusChange = (matchId: string, status: 'Live' | 'Finished' | 'Scheduled') => {
    updateMatchStatus(matchId, status);
  };

  const StatCard = ({ title, value, subtext, icon: Icon, trend }: any) => (
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold font-mono mt-1 text-white">{value}</h3>
        </div>
        <div className="p-3 bg-white/5 rounded-lg text-ewc-gold">
          <Icon size={24} />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
          {trend === 'up' ? '↑' : '↓'} {subtext}
        </span>
        <span className="text-gray-500">vs last week</span>
      </div>
    </div>
  );

  const Overview = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$12.4M" 
          subtext="12%" 
          icon={DollarSign} 
          trend="up" 
        />
        <StatCard 
          title="Active Users" 
          value="842.3K" 
          subtext="5.2%" 
          icon={Users} 
          trend="up" 
        />
        <StatCard 
          title="Live Streams" 
          value="24" 
          subtext="Stable" 
          icon={Activity} 
          trend="up" 
        />
        <StatCard 
          title="System Status" 
          value="99.9%" 
          subtext="Uptime" 
          icon={Server} 
          trend="up" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1a1a1a] p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-ewc-gold" /> Revenue Analytics
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[45, 60, 55, 70, 85, 80, 95, 85, 75, 90, 100, 95].map((h, i) => (
              <div key={i} className="w-full bg-white/5 rounded-t hover:bg-ewc-gold/50 transition-colors relative group" style={{ height: `${h}%` }}>
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                   ${h}0k
                 </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500 uppercase">
            <span>Jan</span><span>Dec</span>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <AlertCircle size={20} className="text-blue-400" /> System Alerts
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded flex gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-red-500 animate-pulse"></div>
              <div>
                <p className="text-sm font-bold text-red-400">High Server Load</p>
                <p className="text-xs text-gray-400">Match server US-East-1 at 92% capacity.</p>
              </div>
            </div>
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded flex gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
              <div>
                <p className="text-sm font-bold text-yellow-400">Payment Gateway</p>
                <p className="text-xs text-gray-400">Delayed response from provider (1200ms).</p>
              </div>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded flex gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-bold text-green-400">Backup Complete</p>
                <p className="text-xs text-gray-400">Daily database snapshot successful.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CompetitionsManager = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Competition Management</h2>
        <button className="bg-ewc-gold text-black px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-white transition-colors">
          <Plus size={18} /> Create Tournament
        </button>
      </div>

      <div className="bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input type="text" placeholder="Search matches..." className="w-full bg-black/50 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-ewc-gold" />
          </div>
          <select className="bg-black/50 border border-white/10 rounded px-4 py-2 text-sm text-gray-300">
            <option>All Games</option>
            {games.map(g => <option key={g.id}>{g.title}</option>)}
          </select>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-black/30 text-gray-400 uppercase tracking-wider font-medium">
            <tr>
              <th className="p-4">Match ID</th>
              <th className="p-4">Game</th>
              <th className="p-4">Teams & Score</th>
              <th className="p-4">Stage</th>
              <th className="p-4">Status Control</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {matches.map(match => (
              <tr key={match.id} className="hover:bg-white/5">
                <td className="p-4 font-mono text-gray-500">#{match.id.toUpperCase()}</td>
                <td className="p-4 font-bold">{match.gameId.toUpperCase()}</td>
                <td className="p-4">
                  {editingMatch === match.id ? (
                     <div className="flex items-center gap-2">
                       <input 
                        type="number" 
                        value={scoreA} 
                        onChange={e => setScoreA(parseInt(e.target.value))} 
                        className="w-12 bg-black border border-ewc-gold rounded text-center"
                       />
                       <span>-</span>
                       <input 
                        type="number" 
                        value={scoreB} 
                        onChange={e => setScoreB(parseInt(e.target.value))} 
                        className="w-12 bg-black border border-ewc-gold rounded text-center"
                       />
                       <button onClick={() => handleUpdateScore(match)} className="text-green-500 hover:text-white"><CheckCircle size={16}/></button>
                     </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className={match.scoreA && match.scoreA > (match.scoreB || 0) ? 'text-ewc-gold font-bold' : ''}>{match.teamA} {match.scoreA}</span>
                      <span className="text-gray-600">vs</span>
                      <span className={match.scoreB && match.scoreB > (match.scoreA || 0) ? 'text-ewc-gold font-bold' : ''}>{match.scoreB} {match.teamB}</span>
                    </div>
                  )}
                </td>
                <td className="p-4 text-gray-400">{match.stage}</td>
                <td className="p-4">
                   <div className="flex items-center gap-2">
                     {match.status === 'Live' ? (
                       <button 
                         onClick={() => handleStatusChange(match.id, 'Finished')}
                         className="flex items-center gap-1 px-2 py-1 bg-red-900/50 text-red-500 rounded text-xs font-bold hover:bg-red-500 hover:text-white transition-colors"
                         title="End Match"
                       >
                         <StopCircle size={12}/> Stop Live
                       </button>
                     ) : (
                       <button 
                         onClick={() => handleStatusChange(match.id, 'Live')}
                         className="flex items-center gap-1 px-2 py-1 bg-green-900/50 text-green-500 rounded text-xs font-bold hover:bg-green-500 hover:text-white transition-colors"
                         title="Go Live"
                       >
                         <PlayCircle size={12}/> Go Live
                       </button>
                     )}
                   </div>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => { setEditingMatch(match.id); setScoreA(match.scoreA || 0); setScoreB(match.scoreB || 0); }}
                    className="text-gray-400 hover:text-white mx-1"
                  >
                    <Edit size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-red-500 mx-1"><Trash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ContentManager = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">News & Press Releases</h2>
        <button className="bg-white/10 text-white px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-white/20 transition-colors">
          <Plus size={18} /> New Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map(n => (
          <div key={n.id} className="bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden group">
            <div className="h-40 overflow-hidden relative">
              <img src={n.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-50" />
              <div className="absolute top-2 right-2 flex gap-1">
                <button className="p-2 bg-black/50 rounded hover:bg-white text-white hover:text-black transition-colors"><Edit size={14} /></button>
                <button 
                  onClick={() => deleteNews(n.id)}
                  className="p-2 bg-red-900/50 rounded hover:bg-red-500 text-white transition-colors"
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span className="text-ewc-gold uppercase">{n.category}</span>
                <span>{n.date}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 line-clamp-1">{n.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{n.summary}</p>
              
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-green-500 flex items-center gap-1"><CheckCircle size={12} /> Published</span>
                <span className="text-xs text-gray-600">ID: {n.id}</span>
              </div>
            </div>
          </div>
        ))}
        {/* Draft Example */}
        <div className="bg-[#1a1a1a] rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center p-8 text-gray-500 hover:border-ewc-gold hover:text-ewc-gold cursor-pointer transition-all min-h-[300px]">
          <Plus size={48} className="mb-4 opacity-50" />
          <span className="font-bold">Create New Draft</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen pt-16 bg-[#050505] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-white/5 flex flex-col">
        <div className="p-6">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Core Modules</div>
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-ewc-gold/10 text-ewc-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('competitions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'competitions' ? 'bg-ewc-gold/10 text-ewc-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Trophy size={18} /> Competitions
            </button>
            <button 
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'content' ? 'bg-ewc-gold/10 text-ewc-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <FileText size={18} /> Content Manager
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-ewc-gold/10 text-ewc-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Users size={18} /> Users & Roles
            </button>
          </nav>

          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 mt-8">System</div>
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-ewc-gold/10 text-ewc-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Settings size={18} /> Settings
            </button>
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-white">AD</div>
             <div>
               <div className="text-sm font-bold text-white">Super Admin</div>
               <div className="text-xs text-green-500">● Online</div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold font-display text-white capitalize">{activeTab}</h1>
              <p className="text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400 bg-[#1a1a1a] px-4 py-2 rounded-full border border-white/5">
              <Clock size={16} />
              <span className="font-mono">{new Date().toLocaleTimeString()} UTC</span>
            </div>
          </div>

          {activeTab === 'overview' && <Overview />}
          {activeTab === 'competitions' && <CompetitionsManager />}
          {activeTab === 'content' && <ContentManager />}
          {activeTab === 'users' && <div className="text-center text-gray-500 mt-20"><Users size={48} className="mx-auto mb-4 opacity-50"/>User Management Module</div>}
          {activeTab === 'settings' && <div className="text-center text-gray-500 mt-20"><Settings size={48} className="mx-auto mb-4 opacity-50"/>System Settings</div>}
        </div>
      </main>
    </div>
  );
};
