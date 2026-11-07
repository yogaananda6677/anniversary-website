import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ANNIVERSARY_DATA } from './data/anniversaryData';
import { FloatingPetals } from './components/FloatingPetals';
import { NavbarMusic } from './components/NavbarMusic';
import { BoardingPassHero } from './components/BoardingPassHero';
import { LoveBentoDashboard } from './components/LoveBentoDashboard';
import { PhotoboothStrip } from './components/PhotoboothStrip';
import { OpenWhenCapsule } from './components/OpenWhenCapsule';
import { DraggablePolaroidDesk } from './components/DraggablePolaroidDesk';
import { TypewriterLetter } from './components/TypewriterLetter';
import { SkyLanternFinale } from './components/SkyLanternFinale';
import { LoveQuizModal } from './components/LoveQuizModal';
import { HeartQRModal } from './components/HeartQRModal';

export const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const studioRef = useRef<HTMLDivElement | null>(null);

  // Audio Playback
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          if (audioRef.current) {
            audioRef.current.src = '/romantic.mp3';
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    }
  };

  const handleStartMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleScrollToStudio = () => {
    handleStartMusic();
    if (studioRef.current) {
      studioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCelebrate = () => {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const currentUrl =
    typeof window !== 'undefined' ? window.location.href : 'http://localhost:5173';

  return (
    <div className="relative min-h-screen w-full bg-wine-950 text-slate-100 flex flex-col items-center overflow-x-hidden">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src={ANNIVERSARY_DATA.musicUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Rose Petals Canvas Atmosphere */}
      <FloatingPetals />

      {/* Floating Navbar with Music & Shortcuts */}
      <NavbarMusic
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        musicTitle={ANNIVERSARY_DATA.musicTitle}
        musicArtist={ANNIVERSARY_DATA.musicArtist}
        onOpenQR={() => setIsQROpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onCelebrate={handleCelebrate}
      />

      {/* Main Experience Container */}
      <main className="w-full max-w-xl z-10 space-y-12 sm:space-y-16">
        {/* ACT 1: Interactive Boarding Pass Ticket to Year 2 */}
        <BoardingPassHero
          data={ANNIVERSARY_DATA.boardingPass}
          onStartMusic={handleStartMusic}
          onEnterStudio={handleScrollToStudio}
        />

        {/* ACT 2: The 730 Days Bento Studio */}
        <div ref={studioRef} className="scroll-mt-16">
          <LoveBentoDashboard
            startDate={ANNIVERSARY_DATA.startDate}
            musicTitle={ANNIVERSARY_DATA.musicTitle}
            musicArtist={ANNIVERSARY_DATA.musicArtist}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
          />
        </div>

        {/* ACT 3: Korean 4-Cut Photobooth Strip (with Download PNG) */}
        <PhotoboothStrip
          photos={ANNIVERSARY_DATA.photoboothPhotos}
          coupleName={ANNIVERSARY_DATA.coupleName}
        />

        {/* ACT 4: "Open When..." Interactive Capsule Envelopes */}
        <OpenWhenCapsule letters={ANNIVERSARY_DATA.openWhenLetters} />

        {/* ACT 5: Meja Polaroid Fisik (Draggable & Tossable Polaroids) */}
        <DraggablePolaroidDesk photos={ANNIVERSARY_DATA.polaroidDeskPhotos} />

        {/* ACT 6: Surat Cinta Mesin Tik Estetis (Typewriter Letter) */}
        <TypewriterLetter
          title={ANNIVERSARY_DATA.typewriterLetter.title}
          dateText={ANNIVERSARY_DATA.typewriterLetter.dateText}
          paragraphs={ANNIVERSARY_DATA.typewriterLetter.paragraphs}
          signoff={ANNIVERSARY_DATA.typewriterLetter.signoff}
          author={ANNIVERSARY_DATA.typewriterLetter.author}
        />

        {/* ACT 7: Sky Lantern Wishing Finale & Fireworks */}
        <SkyLanternFinale
          wishes={ANNIVERSARY_DATA.lanternWishes}
          coupleName={ANNIVERSARY_DATA.coupleName}
          onOpenQR={() => setIsQROpen(true)}
          onScrollToTop={handleScrollToTop}
        />
      </main>

      {/* Modals */}
      <LoveQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      {isQROpen && (
        <HeartQRModal
          url={currentUrl}
          recipientName={ANNIVERSARY_DATA.girlfriendName}
          onClose={() => setIsQROpen(false)}
        />
      )}
    </div>
  );
};
