
import React, { useState } from 'react';
import { Menu, X, Globe, User, ShieldCheck } from 'lucide-react';
import { NavSection } from '../types';

interface NavbarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: NavSection.HOME, label: 'Home' },
    { id: NavSection.COMPETITIONS, label: 'Competitions' },
    { id: NavSection.FANTASY, label: 'Fantasy' },
    { id: NavSection.RANKING, label: 'Ranking' },
    { id: NavSection.SCHEDULE, label: 'Schedule' },
    { id: NavSection.NEWS, label: 'News' },
    { id: NavSection.FESTIVAL, label: 'Festival' },
    { id: NavSection.GALLERY, label: 'Gallery' },
    { id: NavSection.PARTNERS, label: 'Partners' },
  ];

  const isAdmin = currentSection === NavSection.ADMIN;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isAdmin ? 'bg-[#1a1a1a] border-b border-red-900/30' : 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(NavSection.HOME)}>
            <div className={`w-8 h-8 skew-x-[-10deg] flex items-center justify-center font-display font-bold text-black text-lg ${isAdmin ? 'bg-red-600' : 'bg-ewc-gold'}`}>
              E
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">
              EWC {isAdmin && <span className="text-red-500 text-sm ml-2 font-mono">ADMIN PORTAL</span>}
            </span>
          </div>
          
          {!isAdmin && (
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      currentSection === item.id
                        ? 'text-ewc-gold bg-white/5'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="hidden lg:flex items-center gap-4">
             {!isAdmin && <button className="text-gray-400 hover:text-white"><Globe size={20} /></button>}
             <button 
                onClick={() => onNavigate(isAdmin ? NavSection.HOME : NavSection.ADMIN)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all ${
                  isAdmin 
                  ? 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20' 
                  : 'bg-ewc-gold/10 text-ewc-gold border-ewc-gold/20 hover:bg-ewc-gold/20'
                }`}
             >
                {isAdmin ? <ShieldCheck size={16} /> : <User size={16} />}
                <span className="text-sm font-semibold">{isAdmin ? 'Exit Admin' : 'Login'}</span>
             </button>
          </div>

          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && !isAdmin && (
        <div className="lg:hidden bg-[#0a0a0a] border-b border-white/10 h-screen overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentSection === item.id
                    ? 'text-ewc-gold bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
             <button 
                onClick={() => { onNavigate(NavSection.ADMIN); setIsOpen(false); }}
                className="block w-full text-left px-3 py-4 mt-4 text-base font-medium text-ewc-gold border-t border-white/10"
             >
                Login / Admin
             </button>
          </div>
        </div>
      )}
    </nav>
  );
};
