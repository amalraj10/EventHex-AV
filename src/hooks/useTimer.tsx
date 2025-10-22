import { useState, useEffect, useCallback } from "react";

interface UseTimerReturn {
  timer: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  isRunning: boolean;
}

export const useTimer = (): UseTimerReturn => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimer(0);
  }, []);

  return {
    timer,
    startTimer,
    pauseTimer,
    resetTimer,
    isRunning,
  };
};