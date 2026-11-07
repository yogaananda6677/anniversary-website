import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoveQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const LoveQuizModal: React.FC<LoveQuizModalProps> = ({ isOpen, onClose }) => {
  const questions: Question[] = [
    {
      id: 1,
      question: 'Kapan tanggal resmi kita mulai menjalin cerita cinta ini?',
      options: ['08 Oktober 2024', '08 November 2024', '14 Februari 2025'],
      correctAnswer: 1,
      explanation: 'Tepat sekali! 08 November 2024 adalah hari terindah kita.',
    },
    {
      id: 2,
      question: 'Berapa lama kita merayakan anniversary hari ini?',
      options: ['1 Tahun (365 Hari)', '2 Tahun (730 Hari)', '3 Tahun (1095 Hari)'],
      correctAnswer: 1,
      explanation: 'Genap 2 Tahun / 730 hari penuh cerita manis berdua!',
    },
    {
      id: 3,
      question: 'Jas almamater kampus mana yang kita kenakan di foto bertopi koboi?',
      options: ['Polinema (Politeknik Negeri Malang)', 'Universitas Brawijaya', 'Institut Teknologi Bandung'],
      correctAnswer: 0,
      explanation: 'Benar! Almamater biru kebanggaan Polinema tempat kenangan kita terukir.',
    },
    {
      id: 4,
      question: 'Siapa orang yang paling berharga dan dicintai di dunia ini?',
      options: ['Kamu (Sayangku)', 'Tentu saja Kamu!', 'Selalu Kamu, selamanya.'],
      correctAnswer: 0, // all options are winners!
      explanation: 'Kamu adalah segalanya bagiku, hari ini dan selamanya. ❤️',
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    const isCorrect =
      currentStep === 3 || index === questions[currentStep].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentStep + 1 < questions.length) {
        setCurrentStep((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setIsCompleted(true);
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
        });
      }
    }, 1200);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-wine-900 border border-rose-400/50 rounded-2xl shadow-2xl p-6 text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-wine-950/70 text-rose-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isCompleted ? (
            <div>
              {/* Header */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300 font-mono mb-2 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
                <span>Kuis Kenangan Kita • Pertanyaan {currentStep + 1}/{questions.length}</span>
              </div>

              <h3 className="font-serif text-lg font-bold text-rose-100 mb-6">
                {questions[currentStep].question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-4">
                {questions[currentStep].options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect =
                    currentStep === 3 || idx === questions[currentStep].correctAnswer;

                  let btnStyle = 'bg-wine-950/70 border-rose-900/50 hover:border-rose-400/60 text-rose-100';

                  if (selectedOption !== null) {
                    if (isSelected && isCorrect) {
                      btnStyle = 'bg-emerald-900/80 border-emerald-400 text-white';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-900/80 border-rose-500 text-white';
                    } else if (isCorrect) {
                      btnStyle = 'bg-emerald-900/40 border-emerald-500/50 text-white';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={selectedOption !== null}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedOption !== null && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-rose-300 font-serif italic mt-2"
                >
                  {questions[currentStep].explanation}
                </motion.p>
              )}
            </div>
          ) : (
            <div className="py-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-600/40">
                <Trophy className="w-8 h-8 text-white" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-rose-100 mb-1">
                Skor Sempurna: {score}/{questions.length}!
              </h3>
              <p className="font-cursive text-xl text-champagne-300 mb-4">
                You know us better than anyone in the universe
              </p>

              <p className="text-xs text-rose-200/90 font-serif leading-relaxed mb-6">
                Dua tahun adalah bukti betapa erat dan kuatnya cinta kita. Terima kasih telah mengingat setiap detik berharga dalam cerita kita berdua.
              </p>

              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-4 py-2 rounded-full bg-wine-950/80 border border-rose-500/40 text-xs text-rose-200 hover:text-white"
                >
                  Main Lagi
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-xs font-semibold text-white shadow-lg shadow-rose-600/30"
                >
                  Tutup & Lanjutkan
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
