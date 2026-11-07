import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { AnniversaryData } from '../types';

interface PhotoGallerySectionProps {
  data: AnniversaryData;
  selectedPhoto: { src: string; caption: string } | null;
  onSelectPhoto: (photo: { src: string; caption: string } | null) => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  data,
  selectedPhoto,
  onSelectPhoto,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    onSelectPhoto(data.galleryPhotos[index]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % data.galleryPhotos.length;
    setCurrentIndex(nextIdx);
    onSelectPhoto(data.galleryPhotos[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx =
      (currentIndex - 1 + data.galleryPhotos.length) % data.galleryPhotos.length;
    setCurrentIndex(prevIdx);
    onSelectPhoto(data.galleryPhotos[prevIdx]);
  };

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
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-white to-rose-200">
          You are my moon
        </h2>
        <p className="font-cursive text-xl text-rose-300 mt-1">
          in a sky full of stars
        </p>
      </motion.div>

      {/* Rotating Warm Golden Moon Sphere */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="relative mb-8 flex items-center justify-center"
      >
        {/* Moonlight Halo Aura */}
        <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-champagne-400/20 blur-[45px] pointer-events-none" />
        <div className="absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-rose-400/20 blur-[25px] pointer-events-none" />

        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full shadow-[0_0_50px_10px_rgba(251,191,36,0.3)] overflow-hidden border border-champagne-200/40">
          <motion.img
            src="/moon.png"
            alt="Golden Moon"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full object-cover select-none pointer-events-none rounded-full"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-600/10 via-transparent to-champagne-100/20 pointer-events-none mix-blend-screen" />
        </div>
      </motion.div>

      {/* Gallery Section */}
      <div className="w-full mb-8 z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-champagne-300" />
          <h3 className="font-serif text-xl font-semibold text-rose-100">
            Galeri Photoshoot Istimewa
          </h3>
          <Sparkles className="w-4 h-4 text-champagne-300" />
        </div>

        <p className="text-xs text-rose-300/80 mb-5 font-mono">
          Ketuk foto mana saja untuk memperbesar ke mode layar penuh
        </p>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data.galleryPhotos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => openLightbox(idx)}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-rose-500/30 bg-wine-950 shadow-md group"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <span className="text-[10px] text-rose-100 font-serif leading-tight truncate">
                  {photo.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => onSelectPhoto(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => onSelectPhoto(null)}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-wine-900/80 text-rose-200 border border-rose-400/50 hover:bg-rose-600 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation buttons */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-6 z-50 p-2.5 rounded-full bg-wine-900/80 text-rose-200 border border-rose-400/50 hover:bg-rose-600 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-6 z-50 p-2.5 rounded-full bg-wine-900/80 text-rose-200 border border-rose-400/50 hover:bg-rose-600 hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm sm:max-w-md w-full bg-wine-900/90 rounded-2xl overflow-hidden border border-rose-400/50 shadow-2xl flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full bg-black">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-3.5 bg-wine-950 flex items-center justify-between border-t border-rose-900/60">
                <p className="font-serif text-sm text-rose-100">
                  {selectedPhoto.caption}
                </p>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
