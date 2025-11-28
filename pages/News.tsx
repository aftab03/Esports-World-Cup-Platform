
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Clock, Tag, ChevronRight } from 'lucide-react';

export const News: React.FC = () => {
  const { news } = useAppContext();

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen animate-fade-in">
       <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-5xl font-display font-black text-white mb-2">NEWSROOM</h1>
            <p className="text-xl text-gray-400">The latest stories, interviews, and updates from EWC.</p>
          </div>
       </div>

       {/* Featured Article */}
       {news.length > 0 && (
         <div className="mb-12 bg-[#111] rounded-2xl overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-2 group cursor-pointer hover:border-ewc-gold/30 transition-all">
            <div className="h-64 lg:h-auto overflow-hidden">
               <img src={news[0].image} alt={news[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-4 text-sm font-bold uppercase tracking-wider">
                  <span className="text-ewc-gold bg-ewc-gold/10 px-2 py-1 rounded">{news[0].category}</span>
                  <span className="text-gray-500 flex items-center gap-1"><Clock size={14}/> {news[0].date}</span>
               </div>
               <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 leading-tight group-hover:text-ewc-gold transition-colors">
                  {news[0].title}
               </h2>
               <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                  {news[0].summary}
               </p>
               <div className="flex items-center gap-2 text-white font-bold group-hover:translate-x-2 transition-transform">
                  Read Full Story <ChevronRight size={18} className="text-ewc-gold"/>
               </div>
            </div>
         </div>
       )}

       {/* News Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.slice(1).map(item => (
             <div key={item.id} className="flex flex-col group cursor-pointer">
                <div className="rounded-xl overflow-hidden mb-4 border border-white/5 relative">
                   <img src={item.image} alt={item.title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute top-3 left-3 bg-black/80 px-2 py-1 text-xs font-bold text-white rounded backdrop-blur-sm">
                      {item.category}
                   </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                   <Clock size={12} /> {item.date}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-ewc-gold transition-colors leading-snug">
                   {item.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                   {item.summary}
                </p>
             </div>
          ))}
       </div>

       {news.length === 0 && (
          <div className="text-center py-20 text-gray-500">
             No news articles available.
          </div>
       )}
    </div>
  );
}
