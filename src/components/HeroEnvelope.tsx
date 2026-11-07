import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, ArrowDown } from 'lucide-react';
import { AnniversaryData } from '../types';

interface HeroEnvelopeProps {
  data: AnniversaryData;
  onStartMusic: () => void;
  onContinue: () => void;
}

export const HeroEnvelope: React.FC<HeroEnvelopeProps> = ({
  data,
  onStartMusic,
  onContinue,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      onStartMusic();
    } else {
      setIsOpen(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center select-none py-20 relative">
      {/* Title & Badge */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-6 max-w-lg mx-auto z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-wine-900/80 border border-rose-400/40 text-rose-200 text-xs tracking-widest uppercase shadow-lg shadow-rose-950/50 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
          <span>Our 2nd Anniversary Celebration • 08 November</span>
          <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-rose-400 drop-shadow-md leading-tight whitespace-pre-line">
          {data.heroGreeting}
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-rose-200/80 font-light max-w-md mx-auto">
          {data.heroSubtitle}
        </p>
      </motion.div>

      {/* Realistic 3D Envelope Container with Perspective */}
      <div className="relative pt-24 pb-6 my-2 w-full flex justify-center items-center">
        {/* Floating Heart / Sparkle Particles popping out on open */}
        <AnimatePresence>
          {isOpen && (
            <div className="absolute top-8 pointer-events-none z-40 flex items-center justify-center">
              {[
                { x: -80, y: -70, delay: 0.1, size: 18, color: '#f43f5e' },
                { x: 85, y: -80, delay: 0.25, size: 22, color: '#fb7185' },
                { x: -35, y: -100, delay: 0.15, size: 24, color: '#fda4af' },
                { x: 45, y: -95, delay: 0.3, size: 20, color: '#fef08a' },
                { x: 0, y: -120, delay: 0.2, size: 26, color: '#f43f5e' },
              ].map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0.8, 0],
                    scale: [0.5, 1.3, 1, 0.7],
                    x: p.x,
                    y: p.y,
                  }}
                  transition={{
                    duration: 2.4,
                    delay: p.delay,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: 'easeOut',
                  }}
                  className="absolute"
                >
                  <Heart
                    className="drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      fill: p.color,
                      color: p.color,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        <div
          className="relative w-72 sm:w-84 h-48 sm:h-52 cursor-pointer group"
          style={{ perspective: '1200px' }}
          onClick={handleToggle}
        >
          {/* 1. Envelope Back Plate (The Inside Cavity) */}
          <div className="absolute inset-0 bg-gradient-to-b from-wine-950 via-wine-900 to-wine-950 rounded-2xl border border-rose-900/60 shadow-2xl z-0 overflow-hidden">
            <div className="w-full h-full bg-rose-950/20" />
          </div>

          {/* 2. Top Flap (Opens 180° Upwards with Realistic Shadow) */}
          <motion.div
            style={{
              transformOrigin: 'top center',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
            animate={{
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 5 : 40,
            }}
            transition={{
              duration: 0.75,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-wine-800 to-wine-850 border-b border-rose-500/50 shadow-md"
          >
            <div className="w-full h-full bg-gradient-to-b from-wine-900/40 to-transparent" />
          </motion.div>

          {/* 3. The Letter Card (Slides Up smoothly + Sways gently when opened) */}
          <motion.div
            initial={{ y: 0 }}
            animate={{
              y: isOpen ? -118 : 0,
              scale: isOpen ? 1 : 0.95,
            }}
            transition={{
              duration: 0.85,
              delay: isOpen ? 0.25 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-x-3 sm:inset-x-4 top-2 h-44 sm:h-48 z-20 pointer-events-auto"
            onClick={(e) => {
              if (isOpen) {
                e.stopPropagation();
              }
            }}
          >
            {/* Inner sway/floating container */}
            <motion.div
              animate={
                isOpen
                  ? {
                      rotate: [-1.5, 1.5, -1.5],
                      y: [-3, 3, -3],
                    }
                  : { rotate: 0, y: 0 }
              }
              transition={
                isOpen
                  ? {
                      rotate: {
                        duration: 3.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1.0,
                      },
                      y: {
                        duration: 3.0,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1.0,
                      },
                    }
                  : { duration: 0.3 }
              }
              className="w-full h-full bg-gradient-to-b from-rose-50 via-white to-rose-100 text-wine-950 rounded-2xl p-4 sm:p-5 shadow-2xl border border-rose-300 flex flex-col justify-between items-center text-center cursor-default"
            >
              {/* Header */}
              <div className="w-full flex items-center justify-between border-b border-rose-200/80 pb-1.5">
                <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-rose-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-rose-500" />
                  Anniversary Letter
                </span>
                <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              </div>

              {/* Recipient Message */}
              <div className="my-auto py-1">
                <p className="font-cursive text-xl sm:text-2xl font-bold text-wine-950 leading-snug">
                  To My Favorite Soulmate,
                </p>
                <p className="font-serif text-base sm:text-lg font-bold text-rose-700 mt-0.5">
                  {data.girlfriendName}
                </p>
                <p className="text-[11px] text-wine-800/80 mt-1 italic">
                  "730 hari penuh cinta, dan aku masih memilihmu setiap hari."
                </p>
              </div>

              {/* Action Button that triggers smooth scroll */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onContinue();
                }}
                className="w-full py-2 px-3 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/30 transition-transform active:scale-95 cursor-pointer"
              >
                <span>Buka Kisah 730 Hari Kita</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            </motion.div>
          </motion.div>

          {/* 4. Envelope Front Pocket (Left, Right, Bottom Flaps) */}
          <div className="absolute inset-0 z-30 pointer-events-none rounded-2xl overflow-hidden">
            {/* Left side fold */}
            <div
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-wine-900 to-wine-850 border-r border-rose-900/40"
              style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
            />
            {/* Right side fold */}
            <div
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-wine-900 to-wine-850 border-l border-rose-900/40"
              style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
            />
            {/* Bottom triangular fold */}
            <div
              className="absolute inset-x-0 bottom-0 h-32 sm:h-36 bg-gradient-to-t from-wine-850 to-wine-900 border-t border-rose-800/40 shadow-xl"
              style={{ clipPath: 'polygon(0 100%, 50% 28%, 100% 100%)' }}
            />
          </div>

          {/* 5. Luxury Wax Seal with Burst Effect */}
          <motion.div
            animate={{
              scale: isOpen ? [1, 1.35, 0] : [1, 1.05, 1],
              opacity: isOpen ? 0 : 1,
              rotate: isOpen ? 35 : 0,
            }}
            transition={{
              duration: isOpen ? 0.4 : 2.5,
              repeat: isOpen ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-24 sm:top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full wax-seal-rose flex items-center justify-center border-2 border-rose-200/60 shadow-2xl"
          >
            <div className="w-10 h-10 rounded-full border border-rose-300/40 flex items-center justify-center bg-rose-950/40">
              <Heart className="w-5 h-5 text-rose-100 fill-rose-100 drop-shadow" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tap prompt */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-6 text-rose-300 text-xs sm:text-sm font-medium tracking-widest flex items-center gap-2 cursor-pointer z-10"
        onClick={handleToggle}
      >
        <span className="w-6 h-px bg-rose-500/40" />
        {isOpen ? 'Ketuk Amplop untuk Menutup' : 'Ketuk Amplop untuk Membuka Surat'}
        <span className="w-6 h-px bg-rose-500/40" />
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-8 flex flex-col items-center gap-1 text-rose-400/70 cursor-pointer hover:text-rose-200 transition-colors z-10"
        onClick={onContinue}
      >
        <span className="text-[10px] tracking-widest uppercase font-mono">Scroll ke bawah</span>
        <ChevronDown className="w-4 h-4 text-rose-400" />
      </motion.div>
    </section>
  );
};
