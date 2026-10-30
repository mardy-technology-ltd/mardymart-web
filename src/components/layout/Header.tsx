"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import styles from "@/app/page.module.css";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const { cartCount, wishlistCount, openCart } = useShop();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    onSearch(searchInput.trim());
  };

  const handleClear = () => {
    setSearchInput("");
    onSearch("");
  };

  return (
    <header className={styles.hdr}>
      <div className={styles.hdrInner}>
        <div className={styles.hdrLeft}>
          <button className={styles.hdrMenu} aria-label="মেনু খুলুন">
            <span />
            <span />
            <span />
          </button>
          <Link href="/" className={styles.hdrLogo} onClick={handleClear}>
            <span className={styles.hdrLogoMM}>Mardy</span>
            <span className={styles.hdrLogoMart}>Mart</span>
          </Link>
        </div>

        <div className={styles.hdrSearch}>
          <input
            id="site-search"
            type="text"
            placeholder="পণ্য খুঁজুন — মগ, লিপস্টিক, নোটবুক, ট্রাইপড..."
            className={styles.hdrSearchIn}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            aria-label="পণ্য সার্চ করুন"
          />
          {searchInput && (
            <button
              className={styles.hdrSearchClear}
              onClick={handleClear}
              aria-label="মুছে ফেলুন"
            >
              ✕
            </button>
          )}
          <button
            className={styles.hdrSearchBtn}
            onClick={handleSearch}
            aria-label="সার্চ করুন"
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <div className={styles.hdrRight}>
          <Link href="#" className={styles.hdrSignIn}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <div className={styles.hdrSignInText}>
              <span className={styles.hdrSignInSub}>হ্যালো!</span>
              <span>সাইন ইন</span>
            </div>
          </Link>

          <Link href="#" className={styles.hdrWish} aria-label="উইশলিস্ট">
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
            {wishlistCount > 0 && <span className={styles.hdrBadge}>{wishlistCount}</span>}
          </Link>

          <button
            id="open-cart"
            className={styles.hdrCart}
            onClick={openCart}
            aria-label="কার্ট খুলুন"
          >
            <div className={styles.hdrCartIcon}>
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
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className={styles.hdrBadge}>
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
            <div className={styles.hdrCartText}>
              <span className={styles.hdrCartSub}>আমার</span>
              <span>কার্ট</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

