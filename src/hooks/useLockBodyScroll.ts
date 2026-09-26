import { useEffect } from "react";

export function useScrollLock(overlayRef: React.RefObject<HTMLElement | null>, locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const preventScroll = (e: TouchEvent) => {
      if (e.target === overlay) {
        e.preventDefault();
      }
    };

    overlay.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      overlay.removeEventListener("touchmove", preventScroll);
    };
  }, [overlayRef, locked]);
}
