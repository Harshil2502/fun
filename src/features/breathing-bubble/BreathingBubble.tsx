import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/primitives/Card';
import { Button } from '../../components/primitives/Button';

interface BreathingBubbleProps {
  isCompleted: boolean;
  onComplete: () => void;
  onSoundChime?: () => void;
}

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale';

export const BreathingBubble: React.FC<BreathingBubbleProps> = ({
  isCompleted,
  onComplete,
  onSoundChime,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    // 4-4-4 gentle rhythm
    if (phase === 'idle' || phase === 'exhale') {
      setPhase('inhale');
      timer = setTimeout(() => {
        setPhase('hold');
      }, 4000);
    } else if (phase === 'inhale') {
      timer = setTimeout(() => {
        setPhase('hold');
      }, 4000);
    } else if (phase === 'hold') {
      timer = setTimeout(() => {
        setPhase('exhale');
        setCycleCount((c) => {
          const next = c + 1;
          if (next >= 1 && !isCompleted) {
            onComplete();
            onSoundChime?.();
          }
          return next;
        });
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [isActive, phase, isCompleted, onComplete, onSoundChime]);

  const toggleBreathing = () => {
    if (!isActive) {
      setIsActive(true);
      setPhase('inhale');
    } else {
      setIsActive(false);
      setPhase('idle');
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Inhale gently...';
      case 'hold':
        return 'Hold softly...';
      case 'exhale':
        return 'Release slowly...';
      default:
        return 'Tap to begin a calm breath';
    }
  };

  return (
    <Card
      rotation="-0.7deg"
      className="w-full relative overflow-hidden"
    >
      {/* Blue Washi Tape */}
      <div
        className="washi-tape -top-2.5 left-12 w-24 pointer-events-none"
        style={{ backgroundColor: 'var(--rb-blue-wash)' }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span
            className="text-[11px] font-serif uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-1"
            style={{ backgroundColor: 'var(--rb-blue-wash)', color: 'var(--text-ink)' }}
          >
            Blue Gouache • Activity 03
          </span>
          <h3 className="font-hand text-[28px] text-ink font-semibold">
            The Breathing Bubble
          </h3>
          <p className="font-serif text-xs text-ink-muted">
            A quiet rhythm to slow down your thoughts. One full breath paints the blue band.
          </p>
        </div>

        {isCompleted && (
          <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-serif bg-rb-blue-wash text-ink border border-rb-blue/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rb-blue" />
            Blue Stamp Painted
          </span>
        )}
      </div>

      {/* Rhythmic Breathing Canvas */}
      <div className="w-full h-64 sm:h-72 rounded-note border border-seam bg-surface-warm/40 flex flex-col items-center justify-center relative p-6 select-none overflow-hidden">
        {/* Expanding / Contracting Organic Watercolor Bubble */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Outer Ripple */}
          <motion.div
            animate={{
              scale: phase === 'inhale' || phase === 'hold' ? 1.25 : 0.85,
              opacity: phase === 'inhale' || phase === 'hold' ? 0.35 : 0.15,
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full bg-rb-blue"
          />

          {/* Main Watercolor Body */}
          <motion.div
            animate={{
              scale: phase === 'inhale' || phase === 'hold' ? 1.15 : 0.75,
              rotate: phase === 'hold' ? 45 : 0,
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
            }}
            className="w-36 h-36 rounded-full flex flex-col items-center justify-center p-4 border border-rb-blue/40 shadow-paper-lift text-center"
            style={{
              backgroundColor: 'var(--rb-blue-wash)',
            }}
          >
            <p className="font-hand text-[22px] text-ink font-semibold leading-tight">
              {getPhaseText()}
            </p>
          </motion.div>
        </div>

        <div className="mt-4 flex items-center gap-3 z-10">
          <Button
            variant="wash"
            washColor="var(--rb-blue-wash)"
            onClick={toggleBreathing}
            ariaLabel={isActive ? "Pause breathing exercise" : "Start breathing rhythm"}
            className="text-xs px-5 py-2 font-medium"
          >
            {isActive ? 'Pause' : 'Start breathing'}
          </Button>

          {cycleCount > 0 && (
            <span className="text-xs font-serif text-ink-muted">
              {cycleCount} {cycleCount === 1 ? 'cycle' : 'cycles'} taken
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
