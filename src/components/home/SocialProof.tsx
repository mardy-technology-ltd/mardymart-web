import React from "react";
import Image from "next/image";
import { REVIEWS } from "@/data/mockData";
import Stars from "@/components/common/Stars";
import styles from "@/app/page.module.css";

export default function SocialProof() {
  return (
    <section className={styles.socialProofSec} aria-label="গ্রাহকদের মতামত">
      <div className={styles.socialProofHead}>
        <span className={styles.socialProofEyebrow}>⭐ কাস্টমার রিভিউ ও মতামত</span>
        <h2 className={styles.socialProofTitle}>
          কেন মানুষ <span className={styles.secAccent}>MardyMart</span> ভালোবাসে?
        </h2>
        <p className={styles.socialProofSub}>
          সারাদেশের ১০,০০০+ সন্তুষ্ট গ্রাহকের আসল অভিজ্ঞতা ও ভেরিফায়েড রিভিউ
        </p>
      </div>

      <div className={styles.reviewsGrid}>
        {REVIEWS.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewCardTop}>
              <div className={styles.reviewUser}>
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={46}
                  height={46}
                  className={styles.reviewAvatar}
                />
                <div>
                  <h4 className={styles.reviewName}>{review.name}</h4>
                  <p className={styles.reviewLoc}>{review.location}</p>
                </div>
              </div>
              {review.verified && (
                <span className={styles.verifiedBadge}>
                  ✓ ভেরিফায়েড ক্রেতা
                </span>
              )}
            </div>

            <div className={styles.reviewRatingRow}>
              <Stars rating={review.rating} reviewsCount={5} />
              <span className={styles.reviewDate}>{review.date}</span>
            </div>

            <p className={styles.reviewComment}>&ldquo;{review.comment}&rdquo;</p>

            <div className={styles.reviewProductTag}>
              <span>পণ্য:</span> {review.productName}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

