import { useEffect } from 'react';

export function useKeyboardShortcut(keys: string[], callback: (e: KeyboardEvent) => void) {
  useEffect(() => {
    const pressedKeys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      pressedKeys.add(e.key);

      const allKeysPressed = keys.every(key => {
        if (key === 'Control') return e.ctrlKey || e.metaKey;
        if (key === 'Shift') return e.shiftKey;
        if (key === 'Alt') return e.altKey;
        return pressedKeys.has(key) || pressedKeys.has(key.toLowerCase());
      });

      if (allKeysPressed) {
        e.preventDefault();
        callback(e);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keys, callback]);
}
