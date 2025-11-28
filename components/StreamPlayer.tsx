
import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, Settings, Monitor, Users, Radio } from 'lucide-react';
import { StreamChannel } from '../types';
import { STREAM_CHANNELS } from '../constants';

interface StreamPlayerProps {
  viewerCount: number;
}

export const StreamPlayer: React.FC<StreamPlayerProps> = ({ viewerCount }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [activeChannelId, setActiveChannelId] = useState('main');
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [quality, setQuality] = useState('1080p60');

  const activeChannel = STREAM_CHANNELS.find(c => c.id === activeChannelId) || STREAM_CHANNELS[0];

  return (
    <div className={`flex flex-col bg-black border border-ewc-gold/20 rounded-xl overflow-hidden shadow-2xl ${isTheaterMode ? 'col-span-3' : 'w-full'}`}>
      {/* Video Area */}
      <div className="relative aspect-video bg-[#0a0a0a] group">
        {/* Placeholder Stream Content */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img 
            src={`https://picsum.photos/1200/675?random=${activeChannelId}`} 
            alt="Stream" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
          
          {/* Stream Overlay Info */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
             <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">LIVE</div>
             <div className="bg-black/60 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-2 backdrop-blur-sm">
                <Users size={12} /> {viewerCount.toLocaleString()}
             </div>
          </div>
          
          {/* Pause Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
               <Play size={64} className="text-white opacity-80" fill="white" />
            </div>
          )}
        </div>

        {/* Controls Bar (Visible on Hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-ewc-gold">
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                 </button>
                 <div className="flex items-center gap-2 group/vol">
                    <Volume2 size={20} className="text-white" />
                    <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300">
                       <input 
                         type="range" 
                         min="0" max="100" 
                         value={volume} 
                         onChange={(e) => setVolume(Number(e.target.value))}
                         className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-ewc-gold"
                       />
                    </div>
                 </div>
                 <div className="text-xs text-white font-mono">
                    <span className="text-red-500">●</span> LIVE
                 </div>
              </div>

              <div className="flex items-center gap-4">
                 <div className="text-xs font-bold text-gray-300 bg-white/10 px-2 py-1 rounded border border-white/10 hover:bg-white/20 cursor-pointer">
                    {quality}
                 </div>
                 <button onClick={() => setIsTheaterMode(!isTheaterMode)} className="text-white hover:text-ewc-gold">
                    <Monitor size={20} />
                 </button>
                 <button className="text-white hover:text-ewc-gold">
                    <Maximize size={20} />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Channel Switcher */}
      <div className="bg-[#111] p-3 flex items-center justify-between border-t border-white/10">
         <div className="flex gap-2 overflow-x-auto custom-scrollbar">
            {STREAM_CHANNELS.map(channel => (
               <button
                 key={channel.id}
                 onClick={() => setActiveChannelId(channel.id)}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-colors whitespace-nowrap ${
                    activeChannelId === channel.id 
                    ? 'bg-ewc-gold text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                 }`}
               >
                  <Radio size={14} className={activeChannelId === channel.id ? 'animate-pulse' : ''} />
                  {channel.name}
               </button>
            ))}
         </div>
         <div className="text-xs text-gray-500 hidden md:block">
            Latency: <span className="text-green-500">Ultra Low</span>
         </div>
      </div>
    </div>
  );
};
