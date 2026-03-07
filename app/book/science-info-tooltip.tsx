'use client';

import { useRef, useState, useEffect } from 'react';

const fontColor = '#F9EAD1';

type Props = {
  explanation: string;
  researchTitle: string;
  researchUrl: string;
  /** When 'text', render children as trigger with subtle glow instead of (i) icon */
  trigger?: 'icon' | 'text';
  children?: React.ReactNode;
};

export function ScienceInfoTooltip({ explanation, researchTitle, researchUrl, trigger = 'icon', children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const isTextTrigger = trigger === 'text';

  return (
    <div
      ref={wrapperRef}
      className="relative inline-flex align-middle"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {isTextTrigger ? (
        <span
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen((o) => !o)}
          onKeyDown={(e) => e.key === 'Enter' && setIsOpen((o) => !o)}
          className="cursor-help border-b border-dotted border-white/30 pb-0.5 transition-[text-shadow] duration-200 [text-shadow:0_0_16px_rgba(249,234,209,0.35)] hover:[text-shadow:0_0_28px_rgba(249,234,209,0.55)]"
          style={{ color: fontColor }}
          aria-label="Scientific research about this practice"
          aria-expanded={isOpen}
        >
          {children}
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-current transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black"
          style={{ color: fontColor }}
          aria-label="Scientific research about this practice"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <span className="text-[11px] font-semibold leading-none">i</span>
        </button>
      )}

      {isOpen && (
        <>
          {/* Invisible bridge so cursor can move from icon to tooltip without leaving hover area */}
          <div
            className="absolute right-0 top-full h-2 w-[320px] sm:top-auto sm:bottom-full sm:mb-0 sm:h-2 sm:w-[320px]"
            aria-hidden
          />
          <div
            role="tooltip"
            className="science-tooltip-fade absolute right-0 top-full z-50 mt-2 w-[320px] rounded-lg border border-white/10 p-6 shadow-lg sm:right-0 sm:top-auto sm:bottom-full sm:mb-2 sm:mt-0"
            style={{ backgroundColor: '#0d0d0d' }}
          >
            <p className="whitespace-pre-line text-sm leading-relaxed" style={{ color: fontColor }}>
              {explanation}
            </p>
            {researchUrl && (
              <p className="mt-3 text-xs opacity-80" style={{ color: fontColor }}>
                📚 Research:{' '}
                <a
                  href={researchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 opacity-90 hover:opacity-100"
                  style={{ color: fontColor }}
                >
                  {researchTitle}
                </a>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
