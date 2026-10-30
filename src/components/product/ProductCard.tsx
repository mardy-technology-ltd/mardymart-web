"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useShop } from "@/context/ShopContext";
import Stars from "@/components/common/Stars";
import styles from "@/app/page.module.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const wished = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <div className={styles.card}>
      {product.badge && <span className={styles.cardBadge}>{product.badge}</span>}
      {product.isNew && <span className={styles.cardNew}>NEW</span>}
      {product.isBestSeller && <span className={styles.cardHot}>🔥 বেস্ট</span>}

      <button
        className={`${styles.wishIcon}${wished ? ` ${styles.wished}` : ""}`}
        onClick={() => toggleWishlist(product.id)}
        aria-label={wished ? "উইশলিস্ট থেকে সরান" : "উইশলিস্টে যোগ করুন"}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={wished ? "#e53e3e" : "none"}
          stroke={wished ? "#e53e3e" : "#bbb"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <div className={styles.cardImgBox}>
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className={styles.cardImg}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
      </div>

      <div className={styles.cardBody}>
        <p className={styles.cardCat}>{product.category.split(" ")[0]}</p>
        <p className={styles.cardTitle}>{product.title}</p>
        <Stars rating={product.rating} reviewsCount={product.reviewsCount} />

        <div className={styles.cardPriceRow}>
          <span className={styles.cardPrice}>৳{product.price}</span>
          <span className={styles.cardOld}>৳{product.oldPrice}</span>
          <span className={styles.cardDisc}>{discountPercent}% ছাড়</span>
        </div>

        <button
          className={styles.cardCta}
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? (
            <>
              <svg
                width="13"
                height="13"
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
              </svg>{" "}
              কার্টে যোগ করুন
            </>
          ) : (
            "স্টক নেই"
          )}
        </button>
      </div>
    </div>
  );
}

