import { useEffect, useRef } from "react";

export function useKeyEvent(key: string[], callback: Function) {
  const ref = useRef<Function>(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (key.includes(event.key)) {
        ref.current(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key]);
}
