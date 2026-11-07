import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Camera, Sparkles, Heart, CheckCircle2, Flame } from 'lucide-react';
import { AnniversaryData } from '../types';

interface AnniversaryCakeSectionProps {
  data: AnniversaryData;
}

export const AnniversaryCakeSection: React.FC<AnniversaryCakeSectionProps> = ({ data }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);

    // Launch celebratory confetti burst
    const count = 240;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a', '#ffffff', '#e11d48'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 35, startVelocity: 60 });
    fire(0.2, { spread: 70 });
    fire(0.35, { spread: 100, decay: 0.92, scalar: 1.1 });
    fire(0.1, { spread: 130, startVelocity: 30, decay: 0.93, scalar: 1.3 });
    fire(0.1, { spread: 140, startVelocity: 55 });
  };

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
          Sweet Memories & Wishes
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-100">
          Our 2nd Anniversary Toast
        </h2>
      </motion.div>

      {/* Retro Camera Scrapbook Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-xs mb-6 group"
      >
        <div className="bg-gradient-to-b from-wine-900 to-wine-950 border-2 border-rose-500/40 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
          {/* Top Camera Controls Bar */}
          <div className="flex justify-between items-center mb-2 px-1">
            <div className="flex items-center gap-1.5 text-xs text-rose-300 font-mono tracking-wider">
              <Camera className="w-3.5 h-3.5 text-rose-400" />
              <span>ANNIVERSARY.RAW</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[10px] text-rose-400 font-mono uppercase">YEAR 2</span>
            </div>
          </div>

          {/* Photo Frame */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-rose-400/30 bg-wine-950 shadow-inner">
            <img
              src={data.scrapbookPhoto}
              alt="Memory"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-xs text-white bg-wine-900/80 px-2.5 py-1 rounded-md backdrop-blur-md border border-rose-400/30">
              <Sparkles className="w-3 h-3 text-champagne-300" />
              <span className="font-serif">You & Me • Since 2024</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Note Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full glass-card-rose rounded-xl p-5 mb-6 text-left border border-rose-500/30 relative shadow-lg"
      >
        <div className="flex items-center gap-1.5 text-xs text-rose-300 mb-2 font-mono tracking-wider">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Doa & Harapan Anniversary:</span>
        </div>
        <p className="font-serif text-sm text-rose-100 leading-relaxed italic">
          "{data.cakeWishMessage}"
        </p>
      </motion.div>

      {/* Interactive Cake with Animated Vector Dual Candles */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        onClick={handleBlowCandles}
        className="flex flex-col items-center cursor-pointer group"
      >
        {/* Cake Vector Construction */}
        <div className="relative w-44 h-34 flex flex-col items-center justify-end">
          {/* Dual Anniversary Candles (Symbolizing 2 Years) */}
          <div className="flex gap-6 mb-1 z-10">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {!candlesBlown ? (
                  <motion.div
                    animate={{
                      scaleY: [1, 1.25, 0.95, 1.15],
                      scaleX: [1, 0.9, 1.05, 0.95],
                      rotate: [-2, 3, -1, 2],
                    }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                    className="w-3 h-5 bg-gradient-to-t from-rose-500 via-champagne-300 to-white rounded-full shadow-lg shadow-champagne-400/80"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -20, scale: 1.5 }}
                    transition={{ duration: 1.2 }}
                    className="w-2.5 h-2.5 rounded-full bg-rose-200 blur-[1px]"
                  />
                )}
                {/* Candle Stick */}
                <div className="w-2 h-7 bg-gradient-to-b from-champagne-300 via-rose-300 to-rose-600 rounded-t-sm shadow-sm flex items-center justify-center">
                  <span className="text-[8px] font-bold text-wine-950">{i}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Top Cake Tier */}
          <div className="w-32 h-9 bg-gradient-to-r from-rose-200 via-rose-100 to-rose-200 rounded-t-xl border border-rose-300 shadow-md relative overflow-hidden flex items-center justify-center">
            <div className="w-full h-2.5 bg-rose-400/60 absolute top-0 rounded-t-xl" />
            <div className="flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </div>
          </div>

          {/* Bottom Cake Tier */}
          <div className="w-40 h-11 bg-gradient-to-r from-wine-700 via-wine-600 to-wine-700 rounded-t-xl border border-rose-500/50 shadow-xl relative flex items-center justify-around px-3">
            <div className="w-full h-2.5 bg-rose-300/40 absolute top-0" />
            <div className="w-2 h-2 rounded-full bg-champagne-300/80" />
            <div className="w-2 h-2 rounded-full bg-rose-200" />
            <div className="w-2 h-2 rounded-full bg-champagne-300/80" />
            <div className="w-2 h-2 rounded-full bg-rose-200" />
          </div>

          {/* Golden Stand Plate */}
          <div className="w-44 h-2.5 bg-gradient-to-r from-champagne-500 via-champagne-300 to-champagne-500 rounded-full shadow-lg" />
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="mt-4 px-5 py-2 rounded-full bg-wine-900/90 border border-rose-400/40 text-xs text-rose-200 font-medium tracking-wide hover:bg-rose-600 hover:text-white transition-all shadow-md group-hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          {candlesBlown ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Permohonan Tahun Ke-3 Telah Dibuat ✨</span>
            </>
          ) : (
            <>
              <Flame className="w-3.5 h-3.5 text-champagne-300 fill-champagne-300 animate-pulse" />
              <span>Ketuk untuk Tiup Lilin 2nd Anniversary</span>
            </>
          )}
        </button>
      </motion.div>
    </section>
  );
};
