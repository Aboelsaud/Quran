import React from 'react';
import { SURAH_INFO } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 flex flex-col items-center justify-center relative z-10 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-sm sticky top-0">
      <div className="text-amber-500/80 mb-2">
        {/* Simple decorative Bismillah calligraphy representation or icon */}
        <svg width="40" height="20" viewBox="0 0 100 50" fill="currentColor" className="opacity-80">
          <path d="M10,25 Q30,5 50,25 T90,25" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      <h1 className="text-3xl font-['Amiri'] font-bold text-amber-400 mb-1 drop-shadow-md">
        {SURAH_INFO.nameAr}
      </h1>
      <div className="flex items-center gap-2 text-slate-400 text-sm font-sans tracking-wide uppercase">
        <span>{SURAH_INFO.nameEn}</span>
        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
        <span>Verses {SURAH_INFO.versesRange}</span>
      </div>
    </header>
  );
};

export default Header;