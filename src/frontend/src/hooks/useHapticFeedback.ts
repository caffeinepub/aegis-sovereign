export function useHapticFeedback() {
  const vibrate = (pattern: number | number[] = 50) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const light = () => vibrate(10);
  const medium = () => vibrate(50);
  const heavy = () => vibrate([50, 30, 50]);

  return { vibrate, light, medium, heavy };
}
