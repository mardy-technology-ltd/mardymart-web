import React from "react";
import Link from "next/link";
import styles from "@/app/page.module.css";

export default function AnnouncementBar() {
  return (
    <div className={styles.announce}>
      <div className={styles.announceInner}>
        <span>🎉 MardyMart-এ স্বাগতম! ৳৫০০+ অর্ডারে ফ্রি ডেলিভারি।</span>
        <div className={styles.announceRight}>
          <Link href="#">📍 সারাদেশে ডেলিভারি</Link>
          <Link href="#">🚚 অর্ডার ট্র্যাক</Link>
          <Link href="#">🏷 সব অফার</Link>
        </div>
      </div>
    </div>
  );
}

