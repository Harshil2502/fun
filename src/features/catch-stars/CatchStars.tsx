import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/primitives/Card';
import { Button } from '../../components/primitives/Button';

interface CatchStarsProps {
  isCompleted: boolean;
  onComplete: () => void;
  onSoundChime?: () => void;
}

interface Star {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number;
  delay: number;
}

const INITIAL_STARS: Star[] = [
  { id: 1, x: 20, y: 30, size: 24, delay: 0 },
  { id: 2, x: 75, y: 25, size: 28, delay: 0.4 },
  { id: 3, x: 45, y: 55, size: 22, delay: 0.8 },
  { id: 4, x: 80, y: 70, size: 26, delay: 1.2 },
  { id: 5, x: 25, y: 75, size: 30, delay: 1.6 },
];

export const CatchStars: React.FC<CatchStarsProps> = ({
  isCompleted,
  onComplete,
  onSoundChime,
}) => {
  const [caughtStars, setCaughtStars] = useState<number[]>([]);

  const handleCatchStar = (id: number) => {
    if (caughtStars.includes(id)) return;
    const next = [...caughtStars, id];
    setCaughtStars(next);
    onSoundChime?.();

    if (next.length === INITIAL_STARS.length) {
      onComplete();
    }
  };

  const handleReset = () => {
    setCaughtStars([]);
  };

  return (
    <Card
      rotation="0.8deg"
      className="w-full relative overflow-hidden"
    >
      {/* Indigo Washi Tape Accent */}
      <div
        className="washi-tape -top-2.5 right-8 w-24 pointer-events-none"
        style={{ backgroundColor: 'var(--rb-indigo-wash)' }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span
            className="text-[11px] font-serif uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-1"
            style={{ backgroundColor: 'var(--rb-indigo-wash)', color: 'var(--text-ink)' }}
          >
            Indigo Gouache • Activity 02
          </span>
          <h3 className="font-hand text-[28px] text-ink font-semibold">
            Catch the Evening Stars
          </h3>
          <p className="font-serif text-xs text-ink-muted">
            Tap the five peaceful embers floating in the dusk sky. Take all the time you like.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-serif text-ink-muted">
            Stars gathered: {caughtStars.length} / 5
          </span>
          {isCompleted && (
            <span className="px-2.5 py-1 rounded-full text-xs font-serif bg-rb-indigo-wash text-ink border border-rb-indigo/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rb-indigo" />
              Indigo Stamp Painted
            </span>
          )}
        </div>
      </div>

      {/* Twilight Sky Canvas */}
      <div
        className="w-full h-64 sm:h-72 rounded-note border border-seam relative overflow-hidden flex items-center justify-center select-none"
        style={{
          backgroundColor: '#303852', // deep twilight indigo paper
        }}
        aria-label={`Twilight sky with floating stars. ${caughtStars.length} of 5 caught.`}
      >
        {/* Subtle Constellation Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          stroke="#FAF7F0"
          strokeWidth="1"
          strokeDasharray="2 4"
        >
          <line x1="20%" y1="30%" x2="45%" y2="55%" />
          <line x1="45%" y1="55%" x2="75%" y2="25%" />
          <line x1="45%" y1="55%" x2="80%" y2="70%" />
          <line x1="25%" y1="75%" x2="45%" y2="55%" />
        </svg>

        {/* Floating Stars */}
        {INITIAL_STARS.map((star) => {
          const isCaught = caughtStars.includes(star.id);

          return (
            <AnimatePresence key={star.id}>
              {!isCaught ? (
                <motion.button
                  type="button"
                  onClick={() => handleCatchStar(star.id)}
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.size,
                    height: star.size,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3 + star.id * 0.5,
                    repeat: Infinity,
                    delay: star.delay,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.35 }}
                  whileTap={{ scale: 0.9 }}
                  className="tap-target absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                  aria-label={`Gather star ${star.id}`}
                >
                  {/* Hand-drawn Star SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full text-rb-yellow drop-shadow-[0_0_8px_rgba(227,178,60,0.8)]"
                    fill="currentColor"
                  >
                    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                  </svg>
                </motion.button>
              ) : (
                /* Caught Star Glow Marker */
                <motion.div
                  initial={{ scale: 1.5, opacity: 1 }}
                  animate={{ scale: 1, opacity: 0.4 }}
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <span className="text-white text-xs font-serif">✦</span>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}

        {/* Central Completion Whisper */}
        {caughtStars.length === INITIAL_STARS.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-4 bg-surface-warm/95 rounded-card border border-seam shadow-paper-lift max-w-xs z-10"
          >
            <p className="font-hand text-[22px] text-ink font-semibold">
              The sky is calm and gathered.
            </p>
            <p className="font-serif text-xs text-ink-muted mt-1">
              The indigo band is painted on Pragya&apos;s rainbow.
            </p>
            <Button
              variant="ghost"
              onClick={handleReset}
              className="mt-3 text-xs px-3 py-1 text-ink"
            >
              Release stars to play again
            </Button>
          </motion.div>
        )}
      </div>
    </Card>
  );
};
