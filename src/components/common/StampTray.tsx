import React from 'react';
import { StickerStamp } from '../primitives/StickerStamp';

interface StampTrayProps {
  completedActivities: string[];
  sealBroken: boolean;
}

export const StampTray: React.FC<StampTrayProps> = ({
  completedActivities,
  sealBroken,
}) => {
  const stamps = [
    {
      id: 'doodle',
      number: 1,
      label: 'Wildflower',
      color: 'var(--rb-violet)',
      washColor: 'var(--rb-violet-wash)',
      icon: '🌸',
      isCollected: completedActivities.includes('doodle'),
    },
    {
      id: 'stars',
      number: 2,
      label: 'Starlight',
      color: 'var(--rb-indigo)',
      washColor: 'var(--rb-indigo-wash)',
      icon: '✦',
      isCollected: completedActivities.includes('stars'),
    },
    {
      id: 'breathing',
      number: 3,
      label: 'Tide Wave',
      color: 'var(--rb-blue)',
      washColor: 'var(--rb-blue-wash)',
      icon: '〰',
      isCollected: completedActivities.includes('breathing'),
    },
    {
      id: 'memory',
      number: 4,
      label: 'Eucalyptus',
      color: 'var(--rb-green)',
      washColor: 'var(--rb-green-wash)',
      icon: '🌿',
      isCollected: completedActivities.includes('memory'),
    },
    {
      id: 'moodJar',
      number: 5,
      label: 'Crane',
      color: 'var(--rb-yellow)',
      washColor: 'var(--rb-yellow-wash)',
      icon: '🕊',
      isCollected: completedActivities.includes('moodJar'),
    },
    {
      id: 'coupons',
      number: 6,
      label: 'Ticket',
      color: 'var(--rb-orange)',
      washColor: 'var(--rb-orange-wash)',
      icon: '🎟',
      isCollected: completedActivities.includes('coupons'),
    },
    {
      id: 'seal',
      number: 7,
      label: 'Wax Seal',
      color: 'var(--rb-red)',
      washColor: 'var(--rb-red-wash)',
      icon: '💌',
      isCollected: sealBroken,
    },
  ];

  return (
    <section
      aria-label="Collected Keepsake Stamps"
      className="w-full max-w-4xl mx-auto py-6 px-4 overflow-hidden"
    >
      <div className="border border-dashed border-pencil rounded-card p-4 bg-surface w-full max-w-full overflow-hidden">
        <div className="flex items-center justify-between mb-3 text-xs font-serif text-ink-muted">
          <span className="uppercase tracking-widest">
            Pragya&apos;s Stamp Pocket
          </span>
          <span>
            {stamps.filter((s) => s.isCollected).length} of 7 stamps collected
          </span>
        </div>

        <div className="w-full flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {stamps.map((stamp) => (
            <StickerStamp
              key={stamp.id}
              number={stamp.number}
              label={stamp.label}
              color={stamp.color}
              washColor={stamp.washColor}
              icon={<span className="text-lg">{stamp.icon}</span>}
              isCollected={stamp.isCollected}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
