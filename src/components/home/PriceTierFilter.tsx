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
    <div className={styles.tierWrap}>
      <span className={styles.tierLabel}>দাম অনুযায়ী:</span>
      <div className={styles.tierRow}>
        {TIERS.map((tier) => {
          const isActive = currentTier === tier.value;
          return (
            <button
              key={tier.value}
              className={`${styles.tierBtn}${isActive ? ` ${styles.tierOn}` : ""}`}
              style={
                isActive
                  ? { background: tier.color, borderColor: tier.color }
                  : undefined
              }
              onClick={() => onSelectTier(isActive ? 0 : tier.value)}
            >
              {tier.label}
            </button>
          );
        })}
      </div>
      {hasActiveFilter && (
        <button className={styles.tierClear} onClick={onClearFilters}>
          ✕ ফিল্টার সরান
        </button>
      )}
    </div>
  );
}

