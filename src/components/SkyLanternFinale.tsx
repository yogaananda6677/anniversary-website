import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, CheckCircle2, QrCode, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SkyLanternFinaleProps {
  wishes: string[];
  coupleName: string;
  onOpenQR: () => void;
  onScrollToTop: () => void;
}

export const SkyLanternFinale: React.FC<SkyLanternFinaleProps> = ({
  wishes,
  coupleName,
  onOpenQR,
  onScrollToTop,
}) => {
  const [selectedWish, setSelectedWish] = useState(0);
  const [customWish, setCustomWish] = useState('');
  const [isLanternReleased, setIsLanternReleased] = useState(false);

  const handleReleaseLantern = () => {
    if (isLanternReleased) return;
    setIsLanternReleased(true);

    // Launch celebratory heart fireworks
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section className="py-20 px-4 max-w-xl mx-auto select-none relative text-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-8"
      >
        <span className="font-serif text-xs tracking-widest text-champagne-300 uppercase block mb-1">
          Sky Lantern Wishing Finale
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-100">
          Lentera Doa Tahun Ke-3
        </h2>
        <p className="text-xs text-rose-300/80 font-mono mt-1">
          Tuliskan atau pilih doa terbaik kita dan terbangkan bersama ke langit malam
        </p>
      </motion.div>

      {/* Floating Sky Lantern Visual */}
      <div className="relative h-60 w-full flex items-center justify-center overflow-hidden mb-6">
        <motion.div
          animate={
            isLanternReleased
              ? {
                  y: -350,
                  scale: 0.3,
                  opacity: 0,
                }
              : {
                  y: [-8, 8, -8],
                  rotate: [-2, 2, -2],
                }
          }
          transition={
            isLanternReleased
              ? { duration: 3.2, ease: 'easeIn' }
              : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative flex flex-col items-center"
        >
          {/* Warm Lantern Glow Aura */}
          <div className="absolute w-36 h-36 rounded-full bg-amber-400/25 blur-2xl pointer-events-none" />

          {/* Lantern Body */}
          <div className="relative w-28 sm:w-32 h-36 sm:h-40 bg-gradient-to-t from-amber-500 via-rose-500 to-amber-400 rounded-t-3xl rounded-b-xl shadow-[0_0_50px_15px_rgba(245,158,11,0.5)] border-2 border-champagne-300/80 flex flex-col items-center justify-between p-3 overflow-hidden">
            <span className="text-[10px] font-mono text-wine-950 font-bold uppercase tracking-wider">
              YEAR 3 WISH
            </span>

            {/* Glowing Heart in the center */}
            <div className="w-10 h-10 rounded-full bg-amber-200/40 flex items-center justify-center">
              <Heart className="w-6 h-6 text-amber-100 fill-amber-100 animate-pulse" />
            </div>

            {/* Fire flame at the base */}
            <div className="w-8 h-4 bg-gradient-to-t from-yellow-100 to-amber-500 rounded-full blur-[1px]" />
          </div>
        </motion.div>

        {isLanternReleased && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <p className="font-serif text-base text-rose-100 font-bold">
              Lentera Doa Kita Telah Mengangkasa! ✨
            </p>
            <p className="font-cursive text-xl text-champagne-300 mt-1">
              Semoga setiap impian kita menjadi nyata
            </p>
          </motion.div>
        )}
      </div>

      {/* Wish Selector & Action */}
      {!isLanternReleased ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card-rose rounded-3xl p-5 border border-rose-500/30 text-left mb-8 shadow-xl"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-rose-300 font-semibold block mb-3">
            Pilih Doa untuk Diterbangkan:
          </span>

          {/* Predefined wishes */}
          <div className="space-y-2 mb-4">
            {wishes.map((w, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedWish(idx);
                  setCustomWish('');
                }}
                className={`p-3 rounded-xl border text-xs sm:text-sm font-serif cursor-pointer transition-all flex items-start gap-2.5 ${
                  selectedWish === idx && !customWish
                    ? 'bg-rose-900/80 border-rose-400 text-rose-100 shadow-md'
                    : 'bg-wine-950/60 border-rose-900/40 text-rose-300/80 hover:border-rose-500/40'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                    selectedWish === idx && !customWish
                      ? 'text-rose-400 fill-rose-400'
                      : 'text-rose-600'
                  }`}
                />
                <span>"{w}"</span>
              </div>
            ))}
          </div>

          {/* Custom Wish Input */}
          <div className="mb-4">
            <span className="text-[11px] font-mono text-rose-300/70 block mb-1">
              Atau tulis doa pribadimu sendiri:
            </span>
            <input
              type="text"
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              placeholder="Ketik doa permohonanmu di sini..."
              className="w-full bg-wine-950 border border-rose-900/60 rounded-xl px-3 py-2 text-xs text-rose-100 focus:outline-none focus:border-rose-400 placeholder:text-rose-400/40"
            />
          </div>

          {/* Release Button */}
          <button
            type="button"
            onClick={handleReleaseLantern}
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-rose-950/50 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Terbangkan Lentera Cinta ke Langit</span>
          </button>
        </motion.div>
      ) : (
        <div className="mb-8" />
      )}

      {/* Footer Navigation Buttons */}
      <div className="pt-6 border-t border-rose-900/40 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onOpenQR}
          className="py-2.5 px-4 rounded-full bg-wine-900/80 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-1.5 hover:bg-rose-900/60 transition-all active:scale-95"
        >
          <QrCode className="w-3.5 h-3.5 text-champagne-300" />
          <span>QR Code Hati</span>
        </button>

        <button
          type="button"
          onClick={onScrollToTop}
          className="py-2.5 px-4 rounded-full bg-wine-900/80 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-1.5 hover:bg-rose-900/60 transition-all active:scale-95"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Kembali ke Atas</span>
        </button>
      </div>

      <p className="mt-6 text-[11px] text-rose-400/60 font-mono">
        Dibuat khusus untuk {coupleName} • 08 November 2024 - Forever
      </p>
    </section>
  );
};
