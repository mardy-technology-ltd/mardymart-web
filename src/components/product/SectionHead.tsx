import React from "react";
import styles from "@/app/page.module.css";

interface SectionHeadProps {
  title: string;
  accent: string;
  count?: number;
  onViewAll?: () => void;
}

export default function SectionHead({ title, accent, count, onViewAll }: SectionHeadProps) {
  return (
    <div className={styles.secHead}>
      <div className={styles.secHeadLeft}>
        <h2 className={styles.secTitle}>
          {title} <span className={styles.secAccent}>{accent}</span>
        </h2>
        {count != null && <span className={styles.secCount}>{count}টি পণ্য</span>}
      </div>
      {onViewAll && (
        <button className={styles.secViewAll} onClick={onViewAll}>
          সব দেখুন{" "}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  );
}

