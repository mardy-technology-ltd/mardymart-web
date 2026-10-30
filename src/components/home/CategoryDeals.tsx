"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BRAND_DEALS } from "@/data/mockData";
import styles from "@/app/page.module.css";

interface CategoryDealsProps {
  onSelectCategory: (category: string) => void;
}

export default function CategoryDeals({ onSelectCategory }: CategoryDealsProps) {
  const [brandDot, setBrandDot] = useState(0);

  return (
    <>
      <div className={styles.brandRow}>
        {BRAND_DEALS.map((b, i) => (
          <button
            key={i}
            className={styles.brandTile}
            style={{ background: b.bg }}
            onClick={() => onSelectCategory(b.filter)}
          >
            <div className={styles.brandTileTop}>
              <span className={styles.brandTileLbl} style={{ color: b.tc }}>
                {b.label}
              </span>
              <span
                className={styles.brandTileSub}
                style={{ color: i === 1 ? "#333" : `${b.tc}cc` }}
              >
                {b.sub}
              </span>
            </div>
            <Image
              src={b.img}
              alt={b.label}
              width={160}
              height={160}
              className={styles.brandTileImg}
            />
          </button>
        ))}
      </div>
      <div className={styles.dotRow}>
        {[0, 1, 2, 3, 4].map((d) => (
          <button
            key={d}
            onClick={() => setBrandDot(d)}
            className={`${styles.dot}${d === brandDot ? ` ${styles.dotOn}` : ""}`}
            aria-label={`পৃষ্ঠা ${d + 1}`}
          />
        ))}
      </div>
    </>
  );
}

