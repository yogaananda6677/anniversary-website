import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Sparkles, Heart, Check, QrCode, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BoardingPassData } from '../types';

interface BoardingPassHeroProps {
  data: BoardingPassData;
  onStartMusic: () => void;
  onEnterStudio: () => void;
}

export const BoardingPassHero: React.FC<BoardingPassHeroProps> = ({
  data,
  onStartMusic,
  onEnterStudio,
}) => {
  const [isTorn, setIsTorn] = useState(false);

  const handleTear = () => {
    if (isTorn) return;
    setIsTorn(true);
    onStartMusic();

    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 select-none relative">
      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 max-w-md mx-auto z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wine-900/80 border border-rose-400/40 text-rose-200 text-xs tracking-widest uppercase shadow-lg shadow-rose-950/50 backdrop-blur-md mb-3">
          <Plane className="w-3.5 h-3.5 text-champagne-300" />
          <span>Anniversary Express • Flight 0811</span>
          <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-rose-400 leading-tight">
          Two Years of Us
        </h1>
        <p className="font-cursive text-xl text-champagne-300 mt-1">
          Tiket perjalanan cinta kita dari 08 November 2024 hingga selamanya
        </p>
      </motion.div>

      {/* Realistic 3D Boarding Pass Container */}
      <div className="relative w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-gradient-to-br from-rose-50 via-white to-rose-100 text-wine-950 rounded-3xl shadow-2xl overflow-hidden border border-rose-300"
        >
          {/* Top Rose Foil Airline Header */}
          <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-rose-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Plane className="w-4 h-4 text-champagne-300" />
              </div>
              <div>
                <span className="font-serif text-sm font-bold tracking-wider uppercase block">
                  Love Airways
                </span>
                <span className="text-[10px] text-rose-200 font-mono tracking-widest">
                  2ND ANNIVERSARY EDITION
                </span>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-xs font-bold text-champagne-300 block">
                {data.flightNumber}
              </span>
              <span className="text-[9px] text-rose-200 uppercase">
                {data.classType}
              </span>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-5">
            {/* Flight Route Display */}
            <div className="flex items-center justify-between border-b border-rose-200 pb-4 mb-4">
              <div className="text-left">
                <span className="text-[10px] font-mono text-rose-800 uppercase block font-semibold">
                  Origin (Hari Pertama)
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-wine-950 block">
                  08 NOV 2024
                </span>
                <span className="text-xs text-rose-700 font-serif">Polinema Memories</span>
              </div>

              {/* Middle Plane Icon */}
              <div className="flex flex-col items-center px-2">
                <div className="flex items-center gap-1 text-rose-400">
                  <span className="w-6 h-px bg-rose-300 border-dashed border-b" />
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                  <span className="w-6 h-px bg-rose-300 border-dashed border-b" />
                </div>
                <span className="text-[10px] font-mono text-rose-600 font-bold mt-1">
                  730 DAYS
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-rose-800 uppercase block font-semibold">
                  Destination (Tujuan)
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-wine-950 block">
                  FOREVER
                </span>
                <span className="text-xs text-rose-700 font-serif">Eternity & Beyond</span>
              </div>
            </div>

            {/* Flight Details Grid */}
            <div className="grid grid-cols-3 gap-2 py-2 text-left mb-4">
              <div>
                <span className="text-[9px] font-mono uppercase text-rose-700 block font-semibold">
                  Passenger
                </span>
                <span className="text-xs font-serif font-bold text-wine-950">
                  {data.passengerName}
                </span>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase text-rose-700 block font-semibold">
                  Seat
                </span>
                <span className="text-xs font-serif font-bold text-wine-950">
                  {data.seat}
                </span>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase text-rose-700 block font-semibold">
                  Gate
                </span>
                <span className="text-xs font-serif font-bold text-wine-950">
                  {data.gate}
                </span>
              </div>
            </div>

            {/* Perforated Tear Line */}
            <div className="relative my-4 flex items-center justify-between">
              <div className="w-4 h-8 bg-wine-950 rounded-r-full -ml-7 shadow-inner" />
              <div className="flex-1 border-b-2 border-dashed border-rose-300 mx-2" />
              <div className="w-4 h-8 bg-wine-950 rounded-l-full -mr-7 shadow-inner" />
            </div>

            {/* Tearable Stub / Validation Area */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <QrCode className="w-9 h-9 text-wine-900" />
                <div className="text-left font-mono">
                  <span className="text-[9px] text-rose-800 block">BOARDING STATUS:</span>
                  <span
                    className={`text-xs font-bold ${
                      isTorn ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {isTorn ? 'VALIDATED & BOARDED 💖' : 'READY TO BOARD'}
                  </span>
                </div>
              </div>

              {/* Stamp or Action Button */}
              {!isTorn ? (
                <button
                  type="button"
                  onClick={handleTear}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-xs shadow-md shadow-rose-600/30 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Validasi Tiket</span>
                </button>
              ) : (
                <div className="border-2 border-rose-600 text-rose-600 px-3 py-1 rounded-lg font-mono font-bold text-xs uppercase transform -rotate-6 shadow-sm flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-rose-600" />
                  <span>BOARDED 08.11</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Enter Studio CTA Button after tearing */}
        <AnimatePresence>
          {isTorn && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <button
                type="button"
                onClick={onEnterStudio}
                className="py-3 px-6 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-rose-900/60 flex items-center gap-2 transition-transform active:scale-95 animate-pulse"
              >
                <span>Masuk ke Studio Memori 730 Hari</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-rose-300/80 font-mono">
                Musik romantis otomatis berputar menemani perjalananmu
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
