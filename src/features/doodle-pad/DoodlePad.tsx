import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/primitives/Button';
import { Card } from '../../components/primitives/Card';

interface DoodlePadProps {
  isCompleted: boolean;
  onComplete: () => void;
  onSaveDoodle: (dataUrl: string) => void;
  savedDoodle: string | null;
  onSoundPencil?: () => void;
  onSoundChime?: () => void;
}

const PALETTE = [
  { name: 'Walnut Ink', color: '#2C2621' },
  { name: 'Violet Gouache', color: '#7A5C9E' },
  { name: 'Sage Green', color: '#5E9366' },
  { name: 'Dusk Slate', color: '#4F86B5' },
  { name: 'Warm Terracotta', color: '#C9473A' },
];

export const DoodlePad: React.FC<DoodlePadProps> = ({
  isCompleted,
  onComplete,
  onSaveDoodle,
  savedDoodle,
  onSoundPencil,
  onSoundChime,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentColor, setCurrentColor] = useState(PALETTE[1].color); // Violet default
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  // Setup canvas with high-DPI scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial warm cotton paper fill
    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // If there is an existing saved doodle, draw it
    if (savedDoodle) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = savedDoodle;
      setHasDrawn(true);
    }
  }, [savedDoodle]);

  const saveHistoryStep = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    try {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory((prev) => [...prev.slice(-10), data]);
    } catch {
      // ignore
    }
  }, []);

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveHistoryStep();
    setIsDrawing(true);
    setHasDrawn(true);
    onSoundPencil?.();

    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prevStep = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    ctx.putImageData(prevStep, 0, 0);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveHistoryStep();
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);
  };

  // Keyboard-accessible "Stamp a floral doodle" option (Requirement 4)
  const handleStampDoodle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveHistoryStep();
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentColor + '22';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';

    // Draw hand-drawn wildflower doodle
    ctx.beginPath();
    ctx.moveTo(cx, cy + 40);
    ctx.quadraticCurveTo(cx - 10, cy + 10, cx, cy - 20);
    ctx.stroke();

    // Leaves
    ctx.beginPath();
    ctx.ellipse(cx - 12, cy + 15, 12, 6, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(cx + 12, cy, 12, 6, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Petals
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5;
      const px = cx + Math.cos(angle) * 18;
      const py = cy - 20 + Math.sin(angle) * 18;
      ctx.beginPath();
      ctx.arc(px, py, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Center
    ctx.beginPath();
    ctx.arc(cx, cy - 20, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#E3B23C';
    ctx.fill();
    ctx.stroke();

    setHasDrawn(true);
    onSoundChime?.();

    // Trigger completion
    const dataUrl = canvas.toDataURL('image/png');
    onSaveDoodle(dataUrl);
    onComplete();
  };

  const handleKeepDoodle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSaveDoodle(dataUrl);
    onComplete();
    onSoundChime?.();
  };

  return (
    <Card
      rotation="-0.5deg"
      className="w-full relative overflow-hidden"
    >
      {/* Violet Washi Tape Accent */}
      <div
        className="washi-tape -top-2.5 left-8 w-24 pointer-events-none"
        style={{ backgroundColor: 'var(--rb-violet-wash)' }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span
            className="text-[11px] font-serif uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-1"
            style={{ backgroundColor: 'var(--rb-violet-wash)', color: 'var(--text-ink)' }}
          >
            Violet Gouache • Activity 01
          </span>
          <h3 className="font-hand text-[28px] text-ink font-semibold">
            The Little Doodle Pad
          </h3>
          <p className="font-serif text-xs text-ink-muted">
            Sketch a little idea or press the floral stamp to tuck a doodle onto the page.
          </p>
        </div>

        {isCompleted && (
          <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-serif bg-rb-violet-wash text-ink border border-rb-violet/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rb-violet" />
            Violet Stamp Painted
          </span>
        )}
      </div>

      {/* Palette Swatches */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-serif text-ink-muted mr-1">Ink:</span>
        {PALETTE.map((item) => (
          <button
            key={item.color}
            type="button"
            onClick={() => setCurrentColor(item.color)}
            className={`tap-target w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
              currentColor === item.color
                ? 'scale-110 border-ink shadow-paper-flat'
                : 'border-transparent hover:scale-105'
            }`}
            style={{ backgroundColor: item.color }}
            aria-label={`Select ${item.name}`}
          />
        ))}
      </div>

      {/* Drawing Canvas */}
      <div className="w-full h-64 sm:h-72 border border-seam rounded-note overflow-hidden touch-none relative shadow-inner bg-surface">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair"
          aria-label="Drawing canvas for Pragya's doodle"
        />

        {!hasDrawn && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center p-4">
            <p className="font-hand text-[20px] text-ink-muted/50 select-none">
              draw here, or use the floral stamp button below...
            </p>
          </div>
        )}
      </div>

      {/* Canvas Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-2 border-t border-seam/60">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={handleUndo}
            disabled={history.length === 0}
            ariaLabel="Undo last stroke"
            className="text-xs px-3 py-1.5"
          >
            Undo
          </Button>
          <Button
            variant="ghost"
            onClick={handleClear}
            disabled={!hasDrawn}
            ariaLabel="Clear doodle canvas"
            className="text-xs px-3 py-1.5"
          >
            Clear
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Accessible floral stamp button */}
          <Button
            variant="wash"
            washColor="var(--rb-violet-wash)"
            onClick={handleStampDoodle}
            ariaLabel="Stamp a hand-drawn floral doodle onto the page"
            className="text-xs px-3.5 py-1.5"
          >
            🌸 Stamp a floral doodle
          </Button>

          {/* Save / Pin button */}
          <Button
            variant="primary"
            onClick={handleKeepDoodle}
            disabled={!hasDrawn}
            ariaLabel="Save doodle and complete violet activity"
            className="text-xs px-4 py-1.5"
          >
            {isCompleted ? '✓ Doodle Saved' : 'Keep this doodle'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
