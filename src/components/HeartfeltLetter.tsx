import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { AnniversaryData } from '../types';

interface HeartfeltLetterProps {
  data: AnniversaryData;
}

export const HeartfeltLetter: React.FC<HeartfeltLetterProps> = ({ data }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 max-w-md mx-auto text-center select-none py-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-6"
      >
        <span className="font-serif text-xs tracking-widest text-rose-300 uppercase block mb-1">
          A Letter From My Soul
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-100">
          {data.longLetterTitle}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-rose-400" />
          <Feather className="w-3.5 h-3.5 text-rose-400" />
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-rose-400" />
        </div>
      </motion.div>

      {/* Classic Ornate Mirror / Framed Portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative w-48 sm:w-56 aspect-[3/4] mb-8"
      >
        {/* Glow Halo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/30 via-champagne-400/20 to-transparent rounded-full blur-2xl" />

        {/* Vintage Oval Mirror Frame */}
        <div className="w-full h-full rounded-[45%] p-2.5 bg-gradient-to-b from-champagne-300 via-rose-400 to-wine-800 shadow-2xl border border-champagne-200/60 relative overflow-hidden flex items-center justify-center">
          <div className="w-full h-full rounded-[45%] overflow-hidden bg-wine-950 border border-wine-900 shadow-inner">
            <img
              src={data.mirrorPhoto}
              alt="My Favorite View"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wine-950/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Caption */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-wine-900/90 border border-rose-400/50 px-3 py-1 rounded-full text-[11px] text-rose-200 shadow-lg whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md">
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          <span>My Favorite View</span>
        </div>
      </motion.div>

      {/* The Long Letter Parchment Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="w-full glass-card-rose rounded-2xl p-6 sm:p-7 text-left border border-rose-400/40 shadow-2xl relative"
      >
        <div className="flex items-center justify-between border-b border-rose-900/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-champagne-300" />
            <span className="text-xs font-mono tracking-widest uppercase text-rose-300 font-semibold">
              08 November 2024 - 08 November 2026
            </span>
          </div>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        </div>

        {/* Letter Paragraphs */}
        <div className="space-y-3.5 text-xs sm:text-sm text-rose-100 leading-relaxed font-serif">
          {data.longLetterContent.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Signoff */}
        <div className="mt-6 pt-4 border-t border-rose-900/60 text-right">
          <p className="font-cursive text-2xl text-rose-300">
            With eternal love,
          </p>
          <p className="font-serif text-sm font-bold text-rose-100 mt-1">
            {data.coupleName.split('&')[0].trim()}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
