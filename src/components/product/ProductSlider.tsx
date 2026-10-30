"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import styles from "@/app/page.module.css";

interface ProductSliderProps {
  title: string;
  accent: string;
  products: Product[];
  onViewAll?: () => void;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export default function ProductSlider({
  title,
  accent,
  products,
  onViewAll,
  autoSlide = true,
  autoSlideInterval = 3500,
}: ProductSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const checkScrollability = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollability();
    const el = trackRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);

    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability, products]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = Math.max(280, Math.floor(el.clientWidth * 0.75));
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const scrollNext = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;

    // Loop back to start if reached the end
    if (scrollLeft + clientWidth >= scrollWidth - 20) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const scrollAmount = Math.max(280, Math.floor(el.clientWidth * 0.75));
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

  // Auto-slide effect with hover & touch pause protection
  useEffect(() => {
    if (!autoSlide || isPaused) return;

    const timer = setInterval(() => {
      scrollNext();
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [autoSlide, isPaused, autoSlideInterval, scrollNext]);

  return (
    <section
      className={styles.sliderWrapper}
      aria-label={`${title} ${accent}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Header with Title, View All, and Navigation Arrows */}
      <div className={styles.sliderHead}>
        <div className={styles.secHeadLeft}>
          <h2 className={styles.secTitle}>
            {title} <span className={styles.secAccent}>{accent}</span>
          </h2>
          <span className={styles.secCount}>{products.length}টি পণ্য</span>
        </div>

        <div className={styles.sliderHeadRight}>
          {onViewAll && (
            <button className={styles.secViewAll} onClick={onViewAll}>
              সব দেখুন{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Header Next/Prev Buttons */}
          <div className={styles.sliderArrowsGroup}>
            <button
              type="button"
              className={styles.sliderNavBtn}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="বামে স্ক্রোল করুন"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className={styles.sliderNavBtn}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="ডানে স্ক্রোল করুন"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Side Arrows on Track (Desktop) */}
      <button
        type="button"
        className={`${styles.sliderFloatingArrow} ${styles.sliderFloatingLeft}`}
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="বামে স্ক্রোল করুন"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Carousel Track without browser scrollbar */}
      <div ref={trackRef} className={styles.sliderTrack}>
        {products.map((product) => (
          <div key={product.id} className={styles.sliderItem}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.sliderFloatingArrow} ${styles.sliderFloatingRight}`}
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="ডানে স্ক্রোল করুন"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </section>
  );
}
