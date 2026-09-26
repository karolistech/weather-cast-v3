import { useLayoutEffect } from "react";

export function useScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) {
      return;
    }

    const { body } = document;
    const scrollY = window.scrollY;

    const originalPosition = body.style.position;
    const originalTop = body.style.top;
    const originalWidth = body.style.width;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.position = originalPosition;
      body.style.top = originalTop;
      body.style.width = originalWidth;

      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
