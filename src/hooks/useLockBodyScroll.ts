import { useLayoutEffect } from "react";

/**
 * Locks body scroll while `locked` is true, including on mobile
 * touch devices where `overflow: hidden` alone doesn't work.
 * Preserves and restores scroll position on unlock.
 */
export function useLockBodyScroll(locked: boolean): void {
  useLayoutEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const body = document.body;

    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.width = previousStyles.width;
      body.style.overflow = previousStyles.overflow;

      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
