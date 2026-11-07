import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ANNIVERSARY_DATA } from './data/anniversaryData';
import { FloatingPetals } from './components/FloatingPetals';
import { NavbarMusic } from './components/NavbarMusic';
import { HeroEnvelope } from './components/HeroEnvelope';
import { LoveTimerSection } from './components/LoveTimerSection';
import { AnniversaryCakeSection } from './components/AnniversaryCakeSection';
import { ReasonsWhySection } from './components/ReasonsWhySection';
import { OurStoryScrapbook } from './components/OurStoryScrapbook';
import { HeartfeltLetter } from './components/HeartfeltLetter';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { FooterSection } from './components/FooterSection';
import { LoveQuizModal } from './components/LoveQuizModal';
import { HeartQRModal } from './components/HeartQRModal';

export const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; caption: string } | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loveTimerRef = useRef<HTMLDivElement | null>(null);

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

  const handleScrollToLoveTimer = () => {
    handleStartMusic();
    if (loveTimerRef.current) {
      loveTimerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Celebrate with Fireworks
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
      {/* Background HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={ANNIVERSARY_DATA.musicUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Rose Petals & Embers Canvas */}
      <FloatingPetals />

      {/* Top Floating Music Navigation */}
      <NavbarMusic
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        musicTitle={ANNIVERSARY_DATA.musicTitle}
        musicArtist={ANNIVERSARY_DATA.musicArtist}
        onOpenQR={() => setIsQROpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onCelebrate={handleCelebrate}
      />

      {/* Main Continuous Story Flow */}
      <main className="w-full max-w-lg z-10 space-y-12 sm:space-y-16">
        {/* Slide 1: 3D Wax Seal Envelope Intro */}
        <HeroEnvelope
          data={ANNIVERSARY_DATA}
          onStartMusic={handleStartMusic}
          onContinue={handleScrollToLoveTimer}
        />

        {/* Slide 2: The Day Our Story Began & Live Love Journey Counter */}
        <div ref={loveTimerRef} className="scroll-mt-16">
          <LoveTimerSection data={ANNIVERSARY_DATA} />
        </div>

        {/* Slide 3: Retro Camera Scrapbook & Interactive Anniversary Cake Toast */}
        <AnniversaryCakeSection data={ANNIVERSARY_DATA} />

        {/* Slide 4: 4 Hal yang Bikin Selalu Jatuh Cinta (Reasons Why) */}
        <ReasonsWhySection data={ANNIVERSARY_DATA} />

        {/* Slide 5: Scrapbook of Memories & Polaroid Gallery */}
        <OurStoryScrapbook
          data={ANNIVERSARY_DATA}
          onSelectPhoto={(src, caption) => setSelectedPhoto({ src, caption })}
        />

        {/* Slide 6: Classic Ornate Mirror & Long Heartfelt Love Letter */}
        <HeartfeltLetter data={ANNIVERSARY_DATA} />

        {/* Slide 7: Rotating Golden Moon & Full Photo Album */}
        <PhotoGallerySection
          data={ANNIVERSARY_DATA}
          selectedPhoto={selectedPhoto}
          onSelectPhoto={setSelectedPhoto}
        />

        {/* Footer */}
        <FooterSection
          girlfriendName={ANNIVERSARY_DATA.girlfriendName}
          onScrollToTop={handleScrollToTop}
          onCelebrate={handleCelebrate}
        />
      </main>

      {/* Mini Couple Quiz Modal */}
      <LoveQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      {/* Heart QR Code Modal */}
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
