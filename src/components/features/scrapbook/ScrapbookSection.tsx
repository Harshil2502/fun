import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Note } from '../../primitives/Note';
import { content } from '../../../content/content';

interface ScrapbookSectionProps {
  onPaperRustle?: () => void;
}

export const ScrapbookSection: React.FC<ScrapbookSectionProps> = ({ onPaperRustle }) => {
  const [polaroid1Flipped, setPolaroid1Flipped] = useState(false);
  const [polaroid2Flipped, setPolaroid2Flipped] = useState(false);

  const handleFlip1 = () => {
    setPolaroid1Flipped((prev) => !prev);
    onPaperRustle?.();
  };

  const handleFlip2 = () => {
    setPolaroid2Flipped((prev) => !prev);
    onPaperRustle?.();
  };

  return (
    <section
      aria-label="Little Things Scrapbook"
      className="w-full max-w-4xl mx-auto py-8 px-4"
    >
      <div className="mb-8">
        <span className="text-xs font-serif uppercase tracking-widest text-ink-muted">
          Chapter One
        </span>
        <h2 className="font-hand text-[34px] sm:text-[38px] text-ink font-semibold mt-1">
          The Little Things
        </h2>
        <p className="font-serif text-sm text-ink-muted max-w-lg mt-1">
          A few pinned memories and thoughts scattered across the page. Tap any polaroid to flip it over.
        </p>
      </div>

      {/* Asymmetric Editorial Scrapbook Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Sticky Note 1 */}
        <div className="md:col-span-5 md:pt-4">
          <Note
            washColor={content.scrapbook.stickyNotes[0].wash}
            rotation={content.scrapbook.stickyNotes[0].rotation}
            tapeColor="rgba(227, 178, 60, 0.45)"
          >
            {content.scrapbook.stickyNotes[0].text}
          </Note>
        </div>

        {/* Polaroid 1 (Flip-able) */}
        <div className="md:col-span-7 flex justify-center md:justify-end">
          <div
            className="perspective-1000 cursor-pointer select-none"
            onClick={handleFlip1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlip1();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Polaroid: ${content.scrapbook.polaroid1.caption}. Press to flip.`}
          >
            <motion.div
              animate={{ rotateY: polaroid1Flipped ? 180 : 0, rotate: -2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              className="w-64 sm:w-72 bg-surface p-3 pb-6 rounded-card border border-seam shadow-paper-lift relative"
            >
              {/* Front side */}
              <div
                style={{ backfaceVisibility: 'hidden' }}
                className={polaroid1Flipped ? 'invisible' : 'block'}
              >
                {/* Washi tape on top corner */}
                <div
                  className="washi-tape -top-2 left-6 w-16"
                  style={{ backgroundColor: 'var(--rb-blue-wash)' }}
                  aria-hidden="true"
                />

                {/* Hand-drawn Illustration Frame */}
                <div className="w-full aspect-[4/3] bg-surface-warm rounded-sm border border-seam/60 flex items-center justify-center p-4 overflow-hidden relative">
                  <svg
                    viewBox="0 0 100 80"
                    className="w-full h-full text-ink-muted"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {/* Window frame with afternoon sun */}
                    <rect x="20" y="10" width="60" height="50" rx="3" stroke="currentColor" fill="#FAF7F0" />
                    <line x1="50" y1="10" x2="50" y2="60" />
                    <line x1="20" y1="35" x2="80" y2="35" />
                    {/* Warm tea cup on windowsill */}
                    <path d="M58 54 C58 58, 68 58, 68 54 L67 46 L59 46 Z" fill="var(--rb-orange-wash)" stroke="currentColor" />
                    <path d="M67 48 C71 48, 71 52, 67 52" />
                    {/* Steam swirls */}
                    <path d="M62 43 Q64 40, 62 37" stroke="var(--border-pencil)" />
                    <path d="M65 43 Q67 40, 65 37" stroke="var(--border-pencil)" />
                  </svg>
                </div>

                <div className="mt-3 text-center">
                  <p className="font-hand text-[20px] text-ink font-semibold">
                    {content.scrapbook.polaroid1.caption}
                  </p>
                  <span className="text-[11px] text-ink-muted font-serif block mt-0.5">
                    (tap to read the back)
                  </span>
                </div>
              </div>

              {/* Back side of Polaroid */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
                className={`absolute inset-0 p-5 bg-surface-warm rounded-card flex flex-col justify-between ${
                  polaroid1Flipped ? 'block' : 'invisible'
                }`}
              >
                <div>
                  <span className="text-[11px] font-serif uppercase tracking-widest text-ink-muted">
                    Handwritten note:
                  </span>
                  <p className="font-hand text-[20px] leading-relaxed text-ink mt-3">
                    {content.scrapbook.polaroid1.backNote}
                  </p>
                </div>
                <span className="text-[11px] text-ink-muted font-serif text-right">
                  (tap to flip back)
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Polaroid 2 (Flip-able) */}
        <div className="md:col-span-6 flex justify-center md:justify-start">
          <div
            className="perspective-1000 cursor-pointer select-none"
            onClick={handleFlip2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlip2();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Polaroid: ${content.scrapbook.polaroid2.caption}. Press to flip.`}
          >
            <motion.div
              animate={{ rotateY: polaroid2Flipped ? 180 : 0, rotate: 1.8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              className="w-64 sm:w-72 bg-surface p-3 pb-6 rounded-card border border-seam shadow-paper-lift relative"
            >
              {/* Front side */}
              <div
                style={{ backfaceVisibility: 'hidden' }}
                className={polaroid2Flipped ? 'invisible' : 'block'}
              >
                {/* Washi tape */}
                <div
                  className="washi-tape -top-2 right-6 w-16"
                  style={{ backgroundColor: 'var(--rb-green-wash)' }}
                  aria-hidden="true"
                />

                <div className="w-full aspect-[4/3] bg-surface-warm rounded-sm border border-seam/60 flex items-center justify-center p-4 overflow-hidden relative">
                  <svg
                    viewBox="0 0 100 80"
                    className="w-full h-full text-ink-muted"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {/* Clouds and gentle raindrops */}
                    <path d="M25 45 C20 45, 15 40, 18 34 C18 25, 30 22, 36 26 C40 18, 55 18, 60 25 C68 22, 78 28, 75 38 C80 42, 75 48, 68 48 Z" fill="#F0EDE4" />
                    <line x1="30" y1="54" x2="27" y2="60" stroke="var(--rb-blue)" strokeDasharray="1 3" />
                    <line x1="45" y1="54" x2="42" y2="60" stroke="var(--rb-blue)" strokeDasharray="1 3" />
                    <line x1="60" y1="54" x2="57" y2="60" stroke="var(--rb-blue)" strokeDasharray="1 3" />
                  </svg>
                </div>

                <div className="mt-3 text-center">
                  <p className="font-hand text-[20px] text-ink font-semibold">
                    {content.scrapbook.polaroid2.caption}
                  </p>
                  <span className="text-[11px] text-ink-muted font-serif block mt-0.5">
                    (tap to read the back)
                  </span>
                </div>
              </div>

              {/* Back side of Polaroid 2 */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
                className={`absolute inset-0 p-5 bg-surface-warm rounded-card flex flex-col justify-between ${
                  polaroid2Flipped ? 'block' : 'invisible'
                }`}
              >
                <div>
                  <span className="text-[11px] font-serif uppercase tracking-widest text-ink-muted">
                    Handwritten note:
                  </span>
                  <p className="font-hand text-[20px] leading-relaxed text-ink mt-3">
                    {content.scrapbook.polaroid2.backNote}
                  </p>
                </div>
                <span className="text-[11px] text-ink-muted font-serif text-right">
                  (tap to flip back)
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sticky Notes 2 & 3 */}
        <div className="md:col-span-6 flex flex-col gap-5">
          <Note
            washColor={content.scrapbook.stickyNotes[1].wash}
            rotation={content.scrapbook.stickyNotes[1].rotation}
            tapeColor="rgba(94, 147, 102, 0.45)"
          >
            {content.scrapbook.stickyNotes[1].text}
          </Note>

          <Note
            washColor={content.scrapbook.stickyNotes[2].wash}
            rotation={content.scrapbook.stickyNotes[2].rotation}
            tapeColor="rgba(229, 138, 63, 0.45)"
          >
            {content.scrapbook.stickyNotes[2].text}
          </Note>
        </div>
      </div>
    </section>
  );
};
