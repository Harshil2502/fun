import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/primitives/Card';
import { content } from '../../content/content';

interface SealedEnvelopeProps {
  completedCount: number; // 0 to 6
  isUnlocked: boolean;
  sealBroken: boolean;
  onBreakSeal: () => void;
  onSoundWax?: () => void;
  onSoundPaper?: () => void;
}

export const SealedEnvelope: React.FC<SealedEnvelopeProps> = ({
  completedCount,
  isUnlocked,
  sealBroken,
  onBreakSeal,
  onSoundWax,
  onSoundPaper,
}) => {
  const handleOpenSeal = () => {
    if (!isUnlocked || sealBroken) return;
    onSoundWax?.();
    onSoundPaper?.();
    onBreakSeal();
  };

  return (
    <section
      id="envelope-section"
      aria-label="The Sealed Envelope"
      className="w-full max-w-3xl mx-auto py-12 px-4"
    >
      <div className="text-center mb-6">
        <span className="text-xs font-serif uppercase tracking-widest text-ink-muted">
          Final Chapter • The Red Seal
        </span>
        <h2 className="font-hand text-[34px] sm:text-[38px] text-ink font-semibold mt-1">
          A Little Letter for Later
        </h2>
        <p className="font-serif text-sm text-ink-muted max-w-md mx-auto">
          {isUnlocked
            ? "All six stamps are gathered. The envelope is ready to be opened."
            : `Gather all six stamps across the journal to soften this seal (${completedCount} of 6 gathered).`}
        </p>
      </div>

      {/* Physical Envelope Container */}
      <Card
        hasLift={false}
        className="w-full max-w-xl mx-auto bg-surface-warm border-2 border-seam shadow-paper-lift p-3 sm:p-6 relative overflow-hidden box-border"
      >
        {/* Envelope Flap Animation Layer */}
        <div className="relative w-full min-h-[300px] flex flex-col items-center justify-center">
          {/* Faint Postal Stamp Marking */}
          <div className="absolute top-3 right-3 w-16 sm:w-20 h-16 sm:h-20 border-2 border-dashed border-pencil rounded-stamp flex flex-col items-center justify-center text-center p-1 opacity-50 pointer-events-none">
            <span className="text-[8px] sm:text-[9px] font-serif uppercase tracking-wider text-ink-muted">
              OCT 2026
            </span>
            <span className="text-[11px] sm:text-xs font-hand text-ink font-bold">
              SPECIAL
            </span>
            <span className="text-[8px] sm:text-[9px] font-serif text-ink-muted">
              DELIVERY
            </span>
          </div>

          {!sealBroken ? (
            /* Sealed Envelope Front View */
            <div className="flex flex-col items-center text-center max-w-sm z-10 px-2">
              <span className="font-hand text-[28px] sm:text-[32px] text-ink font-semibold mb-2">
                {content.envelope.recipientLine}
              </span>

              <p className="font-serif text-xs text-ink-muted leading-relaxed mb-6">
                {isUnlocked
                  ? "The six colours have formed a path. Press the red wax seal to open."
                  : "This envelope remains sealed with twine until all six activities are completed."}
              </p>

              {/* The 3D Wax Seal */}
              <motion.button
                type="button"
                onClick={handleOpenSeal}
                disabled={!isUnlocked}
                whileHover={isUnlocked ? { scale: 1.08 } : undefined}
                whileTap={isUnlocked ? { scale: 0.95 } : undefined}
                className={`tap-target relative w-20 h-20 rounded-full flex flex-col items-center justify-center select-none transition-all cursor-pointer ${
                  isUnlocked
                    ? 'shadow-wax border-2 border-white/40 ring-4 ring-rb-red/20 animate-pulse'
                    : 'opacity-60 cursor-not-allowed shadow-paper-flat border border-pencil'
                }`}
                style={{
                  backgroundColor: 'var(--rb-red)',
                }}
                aria-label={
                  isUnlocked
                    ? "Break the red wax seal to read Pragya's letter"
                    : "Envelope locked. Gather all 6 stamps first."
                }
              >
                {/* Physical seal imprint */}
                <span className="font-hand text-white text-3xl font-bold select-none drop-shadow">
                  {content.envelope.sealText}
                </span>
                <span className="text-[9px] text-white/90 font-serif uppercase tracking-wider mt-0.5">
                  {isUnlocked ? "Tap seal" : "Locked"}
                </span>
              </motion.button>

              <span className="text-[12px] text-ink-muted font-serif italic mt-5">
                {isUnlocked
                  ? "Breaking the seal paints the 7th red band of the rainbow"
                  : `${6 - completedCount} more stamp${6 - completedCount === 1 ? '' : 's'} needed`}
              </span>
            </div>
          ) : (
            /* Unlocked Letter & Calendar Reveal */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-full bg-surface p-3 sm:p-6 rounded-card border border-seam shadow-paper-flat text-left overflow-hidden"
              >
                {/* Letter Header */}
                <div className="flex items-center justify-between border-b border-seam pb-2.5 mb-3">
                  <span className="font-hand text-[22px] sm:text-[26px] text-ink font-semibold">
                    Dear {content.recipient.name},
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-serif uppercase tracking-widest text-ink-muted">
                    Private Note
                  </span>
                </div>

                {/* Letter Body Paragraphs */}
                <div className="space-y-2.5 font-serif text-[14px] sm:text-base text-ink leading-relaxed">
                  {content.envelope.letterParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Calendar Date Reveal (Requirement 9: Date + Time Line) */}
                <div className="my-4 p-3 sm:p-4 rounded-note border-2 border-dashed border-rb-red/40 bg-rb-red-wash/40 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <span className="text-[10px] font-serif uppercase tracking-widest text-ink-muted block">
                        Mark your calendar:
                      </span>
                      <p className="font-hand text-[21px] sm:text-[26px] text-ink font-semibold leading-tight mt-0.5">
                        {content.envelope.calendarDate.dayOfWeek}, {content.envelope.calendarDate.date} {content.envelope.calendarDate.month} {content.envelope.calendarDate.year}
                      </p>
                      {/* Time Line */}
                      <p className="font-serif text-xs font-medium text-rb-red mt-1 flex items-center gap-1.5">
                        <span>🕒</span>
                        <span>Time: {content.envelope.calendarDate.time}</span>
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <span className="font-hand text-[16px] sm:text-[18px] text-ink italic block leading-snug">
                        “{content.envelope.calendarDate.annotation}”
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sign-off */}
                <div className="pt-3 border-t border-seam flex flex-col items-end text-right">
                  <p className="font-serif text-xs text-ink-muted italic">
                    {content.envelope.signoff.prompt}
                  </p>
                  <p className="font-hand text-[22px] sm:text-[26px] text-ink font-semibold mt-0.5">
                    {content.envelope.signoff.name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </Card>
    </section>
  );
};
