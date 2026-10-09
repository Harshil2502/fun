import React from 'react';
import { Button } from '../primitives/Button';

interface HeaderControlsProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  nightMode: boolean;
  onToggleNightMode: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  soundEnabled,
  onToggleSound,
  nightMode,
  onToggleNightMode,
}) => {
  return (
    <header className="w-full flex flex-wrap items-center justify-between gap-2 py-2 px-3 sm:px-4 max-w-4xl mx-auto border-b border-seam/60 text-xs font-serif text-ink-muted">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-2 h-2 rounded-full bg-rb-green inline-block" aria-hidden="true" />
        <span className="tracking-wide text-[11px] sm:text-xs">A quiet journal for Pragya</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Night / Candlelight mode toggle */}
        <Button
          variant="ghost"
          onClick={onToggleNightMode}
          ariaLabel={nightMode ? "Switch to daylight paper" : "Switch to warm candlelit evening mode"}
          className="text-xs px-2.5 py-1.5 tap-target"
        >
          <span className="font-serif">
            {nightMode ? '🕯️ Candlelight' : '☀️ Daylight'}
          </span>
        </Button>

        {/* Audio Toggle (strictly off by default, context created only on user click) */}
        <Button
          variant="ghost"
          onClick={onToggleSound}
          ariaLabel={soundEnabled ? "Mute journal sounds" : "Enable gentle journal sounds"}
          className="text-xs px-2.5 py-1.5 tap-target"
        >
          <span className="font-serif">
            {soundEnabled ? '🔔 Sound: On' : '🔕 Sound: Off'}
          </span>
        </Button>
      </div>
    </header>
  );
};
