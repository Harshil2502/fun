import React from 'react';
import { motion } from 'framer-motion';

interface RainbowArcProps {
  completedActivities: string[];
  sealBroken: boolean;
}

interface BandInfo {
  id: string;
  name: string;
  color: string;
  feature: string;
  radius: number;
}

const BANDS: BandInfo[] = [
  { id: 'doodle', name: 'Violet', color: '#7A5C9E', feature: 'Doodle Pad', radius: 140 },
  { id: 'stars', name: 'Indigo', color: '#4B5A9B', feature: 'Catch the Stars', radius: 126 },
  { id: 'breathing', name: 'Blue', color: '#4F86B5', feature: 'Breathing Bubble', radius: 112 },
  { id: 'memory', name: 'Green', color: '#5E9366', feature: 'Memory Match', radius: 98 },
  { id: 'moodJar', name: 'Yellow', color: '#E3B23C', feature: 'Mood Jar', radius: 84 },
  { id: 'coupons', name: 'Orange', color: '#E58A3F', feature: 'Date Coupons', radius: 70 },
  { id: 'seal', name: 'Red', color: '#C9473A', feature: 'Wax Seal & Letter', radius: 56 },
];

export const RainbowArc: React.FC<RainbowArcProps> = ({
  completedActivities,
  sealBroken,
}) => {
  const isBandActive = (bandId: string) => {
    if (bandId === 'seal') return sealBroken;
    return completedActivities.includes(bandId);
  };

  const completedCount = BANDS.filter((b) => isBandActive(b.id)).length;
  const totalCount = BANDS.length;

  return (
    <section
      aria-label="Handmade Rainbow Arc Progress"
      className="w-full max-w-full overflow-x-hidden flex flex-col items-center justify-center pt-4 pb-6 px-4"
    >
      {/* Accessible live status readout */}
      <div
        role="status"
        aria-live="polite"
        className="text-center mb-3 max-w-sm px-2 mx-auto"
      >
        <p className="font-hand text-[19px] sm:text-[20px] text-ink font-semibold tracking-wide leading-snug">
          {completedCount === 0 && "Seven quiet colours waiting to be found..."}
          {completedCount > 0 && completedCount < totalCount && (
            <span>
              {completedCount} of {totalCount} colours painted into Pragya&apos;s rainbow
            </span>
          )}
          {completedCount === totalCount && "The full rainbow is painted. The keepsake is complete."}
        </p>
        <p className="font-serif text-xs text-ink-muted mt-0.5">
          Each little moment adds one hand-drawn band of gouache
        </p>
      </div>

      {/* Hand-drawn SVG Arc */}
      <div className="relative w-full max-w-[300px] sm:max-w-[380px] aspect-[2/1] flex items-end justify-center overflow-visible mx-auto">
        <svg
          viewBox="0 0 320 160"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label={`Progress rainbow arc: ${completedCount} of ${totalCount} colours painted`}
        >
          <defs>
            {/* Filter for organic hand-drawn roughness on the gouache stroke */}
            <filter id="hand-stroke-roughness" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {BANDS.map((band) => {
            const active = isBandActive(band.id);
            // Arc path from left (160 - r, 160) to right (160 + r, 160)
            const r = band.radius;
            const startX = 160 - r;
            const endX = 160 + r;
            const pathData = `M ${startX} 155 A ${r} ${r} 0 0 1 ${endX} 155`;

            return (
              <g key={band.id} aria-label={`${band.name} band: ${band.feature} (${active ? 'painted' : 'unpainted'})`}>
                {/* Background faint pencil guide line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="var(--border-pencil)"
                  strokeWidth="6"
                  strokeDasharray="2 4"
                  strokeLinecap="round"
                  opacity={active ? 0.2 : 0.7}
                />

                {/* Active Gouache Paint Stroke */}
                {active && (
                  <motion.path
                    d={pathData}
                    fill="none"
                    stroke={band.color}
                    strokeWidth="7"
                    strokeLinecap="round"
                    filter="url(#hand-stroke-roughness)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.95 }}
                    transition={{
                      pathLength: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.4 },
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* Center decorative base marker */}
          <circle cx="160" cy="155" r="3" fill="var(--text-ink-muted)" opacity="0.6" />
        </svg>
      </div>

      {/* Discrete band chips for quick visual reference */}
      <div className="w-full max-w-[320px] sm:max-w-md flex flex-wrap items-center justify-center gap-1.5 mt-3 mx-auto px-2">
        {BANDS.map((band) => {
          const active = isBandActive(band.id);
          return (
            <div
              key={band.id}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-serif transition-all ${
                active
                  ? 'border-transparent shadow-paper-flat text-ink'
                  : 'border-seam text-ink-muted/70 bg-transparent'
              }`}
              style={{
                backgroundColor: active ? `${band.color}25` : 'transparent',
              }}
              title={`${band.name}: ${band.feature}`}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{
                  backgroundColor: active ? band.color : 'var(--border-pencil)',
                }}
              />
              <span className="font-medium">{band.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
