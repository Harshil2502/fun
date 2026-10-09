import React from 'react';
import { motion } from 'framer-motion';

export interface StickerStampProps {
  label: string;
  color: string;
  washColor: string;
  isCollected: boolean;
  icon: React.ReactNode;
  number: number;
}

export const StickerStamp: React.FC<StickerStampProps> = ({
  label,
  color,
  washColor,
  isCollected,
  icon,
  number,
}) => {
  return (
    <motion.div
      initial={false}
      animate={{
        scale: isCollected ? [0.9, 1.08, 1] : 1,
        opacity: isCollected ? 1 : 0.65,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`relative w-24 h-28 p-2 rounded-stamp border-2 border-dashed flex flex-col items-center justify-between text-center select-none transition-colors ${
        isCollected
          ? 'border-pencil shadow-paper-flat'
          : 'border-pencil/50 bg-surface/40'
      }`}
      style={{
        backgroundColor: isCollected ? washColor : 'transparent',
      }}
      aria-label={`Stamp ${number}: ${label} (${isCollected ? 'Collected' : 'Pending'})`}
    >
      <div className="w-full flex justify-between items-center text-[10px] text-ink-muted font-serif">
        <span>NO.{number}</span>
        <span>{isCollected ? '★' : '○'}</span>
      </div>

      <div
        className="w-12 h-12 rounded-full flex items-center justify-center transition-transform"
        style={{
          color: isCollected ? color : 'var(--text-ink-muted)',
          backgroundColor: isCollected ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
        }}
      >
        {icon}
      </div>

      <span
        className="font-serif text-[11px] leading-tight font-medium max-w-[80px] truncate"
        style={{ color: isCollected ? 'var(--text-ink)' : 'var(--text-ink-muted)' }}
      >
        {label}
      </span>
    </motion.div>
  );
};
