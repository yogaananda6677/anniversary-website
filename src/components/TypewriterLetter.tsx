import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Feather } from 'lucide-react';

interface TypewriterLetterProps {
  title: string;
  dateText: string;
  paragraphs: string[];
  signoff: string;
  author: string;
}

export const TypewriterLetter: React.FC<TypewriterLetterProps> = ({
  title,
  dateText,
  paragraphs,
  signoff,
  author,
}) => {
  return (
    <section className="py-16 px-4 max-w-xl mx-auto select-none relative">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8"
      >
        <span className="font-serif text-xs tracking-widest text-rose-600 uppercase block mb-1 font-semibold">
          A Written Testament of Love
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-950">
          {title}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-rose-400" />
          <Feather className="w-3.5 h-3.5 text-rose-600" />
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-rose-400" />
        </div>
      </motion.div>

      {/* The Stationery Paper */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-b from-[#fffcf8] via-[#fff8ef] to-[#fef4e6] text-[#2c1810] p-6 sm:p-9 rounded-3xl shadow-xl border-2 border-amber-200/90 text-left overflow-hidden"
      >
        {/* Subtle Paper Lines */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#2c1810_1px,transparent_1px)] [background-size:100%_28px] pointer-events-none" />

        {/* Paper Header */}
        <div className="flex items-center justify-between border-b border-amber-900/15 pb-3 mb-6">
          <div className="flex items-center gap-2 text-rose-800">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span className="font-mono text-[11px] tracking-wider uppercase font-bold">
              SPECIAL 2ND ANNIVERSARY EDITION
            </span>
          </div>
          <span className="font-mono text-[10px] text-amber-900/80 font-semibold">
            {dateText}
          </span>
        </div>

        {/* Paragraphs */}
        <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-[#2d1b14]">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="first-letter:text-2xl first-letter:font-bold first-letter:text-rose-800">
              {p}
            </p>
          ))}
        </div>

        {/* Signoff & Seal */}
        <div className="mt-8 pt-4 border-t border-amber-900/15 flex items-center justify-between">
          <div>
            <p className="font-cursive text-2xl text-rose-800">
              {signoff}
            </p>
            <p className="font-serif text-sm font-bold text-wine-950 mt-1">
              {author}
            </p>
          </div>

          {/* Luxury Wax Seal Emblem */}
          <div className="w-12 h-12 rounded-full wax-seal-rose flex items-center justify-center border-2 border-white/60 shadow-lg">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
