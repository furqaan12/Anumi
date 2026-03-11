'use client';

import { useEffect } from 'react';

/**
 * Catches unhandled "Failed to fetch" rejections (e.g. from server action runtime)
 * so they don't trigger the Next.js error overlay.
 */
export function RejectionHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const msg = reason instanceof Error ? reason.message : String(reason);
      const isFetchFailure =
        msg === 'Failed to fetch' ||
        (reason instanceof TypeError && msg?.includes('fetch'));
      if (isFetchFailure) {
        event.preventDefault();
        event.stopPropagation();
        console.warn('[Anumi] Suppressed fetch failure:', msg);
      }
    };
    window.addEventListener('unhandledrejection', onRejection, true);
    return () => window.removeEventListener('unhandledrejection', onRejection, true);
  }, []);

  return <>{children}</>;
}
