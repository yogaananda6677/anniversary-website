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
          colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#fbbf24'],
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
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-gradient-to-b from-white via-rose-50/40 to-white border-2 border-rose-200 rounded-3xl shadow-2xl p-6 sm:p-7 text-center overflow-hidden text-rose-950"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!isCompleted ? (
            <div>
              {/* Header */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-600 font-mono mb-2 uppercase tracking-wider font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Kuis Kenangan Kita • Pertanyaan {currentStep + 1}/{questions.length}</span>
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-rose-950 mb-6">
                {questions[currentStep].question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-4">
                {questions[currentStep].options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect =
                    currentStep === 3 || idx === questions[currentStep].correctAnswer;

                  let btnStyle = 'bg-white border-rose-200 hover:border-rose-400 hover:bg-rose-50 text-rose-950 shadow-sm';

                  if (selectedOption !== null) {
                    if (isSelected && isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-md';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-semibold';
                    } else if (isCorrect) {
                      btnStyle = 'bg-emerald-50/80 border-emerald-400 text-emerald-950';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={selectedOption !== null}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedOption !== null && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-rose-700 font-serif italic mt-2"
                >
                  {questions[currentStep].explanation}
                </motion.p>
              )}
            </div>
          ) : (
            <div className="py-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-400/40">
                <Trophy className="w-8 h-8 text-white" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-rose-950 mb-1">
                Skor Sempurna: {score}/{questions.length}!
              </h3>
              <p className="font-cursive text-2xl text-rose-600 mb-4 font-bold">
                You know us better than anyone in the universe
              </p>

              <p className="text-xs text-rose-800 font-serif leading-relaxed mb-6">
                Dua tahun adalah bukti betapa erat dan indahnya cinta kita. Terima kasih telah mengingat setiap detik berharga dalam cerita kita berdua.
              </p>

              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-4 py-2 rounded-full bg-rose-100 hover:bg-rose-200 text-xs font-semibold text-rose-800 transition-colors cursor-pointer"
                >
                  Main Lagi
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-xs font-bold text-white shadow-lg shadow-rose-400/40 transition-all cursor-pointer"
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
