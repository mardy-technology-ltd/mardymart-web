"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import Stars from "@/components/common/Stars";
import styles from "@/app/page.module.css";

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart } = useShop();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuickView();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeQuickView]);

  if (!quickViewProduct) return null;

  const discountPercent = Math.round(
    ((quickViewProduct.oldPrice - quickViewProduct.price) / quickViewProduct.oldPrice) * 100
  );

  const handleAdd = () => {
    addToCart(quickViewProduct, qty);
    closeQuickView();
  };

  return (
    <div
      className={styles.quickOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeQuickView();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="পণ্য প্রিভিউ"
    >
      <div className={styles.quickModal}>
        <button
          className={styles.quickClose}
          onClick={closeQuickView}
          aria-label="বন্ধ করুন"
        >
          ✕
        </button>

        <div className={styles.quickGrid}>
          <div className={styles.quickImgBox}>
            <Image
              src={quickViewProduct.image}
              alt={quickViewProduct.title}
              width={450}
              height={450}
              className={styles.quickImg}
              priority
            />
            {quickViewProduct.badge && (
              <span className={styles.cardBadge}>{quickViewProduct.badge}</span>
            )}
          </div>

          <div className={styles.quickInfo}>
            <span className={styles.quickCat}>{quickViewProduct.category}</span>
            <h2 className={styles.quickTitle}>{quickViewProduct.title}</h2>

            <div className={styles.quickRatingRow}>
              <Stars
                rating={quickViewProduct.rating}
                reviewsCount={quickViewProduct.reviewsCount}
              />
              <span className={styles.quickStock}>
                <span className={styles.pulseDot} /> ইন স্টক
              </span>
            </div>

            <div className={styles.quickPriceBox}>
              <span className={styles.quickPrice}>৳{quickViewProduct.price}</span>
              <span className={styles.quickOldPrice}>৳{quickViewProduct.oldPrice}</span>
              <span className={styles.quickDiscount}>{discountPercent}% ছাড়</span>
            </div>

            <p className={styles.quickDesc}>{quickViewProduct.description}</p>

            <div className={styles.quickActionRow}>
              <div className={styles.quickQtyPicker}>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className={styles.qtyBtn}
                  aria-label="কমান"
                >
                  −
                </button>
                <span className={styles.qtyNum}>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className={styles.qtyBtn}
                  aria-label="বাড়ান"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={styles.quickAddBtn}
                onClick={handleAdd}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                কার্টে যোগ করুন (৳{(quickViewProduct.price * qty).toLocaleString()})
              </button>
            </div>

            <div className={styles.quickPerks}>
              <div className={styles.quickPerkItem}>
                <span>🚚</span>
                <div>
                  <strong>দ্রুত ডেলিভারি</strong>
                  <p>সারাদেশে ২-৩ দিনের মধ্যে হোম ডেলিভারি</p>
                </div>
              </div>
              <div className={styles.quickPerkItem}>
                <span>↩</span>
                <div>
                  <strong>৭ দিনের রিটার্ন</strong>
                  <p>পণ্য পছন্দ না হলে সহজ রিপ্লেসমেন্ট</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
