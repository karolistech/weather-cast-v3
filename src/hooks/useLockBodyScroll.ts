import { useLayoutEffect } from "react";

export function useScrollLock(locked: boolean): void {
  useLayoutEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const body = document.body;

    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      height: body.style.height,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.height = "100%"; // <-- prevents the safe-area clipping
    body.style.overflow = "hidden";

    return () => {
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.left = previousStyles.left;
      body.style.right = previousStyles.right;
      body.style.width = previousStyles.width;
      body.style.height = previousStyles.height;
      body.style.overflow = previousStyles.overflow;

      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
