import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  rotation?: string;
  washColor?: string;
  hasLift?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  rotation = '0deg',
  washColor,
  hasLift = true,
  children,
  className = '',
  style,
  ...props
}) => {
  const paddingClass = /\bp(-\w+)?-\d+/.test(className) ? '' : 'p-5 md:p-6';

  return (
    <motion.div
      style={{
        rotate: rotation,
        backgroundColor: washColor || 'var(--bg-surface)',
        ...style,
      }}
      whileHover={hasLift ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={`rounded-card border border-seam shadow-paper-flat relative transition-shadow ${paddingClass} ${
        hasLift ? 'hover:shadow-paper-lift' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
