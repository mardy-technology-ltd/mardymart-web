import React from "react";
import styles from "@/app/page.module.css";

interface StarsProps {
  rating: number;
  reviewsCount: number;
}

export default function Stars({ rating, reviewsCount }: StarsProps) {
  const roundedRating = Math.round(rating);

  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill={i <= roundedRating ? "#f59e0b" : "none"}
          stroke="#f59e0b"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className={styles.rCount}>
        {rating} ({reviewsCount})
      </span>
    </div>
  );
}

