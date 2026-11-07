import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar as CalendarIcon, Heart, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnniversaryData } from '../types';

interface LoveTimerSectionProps {
  data: AnniversaryData;
}

export const LoveTimerSection: React.FC<LoveTimerSectionProps> = ({ data }) => {
  const [timeTogether, setTimeTogether] = useState({
    days: 730,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [lovePulseCount, setLovePulseCount] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(data.startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [data.startDate]);

  // Calendar setup for November 2024
  const { day, monthName, year, daysInMonth, startDayOfWeek } = useMemo(() => {
    const dateObj = new Date(data.startDate);
    const d = isNaN(dateObj.getDate()) ? 8 : dateObj.getDate();
    const y = isNaN(dateObj.getFullYear()) ? 2024 : dateObj.getFullYear();
    const m = isNaN(dateObj.getMonth()) ? 10 : dateObj.getMonth();

    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const firstDay = new Date(y, m, 1).getDay();
    const totalDays = new Date(y, m + 1, 0).getDate();

    return {
      day: d,
      monthName: monthNames[m],
      year: y,
      daysInMonth: totalDays,
      startDayOfWeek: firstDay,
    };
  }, [data.startDate]);

  const daysHeader = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleSendLovePulse = () => {
    setLovePulseCount((prev) => prev + 1);

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
      shapes: ['circle'],
      scalar: 1.2,
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 max-w-md mx-auto text-center select-none py-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-5"
      >
        <span className="font-serif text-xs tracking-widest text-rose-300 uppercase block mb-1">
          The Milestone We Cherish
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-100">
          The Day Our Story Began
        </h2>
        <p className="text-xs text-rose-300/80 mt-1 font-mono">
          08 November 2024 • Awal dari sejuta kebahagiaan
        </p>
      </motion.div>

      {/* Calendar Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full glass-panel-luxury rounded-2xl p-6 mb-6 border border-rose-500/30 shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <CalendarIcon className="w-4 h-4 text-rose-400" />
          <h3 className="font-serif text-2xl font-bold text-rose-100 tracking-wide">
            {monthName} {year}
          </h3>
          <Sparkles className="w-4 h-4 text-champagne-300" />
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1.5 mb-2 text-xs font-semibold text-rose-300/80">
          {daysHeader.map((d, i) => (
            <div key={i} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-xs sm:text-sm">
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const currentDay = i + 1;
            const isAnniversaryDay = currentDay === day;

            return (
              <div
                key={`day-${currentDay}`}
                className={`h-8 flex items-center justify-center rounded-full transition-all ${
                  isAnniversaryDay
                    ? 'relative bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-400 text-white font-bold shadow-lg shadow-rose-600/60 scale-110 ring-2 ring-champagne-300'
                    : 'text-rose-200/80 hover:bg-wine-800/40'
                }`}
              >
                {isAnniversaryDay ? (
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center justify-center"
                  >
                    <span>{currentDay}</span>
                    <Heart className="w-2.5 h-2.5 text-rose-200 fill-rose-200 absolute -top-1.5 animate-pulse" />
                  </motion.div>
                ) : (
                  currentDay
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Live Love Timer Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full glass-card-rose rounded-2xl p-5 mb-5 border border-rose-400/30 shadow-xl relative"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-rose-400 animate-spin-slow" />
          <span className="text-xs font-mono uppercase tracking-widest text-rose-200 font-semibold">
            Kita Sudah Bersama Selama:
          </span>
        </div>

        {/* 4 Counter Cards */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: 'Hari', value: timeTogether.days },
            { label: 'Jam', value: timeTogether.hours },
            { label: 'Menit', value: timeTogether.minutes },
            { label: 'Detik', value: timeTogether.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-wine-950/80 border border-rose-900/60 rounded-xl p-2.5 flex flex-col items-center shadow-inner"
            >
              <span className="font-mono text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-rose-100 via-rose-200 to-rose-400">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-rose-300/80 mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Love Milestones Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-rose-900/50 text-left text-xs mb-3">
          <div className="bg-wine-900/40 p-2 rounded-lg border border-rose-500/20">
            <span className="text-champagne-300 font-mono font-bold block text-sm">17.520+ Jam</span>
            <span className="text-rose-200/70 text-[11px]">Penuh cerita & tawa berdua</span>
          </div>
          <div className="bg-wine-900/40 p-2 rounded-lg border border-rose-500/20">
            <span className="text-champagne-300 font-mono font-bold block text-sm">1.051.200+ Mnt</span>
            <span className="text-rose-200/70 text-[11px]">Saling mencintai & melengkapi</span>
          </div>
        </div>

        {/* Interactive Send Love Button */}
        <button
          type="button"
          onClick={handleSendLovePulse}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-rose-500 hover:from-rose-600 hover:to-rose-400 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-900/50 transition-all active:scale-95"
        >
          <Heart className="w-4 h-4 fill-white animate-pulse" />
          <span>Kirim Denyut Cinta ({lovePulseCount > 0 ? `${lovePulseCount}x terkirim` : 'Ketuk di sini'})</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </section>
  );
};
