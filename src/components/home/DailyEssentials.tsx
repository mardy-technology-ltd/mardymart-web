import React from "react";
import Image from "next/image";
import { ESSENTIALS } from "@/data/mockData";
import styles from "@/app/page.module.css";

interface DailyEssentialsProps {
  onSelectCategory: (category: string) => void;
}

export default function DailyEssentials({ onSelectCategory }: DailyEssentialsProps) {
  return (
    <div className={styles.essRow}>
      {ESSENTIALS.map((e, i) => (
        <button
          key={i}
          className={styles.essBtn}
          onClick={() => onSelectCategory(e.filter)}
        >
          <div className={styles.essImgBox}>
            <Image
              src={e.img}
              alt={e.name}
              width={160}
              height={140}
              className={styles.essImg}
            />
            <div className={styles.essOverlay} />
          </div>
          <p className={styles.essName}>{e.name}</p>
          <p className={styles.essOff}>{e.off}</p>
        </button>
      ))}
    </div>
  );
}

