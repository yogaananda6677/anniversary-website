import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, CheckCircle2, QrCode, ArrowUp, Sparkles, RotateCcw, X } from 'lucide-react';
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
  const [showArrivalModal, setShowArrivalModal] = useState(false);

  const activeWishText =
    customWish.trim() || wishes[selectedWish] || 'Semoga cinta kita abadi selamanya';

  const handleReleaseLantern = () => {
    if (isLanternReleased) return;
    setIsLanternReleased(true);
    setShowArrivalModal(false);

    // Initial confetti burst from sides
    confetti({
      particleCount: 25,
      angle: 60,
      spread: 65,
      origin: { x: 0.1, y: 0.8 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24', '#f59e0b'],
    });
    confetti({
      particleCount: 25,
      angle: 120,
      spread: 65,
      origin: { x: 0.9, y: 0.8 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24', '#f59e0b'],
    });

    // Mid-flight confetti at 2 seconds
    setTimeout(() => {
      confetti({
        particleCount: 35,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#fbbf24', '#f59e0b', '#fda4af'],
      });
    }, 2000);

    // Smooth scroll up through the entire website to the top element
    const startScroll = window.scrollY;
    const scrollDuration = 4800; // 4.8 seconds smooth cinematic flight to top
    const startTime = performance.now();

    function smoothScrollUp(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1);

      // Smooth easeInOutCubic
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startScroll * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(smoothScrollUp);
      } else {
        // Grand arrival at the very top of the website
        setShowArrivalModal(true);
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.3 },
          colors: ['#f43f5e', '#fb7185', '#fbbf24', '#e11d48', '#ffffff'],
        });
      }
    }

    requestAnimationFrame(smoothScrollUp);
  };

  const handleReset = () => {
    setIsLanternReleased(false);
    setShowArrivalModal(false);
  };

  // 10 Companion ambient lanterns with fixed random positions
  const companionLanterns = [
    { left: '10%', delay: 0.2, duration: 5.5, size: 28, xOffset: 25 },
    { left: '22%', delay: 0.8, duration: 6.2, size: 20, xOffset: -20 },
    { left: '35%', delay: 1.4, duration: 5.8, size: 32, xOffset: 15 },
    { left: '48%', delay: 0.5, duration: 6.5, size: 24, xOffset: -30 },
    { left: '62%', delay: 1.1, duration: 5.6, size: 36, xOffset: 20 },
    { left: '75%', delay: 0.4, duration: 6.0, size: 22, xOffset: -15 },
    { left: '88%', delay: 1.6, duration: 5.4, size: 30, xOffset: 25 },
    { left: '16%', delay: 2.0, duration: 5.9, size: 18, xOffset: -25 },
    { left: '82%', delay: 2.2, duration: 6.3, size: 26, xOffset: 15 },
    { left: '54%', delay: 2.5, duration: 5.7, size: 22, xOffset: -18 },
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Sky Lantern Wishing Finale</span>
        </div>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-950">
          Lentera Doa Tahun Ke-3
        </h2>
        <p className="text-xs text-rose-700/80 font-mono mt-1 max-w-md mx-auto">
          Tuliskan doa terindah kita, lalu terbangkan lentera menembus seluruh halaman web menuju puncak langit
        </p>
      </motion.div>

      {/* Static / Hovering Lantern on Pedestal before release */}
      <div className="relative h-64 sm:h-72 w-full flex items-center justify-center mb-8">
        {/* Soft Pedestal Glow & Shadow */}
        <div className="absolute bottom-4 w-48 h-8 bg-rose-300/30 rounded-full blur-xl pointer-events-none" />

        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [-2, 2, -2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex flex-col items-center"
        >
          {/* Warm Amber Halo Aura */}
          <div className="absolute w-48 h-48 rounded-full bg-amber-400/25 blur-3xl pointer-events-none animate-pulse" />

          {/* Lantern Body */}
          <div className="relative w-36 sm:w-40 h-48 sm:h-52 bg-gradient-to-t from-amber-500 via-rose-500 to-amber-300 rounded-t-3xl rounded-b-2xl shadow-[0_10px_40px_rgba(245,158,11,0.45)] border-2 border-amber-200 flex flex-col items-center justify-between p-3.5 overflow-hidden text-center">
            {/* Header Tag */}
            <span className="text-[10px] font-mono text-wine-950 font-black uppercase tracking-wider bg-amber-100/60 px-2 py-0.5 rounded-full">
              YOGA & DELLA • YEAR 3
            </span>

            {/* Central Heart & Dynamic Live Wish Preview */}
            <div className="flex flex-col items-center gap-1.5 px-2 my-auto">
              <div className="w-10 h-10 rounded-full bg-amber-100/50 flex items-center justify-center shadow-inner">
                <Heart className="w-6 h-6 text-rose-600 fill-rose-600 animate-pulse" />
              </div>
              <p className="text-[11px] font-serif font-bold text-wine-950 leading-snug line-clamp-3">
                "{activeWishText}"
              </p>
            </div>

            {/* Flame at base */}
            <div className="w-10 h-5 bg-gradient-to-t from-white via-yellow-200 to-amber-500 rounded-full blur-[1px] animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Wish Selector & Action (Clean Light Theme) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-rose-200/90 text-left mb-8 shadow-xl shadow-rose-200/40"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-rose-800 font-bold block mb-3">
          Pilih Doa untuk Diterbangkan:
        </span>

        {/* Predefined wishes */}
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

        {/* Release Button */}
        <button
          type="button"
          onClick={handleReleaseLantern}
          className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-rose-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Terbangkan Lentera ke Puncak Langit ✨</span>
        </button>
      </motion.div>

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

      {/* PORTAL: Global Fullscreen Flight Overlay (breaks completely out of section container!) */}
      {isLanternReleased &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Ambient Twilight Starry Sky Curtain */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-purple-950/40 to-transparent"
            />

            {/* Companion Rising Festival Lanterns (Tangled Style) */}
            {companionLanterns.map((lantern, idx) => (
              <motion.div
                key={idx}
                initial={{
                  y: '105vh',
                  x: 0,
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  y: '-30vh',
                  x: [0, lantern.xOffset, -lantern.xOffset, lantern.xOffset / 2, 0],
                  opacity: [0, 0.9, 0.9, 0],
                  scale: [0.8, 1, 0.7],
                }}
                transition={{
                  duration: lantern.duration,
                  delay: lantern.delay,
                  ease: 'easeInOut',
                }}
                className="absolute flex flex-col items-center"
                style={{
                  left: lantern.left,
                  width: `${lantern.size}px`,
                  height: `${lantern.size * 1.3}px`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-amber-500 via-rose-500 to-amber-300 rounded-t-xl rounded-b-md shadow-[0_0_20px_rgba(245,158,11,0.8)] border border-amber-200/80 flex items-center justify-center">
                  <Heart className="w-2.5 h-2.5 text-amber-100 fill-amber-100" />
                </div>
              </motion.div>
            ))}

            {/* The Main Hero Flying Lantern */}
            <motion.div
              initial={{
                y: '85vh',
                x: 0,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                y: '-40vh',
                x: [0, -25, 30, -20, 15, -10, 0],
                scale: [1, 0.95, 0.85, 0.65, 0.45],
                opacity: [1, 1, 1, 0.95, 0.4],
              }}
              transition={{
                duration: 5.2,
                ease: 'easeInOut',
              }}
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              {/* Warm Golden Halo */}
              <div className="absolute w-56 h-56 rounded-full bg-amber-400/35 blur-3xl" />

              {/* Glowing Embers Trailing */}
              <motion.div
                animate={{
                  y: [0, 45],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute -bottom-8 w-12 h-12"
              >
                <div className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#fbbf24] mx-auto animate-ping" />
              </motion.div>

              {/* Hero Lantern Body */}
              <div className="relative w-36 sm:w-44 h-48 sm:h-56 bg-gradient-to-t from-amber-500 via-rose-500 to-amber-300 rounded-t-3xl rounded-b-2xl shadow-[0_0_70px_25px_rgba(245,158,11,0.7)] border-2 border-amber-200 flex flex-col items-center justify-between p-4 overflow-hidden text-center">
                <span className="text-[10px] font-mono text-wine-950 font-black uppercase tracking-wider bg-amber-100/70 px-2 py-0.5 rounded-full">
                  YOGA & DELLA • YEAR 3
                </span>

                <div className="flex flex-col items-center gap-1.5 px-2 my-auto">
                  <div className="w-10 h-10 rounded-full bg-amber-100/50 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-600 fill-rose-600 animate-pulse" />
                  </div>
                  <p className="text-[11px] font-serif font-bold text-wine-950 leading-snug line-clamp-3">
                    "{activeWishText}"
                  </p>
                </div>

                <div className="w-10 h-5 bg-gradient-to-t from-white via-yellow-200 to-amber-500 rounded-full blur-[1px] animate-pulse" />
              </div>
            </motion.div>
          </div>,
          document.body
        )}

      {/* Arrival Celebration Modal at Top of Website */}
      <AnimatePresence>
        {showArrivalModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="relative w-full max-w-md bg-gradient-to-b from-white via-rose-50/50 to-white border-2 border-rose-300 rounded-3xl shadow-2xl p-6 sm:p-8 text-center text-rose-950 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowArrivalModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Floating Heart Icon */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 border-2 border-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-rose-400/40">
                <CheckCircle2 className="w-9 h-9 text-white" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Sampai di Puncak Langit</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-rose-950 mb-2">
                Lentera Doa Telah Mengangkasa! ✨
              </h3>

              <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-200 my-4 shadow-inner">
                <p className="font-cursive text-2xl text-rose-800 leading-snug">
                  "{activeWishText}"
                </p>
              </div>

              <p className="text-xs text-rose-800 font-serif leading-relaxed mb-6">
                Doa dan harapan cinta kita berdua di tahun ke-3 telah berhasil diterbangkan ke langit tertinggi. Semoga setiap detik perjalanan cinta Yoga & Della selalu dilimpahi kebahagiaan, kesehatan, dan keabadian.
              </p>

              <div className="flex gap-2.5 justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-full bg-rose-100 hover:bg-rose-200 text-xs font-semibold text-rose-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Terbangkan Lagi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowArrivalModal(false)}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-xs font-bold text-white shadow-lg shadow-rose-400/40 transition-all cursor-pointer"
                >
                  Jelajahi Kenangan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
