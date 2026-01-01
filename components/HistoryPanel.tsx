
import React from 'react';
import { History, ChevronRight, Clock } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  activeId?: string;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, activeId }) => {
  return (
    <div className="flex flex-col h-full glass rounded-3xl overflow-hidden border border-white/10">
      <div className="px-6 py-4 flex items-center gap-2 border-b border-white/5 bg-white/2">
        <History className="w-4 h-4 text-white/40" />
        <span className="text-sm font-medium uppercase tracking-widest text-white/60">Archive</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <p className="text-white/20 text-xs uppercase tracking-widest font-light">History is empty</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className={`
                  w-full text-left p-4 rounded-2xl border transition-all duration-300 group
                  ${activeId === item.id 
                    ? 'bg-[#d4af37]/10 border-[#d4af37]/30' 
                    : 'bg-white/2 border-white/5 hover:border-white/20 hover:bg-white/5'}
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-[9px] text-white/30 uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <ChevronRight className={`w-3 h-3 transition-transform ${activeId === item.id ? 'text-[#d4af37] rotate-90' : 'text-white/20 group-hover:translate-x-1'}`} />
                </div>
                <p className="text-xs text-white/80 font-light line-clamp-2 mb-2 leading-relaxed italic">
                  "{item.textPreview}"
                </p>
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${
                     item.analysis.classification === 'copyrighted' ? 'bg-[#d4af37]' :
                     item.analysis.classification === 'public_domain' ? 'bg-emerald-500' :
                     'bg-blue-500'
                   }`}></div>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                     {item.analysis.classification.replace(/_/g, ' ')}
                   </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-white/5">
        <p className="text-[9px] text-white/20 text-center uppercase tracking-widest leading-relaxed">
          Heuristic snapshots are stored locally and cleared upon session termination.
        </p>
      </div>
    </div>
  );
};
