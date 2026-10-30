"use client";

import React from "react";
import { useCountdown } from "@/hooks/useCountdown";
import styles from "@/app/page.module.css";

interface FlashSaleBarProps {
  onViewAllOffers: () => void;
}

export default function FlashSaleBar({ onViewAllOffers }: FlashSaleBarProps) {
  const countdown = useCountdown(6);

  return (
    <div className={styles.flashBar}>
      <div className={styles.flashLeft}>
        <span className={styles.flashFire}>⚡</span>
        <span className={styles.flashLabel}>ফ্ল্যাশ সেল চলছে!</span>
      </div>

      <div className={styles.flashTimer}>
        <span>শেষ হবে:</span>
        {[
          { v: countdown.h, u: "ঘন্টা" },
          { v: countdown.m, u: "মিনিট" },
          { v: countdown.s, u: "সেকেন্ড" },
        ].map(({ v, u }, i) => (
          <span key={i} className={styles.flashTile}>
            <strong>{String(v).padStart(2, "0")}</strong>
            <small>{u}</small>
          </span>
        ))}
      </div>

      <button className={styles.flashCta} onClick={onViewAllOffers}>
        সব অফার →
      </button>
    </div>
  );
}
