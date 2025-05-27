import { useEffect, useRef } from "react";

import type { KeyboardEventKey, KeyEventCallback } from "./types";

export function useKeyEvent(key: KeyboardEventKey[], callback: KeyEventCallback) {
  const ref = useRef<KeyEventCallback>(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (key.includes(event.key as KeyboardEventKey)) {
        ref.current(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key]);
}
