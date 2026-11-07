import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';

interface FooterSectionProps {
  girlfriendName: string;
  onScrollToTop: () => void;
  onCelebrate: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  girlfriendName,
  onScrollToTop,
  onCelebrate,
}) => {
  return (
    <footer className="w-full max-w-md mx-auto text-center py-12 px-4 z-10 select-none border-t border-rose-900/40 mt-12">
      {/* Decorative Hearts */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="w-12 h-px bg-gradient-to-r from-transparent to-rose-400" />
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
        <span className="w-12 h-px bg-gradient-to-l from-transparent to-rose-400" />
      </div>

      <h3 className="font-serif text-2xl font-bold text-rose-100 mb-1">
        Happy 2nd Anniversary
      </h3>
      <p className="font-cursive text-xl text-rose-300 mb-6">
        To forever and always with you, {girlfriendName}
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          type="button"
          onClick={onCelebrate}
          className="py-2.5 px-5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-400 text-white font-medium text-xs flex items-center gap-1.5 shadow-lg shadow-rose-600/30 transition-transform active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-champagne-300" />
          <span>Rayakan Kembang Api</span>
        </button>

        <button
          type="button"
          onClick={onScrollToTop}
          className="py-2.5 px-4 rounded-full bg-wine-900/80 border border-rose-500/30 hover:bg-wine-800 text-rose-200 text-xs flex items-center gap-1.5 transition-all active:scale-95"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Ke Atas</span>
        </button>
      </div>

      <p className="text-[11px] text-rose-400/60 font-mono">
        Made with infinite love • 08 November 2024 - Forever
      </p>
    </footer>
  );
};
