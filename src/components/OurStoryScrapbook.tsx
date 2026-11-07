import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import { AnniversaryData } from '../types';

interface OurStoryScrapbookProps {
  data: AnniversaryData;
  onSelectPhoto: (photoSrc: string, caption: string) => void;
}

export const OurStoryScrapbook: React.FC<OurStoryScrapbookProps> = ({
  data,
  onSelectPhoto,
}) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-start px-4 max-w-lg mx-auto text-center select-none py-16 relative">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-6 z-10"
      >
        <span className="font-serif text-xs tracking-widest text-rose-300 uppercase block mb-1">
          Scrapbook of Our Memories
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-rose-400">
          730 Days in Frames
        </h2>
        <p className="font-cursive text-lg text-rose-300 mt-1">
          Every picture holds a thousand words of love
        </p>
      </motion.div>

      {/* Little Love Letter Envelope Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-sm mb-8 z-10"
      >
        <div className="relative pt-10 pb-2">
          {/* Popping Letter Card */}
          <motion.div
            initial={{ y: 25 }}
            whileInView={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="w-11/12 mx-auto bg-gradient-to-b from-rose-50 via-white to-rose-50 text-wine-950 rounded-2xl p-5 shadow-2xl border border-rose-300 relative z-10 text-left"
          >
            <div className="flex justify-between items-center border-b border-rose-200/80 pb-2 mb-3">
              <span className="text-[11px] font-mono tracking-widest text-rose-800 uppercase font-semibold">
                To: {data.girlfriendName}
              </span>
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            </div>

            <p className="font-serif text-sm leading-relaxed text-wine-950 font-medium">
              "{data.shortLetterContent}"
            </p>

            <div className="mt-3 text-right">
              <span className="font-cursive text-base text-rose-700">Forever yours, with all my love</span>
            </div>
          </motion.div>

          {/* Envelope Pocket Base */}
          <div className="w-full h-28 bg-wine-900 border-2 border-rose-700/60 rounded-2xl relative -mt-14 z-20 shadow-xl overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0 bg-wine-850"
              style={{ clipPath: 'polygon(0 0, 50% 65%, 100% 0, 100% 100%, 0 100%)' }}
            />
            <div className="z-30 w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/50 flex items-center justify-center shadow-inner">
              <Heart className="w-5 h-5 text-rose-300 fill-rose-300" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Polaroid Gallery Grid */}
      <div className="w-full mb-8 z-10">
        <p className="text-xs text-rose-300 mb-5 font-mono tracking-wider flex items-center justify-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-rose-400" />
          <span>Sentuh foto polaroid untuk memperbesar tampilan</span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto">
          {data.polaroidPhotos.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.08 * index }}
              whileHover={{ scale: 1.06, rotate: 0 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectPhoto(item.src, item.caption)}
              style={{ transform: `rotate(${item.rotation}deg)` }}
              className="polaroid-luxury cursor-pointer bg-white text-wine-950 p-2 pb-4 rounded shadow-xl relative"
            >
              {/* Washi Tape Accent */}
              <div className="washi-tape-rose" />

              <div className="aspect-[3/4] bg-rose-100/50 overflow-hidden rounded-sm mb-2 shadow-inner">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="px-1 text-center">
                <p className="font-cursive text-sm text-wine-900 font-bold truncate">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
