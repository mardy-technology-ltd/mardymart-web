"use client";

import React from "react";
import { TIERS } from "@/data/mockData";
import styles from "@/app/page.module.css";

interface PriceTierFilterProps {
  currentTier: number;
  hasActiveFilter: boolean;
  onSelectTier: (tier: number) => void;
  onClearFilters: () => void;
}

export default function PriceTierFilter({
  currentTier,
  hasActiveFilter,
  onSelectTier,
  onClearFilters,
}: PriceTierFilterProps) {
  return (
    <div className={styles.tierWrap} role="region" aria-label="মূল্যভিত্তিক ফিল্টার">
      <div className={styles.tierHeaderRow}>
        <div className={styles.tierTitleGroup}>
          <span className={styles.tierBadge}>বাজেট ফ্রেন্ডলি</span>
          <span className={styles.tierLabel}>দাম অনুযায়ী ফিল্টার করুন:</span>
        </div>
        {hasActiveFilter && (
          <button className={styles.tierClear} onClick={onClearFilters}>
            ✕ সব ফিল্টার মুছুন
          </button>
        )}
      </div>

      <div className={styles.tierRow}>
        {TIERS.map((tier) => {
          const isActive = currentTier === tier.value;
          return (
            <button
              key={tier.value}
              className={`${styles.tierBtn}${isActive ? ` ${styles.tierOn}` : ""}`}
              style={
                isActive
                  ? { background: tier.color, borderColor: tier.color, color: "#ffffff" }
                  : undefined
              }
              onClick={() => onSelectTier(isActive ? 0 : tier.value)}
              aria-pressed={isActive}
            >
              {isActive && <span className={styles.tierActiveCheck}>✓</span>}
              {tier.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
