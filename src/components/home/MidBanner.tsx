import React from "react";
import Image from "next/image";
import styles from "@/app/page.module.css";

interface MidBannerProps {
  onExplore: (category: string) => void;
}

export default function MidBanner({ onExplore }: MidBannerProps) {
  return (
    <div className={styles.midBanner}>
      <div className={styles.midBannerLeft}>
        <p className={styles.midBannerEye}>🎯 আজকের বিশেষ অফার</p>
        <h3 className={styles.midBannerH}>বিউটি ও পার্সোনাল কেয়ার</h3>
        <p className={styles.midBannerSub}>৳৪৯ থেকে শুরু · সর্বোচ্চ ৪৮% ছাড়</p>
        <button
          className={styles.midBannerCta}
          onClick={() => onExplore("বিউটি ও পার্সোনাল কেয়ার")}
        >
          এখনই দেখুন →
        </button>
      </div>
      <Image
        src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80"
        alt="Beauty and Personal Care Deals"
        width={240}
        height={180}
        className={styles.midBannerImg}
      />
    </div>
  );
}

