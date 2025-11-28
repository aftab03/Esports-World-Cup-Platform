
import React from 'react';
import { MapPin, Calendar, Clock, Ticket, Music, Coffee, Gamepad2 } from 'lucide-react';

export const Festival: React.FC = () => {
  const events = [
    { id: 1, name: "Opening Ceremony Concert", time: "20:00 - 23:00", location: "Main Arena", type: "Music" },
    { id: 2, name: "Cosplay Parade", time: "14:00 - 16:00", location: "Boulevard", type: "Entertainment" },
    { id: 3, name: "Retro Gaming Lounge", time: "10:00 - 22:00", location: "Gaming Zone B", type: "Activity" },
    { id: 4, name: "Meet & Greet: Team Falcons", time: "16:00 - 17:30", location: "Fan Zone", type: "Meet & Greet" },
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen animate-fade-in">
       <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-black text-white mb-4">THE FESTIVAL</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
             Experience the future of entertainment in Riyadh. Music, gaming, cosplay, and more.
          </p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map Placeholder */}
          <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-2xl overflow-hidden relative min-h-[500px] flex items-center justify-center group">
             <img src="https://picsum.photos/1200/800?random=map" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" alt="Festival Map"/>
             <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
             <div className="relative z-10 text-center">
                <MapPin size={64} className="text-ewc-gold mx-auto mb-4 animate-bounce" />
                <h3 className="text-3xl font-bold mb-2">Interactive Festival Map</h3>
                <p className="text-gray-300 mb-6">Explore the venues, stages, and activity zones.</p>
                <button className="px-6 py-3 bg-ewc-gold text-black font-bold rounded hover:bg-white transition-colors">
                   Launch Map View
                </button>
             </div>
             
             {/* Map Pins Simulation */}
             <div className="absolute top-1/4 left-1/4 group-hover:scale-110 transition-transform cursor-pointer">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                <div className="w-4 h-4 bg-red-500 rounded-full relative border-2 border-white"></div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Main Arena</div>
             </div>
          </div>

          {/* Schedule & Info */}
          <div className="space-y-6">
             <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                   <Calendar size={20} className="text-ewc-gold" /> Daily Schedule
                </h3>
                <div className="space-y-4">
                   {events.map(event => (
                      <div key={event.id} className="p-4 bg-black/30 rounded-lg border border-white/5 hover:border-ewc-gold/30 transition-colors">
                         <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-white">{event.name}</span>
                            <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-ewc-gold">{event.type}</span>
                         </div>
                         <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Clock size={12}/> {event.time}</span>
                            <span className="flex items-center gap-1"><MapPin size={12}/> {event.location}</span>
                         </div>
                      </div>
                   ))}
                </div>
                <button className="w-full mt-4 py-3 bg-white/5 border border-white/10 text-gray-300 font-bold rounded hover:bg-white/10 hover:text-white transition-colors">
                   View Full Schedule
                </button>
             </div>

             <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-6 rounded-xl border border-indigo-500/30">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                   <Ticket size={20} className="text-pink-400" /> Virtual Queue
                </h3>
                <p className="text-sm text-gray-300 mb-4">Skip the lines! Book your spot for popular attractions directly from the app.</p>
                <div className="bg-black/30 p-3 rounded flex justify-between items-center mb-2">
                   <span className="text-sm font-medium">VR Gaming Zone</span>
                   <span className="text-xs text-green-400">Wait: 5 min</span>
                </div>
                <div className="bg-black/30 p-3 rounded flex justify-between items-center">
                   <span className="text-sm font-medium">Meet & Greet</span>
                   <span className="text-xs text-red-400">Wait: 45 min</span>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
