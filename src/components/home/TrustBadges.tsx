import React from "react";
import styles from "@/app/page.module.css";

export default function TrustBadges() {
  const badges = [
    { icon: "🚚", title: "ফ্রি ডেলিভারি", sub: "৳৫০০+ অর্ডারে" },
    { icon: "↩", title: "সহজ রিটার্ন", sub: "৭ দিনের মধ্যে" },
    { icon: "🔒", title: "নিরাপদ পেমেন্ট", sub: "১০০% সুরক্ষিত" },
    { icon: "✅", title: "মানসম্পন্ন পণ্য", sub: "গ্যারান্টিড কোয়ালিটি" },
  ];

  return (
    <div className={styles.trust}>
      {badges.map((b, i) => (
        <div key={i} className={styles.trustBadge}>
          <span className={styles.trustIcon}>{b.icon}</span>
          <div>
            <p className={styles.trustT}>{b.title}</p>
            <p className={styles.trustS}>{b.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

