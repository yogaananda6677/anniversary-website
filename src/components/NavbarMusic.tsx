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
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-full px-3.5 py-1.5 flex items-center justify-between shadow-xl shadow-rose-200/50 border border-rose-200/80 pointer-events-auto">
        {/* Left: Music Track Info + Spinning Vinyl */}
        <div
          onClick={onTogglePlay}
          className="flex items-center gap-2.5 cursor-pointer group min-w-0 pr-2"
        >
          {/* Mini Vinyl */}
          <div className="relative w-8 h-8 rounded-full bg-rose-950 border border-rose-300 flex items-center justify-center shrink-0 shadow-sm">
            <Disc
              className={`w-5 h-5 text-rose-200 ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            />
            <div className="absolute w-2 h-2 rounded-full bg-rose-500" />
          </div>

          <div className="text-left min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-rose-950 truncate max-w-[120px] sm:max-w-[180px]">
                {musicTitle}
              </span>
              {isPlaying && (
                <span className="flex gap-0.5 items-end h-2.5 shrink-0">
                  <span className="w-0.5 h-2.5 bg-rose-500 animate-pulse" />
                  <span className="w-0.5 h-1.5 bg-rose-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-2 bg-rose-600 animate-pulse delay-150" />
                </span>
              )}
            </div>
            <p className="text-[10px] text-rose-700/80 font-mono truncate max-w-[110px] sm:max-w-[160px]">
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
            className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/30 transition-transform active:scale-95 cursor-pointer"
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
            className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </button>

          {/* Mini Couple Quiz */}
          <button
            type="button"
            onClick={onOpenQuiz}
            title="Kuis Kenangan Kita"
            className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
          </button>

          {/* Heart QR Code */}
          <button
            type="button"
            onClick={onOpenQR}
            title="Cetak / Bagikan QR Code Hati"
            className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <QrCode className="w-3.5 h-3.5 text-rose-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
