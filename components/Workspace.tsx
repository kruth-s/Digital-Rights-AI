
import React, { useState } from 'react';
import { FileText, Clipboard, Trash2, Zap } from 'lucide-react';

interface WorkspaceProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
  initialText?: string;
}

export const Workspace: React.FC<WorkspaceProps> = ({ onAnalyze, isLoading, initialText = "" }) => {
  const [text, setText] = useState(initialText);

  // Sync state if initialText changes from history
  React.useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const handleClear = () => {
    setText("");
  };

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const isTooShort = charCount < 20;
  const isTooLong = charCount > 10000;

  return (
    <div className="flex flex-col h-full glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#d4af37]" />
          <span className="text-sm font-medium uppercase tracking-widest text-white/80">Input Manuscript</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePaste}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white"
            title="Paste from clipboard"
          >
            <Clipboard className="w-4 h-4" />
          </button>
          <button 
            onClick={handleClear}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-[#ff4d4d]"
            title="Clear all text"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text for proprietary analysis..."
          className="w-full h-full bg-transparent p-6 text-lg font-light text-white/80 placeholder:text-white/20 focus:outline-none resize-none leading-relaxed"
        />
        
        <div className="absolute bottom-6 left-6 flex gap-4">
          {['Academic Paper', 'News Article', 'Source Code'].map(chip => (
            <button
              key={chip}
              onClick={() => {
                if (chip === 'Academic Paper') setText("Abstract: This study explores the quantum entanglement patterns in near-absolute zero environments, observing non-local interactions that defy standard model predictions. Previous research by Jenkins et al. (2019) suggested similar findings, but our longitudinal data provide a higher sigma level...");
                if (chip === 'News Article') setText("LONDON — In a move that surprised global financial markets, the central bank announced a 50-basis point hike in interest rates early this morning. Analysts point to escalating geopolitical tensions and supply chain disruptions as the primary catalysts for the hawkish turn...");
                if (chip === 'Source Code') setText("import React from 'react';\nimport { createRoot } from 'react-dom/client';\n\nconst App = () => {\n  return <div>Secure Copyright Engine v1.0.4</div>;\n};\n\nconst root = createRoot(document.getElementById('root'));\nroot.render(<App />);");
              }}
              className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 text-white/40 hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-all"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6 border-t border-white/5 bg-white/2 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex gap-6 text-[11px] uppercase tracking-widest text-white/30">
          <div className="flex flex-col">
            <span className="text-white/60">{charCount.toLocaleString()}</span>
            <span>Characters</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/60">{wordCount.toLocaleString()}</span>
            <span>Words</span>
          </div>
        </div>

        <button
          onClick={() => onAnalyze(text)}
          disabled={isLoading || isTooShort || isTooLong}
          className={`
            group relative flex items-center gap-3 px-8 py-4 rounded-full font-medium text-sm transition-all
            ${isLoading ? 'bg-white/10 cursor-not-allowed text-white/20' : 
              (isTooShort || isTooLong) ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10' :
              'bg-[#d4af37] text-black hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'}
          `}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Zap className="w-4 h-4 fill-current transition-transform group-hover:rotate-12" />
          )}
          <span className="uppercase tracking-widest">
            {isLoading ? 'Processing...' : 'Analyze Risk'}
          </span>
        </button>
      </div>
      
      {isTooShort && text.length > 0 && (
        <div className="bg-red-500/10 text-red-400 text-[10px] uppercase tracking-widest py-1 text-center font-medium">
          Minimum 20 characters required for analysis
        </div>
      )}
    </div>
  );
};
