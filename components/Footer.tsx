
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 pt-12">
        <div className="max-w-md text-center md:text-left">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] mb-4">Legal Notice & Liability</p>
          <p className="text-[11px] text-white/40 leading-relaxed">
            This tool utilizes heuristic AI models to provide approximate status indicators. It is NOT a substitute for professional legal advice or official copyright registration searches. AI Copyright Studio and its developers are not liable for outcomes based on these predictions.
          </p>
        </div>
        
        <div className="flex gap-12">
          <div className="flex flex-col gap-2">
             <span className="text-[10px] text-white/20 uppercase tracking-widest">Framework</span>
             <span className="text-xs text-white/60">React 18 + TS</span>
          </div>
          <div className="flex flex-col gap-2">
             <span className="text-[10px] text-white/20 uppercase tracking-widest">AI Engine</span>
             <span className="text-xs text-white/60">Gemini 3 Flash</span>
          </div>
          <div className="flex flex-col gap-2">
             <span className="text-[10px] text-white/20 uppercase tracking-widest">Architecture</span>
             <span className="text-xs text-white/60">SPA Minimalist</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-12">
        <span className="text-[10px] text-white/10 uppercase tracking-[0.5em] font-light">
          © 2024 AI Copyright Studio — Precision Creativity
        </span>
      </div>
    </footer>
  );
};
