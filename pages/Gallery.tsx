
import React from 'react';
import { Play, Image as ImageIcon } from 'lucide-react';

export const Gallery: React.FC = () => {
  const mediaItems = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    type: i % 3 === 0 ? 'video' : 'image',
    url: `https://picsum.photos/600/400?random=${100 + i}`,
    title: i % 3 === 0 ? "Grand Finals Highlights" : "Behind the Scenes: Day 3",
    date: "July 20, 2024"
  }));

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen animate-fade-in">
       <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-black text-white mb-4">MEDIA GALLERY</h1>
          <p className="text-xl text-gray-400">Relive the most epic moments of the Esports World Cup.</p>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item) => (
             <div key={item.id} className="group relative rounded-xl overflow-hidden border border-white/10 bg-[#111] cursor-pointer">
                <div className="aspect-video overflow-hidden">
                   <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="w-16 h-16 bg-ewc-gold rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      {item.type === 'video' ? <Play size={32} fill="black" className="ml-1" /> : <ImageIcon size={32} className="text-black" />}
                   </div>
                </div>

                <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${item.type === 'video' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                         {item.type}
                      </span>
                      <span className="text-xs text-gray-400">{item.date}</span>
                   </div>
                   <h3 className="text-lg font-bold text-white leading-tight">{item.title}</h3>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
