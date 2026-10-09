import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../../content/content';

interface EasterEggsProps {
  onToggleNightMode: () => void;
  nightMode: boolean;
}

export const EasterEggs: React.FC<EasterEggsProps> = ({
  onToggleNightMode,
  nightMode,
}) => {
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showToast = (text: string) => {
    setActiveToast(text);
    setTimeout(() => {
      setActiveToast((prev) => (prev === text ? null : prev));
    }, 3500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 border-t border-seam/60 mt-8 relative">
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-ink-muted">
        {/* Cat Doodle */}
        <button
          type="button"
          onClick={() => showToast(content.easterEggs.cat)}
          className="tap-target group flex flex-col items-center gap-1 cursor-pointer focus:outline-none"
          aria-label="Tap sleeping cat doodle"
        >
          <svg
            viewBox="0 0 40 40"
            className="w-8 h-8 text-ink-muted group-hover:text-ink transition-colors"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Sleeping curled cat */}
            <path d="M12 28 C8 24, 8 16, 16 14 C18 10, 22 10, 24 14 C28 14, 32 18, 30 26 C28 32, 16 32, 12 28 Z" />
            <path d="M14 14 L12 10 L16 12" />
            <path d="M22 12 L26 10 L24 14" />
            <path d="M16 22 Q18 24, 20 22" />
            <path d="M28 26 C32 28, 36 24, 34 20" />
          </svg>
          <span className="font-serif text-[11px] group-hover:underline">
            sleeping cat
          </span>
        </button>

        {/* Potted Plant Doodle */}
        <button
          type="button"
          onClick={() => showToast(content.easterEggs.plant)}
          className="tap-target group flex flex-col items-center gap-1 cursor-pointer focus:outline-none"
          aria-label="Tap potted plant doodle"
        >
          <svg
            viewBox="0 0 40 40"
            className="w-8 h-8 text-ink-muted group-hover:text-ink transition-colors"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Pot */}
            <path d="M14 26 L16 34 L24 34 L26 26 Z" />
            {/* Sprout & Leaves */}
            <path d="M20 26 L20 16" />
            <path d="M20 20 Q14 18, 16 14 Q22 16, 20 20" fill="var(--rb-green-wash)" />
            <path d="M20 16 Q26 14, 24 10 Q18 12, 20 16" fill="var(--rb-green-wash)" />
          </svg>
          <span className="font-serif text-[11px] group-hover:underline">
            jasmine sprout
          </span>
        </button>

        {/* Crescent Moon (Toggles Night Mode) */}
        <button
          type="button"
          onClick={() => {
            onToggleNightMode();
            showToast(content.easterEggs.moon);
          }}
          className="tap-target group flex flex-col items-center gap-1 cursor-pointer focus:outline-none"
          aria-label={`Toggle evening light (${nightMode ? 'Active' : 'Daylight'})`}
        >
          <svg
            viewBox="0 0 40 40"
            className="w-8 h-8 text-ink-muted group-hover:text-ink transition-colors"
            fill={nightMode ? 'var(--rb-yellow)' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M24 12 C18 12, 14 16, 14 22 C14 28, 18 32, 24 32 C21 29, 21 25, 24 22 C26 19, 26 15, 24 12 Z" />
            <line x1="28" y1="14" x2="30" y2="14" />
            <line x1="29" y1="13" x2="29" y2="15" />
          </svg>
          <span className="font-serif text-[11px] group-hover:underline">
            crescent moon
          </span>
        </button>
      </div>

      {/* Little Toast Notification */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-note bg-surface-warm border border-seam shadow-paper-lift max-w-sm text-center"
          >
            <p className="font-hand text-[19px] text-ink leading-tight">
              {activeToast}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
