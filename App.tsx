import React, { useState } from 'react';
import { Play } from 'lucide-react';
import Header from './components/Header';
import VerseItem from './components/VerseItem';
import VideoModal from './components/VideoModal';
import { VERSES } from './constants';

const App: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-[#f8fafc] flex flex-col relative overflow-x-hidden">
      
      {/* Background Pattern (Subtle Islamic Geometry effect) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #fbbf24 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Glow Effect Top Center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 pt-8 pb-32 relative z-0">
        <div className="space-y-2">
            {VERSES.map((verse) => (
                <VerseItem 
                    key={verse.number} 
                    number={verse.number} 
                    text={verse.text} 
                />
            ))}
        </div>
      </main>

      {/* Floating Action Bar / Bottom Sticky Area */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/95 to-transparent z-40 flex justify-center pointer-events-none">
         <button
            onClick={() => setIsVideoOpen(true)}
            className="pointer-events-auto group relative overflow-hidden bg-slate-800 hover:bg-slate-700 border border-amber-500/30 text-amber-100 px-8 py-3.5 rounded-xl shadow-lg shadow-black/40 transition-all duration-300 flex items-center gap-3 active:scale-95"
         >
            {/* Button Inner Glow */}
            <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="bg-amber-500 rounded-full p-1 text-slate-900">
                <Play size={16} fill="currentColor" className="ml-0.5" />
            </div>
            
            <span className="font-['Amiri'] text-xl pb-1 tracking-wide">مشاهدة القصة</span>
            <span className="text-xs font-sans text-amber-500/70 tracking-widest uppercase border-l border-white/10 pl-3 ml-1">Watch Story</span>
         </button>
      </div>

      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />
    </div>
  );
};

export default App;