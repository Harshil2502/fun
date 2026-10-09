import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface NoteProps extends HTMLMotionProps<'div'> {
  washColor: string;
  tapeColor?: string;
  rotation?: string;
  children: React.ReactNode;
}

export const Note: React.FC<NoteProps> = ({
  washColor,
  tapeColor = 'rgba(230, 220, 205, 0.75)',
  rotation = '-1deg',
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <motion.div
      style={{
        backgroundColor: washColor,
        rotate: rotation,
        ...style,
      }}
      whileHover={{ scale: 1.02, rotate: '0deg', transition: { duration: 0.25 } }}
      className={`relative p-5 rounded-note border border-seam/80 shadow-paper-flat select-none ${className}`}
      {...props}
    >
      {/* Washi tape strip at the top */}
      <div
        className="washi-tape -top-2.5 left-1/2 -translate-x-1/2 w-20 pointer-events-none"
        style={{ backgroundColor: tapeColor }}
        aria-hidden="true"
      />
      
      {/* Note body in handwritten font (strictly >= 18px) */}
      <div className="font-hand text-ink text-[19px] leading-[26px] pt-1">
        {children}
      </div>
    </motion.div>
  );
};
