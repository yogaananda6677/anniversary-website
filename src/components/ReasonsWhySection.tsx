import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, HeartHandshake, Sparkles, TrendingUp, Heart, ChevronRight } from 'lucide-react';
import { AnniversaryData } from '../types';

interface ReasonsWhySectionProps {
  data: AnniversaryData;
}

export const ReasonsWhySection: React.FC<ReasonsWhySectionProps> = ({ data }) => {
  const [activeCard, setActiveCard] = useState<number | null>(1);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smile':
        return <Smile className="w-5 h-5 text-champagne-300" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-300" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-champagne-300" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-rose-300" />;
      default:
        return <Heart className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 max-w-md mx-auto text-center select-none py-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-8"
      >
        <span className="font-serif text-xs tracking-widest text-rose-300 uppercase block mb-1">
          Why You Mean The World To Me
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-rose-100">
          4 Hal yang Bikin Selalu Jatuh Cinta
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-rose-400" />
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-rose-400" />
        </div>
      </motion.div>

      {/* Cards List */}
      <div className="w-full space-y-3.5">
        {data.loveReasons.map((reason, index) => {
          const isExpanded = activeCard === reason.id;

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveCard(isExpanded ? null : reason.id)}
              className={`w-full rounded-2xl transition-all duration-300 cursor-pointer text-left overflow-hidden border ${
                isExpanded
                  ? 'glass-card-rose border-rose-400/60 shadow-xl shadow-rose-950/60 scale-[1.02]'
                  : 'bg-wine-900/50 hover:bg-wine-900/80 border-rose-900/40 shadow-md'
              }`}
            >
              {/* Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-wine-950/80 border border-rose-500/30 flex items-center justify-center shrink-0 shadow-inner">
                    {getIcon(reason.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400/80">
                      Alasan #{reason.id}
                    </span>
                    <h3 className="font-serif text-base font-semibold text-rose-100">
                      {reason.title}
                    </h3>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-7 h-7 rounded-full bg-wine-950/60 flex items-center justify-center text-rose-300 shrink-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 pt-1 border-t border-rose-900/40"
                  >
                    <p className="font-serif text-sm text-rose-200/90 leading-relaxed italic">
                      "{reason.desc}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <p className="text-[11px] text-rose-400/70 font-mono mt-4">
        Ketuk kartu di atas untuk membaca setiap alasan cinta
      </p>
    </section>
  );
};
