import React, { useState } from 'react';
import { PaperGrain } from './components/primitives/PaperGrain';
import { HeaderControls } from './components/common/HeaderControls';
import { Cover } from './components/common/Cover';
import { RainbowArc } from './components/common/RainbowArc';
import { ScrapbookSection } from './components/features/scrapbook/ScrapbookSection';
import { DoodlePad } from './features/doodle-pad/DoodlePad';
import { CatchStars } from './features/catch-stars/CatchStars';
import { BreathingBubble } from './features/breathing-bubble/BreathingBubble';
import { MemoryMatch } from './features/memory-match/MemoryMatch';
import { MoodJar } from './features/mood-jar/MoodJar';
import { DateCoupons } from './features/date-coupons/DateCoupons';
import { SealedEnvelope } from './features/sealed-envelope/SealedEnvelope';
import { StampTray } from './components/common/StampTray';
import { EasterEggs } from './components/common/EasterEggs';
import { useProgress } from './hooks/useProgress';
import { useAudio } from './hooks/useAudio';
import { content } from './content/content';

export const App: React.FC = () => {
  const [isJournalOpen, setIsJournalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('open') === 'true';
    }
    return false;
  });

  const {
    state,
    completeActivity,
    breakSeal,
    redeemCoupon,
    saveDoodle,
    toggleSound,
    toggleNightMode,
    resetAll,
  } = useProgress();

  // Test mode helpers via URL params for pass verification
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('demo') === 'unlocked' && state.completedActivities.length < 6) {
        ['doodle', 'stars', 'breathing', 'memory', 'moodJar', 'coupons'].forEach(completeActivity);
      }
      if (params.get('demo') === 'revealed' && !state.sealBroken) {
        ['doodle', 'stars', 'breathing', 'memory', 'moodJar', 'coupons'].forEach(completeActivity);
        breakSeal();
      }
    }
  }, [completeActivity, breakSeal, state.completedActivities.length, state.sealBroken]);

  const onlyEnvelope = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('only') === 'envelope';

  const {
    playPaperRustle,
    playChime,
    playWaxSnap,
    playPencil,
  } = useAudio(state.soundEnabled);

  const handleOpenCover = () => {
    setIsJournalOpen(true);
    playPaperRustle();
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative w-full max-w-full overflow-x-hidden ${
        state.nightMode
          ? 'bg-[#EFE8DC] text-[#241F1A]'
          : 'bg-canvas text-ink'
      }`}
    >
      {/* Fixed Pre-rendered Grain Layer */}
      <PaperGrain />

      {/* Opening Gesture Cover (if not yet opened in session) */}
      <Cover
        recipientName={content.recipient.name}
        isOpen={isJournalOpen}
        onOpen={handleOpenCover}
      />

      {/* Top Header Bar */}
      <HeaderControls
        soundEnabled={state.soundEnabled}
        onToggleSound={toggleSound}
        nightMode={state.nightMode}
        onToggleNightMode={toggleNightMode}
      />

      <main className="w-full max-w-full overflow-x-hidden pb-20">
        {/* Pinned Rainbow Arc Progression */}
        <RainbowArc
          completedActivities={state.completedActivities}
          sealBroken={state.sealBroken}
        />

        {onlyEnvelope ? (
          <div className="pt-4">
            <SealedEnvelope
              completedCount={state.completedActivities.length}
              isUnlocked={state.envelopeUnlocked || state.completedActivities.length >= 6}
              sealBroken={state.sealBroken}
              onBreakSeal={breakSeal}
              onSoundWax={playWaxSnap}
              onSoundPaper={playPaperRustle}
            />
            <StampTray
              completedActivities={state.completedActivities}
              sealBroken={state.sealBroken}
            />
          </div>
        ) : (
          <>
            {/* Chapter 1: The Scrapbook */}
            <ScrapbookSection onPaperRustle={playPaperRustle} />

        {/* Chapter 2: The Six Cozy Activities */}
        <section
          aria-label="Cozy Keepsake Activities"
          className="w-full max-w-4xl mx-auto py-6 px-4 space-y-12"
        >
          <div className="text-center mb-4">
            <span className="text-xs font-serif uppercase tracking-widest text-ink-muted">
              Chapter Two
            </span>
            <h2 className="font-hand text-[34px] sm:text-[38px] text-ink font-semibold mt-1">
              Quiet Moments Together
            </h2>
            <p className="font-serif text-sm text-ink-muted max-w-md mx-auto">
              Six small activities, each offering one hand-drawn gouache stamp for Pragya&apos;s keepsake.
            </p>
          </div>

          {/* Activity 1: Doodle Pad (Violet) */}
          <DoodlePad
            isCompleted={state.completedActivities.includes('doodle')}
            onComplete={() => completeActivity('doodle')}
            onSaveDoodle={saveDoodle}
            savedDoodle={state.doodleData}
            onSoundPencil={playPencil}
            onSoundChime={playChime}
          />

          {/* Activity 2: Catch the Stars (Indigo) */}
          <CatchStars
            isCompleted={state.completedActivities.includes('stars')}
            onComplete={() => completeActivity('stars')}
            onSoundChime={playChime}
          />

          {/* Activity 3: Breathing Bubble (Blue) */}
          <BreathingBubble
            isCompleted={state.completedActivities.includes('breathing')}
            onComplete={() => completeActivity('breathing')}
            onSoundChime={playChime}
          />

          {/* Activity 4: Memory Match (Green) */}
          <MemoryMatch
            isCompleted={state.completedActivities.includes('memory')}
            onComplete={() => completeActivity('memory')}
            onSoundPaper={playPaperRustle}
            onSoundChime={playChime}
          />

          {/* Activity 5: Mood Jar (Yellow) */}
          <MoodJar
            isCompleted={state.completedActivities.includes('moodJar')}
            onComplete={() => completeActivity('moodJar')}
            onSoundPaper={playPaperRustle}
            onSoundChime={playChime}
          />

          {/* Activity 6: Date Coupons (Orange) */}
          <DateCoupons
            isCompleted={state.completedActivities.includes('coupons')}
            redeemedCoupons={state.redeemedCoupons}
            onRedeemCoupon={redeemCoupon}
            onSoundPaper={playPaperRustle}
            onSoundChime={playChime}
          />
        </section>

        {/* Chapter 3: The Sealed Envelope (Red) */}
        <SealedEnvelope
          completedCount={state.completedActivities.length}
          isUnlocked={state.envelopeUnlocked || state.completedActivities.length >= 6}
          sealBroken={state.sealBroken}
          onBreakSeal={breakSeal}
          onSoundWax={playWaxSnap}
          onSoundPaper={playPaperRustle}
        />

        {/* Stamp Collection Tray */}
        <StampTray
          completedActivities={state.completedActivities}
          sealBroken={state.sealBroken}
        />

        {/* Easter Eggs Doodles */}
        <EasterEggs
          nightMode={state.nightMode}
          onToggleNightMode={toggleNightMode}
        />
        </>
        )}

        {/* Quiet Journal Sign-Off Footer */}
        <footer className="w-full max-w-4xl mx-auto pt-8 pb-12 px-4 text-center font-serif text-xs text-ink-muted">
          <p className="font-hand text-[22px] text-ink mb-1">
            Handcrafted with patience for Pragya
          </p>
          <p className="text-[12px] text-ink-muted mb-4">
            A private keepsake made of warm paper, walnut ink, and seven colours.
          </p>
          <button
            type="button"
            onClick={resetAll}
            className="text-[11px] text-ink-muted/60 hover:text-ink underline cursor-pointer"
          >
            Reset journal progress
          </button>
        </footer>
      </main>
    </div>
  );
};

export default App;
