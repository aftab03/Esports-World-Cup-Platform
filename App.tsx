
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { NavSection } from './types';
import { Home } from './pages/Home';
import { Competitions } from './pages/Competitions';
import { Fantasy } from './pages/Fantasy';
import { Schedule } from './pages/Schedule';
import { RankingPage } from './pages/Ranking';
import { Admin } from './pages/Admin';
import { AiAssistant } from './components/AiAssistant';
import { Festival } from './pages/Festival';
import { News } from './pages/News';
import { Gallery } from './pages/Gallery';
import { Partners } from './pages/Partners';
import { AppProvider } from './context/AppContext';

const AppContent: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<NavSection>(NavSection.HOME);

  const renderContent = () => {
    switch (currentSection) {
      case NavSection.HOME:
        return <Home onNavigate={setCurrentSection} />;
      case NavSection.COMPETITIONS:
        return <Competitions />;
      case NavSection.FANTASY:
        return <Fantasy />;
      case NavSection.SCHEDULE:
        return <Schedule />;
      case NavSection.RANKING:
        return <RankingPage />;
      case NavSection.NEWS:
        return <News />;
      case NavSection.FESTIVAL:
        return <Festival />;
      case NavSection.GALLERY:
        return <Gallery />;
      case NavSection.PARTNERS:
        return <Partners />;
      case NavSection.ADMIN:
        return <Admin />;
      default:
        return <div className="pt-32 text-center text-gray-500">This module is under construction.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-ewc-gold selection:text-black">
      <Navbar currentSection={currentSection} onNavigate={setCurrentSection} />
      
      <main className="animate-fade-in">
        {renderContent()}
      </main>

      {/* Hide AI Assistant in Admin Mode to keep interface clean */}
      {currentSection !== NavSection.ADMIN && <AiAssistant />}

      {currentSection !== NavSection.ADMIN && (
        <footer className="bg-[#020202] border-t border-white/10 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-ewc-gold skew-x-[-10deg] flex items-center justify-center font-display font-bold text-black text-xs">E</div>
                <span className="font-display font-bold text-lg tracking-wider text-white">EWC</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                The world's largest esports festival. Where champions are made and legends are born.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-ewc-gold cursor-pointer" onClick={() => setCurrentSection(NavSection.COMPETITIONS)}>Competitions</li>
                <li className="hover:text-ewc-gold cursor-pointer" onClick={() => setCurrentSection(NavSection.FANTASY)}>Fantasy</li>
                <li className="hover:text-ewc-gold cursor-pointer" onClick={() => setCurrentSection(NavSection.SCHEDULE)}>Schedule</li>
                <li className="hover:text-ewc-gold cursor-pointer" onClick={() => setCurrentSection(NavSection.RANKING)}>Club Championship</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-ewc-gold cursor-pointer">Help Center</li>
                <li className="hover:text-ewc-gold cursor-pointer" onClick={() => setCurrentSection(NavSection.PARTNERS)}>Partners</li>
                <li className="hover:text-ewc-gold cursor-pointer">Privacy Policy</li>
                <li className="hover:text-ewc-gold cursor-pointer">Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Follow Us</h4>
              <div className="flex gap-4 opacity-50">
                <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center cursor-pointer hover:bg-ewc-gold hover:text-black transition-colors">𝕏</div>
                <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center cursor-pointer hover:bg-ewc-gold hover:text-black transition-colors">📷</div>
                <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center cursor-pointer hover:bg-ewc-gold hover:text-black transition-colors">▶️</div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
            © 2024 Esports World Cup Foundation. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
