"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HERO_SLIDES } from "@/data/mockData";
import styles from "@/app/page.module.css";

interface HeroBannerProps {
  onCtaClick: (category: string) => void;
}

export default function HeroBanner({ onCtaClick }: HeroBannerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentIdx];

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className={styles.hero} style={{ background: slide.bg }} aria-label="প্রধান অফার ব্যানার">
      <div className={styles.heroBg} />

      <button
        className={`${styles.heroNav} ${styles.heroNavL}`}
        onClick={prevSlide}
        aria-label="পূর্ববর্তী স্লাইড"
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

      <div className={styles.heroContent}>
        <div className={styles.heroPillGroup}>
          <span className={styles.heroEye}>{slide.eyebrow}</span>
          <span className={styles.heroBadgeHighlight}>৳৪৯ থেকে শুরু</span>
        </div>

        <h1 className={styles.heroH1}>{slide.title}</h1>
        <p className={styles.heroSub}>{slide.sub}</p>

        <div className={styles.heroPerkStrip}>
          <span>⚡ দ্রুত ডেলিভারি</span>
          <span>🛡️ ১০০% অরিজিনাল</span>
          <span>↩ সহজ রিটার্ন</span>
        </div>

        <div className={styles.heroCtaRow}>
          <button
            className={styles.heroCta}
            onClick={() => onCtaClick(slide.ctaFilter)}
          >
            {slide.cta}{" "}
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <button
            className={styles.heroCtaSecondary}
            onClick={() => onCtaClick("all")}
          >
            সব কালেকশন
          </button>
        </div>
      </div>

      <div className={styles.heroImg}>
        <Image
          src={slide.image}
          alt={slide.title}
          width={520}
          height={420}
          priority={currentIdx === 0}
          className={styles.heroImgEl}
        />
      </div>

      <button
        className={`${styles.heroNav} ${styles.heroNavR}`}
        onClick={nextSlide}
        aria-label="পরবর্তী স্লাইড"
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

      <div className={styles.heroDots}>
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIdx(i)}
            className={`${styles.heroDot}${
              i === currentIdx ? ` ${styles.heroDotOn}` : ""
            }`}
            aria-label={`স্লাইড ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
