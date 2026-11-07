import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Smile, Sparkles, X, Mail, ShieldCheck } from 'lucide-react';
import { OpenWhenLetter } from '../types';

interface OpenWhenCapsuleProps {
  letters: OpenWhenLetter[];
}

export const OpenWhenCapsule: React.FC<OpenWhenCapsuleProps> = ({ letters }) => {
  const [selectedLetter, setSelectedLetter] = useState<OpenWhenLetter | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Smile':
        return <Smile className="w-5 h-5 text-amber-300" />;
      case 'ShieldHeart':
        return <ShieldCheck className="w-5 h-5 text-purple-300" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-champagne-300" />;
      default:
        return <Heart className="w-5 h-5 text-rose-300" />;
    }
  };

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
        <span className="font-serif text-xs tracking-widest text-rose-300 uppercase block mb-1">
          Secret Time Capsules
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-100">
          "Open When..." Letters
        </h2>
        <p className="text-xs text-rose-300/80 font-mono mt-1">
          4 Surat rahasia yang disiapkan khusus untuk menemani setiap suasana hatimu
        </p>
      </motion.div>

      {/* Grid of 4 Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {letters.map((letter, index) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedLetter(letter)}
            className="cursor-pointer glass-card-rose rounded-2xl p-5 border border-rose-500/30 hover:border-rose-400/60 transition-all shadow-xl relative overflow-hidden group text-left flex flex-col justify-between"
          >
            {/* Top Tag & Icon */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/30 text-champagne-300 font-semibold">
                {letter.badge}
              </span>
              <div className="w-8 h-8 rounded-full bg-rose-950/70 border border-rose-500/30 flex items-center justify-center">
                {getIcon(letter.iconName)}
              </div>
            </div>

            {/* Letter Preview & Title */}
            <div>
              <h3 className="font-serif text-base font-bold text-rose-100 group-hover:text-rose-200 transition-colors">
                {letter.title}
              </h3>
              <p className="text-[11px] text-rose-300/70 font-mono mt-0.5">
                {letter.subtitle}
              </p>
            </div>

            {/* Bottom Envelope Stamp Accent */}
            <div className="mt-4 pt-3 border-t border-rose-900/50 flex items-center justify-between text-xs text-rose-400 group-hover:text-rose-200">
              <span className="font-mono text-[10px]">Ketuk untuk membuka</span>
              <Mail className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Letter Reader */}
      <AnimatePresence>
        {selectedLetter && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-gradient-to-b from-rose-50 via-white to-rose-100 text-wine-950 rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-rose-300 text-left overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedLetter(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-rose-200/80 text-wine-950 hover:bg-rose-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-rose-200">
                <div className="w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center text-white">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-rose-800 font-bold block">
                    {selectedLetter.badge} • SPECIAL CAPSULE
                  </span>
                  <span className="font-serif text-xs text-rose-900">
                    Untuk Sayangku
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg sm:text-xl font-bold text-wine-950 mb-4 mt-2">
                {selectedLetter.title}
              </h3>

              {/* Letter Content */}
              <div className="bg-white/80 p-4 rounded-xl border border-rose-200 mb-5 shadow-inner">
                <p className="font-serif text-sm leading-relaxed text-wine-950 italic">
                  "{selectedLetter.content}"
                </p>
              </div>

              {/* Signoff */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="font-cursive text-xl text-rose-800">
                    Always by your side,
                  </p>
                  <p className="font-serif text-xs font-bold text-wine-950">
                    Yoga Ananda
                  </p>
                </div>

                {/* Wax Seal Stamp */}
                <div className="w-10 h-10 rounded-full wax-seal-rose flex items-center justify-center border border-white/60 shadow-md">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
