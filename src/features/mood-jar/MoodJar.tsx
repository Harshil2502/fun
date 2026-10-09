import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/primitives/Card';
import { content } from '../../content/content';

interface MoodJarProps {
  isCompleted: boolean;
  onComplete: () => void;
  onSoundPaper?: () => void;
  onSoundChime?: () => void;
}

export const MoodJar: React.FC<MoodJarProps> = ({
  isCompleted,
  onComplete,
  onSoundPaper,
  onSoundChime,
}) => {
  const [foldedNotes, setFoldedNotes] = useState<string[]>([]);
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const handleFoldNote = (noteId: string) => {
    if (foldedNotes.includes(noteId)) {
      setActiveNote(noteId);
      return;
    }

    onSoundPaper?.();
    const next = [...foldedNotes, noteId];
    setFoldedNotes(next);
    setActiveNote(noteId);

    if (next.length === content.activities.moodJar.notes.length) {
      onComplete();
      onSoundChime?.();
    }
  };

  return (
    <Card
      rotation="-0.4deg"
      className="w-full relative overflow-hidden"
    >
      {/* Yellow Washi Tape */}
      <div
        className="washi-tape -top-2.5 left-16 w-24 pointer-events-none"
        style={{ backgroundColor: 'var(--rb-yellow-wash)' }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span
            className="text-[11px] font-serif uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-1"
            style={{ backgroundColor: 'var(--rb-yellow-wash)', color: 'var(--text-ink)' }}
          >
            Yellow Gouache • Activity 05
          </span>
          <h3 className="font-hand text-[28px] text-ink font-semibold">
            The Little Mood Jar
          </h3>
          <p className="font-serif text-xs text-ink-muted">
            Four folded origami notes of quiet warmth. Tap any note to read and tuck it into the jar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-serif text-ink-muted">
            Folded into jar: {foldedNotes.length} / {content.activities.moodJar.notes.length}
          </span>
          {isCompleted && (
            <span className="px-2.5 py-1 rounded-full text-xs font-serif bg-rb-yellow-wash text-ink border border-rb-yellow/40 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rb-yellow" />
              Yellow Stamp Painted
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* The Origami Slips List */}
        <div className="md:col-span-7 flex flex-col gap-2.5">
          {content.activities.moodJar.notes.map((item, idx) => {
            const isFolded = foldedNotes.includes(item.id);
            const isSelected = activeNote === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleFoldNote(item.id)}
                className={`tap-target w-full text-left p-3.5 rounded-note border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-ink bg-rb-yellow-wash/60 shadow-paper-flat'
                    : isFolded
                    ? 'border-seam bg-surface-warm/40 text-ink-muted hover:border-pencil'
                    : 'border-pencil/80 bg-surface hover:bg-rb-yellow-wash/20'
                }`}
                aria-label={`Origami note ${idx + 1}: ${isFolded ? 'Folded in jar' : 'Unread'}`}
              >
                <div className="flex items-center justify-between text-xs font-serif mb-1 text-ink-muted">
                  <span>Note {idx + 1}</span>
                  <span>{isFolded ? '✓ Tucked in jar' : 'Click to unfold'}</span>
                </div>
                <p className="font-hand text-[19px] text-ink leading-snug">
                  {item.note}
                </p>
              </button>
            );
          })}
        </div>

        {/* The Hand-drawn Glass Jar Illustration */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4">
          <div className="relative w-40 h-52 bg-surface rounded-t-2xl rounded-b-3xl border-2 border-seam shadow-paper-lift flex flex-col items-center justify-end p-3 overflow-hidden">
            {/* Jar Lid & String */}
            <div className="absolute top-0 w-28 h-6 bg-surface-warm border-b border-seam rounded-t-lg flex items-center justify-center">
              <div className="w-32 h-1 bg-rb-orange opacity-40 rounded-full" />
            </div>

            {/* Folded origami pieces inside jar */}
            <div className="w-full flex flex-wrap gap-2 justify-center items-end pb-2">
              {foldedNotes.map((id, i) => (
                <motion.div
                  key={id}
                  initial={{ y: -60, opacity: 0, rotate: 20 }}
                  animate={{ y: 0, opacity: 1, rotate: (i % 2 === 0 ? 1 : -1) * (i * 8 + 5) }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-10 h-7 rounded-sm border border-seam flex items-center justify-center text-[10px] font-hand font-bold text-ink shadow-sm"
                  style={{ backgroundColor: 'var(--rb-yellow-wash)' }}
                >
                  ✉ {i + 1}
                </motion.div>
              ))}
            </div>

            {foldedNotes.length === 0 && (
              <span className="font-serif text-xs text-ink-muted/50 text-center mb-6">
                (empty jar waiting for notes)
              </span>
            )}
          </div>

          <span className="font-serif text-xs text-ink-muted mt-3">
            {foldedNotes.length} origami thoughts tucked safely
          </span>
        </div>
      </div>
    </Card>
  );
};
