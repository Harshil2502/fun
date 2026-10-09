import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/primitives/Card';
import { Button } from '../../components/primitives/Button';
import { content } from '../../content/content';

interface MemoryMatchProps {
  isCompleted: boolean;
  onComplete: () => void;
  onSoundPaper?: () => void;
  onSoundChime?: () => void;
}

interface Tile {
  instanceId: string;
  memoryId: string;
  title: string;
  iconType: string;
}

const generateShuffledTiles = (): Tile[] => {
  const pairs: Tile[] = [];
  content.activities.memory.items.forEach((item) => {
    pairs.push({
      instanceId: `${item.id}-1`,
      memoryId: item.id,
      title: item.title,
      iconType: item.iconType,
    });
    pairs.push({
      instanceId: `${item.id}-2`,
      memoryId: item.id,
      title: item.title,
      iconType: item.iconType,
    });
  });

  // Fisher-Yates shuffle
  const shuffled = [...pairs];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const MemoryMatch: React.FC<MemoryMatchProps> = ({
  isCompleted,
  onComplete,
  onSoundPaper,
  onSoundChime,
}) => {
  const [tiles, setTiles] = useState<Tile[]>(generateShuffledTiles);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);

  const handleTileClick = (tile: Tile) => {
    if (matchedIds.includes(tile.memoryId)) return;
    if (flippedIds.includes(tile.instanceId)) return;
    if (flippedIds.length === 2) return;

    onSoundPaper?.();
    const nextFlipped = [...flippedIds, tile.instanceId];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      const firstTile = tiles.find((t) => t.instanceId === nextFlipped[0]);
      const secondTile = tiles.find((t) => t.instanceId === nextFlipped[1]);

      if (firstTile && secondTile && firstTile.memoryId === secondTile.memoryId) {
        // Match found!
        const nextMatched = [...matchedIds, firstTile.memoryId];
        setMatchedIds(nextMatched);
        setFlippedIds([]);
        onSoundChime?.();

        if (nextMatched.length === content.activities.memory.items.length) {
          onComplete();
        }
      } else {
        // No match, flip back after brief pause
        setTimeout(() => {
          setFlippedIds([]);
        }, 900);
      }
    }
  };

  const handleReset = () => {
    setFlippedIds([]);
    setMatchedIds([]);
    setTiles(generateShuffledTiles());
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'chai':
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-rb-green" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z" />
            <path d="M16 9h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" />
            <line x1="3" y1="20" x2="19" y2="20" strokeLinecap="round" />
          </svg>
        );
      case 'cassette':
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-rb-green" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <circle cx="8" cy="12" r="2" />
            <circle cx="16" cy="12" r="2" />
            <path d="M8 14h8" />
          </svg>
        );
      case 'bakery':
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-rb-green" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3a7 7 0 0 0-7 7c0 4 3 8 7 11 4-3 7-7 7-11a7 7 0 0 0-7-7z" />
            <circle cx="12" cy="10" r="2" />
          </svg>
        );
      case 'book':
      default:
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-rb-green" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        );
    }
  };

  return (
    <Card
      rotation="0.5deg"
      className="w-full relative overflow-hidden"
    >
      {/* Green Washi Tape */}
      <div
        className="washi-tape -top-2.5 right-12 w-24 pointer-events-none"
        style={{ backgroundColor: 'var(--rb-green-wash)' }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span
            className="text-[11px] font-serif uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-1"
            style={{ backgroundColor: 'var(--rb-green-wash)', color: 'var(--text-ink)' }}
          >
            Green Gouache • Activity 04
          </span>
          <h3 className="font-hand text-[28px] text-ink font-semibold">
            Memory Match
          </h3>
          <p className="font-serif text-xs text-ink-muted">
            Find the matching pairs of little shared moments tucked between these pages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-serif text-ink-muted">
            Pairs found: {matchedIds.length} / 4
          </span>
          {isCompleted && (
            <span className="px-2.5 py-1 rounded-full text-xs font-serif bg-rb-green-wash text-ink border border-rb-green/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rb-green" />
              Green Stamp Painted
            </span>
          )}
        </div>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-2">
        {tiles.map((tile) => {
          const isFlipped = flippedIds.includes(tile.instanceId) || matchedIds.includes(tile.memoryId);
          const isMatched = matchedIds.includes(tile.memoryId);

          return (
            <div
              key={tile.instanceId}
              onClick={() => handleTileClick(tile)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTileClick(tile);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Memory card: ${isFlipped ? tile.title : 'face down'}`}
              className="aspect-square cursor-pointer select-none perspective-1000 tap-target"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`w-full h-full rounded-card border shadow-paper-flat relative p-2 flex flex-col items-center justify-center text-center transition-all ${
                  isMatched
                    ? 'border-rb-green/50 bg-rb-green-wash/40'
                    : 'border-seam hover:border-pencil bg-surface'
                }`}
              >
                {/* Back of Card (Face Down) */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className={`absolute inset-0 rounded-card flex flex-col items-center justify-center p-3 border-2 border-dashed border-pencil/40 bg-surface-warm ${
                    isFlipped ? 'invisible' : 'block'
                  }`}
                >
                  <span className="font-hand text-[22px] text-ink-muted font-bold select-none">
                    P
                  </span>
                  <span className="text-[10px] font-serif text-ink-muted/60 mt-1">
                    memory
                  </span>
                </div>

                {/* Front of Card (Face Up) */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className={`absolute inset-0 rounded-card flex flex-col items-center justify-center p-2 bg-surface ${
                    isFlipped ? 'block' : 'invisible'
                  }`}
                >
                  <div className="p-2 rounded-full bg-rb-green-wash mb-1">
                    {renderIcon(tile.iconType)}
                  </div>
                  <p className="font-serif text-[11px] font-medium text-ink leading-tight line-clamp-2">
                    {tile.title}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {matchedIds.length === 4 && (
        <div className="mt-4 pt-3 border-t border-seam flex items-center justify-between">
          <p className="font-hand text-[19px] text-ink">
            All four memories matched! The green eucalyptus stamp is yours.
          </p>
          <Button
            variant="ghost"
            onClick={handleReset}
            className="text-xs px-3 py-1"
          >
            Play again
          </Button>
        </div>
      )}
    </Card>
  );
};
