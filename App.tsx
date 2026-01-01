
import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { Workspace } from './components/Workspace';
import { ResultCanvas } from './components/ResultCanvas';
import { HistoryPanel } from './components/HistoryPanel';
import { Footer } from './components/Footer';
import { analyzeTextWithGemini } from './services/geminiService';
import { AnalysisResult, HistoryItem } from './types';

const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentText, setCurrentText] = useState("");

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('copyright_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('copyright_history', JSON.stringify(history.slice(0, 20)));
  }, [history]);

  const handleAnalysis = async (text: string) => {
    if (!text || text.length < 20) return;

    setIsLoading(true);
    setError(null);
    setCurrentText(text);

    try {
      const result = await analyzeTextWithGemini(text);
      setCurrentResult(result);
      
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
        textPreview: text.substring(0, 100),
        fullText: text,
        analysis: result
      };

      setHistory(prev => [newHistoryItem, ...prev].slice(0, 20));
    } catch (err) {
      setError("The neural engine encountered an unexpected latency event. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectHistoryItem = (item: HistoryItem) => {
    setCurrentText(item.fullText);
    setCurrentResult(item.analysis);
  };

  return (
    <div className="min-h-screen selection:bg-[#d4af37]/30 selection:text-white">
      <TopNav />
      
      <main className="max-w-7xl mx-auto px-6">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[700px] mb-24">
          {/* Left Column - Workspace */}
          <div className="lg:col-span-5 h-[500px] lg:h-full">
            <Workspace 
              onAnalyze={handleAnalysis} 
              isLoading={isLoading} 
              initialText={currentText}
            />
          </div>

          {/* Center Column - Analysis Canvas */}
          <div className="lg:col-span-4 h-[600px] lg:h-full">
            <ResultCanvas 
              result={currentResult} 
              isLoading={isLoading} 
            />
          </div>

          {/* Right Column - History Sidebar */}
          <div className="lg:col-span-3 h-[400px] lg:h-full">
            <HistoryPanel 
              history={history} 
              onSelect={selectHistoryItem} 
              activeId={history.find(h => h.analysis === currentResult)?.id}
            />
          </div>
        </div>

        {error && (
          <div className="mb-12 p-4 glass border-red-500/30 rounded-2xl text-red-400 text-sm flex items-center justify-center gap-3 animate-bounce">
            <span className="uppercase tracking-widest font-bold">System Alert:</span> {error}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
