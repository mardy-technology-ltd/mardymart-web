"use client";

import React from "react";
import { NAV_ITEMS } from "@/data/mockData";
import styles from "@/app/page.module.css";

interface NavigationProps {
  currentFilter: string;
  onSelectCategory: (filter: string) => void;
}

export default function Navigation({ currentFilter, onSelectCategory }: NavigationProps) {
  return (
    <nav className={styles.nav} aria-label="ক্যাটাগরি নেভিগেশন">
      <div className={styles.navInner}>
        {NAV_ITEMS.map((item, idx) => (
          <button
            key={idx}
            className={`${styles.navBtn}${
              currentFilter === item.filter ? ` ${styles.navBtnActive}` : ""
            }`}
            onClick={() => onSelectCategory(item.filter)}
          >
            {item.label}
            {item.filter !== "all" && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

