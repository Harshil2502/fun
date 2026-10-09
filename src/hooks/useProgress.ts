import { useState, useEffect, useCallback } from 'react';

export interface ProgressState {
  completedActivities: string[]; // ['doodle', 'stars', 'breathing', 'memory', 'moodJar', 'coupons']
  envelopeUnlocked: boolean;
  sealBroken: boolean;
  redeemedCoupons: string[];
  doodleData: string | null;
  soundEnabled: boolean;
  nightMode: boolean;
}

const STORAGE_KEY = 'pragya_journal_progress_v1';

const defaultState: ProgressState = {
  completedActivities: [],
  envelopeUnlocked: false,
  sealBroken: false,
  redeemedCoupons: [],
  doodleData: null,
  soundEnabled: false,
  nightMode: false,
};

// In-memory fallback if both localStorage & sessionStorage are blocked
let memoryFallbackStore: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const val = window.localStorage.getItem(key);
      if (val !== null) return val;
    }
  } catch {
    // localStorage blocked
  }

  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const val = window.sessionStorage.getItem(key);
      if (val !== null) return val;
    }
  } catch {
    // sessionStorage blocked
  }

  return memoryFallbackStore[key] || null;
}

function safeSetItem(key: string, value: string): void {
  let stored = false;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
      stored = true;
    }
  } catch {
    // localStorage blocked
  }

  if (!stored) {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
        stored = true;
      }
    } catch {
      // sessionStorage blocked
    }
  }

  // Always keep in-memory backup
  memoryFallbackStore[key] = value;
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => {
    const raw = safeGetItem(STORAGE_KEY);
    if (!raw) return defaultState;
    try {
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    safeSetItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const completeActivity = useCallback((activityId: string) => {
    setState((prev) => {
      if (prev.completedActivities.includes(activityId)) return prev;
      const nextCompleted = [...prev.completedActivities, activityId];
      const isReadyToUnlock = nextCompleted.length >= 6;
      return {
        ...prev,
        completedActivities: nextCompleted,
        envelopeUnlocked: isReadyToUnlock || prev.envelopeUnlocked,
      };
    });
  }, []);

  const breakSeal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sealBroken: true,
    }));
  }, []);

  const redeemCoupon = useCallback((couponId: string) => {
    setState((prev) => {
      const alreadyRedeemed = prev.redeemedCoupons.includes(couponId);
      const nextRedeemed = alreadyRedeemed
        ? prev.redeemedCoupons.filter((id) => id !== couponId)
        : [...prev.redeemedCoupons, couponId];
      
      // Redeeming a coupon also counts as completing the coupon activity
      const nextCompleted = prev.completedActivities.includes('coupons')
        ? prev.completedActivities
        : [...prev.completedActivities, 'coupons'];

      return {
        ...prev,
        redeemedCoupons: nextRedeemed,
        completedActivities: nextCompleted,
        envelopeUnlocked: nextCompleted.length >= 6 || prev.envelopeUnlocked,
      };
    });
  }, []);

  const saveDoodle = useCallback((dataUrl: string) => {
    setState((prev) => {
      const nextCompleted = prev.completedActivities.includes('doodle')
        ? prev.completedActivities
        : [...prev.completedActivities, 'doodle'];
      return {
        ...prev,
        doodleData: dataUrl,
        completedActivities: nextCompleted,
        envelopeUnlocked: nextCompleted.length >= 6 || prev.envelopeUnlocked,
      };
    });
  }, []);

  const toggleSound = useCallback(() => {
    setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const toggleNightMode = useCallback(() => {
    setState((prev) => ({ ...prev, nightMode: !prev.nightMode }));
  }, []);

  const resetAll = useCallback(() => {
    setState(defaultState);
    safeSetItem(STORAGE_KEY, JSON.stringify(defaultState));
  }, []);

  return {
    state,
    completeActivity,
    breakSeal,
    redeemCoupon,
    saveDoodle,
    toggleSound,
    toggleNightMode,
    resetAll,
  };
}
