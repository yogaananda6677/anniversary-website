import React from 'react';
import { Play, Pause, Disc, QrCode, Sparkles, HelpCircle } from 'lucide-react';

interface NavbarMusicProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  musicTitle: string;
  musicArtist: string;
  onOpenQR: () => void;
  onOpenQuiz: () => void;
  onCelebrate: () => void;
}

export const NavbarMusic: React.FC<NavbarMusicProps> = ({
  isPlaying,
  onTogglePlay,
  musicTitle,
  musicArtist,
  onOpenQR,
  onOpenQuiz,
  onCelebrate,
}) => {
  return (
    <header className="fixed top-3 inset-x-0 z-50 flex justify-center px-3 pointer-events-none">
      <div className="w-full max-w-xl glass-panel-luxury rounded-full px-3 py-1.5 flex items-center justify-between shadow-2xl border border-rose-500/30 pointer-events-auto">
        {/* Left: Music Track Info + Spinning Vinyl */}
        <div
          onClick={onTogglePlay}
          className="flex items-center gap-2.5 cursor-pointer group min-w-0 pr-2"
        >
          {/* Mini Vinyl */}
          <div className="relative w-8 h-8 rounded-full bg-wine-950 border border-rose-400/50 flex items-center justify-center shrink-0 shadow-md">
            <Disc
              className={`w-5 h-5 text-rose-300 ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            />
            <div className="absolute w-2 h-2 rounded-full bg-rose-500" />
          </div>

          <div className="text-left min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-rose-100 truncate max-w-[120px] sm:max-w-[180px]">
                {musicTitle}
              </span>
              {isPlaying && (
                <span className="flex gap-0.5 items-end h-2.5 shrink-0">
                  <span className="w-0.5 h-2.5 bg-rose-400 animate-pulse" />
                  <span className="w-0.5 h-1.5 bg-rose-300 animate-pulse delay-75" />
                  <span className="w-0.5 h-2 bg-rose-500 animate-pulse delay-150" />
                </span>
              )}
            </div>
            <p className="text-[10px] text-rose-300/80 truncate max-w-[110px] sm:max-w-[160px]">
              {musicArtist}
            </p>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 transition-transform active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-white" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            )}
          </button>

          {/* Celebrate Heart Fireworks */}
          <button
            type="button"
            onClick={onCelebrate}
            title="Kembang Api Cinta"
            className="w-8 h-8 rounded-full bg-wine-900/80 hover:bg-rose-900/60 border border-rose-400/40 text-rose-300 flex items-center justify-center transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
          </button>

          {/* Mini Couple Quiz */}
          <button
            type="button"
            onClick={onOpenQuiz}
            title="Kuis Kenangan Kita"
            className="w-8 h-8 rounded-full bg-wine-900/80 hover:bg-rose-900/60 border border-rose-400/40 text-rose-300 flex items-center justify-center transition-all active:scale-95"
          >
            <HelpCircle className="w-3.5 h-3.5 text-rose-300" />
          </button>

          {/* Heart QR Code */}
          <button
            type="button"
            onClick={onOpenQR}
            title="Cetak / Bagikan QR Code Hati"
            className="w-8 h-8 rounded-full bg-wine-900/80 hover:bg-rose-900/60 border border-rose-400/40 text-rose-300 flex items-center justify-center transition-all active:scale-95"
          >
            <QrCode className="w-3.5 h-3.5 text-rose-200" />
          </button>
        </div>
      </div>
    </header>
  );
};
