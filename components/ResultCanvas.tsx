
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Globe, Info, Fingerprint } from 'lucide-react';
import { AnalysisResult, Classification } from '../types';

interface ResultCanvasProps {
  result: AnalysisResult | null;
  isLoading: boolean;
}

const getClassificationConfig = (type: Classification) => {
  switch (type) {
    case 'copyrighted':
      return {
        label: 'LIKELY COPYRIGHTED',
        color: '#d4af37',
        icon: Fingerprint,
        bg: 'bg-[#d4af37]/10',
        border: 'border-[#d4af37]/30'
      };
    case 'public_domain':
      return {
        label: 'PUBLIC DOMAIN',
        color: '#10b981',
        icon: CheckCircle,
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30'
      };
    case 'web_available':
      return {
        label: 'WEB AVAILABLE',
        color: '#3b82f6',
        icon: Globe,
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30'
      };
    default:
      return {
        label: 'UNCERTAIN',
        color: '#6b7280',
        icon: AlertTriangle,
        bg: 'bg-gray-500/10',
        border: 'border-gray-500/30'
      };
  }
};

export const ResultCanvas: React.FC<ResultCanvasProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 glass rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 to-transparent pointer-events-none"></div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full border border-[#d4af37]/30 flex items-center justify-center mb-8"
        >
          <div className="w-16 h-16 rounded-full border-2 border-t-[#d4af37] border-transparent animate-spin"></div>
        </motion.div>
        <h3 className="text-white/80 font-serif text-2xl mb-2 tracking-wide">Evaluating Proprietary Risk</h3>
        <p className="text-white/30 text-sm font-light uppercase tracking-[0.2em] animate-pulse">Scanning patterns & semantic signals...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 glass rounded-3xl border border-white/5 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <Info className="text-white/20 w-8 h-8" />
        </div>
        <h3 className="text-white/60 font-serif text-2xl mb-2 italic">Awaiting Submission</h3>
        <p className="text-white/30 text-sm font-light max-w-xs leading-relaxed uppercase tracking-wider">
          Provide manuscript text on the left workspace to begin heuristic analysis.
        </p>
      </div>
    );
  }

  const config = getClassificationConfig(result.classification);
  const chartData = [
    { value: result.confidence * 100 },
    { value: (1 - result.confidence) * 100 }
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={JSON.stringify(result)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="h-full flex flex-col p-8 glass rounded-3xl border border-white/10 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          <div className="flex-1">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border ${config.bg} ${config.border}`}>
              <config.icon className="w-4 h-4" style={{ color: config.color }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: config.color }}>
                {config.label}
              </span>
            </div>
            <h2 className="font-serif text-4xl text-white mb-4">Heuristic Profile</h2>
            <div className="space-y-3">
              {result.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-2 opacity-50 shrink-0"></div>
                  <p className="text-white/70 text-sm font-light leading-relaxed italic">"{reason}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-48 flex flex-col items-center text-center">
            <div className="w-full aspect-square relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={65}
                    paddingAngle={0}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill={config.color} />
                    <Cell fill="rgba(255,255,255,0.05)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-light text-white leading-none">
                  {Math.round(result.confidence * 100)}%
                </span>
                <span className="text-[9px] text-white/30 uppercase tracking-widest mt-1">Confidence</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {Object.entries(result.signals).map(([key, value]) => (
            <div 
              key={key} 
              className={`px-3 py-2 rounded-xl border text-[10px] font-medium uppercase tracking-wider text-center transition-colors ${
                value ? 'bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]' : 'bg-white/2 border-white/5 text-white/20'
              }`}
            >
              {key.replace(/_/g, ' ')}
            </div>
          ))}
        </div>

        <div className="mt-auto p-4 rounded-2xl bg-black/40 border border-white/5">
          <div className="flex gap-2 items-center mb-2 text-[#d4af37]">
            <AlertTriangle className="w-3 h-3" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Safety Assessment</span>
          </div>
          <p className="text-[11px] text-white/50 leading-relaxed italic">
            {result.safety_notes || "No significant policy deviations detected during linguistic processing."}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
