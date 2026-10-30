"use client";

import { useState, useEffect } from "react";

interface CountdownTime {
  h: number;
  m: number;
  s: number;
}

export function useCountdown(initialHours = 6): CountdownTime {
  const [secondsRemaining, setSecondsRemaining] = useState(initialHours * 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(secondsRemaining / 3600);
  const m = Math.floor((secondsRemaining % 3600) / 60);
  const s = secondsRemaining % 60;

  return { h, m, s };
}
