
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Partners: React.FC = () => {
  const { clubs } = useAppContext();

  const sponsors = [
    { name: "Sony", tier: "Founding Partner", logo: "S" },
    { name: "Qiddiya", tier: "Destination Partner", logo: "Q" },
    { name: "Honor", tier: "Official Smartphone", logo: "H" },
    { name: "Aramco", tier: "Strategic Partner", logo: "A" },
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen animate-fade-in">
       
       {/* Hero */}
       <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-black text-white mb-6">OUR PARTNERS</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
             Collaborating with world-class brands to deliver the future of esports.
          </p>
       </div>

       {/* Sponsors Grid */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {sponsors.map((partner, idx) => (
             <div key={idx} className="bg-[#111] border border-white/5 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-ewc-gold/30 hover:bg-white/5 transition-all group">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-4xl font-black text-white group-hover:text-ewc-gold transition-colors">
                   {partner.logo}
                </div>
                <div className="text-center">
                   <h3 className="font-bold text-lg">{partner.name}</h3>
                   <p className="text-xs text-ewc-gold uppercase tracking-wider font-bold">{partner.tier}</p>
                </div>
             </div>
          ))}
       </div>

       {/* Club Partner Program */}
       <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ewc-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
             <div className="p-8 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-ewc-gold font-bold uppercase tracking-widest mb-4">
                   <Star size={20} fill="currentColor" /> EWC Club Program
                </div>
                <h2 className="text-4xl font-display font-black mb-6">Join the Elite Ecosystem</h2>
                <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                   The EWC Club Program is a groundbreaking initiative designed to promote sustainable growth for esports organizations. 30 of the world's best clubs are already part of the journey.
                </p>
                <div className="flex flex-wrap gap-4">
                   <button className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-ewc-gold transition-colors">
                      View Program Details
                   </button>
                   <button className="px-8 py-3 bg-transparent border border-white/20 text-white font-bold rounded hover:bg-white/10 transition-colors">
                      Apply Now
                   </button>
                </div>
             </div>
             <div className="bg-black/20 p-8 grid grid-cols-3 gap-4 content-center">
                {clubs.slice(0, 9).map((club, i) => (
                   <div key={i} className="aspect-square bg-white/5 rounded-xl flex items-center justify-center text-2xl border border-white/5 hover:border-ewc-gold/50 transition-colors">
                      {club.logo}
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}
