import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../primitives/Button';

interface CoverProps {
  recipientName: string;
  isOpen: boolean;
  onOpen: () => void;
}

export const Cover: React.FC<CoverProps> = ({
  recipientName,
  isOpen,
  onOpen,
}) => {
  if (isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas"
    >
      {/* Linen-bound Journal Cover */}
      <motion.div
        initial={{ y: 0, rotate: -0.5 }}
        animate={{ y: 0, rotate: -0.5 }}
        whileHover={{ rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-full max-w-[340px] sm:max-w-md bg-surface-warm border-2 border-seam rounded-book shadow-paper-hover p-5 sm:p-8 relative overflow-hidden flex flex-col items-center text-center my-auto"
      >
        {/* Book Spine Stitching Effect on the left */}
        <div
          className="absolute left-3 top-0 bottom-0 w-4 flex flex-col justify-around py-4 opacity-40 pointer-events-none"
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-1 h-3 bg-ink-muted rounded-full" />
          ))}
        </div>

        {/* Vintage Bookmark Ribbon hanging out */}
        <div
          className="absolute -top-3 right-8 w-6 h-28 bg-rb-red shadow-paper-flat pointer-events-none z-10"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
          }}
          aria-hidden="true"
        />

        {/* Embossed Paper Frame */}
        <div className="w-full border border-dashed border-pencil p-6 rounded-card bg-surface flex flex-col items-center">
          {/* Subtle Dried Wildflower Illustration */}
          <svg
            viewBox="0 0 64 64"
            className="w-14 h-14 mb-4 text-ink-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M32 58 C32 40, 24 30, 18 20 C16 16, 20 12, 24 16 C28 20, 32 30, 32 58" />
            <path d="M32 46 C36 34, 44 26, 48 18 C50 14, 46 10, 42 14 C38 18, 34 28, 32 46" />
            <circle cx="32" cy="14" r="5" fill="var(--rb-yellow-wash)" stroke="currentColor" />
          </svg>

          <span className="text-xs uppercase tracking-widest text-ink-muted font-serif mb-2">
            Private Keepsake
          </span>

          <h1 className="font-hand text-[36px] sm:text-[40px] leading-tight text-ink font-semibold mb-3">
            For {recipientName}
          </h1>

          <p className="font-serif text-sm text-ink-muted leading-relaxed max-w-xs mb-6">
            A small collection of quiet moments, doodles, and thoughts gathered just for you.
          </p>

          <Button
            variant="primary"
            onClick={onOpen}
            ariaLabel={`Untie the ribbon and open Pragya's journal`}
            className="w-full sm:w-auto px-6 py-3 text-base shadow-paper-lift"
          >
            <span className="font-serif">Untie the ribbon &amp; open</span>
          </Button>

          <span className="text-[12px] text-ink-muted font-serif italic mt-3">
            Best experienced at an unhurried pace
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
