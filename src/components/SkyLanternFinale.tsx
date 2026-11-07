import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, CheckCircle2, QrCode, ArrowUp, Sparkles, RotateCcw } from 'lucide-react';
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

  const skyArenaRef = useRef<HTMLDivElement | null>(null);

  const activeWishText = customWish.trim() || wishes[selectedWish] || 'Semoga cinta kita abadi selamanya';

  const handleReleaseLantern = () => {
    if (isLanternReleased) return;
    setIsLanternReleased(true);

    // Smoothly scroll up into the sky arena so user watches the ascension
    setTimeout(() => {
      if (skyArenaRef.current) {
        skyArenaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);

    // Multi-stage fireworks & confetti
    const shootConfetti = (originX: number, angle: number) => {
      confetti({
        particleCount: 18,
        angle,
        spread: 60,
        origin: { x: originX, y: 0.65 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24', '#f59e0b'],
      });
    };

    // Wave 1
    shootConfetti(0.15, 60);
    shootConfetti(0.85, 120);

    // Wave 2
    setTimeout(() => {
      shootConfetti(0.2, 55);
      shootConfetti(0.8, 125);
    }, 1000);

    // Wave 3
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { y: 0.4 },
        colors: ['#f43f5e', '#fb7185', '#fbbf24', '#e11d48', '#ffffff'],
      });
    }, 2200);
  };

  const handleResetLantern = () => {
    setIsLanternReleased(false);
  };

  // Fixed star positions to avoid re-render flicker
  const stars = [
    { top: '12%', left: '15%', size: 2, delay: 0 },
    { top: '8%', left: '45%', size: 3, delay: 0.5 },
    { top: '18%', left: '78%', size: 2, delay: 1 },
    { top: '25%', left: '28%', size: 1.5, delay: 1.5 },
    { top: '35%', left: '88%', size: 2.5, delay: 0.7 },
    { top: '42%', left: '12%', size: 2, delay: 1.2 },
    { top: '50%', left: '65%', size: 1.5, delay: 0.3 },
    { top: '22%', left: '55%', size: 2, delay: 1.8 },
  ];

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
        <span className="font-serif text-xs tracking-widest text-rose-600 uppercase block mb-1 font-semibold">
          Sky Lantern Wishing Finale
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-950">
          Lentera Doa Tahun Ke-3
        </h2>
        <p className="text-xs text-rose-700/80 font-mono mt-1">
          Tuliskan doa terindah kita dan saksikan lentera terbang membubung ke langit
        </p>
      </motion.div>

      {/* The Enchanted Night Sky Arena */}
      <div
        ref={skyArenaRef}
        className="relative h-[480px] sm:h-[520px] w-full rounded-3xl bg-gradient-to-b from-[#090a1a] via-[#1a1233] to-[#2e1038] border-2 border-rose-300 shadow-2xl overflow-hidden mb-8 flex flex-col justify-between p-5"
      >
        {/* Sky Background: Twinkling Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((s, idx) => (
            <motion.div
              key={idx}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: s.delay }}
              className="absolute rounded-full bg-white shadow-[0_0_6px_#ffffff]"
              style={{
                top: s.top,
                left: s.left,
                width: `${s.size}px`,
                height: `${s.size}px`,
              }}
            />
          ))}

          {/* Shooting Star Streak */}
          <motion.div
            animate={{
              x: [-100, 350],
              y: [-50, 180],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 5,
              ease: 'easeOut',
            }}
            className="absolute top-10 left-10 w-24 h-[1.5px] bg-gradient-to-r from-transparent via-amber-200 to-white transform -rotate-45"
          />

          {/* Glowing Romantic Crescent Moon */}
          <div className="absolute top-6 right-6 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-amber-100/10 blur-xl absolute" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-200 to-amber-50 shadow-[0_0_20px_rgba(254,240,138,0.7)] flex items-center justify-center relative">
              <div className="w-8 h-8 rounded-full bg-[#0c0c22] absolute -top-1 -right-1" />
            </div>
          </div>

          {/* Distant Background Mini-Lanterns (Ambient Depth) */}
          <motion.div
            animate={{ y: [40, -450], opacity: [0, 0.7, 0.9, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 1 }}
            className="absolute left-[20%] bottom-0 w-3.5 h-5 rounded-t-lg rounded-b-sm bg-gradient-to-t from-amber-500 to-rose-400 shadow-[0_0_12px_#f59e0b]"
          />
          <motion.div
            animate={{ y: [60, -450], opacity: [0, 0.6, 0.8, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 4 }}
            className="absolute right-[25%] bottom-0 w-3 h-4 rounded-t-lg rounded-b-sm bg-gradient-to-t from-amber-500 to-rose-400 shadow-[0_0_10px_#f59e0b]"
          />
          <motion.div
            animate={{ y: [50, -450], opacity: [0, 0.5, 0.7, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 7 }}
            className="absolute left-[70%] bottom-0 w-2.5 h-3.5 rounded-t-md rounded-b-sm bg-gradient-to-t from-amber-500 to-rose-400 shadow-[0_0_8px_#f59e0b]"
          />

          {/* Cloud Mist at Horizon */}
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-rose-950/60 to-transparent pointer-events-none" />
        </div>

        {/* Top Info Banner in Sky */}
        <div className="relative z-10 text-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-200/90 font-semibold px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-amber-300/30 inline-block">
            {isLanternReleased ? '✨ Terbang Menuju Bintang-Bintang ✨' : 'Siap Diterbangkan ke Langit Malam'}
          </span>
        </div>

        {/* Central Ascending Main Lantern */}
        <div className="relative flex-1 flex items-end justify-center pb-8 z-10">
          <motion.div
            animate={
              isLanternReleased
                ? {
                    y: [-10, -430],
                    x: [0, -12, 16, -10, 8, 0],
                    scale: [1, 0.95, 0.75, 0.45],
                    opacity: [1, 1, 0.95, 0.3],
                  }
                : {
                    y: [-6, 6, -6],
                    rotate: [-2, 2, -2],
                  }
            }
            transition={
              isLanternReleased
                ? { duration: 5.5, ease: 'easeInOut' }
                : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative flex flex-col items-center"
          >
            {/* Warm Lantern Glow Aura */}
            <div className="absolute w-44 h-44 rounded-full bg-amber-400/30 blur-3xl pointer-events-none animate-pulse" />

            {/* Glowing Embers trailing behind when released */}
            {isLanternReleased && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], y: [0, 40] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute -bottom-6 w-10 h-10 pointer-events-none"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fbbf24] mx-auto animate-ping" />
              </motion.div>
            )}

            {/* Lantern Body */}
            <div className="relative w-32 sm:w-36 h-40 sm:h-44 bg-gradient-to-t from-amber-500 via-rose-500 to-amber-300 rounded-t-3xl rounded-b-xl shadow-[0_0_60px_20px_rgba(245,158,11,0.6)] border-2 border-amber-200/90 flex flex-col items-center justify-between p-3 overflow-hidden text-center">
              <span className="text-[9px] font-mono text-wine-950 font-black uppercase tracking-wider">
                YOGA & SAYANG • YEAR 3
              </span>

              {/* Heart in Center & Active Wish Text snippet */}
              <div className="flex flex-col items-center gap-1 px-1">
                <div className="w-9 h-9 rounded-full bg-amber-100/40 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-amber-100 fill-amber-100 animate-pulse" />
                </div>
                <p className="text-[10px] font-serif font-bold text-wine-950 leading-tight line-clamp-2 px-1">
                  "{activeWishText}"
                </p>
              </div>

              {/* Fire Flame at Base */}
              <div className="w-9 h-4 bg-gradient-to-t from-white via-yellow-200 to-amber-500 rounded-full blur-[1px] animate-pulse" />
            </div>
          </motion.div>

          {/* Success Overlay when lantern ascends */}
          <AnimatePresence>
            {isLanternReleased && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-auto p-4"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-white flex items-center justify-center mb-3 shadow-xl shadow-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-amber-100 font-bold drop-shadow-md">
                  Lentera Doa Kita Telah Mengangkasa! ✨
                </h3>
                <p className="font-cursive text-2xl text-rose-200 mt-1 drop-shadow-sm">
                  "{activeWishText}"
                </p>
                <p className="text-xs text-amber-200/90 font-mono mt-2 max-w-xs leading-relaxed">
                  Semoga setiap bait doa dan harapan kita berdua dikabulkan dan menjadi berkah di tahun ke-3 ini.
                </p>

                {/* Reset button to release again */}
                <button
                  type="button"
                  onClick={handleResetLantern}
                  className="mt-5 py-2 px-4 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 text-white text-xs font-mono flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Terbangkan Lentera Lainnya</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Wish Selector & Action (Light Theme Styling) */}
      {!isLanternReleased && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-rose-200/90 text-left mb-8 shadow-xl shadow-rose-200/40"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-rose-800 font-bold">
              Pilih Doa untuk Diterbangkan:
            </span>
          </div>

          {/* Predefined Wishes */}
          <div className="space-y-2.5 mb-4">
            {wishes.map((w, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedWish(idx);
                  setCustomWish('');
                }}
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-serif cursor-pointer transition-all flex items-start gap-2.5 ${
                  selectedWish === idx && !customWish
                    ? 'bg-rose-50 border-rose-400 text-rose-950 font-semibold shadow-sm'
                    : 'bg-white/70 border-rose-100 text-rose-800/80 hover:border-rose-300 hover:bg-rose-50/50'
                }`}
              >
                <Heart
                  className={`w-4 h-4 mt-0.5 shrink-0 ${
                    selectedWish === idx && !customWish
                      ? 'text-rose-600 fill-rose-600'
                      : 'text-rose-300'
                  }`}
                />
                <span>"{w}"</span>
              </div>
            ))}
          </div>

          {/* Custom Wish Input */}
          <div className="mb-5">
            <label className="text-xs font-mono text-rose-800 font-semibold block mb-1.5">
              Atau tulis doa pribadimu sendiri:
            </label>
            <input
              type="text"
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              placeholder="Ketik doa permohonanmu di sini..."
              className="w-full bg-rose-50/50 border border-rose-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-rose-950 focus:outline-none focus:border-rose-500 focus:bg-white placeholder:text-rose-400/60 transition-colors shadow-inner"
            />
          </div>

          {/* Release Button with Auto-Scroll to Sky */}
          <button
            type="button"
            onClick={handleReleaseLantern}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Terbangkan Lentera Cinta ke Langit ✨</span>
          </button>
        </motion.div>
      )}

      {/* Footer Navigation Buttons */}
      <div className="pt-6 border-t border-rose-200/80 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onOpenQR}
          className="py-2.5 px-4 rounded-full bg-white border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-50 transition-all active:scale-95 shadow-sm cursor-pointer"
        >
          <QrCode className="w-3.5 h-3.5 text-rose-600" />
          <span>QR Code Hati</span>
        </button>

        <button
          type="button"
          onClick={onScrollToTop}
          className="py-2.5 px-4 rounded-full bg-white border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-50 transition-all active:scale-95 shadow-sm cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5 text-rose-600" />
          <span>Kembali ke Atas</span>
        </button>
      </div>

      <p className="mt-6 text-[11px] text-rose-700/80 font-mono">
        Dibuat khusus untuk {coupleName} • 08 November 2024 - Forever
      </p>
    </section>
  );
};
