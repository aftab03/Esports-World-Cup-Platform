
import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, ShieldAlert, BarChart2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const LiveChat: React.FC = () => {
  const { chatMessages, addChatMessage, activePoll, votePoll } = useAppContext();
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message using container scrollTop to avoid page jumping
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    addChatMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-[#1a1a1a] p-3 border-b border-white/10 flex justify-between items-center">
         <div className="flex items-center gap-2 font-bold text-sm text-gray-200">
            <MessageSquare size={16} /> Stream Chat
         </div>
         <div className="text-xs text-gray-500 flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Connected
         </div>
      </div>

      {/* Messages Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-[#0a0a0a]">
         {chatMessages.map((msg) => (
            <div key={msg.id} className="text-sm break-words leading-snug animate-fade-in">
               <span className="font-bold mr-2" style={{ color: msg.color || '#aaa' }}>
                  {msg.isMod && <ShieldAlert size={12} className="inline mr-1 text-ewc-gold" />}
                  {msg.user}:
               </span>
               <span className="text-gray-300">{msg.text}</span>
            </div>
         ))}
      </div>

      {/* Active Poll Overlay */}
      {activePoll && activePoll.isActive && (
         <div className="bg-[#1a1a1a] p-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
               <span className="text-ewc-gold text-xs font-bold uppercase flex items-center gap-1">
                  <BarChart2 size={12} /> Live Poll
               </span>
               <span className="text-gray-500 text-[10px]">{activePoll.totalVotes.toLocaleString()} votes</span>
            </div>
            <h4 className="font-bold text-sm text-white mb-3">{activePoll.question}</h4>
            <div className="space-y-2">
               {activePoll.options.map(opt => (
                  <button 
                     key={opt.id}
                     onClick={() => votePoll(opt.id)}
                     className="relative w-full h-8 bg-white/5 rounded overflow-hidden text-left hover:bg-white/10 transition-colors group"
                  >
                     <div 
                        className="absolute top-0 left-0 h-full bg-ewc-gold/20 transition-all duration-500" 
                        style={{ width: `${opt.percentage}%` }}
                     />
                     <div className="absolute inset-0 flex justify-between items-center px-3 z-10 text-xs font-medium">
                        <span>{opt.label}</span>
                        <span>{opt.percentage}%</span>
                     </div>
                  </button>
               ))}
            </div>
         </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-[#1a1a1a] border-t border-white/10">
         <div className="relative">
            <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder="Send a message..."
               className="w-full bg-black border border-white/10 rounded-lg py-2 pl-3 pr-10 text-sm text-white focus:outline-none focus:border-ewc-gold/50 placeholder-gray-600"
            />
            <button 
               onClick={handleSend}
               disabled={!input.trim()}
               className="absolute right-2 top-1/2 -translate-y-1/2 text-ewc-gold disabled:opacity-30 hover:text-white transition-colors"
            >
               <Send size={16} />
            </button>
         </div>
      </div>
    </div>
  );
};
