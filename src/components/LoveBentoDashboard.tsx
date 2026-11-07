import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Disc, Play, Pause, Heart, Sparkles, Activity, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoveBentoDashboardProps {
  startDate: string;
  musicTitle: string;
  musicArtist: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const LoveBentoDashboard: React.FC<LoveBentoDashboardProps> = ({
  startDate,
  musicTitle,
  musicArtist,
  isPlaying,
  onTogglePlay,
}) => {
  const [time, setTime] = useState({
    days: 730,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [lovePulse, setLovePulse] = useState(0);

  useEffect(() => {
    const calc = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ days, hours, minutes, seconds });
    };

    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const handlePulse = () => {
    setLovePulse((prev) => prev + 1);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#e11d48'],
    });
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
          Our Love Ecosystem
        </span>
        <h2 className="font-cursive text-4xl text-rose-950">
          The 730 Days Bento Studio
        </h2>
        <p className="text-xs text-rose-700/80 font-mono mt-1">
          Detak waktu nyata dan statistik perjalanan cinta kita berdua
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Widget 1: Big Live Love Clock (Spans 2 cols on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="sm:col-span-2 bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-rose-200/90 flex flex-col justify-between shadow-xl shadow-rose-200/40 relative overflow-hidden text-left"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-500" />
              <span className="font-mono text-xs text-rose-800 font-bold tracking-wider uppercase">
                Time We've Spent Together
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[10px] text-rose-700 font-mono font-semibold">
              <Activity className="w-3 h-3 text-rose-500 animate-pulse" />
              <span>LIVE</span>
            </div>
          </div>

          {/* Large Days Number */}
          <div className="my-2 text-left">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-700 via-rose-600 to-rose-900">
                {time.days}
              </span>
              <span className="font-serif text-xl sm:text-2xl text-rose-800 font-bold">
                Hari Penuh Cinta
              </span>
            </div>
            <p className="text-xs text-rose-700/80 font-serif italic mt-0.5">
              Dimulai sejak 08 November 2024 dan akan terus bertambah selamanya
            </p>
          </div>

          {/* Sub-counter: Hours, Minutes, Seconds */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-rose-100">
            <div className="bg-rose-50/70 p-2.5 rounded-2xl text-center border border-rose-200/60 shadow-sm">
              <span className="font-mono text-lg font-bold text-rose-950 block">
                {String(time.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-mono font-bold text-rose-600">Jam</span>
            </div>
            <div className="bg-rose-50/70 p-2.5 rounded-2xl text-center border border-rose-200/60 shadow-sm">
              <span className="font-mono text-lg font-bold text-rose-950 block">
                {String(time.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-mono font-bold text-rose-600">Menit</span>
            </div>
            <div className="bg-rose-50/70 p-2.5 rounded-2xl text-center border border-rose-200/60 shadow-sm">
              <span className="font-mono text-lg font-bold text-rose-950 block">
                {String(time.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-mono font-bold text-rose-600">Detik</span>
            </div>
          </div>
        </motion.div>

        {/* Widget 2: Heart Rhythm Pulse Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-rose-200/90 flex flex-col justify-between items-center text-center shadow-xl shadow-rose-200/40"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-rose-700 font-bold">
            Heart Rhythm
          </span>

          <motion.div
            animate={{ scale: [1, 1.18, 1, 1.12, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="my-3 w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/40"
          >
            <Heart className="w-8 h-8 text-white fill-white" />
          </motion.div>

          <button
            type="button"
            onClick={handlePulse}
            className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-xs font-bold text-rose-800 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Kirim Cinta ({lovePulse})</span>
          </button>
        </motion.div>

        {/* Widget 3: Retro Cassette Tape Player (Spans full row on mobile, 3 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="sm:col-span-3 bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-rose-200/90 shadow-xl shadow-rose-200/40 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Cassette Graphic with turning spools */}
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="relative w-16 h-12 bg-gradient-to-br from-rose-900 to-rose-950 rounded-xl border-2 border-rose-300 p-1.5 flex items-center justify-around shadow-inner shrink-0">
              <Disc
                className={`w-5 h-5 text-amber-300 ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
              />
              <div className="w-4 h-2 bg-rose-950 rounded border border-rose-400/50" />
              <Disc
                className={`w-5 h-5 text-amber-300 ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
              />
            </div>

            <div className="text-left min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm font-bold text-rose-950 truncate">
                  {musicTitle}
                </span>
                {isPlaying && (
                  <span className="flex gap-0.5 items-end h-3 shrink-0">
                    <span className="w-0.5 h-3 bg-rose-500 animate-pulse" />
                    <span className="w-0.5 h-1.5 bg-rose-400 animate-pulse delay-75" />
                    <span className="w-0.5 h-2.5 bg-rose-600 animate-pulse delay-150" />
                  </span>
                )}
              </div>
              <p className="text-xs text-rose-700/80 font-mono truncate">
                {musicArtist}
              </p>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-[11px] text-rose-700 font-mono hidden sm:inline">
              {isPlaying ? 'Memutar Melodi Cinta...' : 'Melodi Sedang Dijeda'}
            </span>
            <button
              type="button"
              onClick={onTogglePlay}
              className="py-2 px-5 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-xs flex items-center gap-2 shadow-md shadow-rose-500/30 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>Jeda Musik</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  <span>Putar Musik</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Widget 4: Milestone Stats Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="sm:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5"
        >
          <div className="bg-white/95 p-3 rounded-2xl border border-rose-200/80 text-left shadow-sm">
            <span className="text-[10px] font-mono uppercase text-rose-600 block font-bold">
              Kisah Dimulai
            </span>
            <span className="font-serif text-sm font-bold text-rose-950">08 Nov 2024</span>
          </div>
          <div className="bg-white/95 p-3 rounded-2xl border border-rose-200/80 text-left shadow-sm">
            <span className="text-[10px] font-mono uppercase text-rose-600 block font-bold">
              Jam Kebersamaan
            </span>
            <span className="font-serif text-sm font-bold text-rose-950">17.520+ Jam</span>
          </div>
          <div className="bg-white/95 p-3 rounded-2xl border border-rose-200/80 text-left shadow-sm">
            <span className="text-[10px] font-mono uppercase text-rose-600 block font-bold">
              Menit Mencintaimu
            </span>
            <span className="font-serif text-sm font-bold text-rose-950">1.051.200+ Menit</span>
          </div>
          <div className="bg-white/95 p-3 rounded-2xl border border-rose-200/80 text-left shadow-sm">
            <span className="text-[10px] font-mono uppercase text-rose-600 block font-bold">
              Kecocokan Jiwa
            </span>
            <span className="font-serif text-sm font-bold text-rose-950 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>1000% Soulmate</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
