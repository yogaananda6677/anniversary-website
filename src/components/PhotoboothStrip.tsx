import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, Heart, Check, Camera } from 'lucide-react';
import { PhotoboothPhoto } from '../types';

interface PhotoboothStripProps {
  photos: PhotoboothPhoto[];
  coupleName: string;
}

export const PhotoboothStrip: React.FC<PhotoboothStripProps> = ({
  photos,
  coupleName,
}) => {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadStrip = async () => {
    setIsDownloading(true);

    try {
      // Create high-res canvas for 4-cut photobooth
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const stripWidth = 600;
      const padding = 36;
      const photoWidth = stripWidth - padding * 2; // 528
      const photoHeight = Math.round(photoWidth * (4 / 3)); // 704 (exact 3:4 portrait ratio matching the photos)
      const photoGap = 20;
      const headerHeight = 70;
      const footerHeight = 120;
      const stripHeight =
        headerHeight + photos.length * photoHeight + (photos.length - 1) * photoGap + footerHeight;

      canvas.width = stripWidth;
      canvas.height = stripHeight;

      // Background - aesthetic soft cream blush
      ctx.fillStyle = '#fff5f7';
      ctx.fillRect(0, 0, stripWidth, stripHeight);

      // Delicate inner border
      ctx.strokeStyle = '#fecdd3';
      ctx.lineWidth = 4;
      ctx.strokeRect(12, 12, stripWidth - 24, stripHeight - 24);

      // Header Text
      ctx.fillStyle = '#9f1239';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('• 2ND ANNIVERSARY PHOTO STUDIO •', stripWidth / 2, 48);

      // Load and draw each photo
      let currentY = headerHeight;

      for (let i = 0; i < photos.length; i++) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          img.src = photos[i].src;
        });

        // Draw photo with slight rounded corner clipping
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(padding, currentY, photoWidth, photoHeight, 8);
        ctx.clip();

        // Calculate aspect fill with top-priority alignment (never crop heads)
        const hRatio = photoWidth / img.width;
        const vRatio = photoHeight / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (photoWidth - img.width * ratio) / 2;
        // Align to top so heads/hats are 100% visible
        const topShiftY = 0;

        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          padding + centerShiftX,
          currentY + topShiftY,
          img.width * ratio,
          img.height * ratio
        );
        ctx.restore();

        // Photo border
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.strokeRect(padding, currentY, photoWidth, photoHeight);

        currentY += photoHeight + photoGap;
      }

      // Footer - Authentic Photobooth Doodles & Branding
      ctx.fillStyle = '#881337';
      ctx.font = 'italic bold 28px "Playfair Display", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText(coupleName, stripWidth / 2, currentY + 40);

      ctx.fillStyle = '#be123c';
      ctx.font = '500 16px "JetBrains Mono", monospace';
      ctx.fillText('2024.11.08 — 2026.11.08', stripWidth / 2, currentY + 68);

      ctx.fillStyle = '#9f1239';
      ctx.font = '13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Polinema Memories • 730 Days of Love', stripWidth / 2, currentY + 92);

      // Download trigger
      const link = document.createElement('a');
      link.download = `Photobooth-4Cut-${coupleName.replace(/\s+/g, '-')}-2ndAnniversary.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Download photobooth error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="py-16 px-4 flex flex-col items-center justify-center select-none relative">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8 max-w-md mx-auto"
      >
        <span className="font-serif text-xs tracking-widest text-rose-600 uppercase block mb-1 font-semibold">
          Viral Korean 4-Cut Studio
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-950">
          Our 4-Cut Photobooth Strip
        </h2>
        <p className="text-xs text-rose-700/80 font-mono mt-1">
          Potret kenangan 2 tahun kita dalam format photobooth klasik
        </p>
      </motion.div>

      {/* The 4-Cut Photobooth Physical Strip Card */}
      <motion.div
        ref={stripRef}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative w-64 sm:w-72 bg-gradient-to-b from-rose-50 via-white to-rose-50 text-wine-950 p-3 sm:p-4 rounded-2xl shadow-2xl border-2 border-rose-300 shadow-rose-200/50 flex flex-col items-center"
      >
        {/* Header Ribbon */}
        <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-rose-200 text-rose-800">
          <Camera className="w-3.5 h-3.5 text-rose-600" />
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
            PHOTOISM • 2ND ANNIV
          </span>
          <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
        </div>

        {/* 4 Photos Stacked */}
        <div className="w-full space-y-2.5">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border border-rose-300 shadow-sm bg-rose-100/50 group"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-1.5 left-2 bg-wine-950/70 text-rose-100 text-[10px] px-2 py-0.5 rounded backdrop-blur-sm font-serif">
                {photo.caption}
              </div>
            </div>
          ))}
        </div>

        {/* Footer of the Strip */}
        <div className="w-full pt-3 pb-1 text-center border-t border-rose-200 mt-3">
          <p className="font-serif text-sm font-bold text-wine-950">
            {coupleName}
          </p>
          <p className="text-[10px] text-rose-800 font-mono tracking-wider font-semibold">
            2024.11.08 — 2026.11.08
          </p>
          <div className="flex items-center justify-center gap-1 text-[9px] text-rose-600 mt-1 font-semibold">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Polinema • 730 Days of Sweet Love</span>
          </div>
        </div>
      </motion.div>

      {/* Download Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-6 flex flex-col items-center gap-2"
      >
        <button
          type="button"
          disabled={isDownloading}
          onClick={handleDownloadStrip}
          className="py-3 px-6 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-rose-400/40 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Photobooth Strip Berhasil Diunduh! ✨</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>
                {isDownloading
                  ? 'Sedang Merender Gambar...'
                  : 'Unduh Photobooth Strip (PNG)'}
              </span>
            </>
          )}
        </button>
        <span className="text-[11px] text-rose-700/80 font-mono">
          Gambar siap cetak atau disimpan langsung ke galeri HP
        </span>
      </motion.div>
    </section>
  );
};
