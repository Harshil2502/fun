import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'wash';
  washColor?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  washColor,
  children,
  ariaLabel,
  className = '',
  disabled,
  ...props
}) => {
  let baseStyle = 'tap-target px-4 py-2.5 rounded-note text-sm font-serif font-medium transition-colors select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ';

  if (variant === 'primary') {
    baseStyle += 'bg-ink text-surface shadow-paper-flat hover:bg-ink-muted active:bg-ink ';
  } else if (variant === 'wash') {
    baseStyle += 'border border-seam text-ink shadow-paper-flat hover:shadow-paper-lift ';
  } else if (variant === 'ghost') {
    baseStyle += 'text-ink-muted hover:text-ink hover:bg-surface-warm/50 ';
  } else {
    // secondary (paper card look)
    baseStyle += 'bg-surface border border-seam text-ink shadow-paper-flat hover:shadow-paper-lift hover:border-pencil ';
  }

  const customStyle = washColor ? { backgroundColor: washColor } : undefined;

  return (
    <motion.button
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      aria-label={ariaLabel}
      disabled={disabled}
      style={customStyle}
      className={`${baseStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
