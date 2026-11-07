import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Move, Eye, X, Heart, RotateCcw } from 'lucide-react';
import { PolaroidDeskItem } from '../types';

interface DraggablePolaroidDeskProps {
  photos: PolaroidDeskItem[];
}

export const DraggablePolaroidDesk: React.FC<DraggablePolaroidDeskProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidDeskItem | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const handleResetPositions = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <section className="py-16 px-4 max-w-xl mx-auto select-none relative overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-6"
      >
        <span className="font-serif text-xs tracking-widest text-rose-300 uppercase block mb-1">
          Interactive Keepsake Desk
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-100">
          Meja Foto Kenangan Kita
        </h2>
        <p className="text-xs text-rose-300/80 font-mono mt-1 flex items-center justify-center gap-1.5">
          <Move className="w-3.5 h-3.5 text-champagne-300 animate-pulse" />
          <span>Kamu bisa menggeser foto-foto ini secara bebas di layar!</span>
        </p>
      </motion.div>

      {/* Desk Control */}
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={handleResetPositions}
          className="text-[11px] font-mono text-rose-300/80 hover:text-rose-100 flex items-center gap-1 px-3 py-1 rounded-full bg-wine-900/60 border border-rose-500/30 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Rapikan Meja</span>
        </button>
      </div>

      {/* The Interactive Desk Surface */}
      <div
        key={resetKey}
        className="relative w-full h-[540px] sm:h-[600px] rounded-3xl bg-gradient-to-b from-wine-950/80 via-wine-900/60 to-wine-950/90 border-2 border-rose-500/30 shadow-2xl p-4 overflow-hidden flex items-center justify-center"
      >
        {/* Subtle grid desk texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Scattered Polaroid Cards */}
        {photos.map((item, index) => (
          <motion.div
            key={item.id}
            drag
            dragConstraints={{ left: -140, right: 140, top: -160, bottom: 160 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.1, zIndex: 40 }}
            whileHover={{ scale: 1.05, zIndex: 30 }}
            whileTap={{ scale: 0.98 }}
            initial={{
              x: item.defaultX,
              y: item.defaultY,
              rotate: item.rotation,
              opacity: 0,
            }}
            animate={{
              x: item.defaultX,
              y: item.defaultY,
              rotate: item.rotation,
              opacity: 1,
            }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="absolute polaroid-luxury p-2.5 pb-4 rounded-xl cursor-grab active:cursor-grabbing w-40 sm:w-48 shadow-2xl border border-rose-200"
          >
            {/* Washi Tape Accent */}
            <div className="washi-tape-rose" />

            {/* Photo Box */}
            <div
              className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-rose-100/50 mb-2 shadow-inner"
              onClick={() => setSelectedPhoto(item)}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover pointer-events-none"
                loading="lazy"
              />
              <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-wine-950/70 text-rose-200 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-3 h-3" />
              </div>
            </div>

            {/* Handwritten Caption */}
            <p className="font-cursive text-sm text-wine-900 font-bold truncate text-center">
              {item.caption}
            </p>
          </motion.div>
        ))}

        <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
          <span className="text-[10px] text-rose-400/60 font-mono tracking-wider">
            Gunakan jarimu untuk menggeser & melempar foto
          </span>
        </div>
      </div>

      {/* Lightbox Modal for Draggable Photo */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-sm w-full bg-wine-900 rounded-2xl overflow-hidden border border-rose-400/50 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-wine-950/80 text-rose-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[3/4] w-full bg-black">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-3.5 bg-wine-950 flex items-center justify-between border-t border-rose-900">
                <p className="font-serif text-sm text-rose-100 font-semibold">
                  {selectedPhoto.caption}
                </p>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
