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
        return <Smile className="w-5 h-5 text-amber-500" />;
      case 'ShieldHeart':
        return <ShieldCheck className="w-5 h-5 text-rose-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      default:
        return <Heart className="w-5 h-5 text-rose-500" />;
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
        <span className="font-serif text-xs tracking-widest text-rose-600 uppercase block mb-1 font-semibold">
          Secret Time Capsules
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-950">
          "Open When..." Letters
        </h2>
        <p className="text-xs text-rose-700/80 font-mono mt-1">
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedLetter(letter)}
            className="cursor-pointer bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-rose-200/90 hover:border-rose-300 hover:shadow-xl transition-all shadow-md relative overflow-hidden group text-left flex flex-col justify-between"
          >
            {/* Top Tag & Icon */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 font-bold">
                {letter.badge}
              </span>
              <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center">
                {getIcon(letter.iconName)}
              </div>
            </div>

            {/* Letter Preview & Title */}
            <div>
              <h3 className="font-serif text-base font-bold text-rose-950 group-hover:text-rose-700 transition-colors">
                {letter.title}
              </h3>
              <p className="text-[11px] text-rose-700/80 font-mono mt-0.5">
                {letter.subtitle}
              </p>
            </div>

            {/* Bottom Envelope Stamp Accent */}
            <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-rose-600 group-hover:text-rose-800">
              <span className="font-mono text-[10px] font-semibold">Ketuk untuk membuka</span>
              <Mail className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Letter Reader */}
      <AnimatePresence>
        {selectedLetter && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-gradient-to-b from-rose-50 via-white to-rose-50 text-rose-950 rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-rose-200 text-left overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedLetter(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors cursor-pointer"
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
                  <span className="font-serif text-xs text-rose-900 font-semibold">
                    Untuk Della Tercinta
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg sm:text-xl font-bold text-rose-950 mb-4 mt-2">
                {selectedLetter.title}
              </h3>

              {/* Letter Content */}
              <div className="bg-white/90 p-4 rounded-xl border border-rose-200 mb-5 shadow-sm">
                <p className="font-serif text-sm leading-relaxed text-rose-950 italic">
                  "{selectedLetter.content}"
                </p>
              </div>

              {/* Signoff */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="font-cursive text-xl text-rose-800">
                    Always by your side,
                  </p>
                  <p className="font-serif text-xs font-bold text-rose-950">
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
