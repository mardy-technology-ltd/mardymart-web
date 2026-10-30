"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import styles from "@/app/page.module.css";

interface MobileNavProps {
  onOpenCategories?: () => void;
}

export default function MobileNav({ onOpenCategories }: MobileNavProps) {
  const { cartCount, wishlistCount, openCart, totalAmount } = useShop();

  return (
    <div className={styles.mobileNavDock} role="navigation" aria-label="মোবাইল নেভিগেশন">
      <Link href="/" className={`${styles.mobileNavItem} ${styles.mobileNavActive}`}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>হোম</span>
      </Link>

      <button
        type="button"
        className={styles.mobileNavItem}
        onClick={onOpenCategories}
        aria-label="ক্যাটাগরি সমূহ"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
        <span>ক্যাটাগরি</span>
      </button>

      <button
        type="button"
        className={styles.mobileNavItem}
        onClick={() => {
          alert(`আপনার পছন্দের তালিকায় ${wishlistCount}টি পণ্য আছে`);
        }}
        aria-label="উইশলিস্ট"
      >
        <div className={styles.mobileNavIconWrap}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {wishlistCount > 0 && (
            <span className={styles.mobileBadge}>{wishlistCount}</span>
          )}
        </div>
        <span>পছন্দ</span>
      </button>

      <button
        type="button"
        className={`${styles.mobileNavItem} ${styles.mobileNavCartItem}`}
        onClick={openCart}
        aria-label="কার্ট খুলুন"
      >
        <div className={styles.mobileNavIconWrap}>
          <svg
            width="22"
            height="22"
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
          {cartCount > 0 && (
            <span className={styles.mobileBadge}>{cartCount}</span>
          )}
        </div>
        <span>
          {cartCount > 0 ? `৳${totalAmount.toLocaleString()}` : "কার্ট"}
        </span>
      </button>
    </div>
  );
}

