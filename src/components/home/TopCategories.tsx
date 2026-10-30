"use client";

import React from "react";
import Image from "next/image";
import { TOP_CATS } from "@/data/mockData";
import styles from "@/app/page.module.css";

interface TopCategoriesProps {
  onSelectCategory: (category: string) => void;
}

export default function TopCategories({ onSelectCategory }: TopCategoriesProps) {
  return (
    <div className={styles.catRow}>
      {TOP_CATS.map((c, i) => (
        <button
          key={i}
          className={styles.catBtn}
          onClick={() => onSelectCategory(c.filter)}
        >
          <div className={styles.catRing}>
            <Image
              src={c.img}
              alt={c.name}
              width={100}
              height={100}
              className={styles.catRingImg}
            />
          </div>
          <span className={styles.catBtnLabel}>
            {c.icon} {c.name}
          </span>
        </button>
      ))}
    </div>
  );
}

