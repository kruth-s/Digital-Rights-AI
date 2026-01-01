
import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <div className="pt-32 pb-16 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-medium mb-4 block">
          Heuristic Intelligence
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
          Verify Creative <span className="italic">Provenance</span>
        </h1>
        <p className="max-w-2xl mx-auto text-white/50 text-lg md:text-xl font-light leading-relaxed mb-10">
          Advanced semantic analysis for predicting copyright status, public domain eligibility, and digital footprint. 
          Architected for creators, legal researchers, and archivists.
        </p>
      </motion.div>
    </div>
  );
};
