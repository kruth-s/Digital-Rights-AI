
import React from 'react';
import { ShieldCheck, Info, ExternalLink } from 'lucide-react';

export const TopNav: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#f7e7ce] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          <ShieldCheck className="text-black w-6 h-6" />
        </div>
        <span className="font-serif text-2xl font-bold tracking-tight text-white">
          AI Copyright Studio
        </span>
      </div>

      <div className="hidden md:flex items-center gap-1 bg-black/40 rounded-full p-1 border border-white/10">
        <button className="px-6 py-2 rounded-full text-sm font-medium transition-all bg-[#d4af37] text-black">
          Text Mode
        </button>
        <button className="px-6 py-2 rounded-full text-sm font-medium transition-all text-white/40 hover:text-white/80">
          Batch Mode
        </button>
      </div>

      <div className="flex items-center gap-4">
        <a 
          href="https://ai.google.dev/gemini-api/docs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Powered by Gemini
        </a>
        <div className="h-4 w-[1px] bg-white/10"></div>
        <button className="text-white/60 hover:text-white transition-colors">
          <Info className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};
