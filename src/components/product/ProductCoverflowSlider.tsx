"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Product } from "@/types"
import ProductCard from "@/components/product/ProductCard"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"
import styles from "@/app/page.module.css"

interface ProductCoverflowSliderProps {
  title: string
  accent: string
  products: Product[]
  onViewAll?: () => void
  autoplayDelay?: number
}

export default function ProductCoverflowSlider({
  title,
  accent,
  products,
  onViewAll,
  autoplayDelay = 2500,
}: ProductCoverflowSliderProps) {
  // Ensure enough slides for a continuous symmetric carousel
  const displayProducts =
    products.length > 0 && products.length < 8
      ? [...products, ...products, ...products]
      : products.length >= 8 && products.length < 12
      ? [...products, ...products]
      : products

  const css = `
  .coverflow-card-wrapper {
    width: 100%;
    border-radius: var(--r-xl);
    border: 1px solid var(--slate-200);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
    box-shadow: var(--shadow-sm);
    padding: 24px 0 32px;
    overflow: hidden;
  }
  .product-coverflow-swiper {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 45px;
  }
  .product-coverflow-swiper .swiper-wrapper {
    display: flex;
    align-items: center;
  }
  .product-coverflow-swiper .swiper-slide {
    width: 270px;
    transition: all 0.35s ease;
  }
  @media (max-width: 640px) {
    .product-coverflow-swiper .swiper-slide {
      width: 220px;
    }
  }
  .product-coverflow-swiper .swiper-pagination-bullet {
    background: var(--slate-400);
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  .product-coverflow-swiper .swiper-pagination-bullet-active {
    background: var(--primary);
    opacity: 1;
    width: 24px;
    border-radius: 9999px;
  }
  .product-coverflow-swiper .swiper-3d .swiper-slide-shadow-left,
  .product-coverflow-swiper .swiper-3d .swiper-slide-shadow-right {
    background-image: none !important;
  }
  `

  return (
    <section className={styles.sliderWrapper} aria-label={`${title} ${accent}`}>
      <style>{css}</style>

      {/* Header */}
      <div className={styles.sliderHead}>
        <div className={styles.secHeadLeft}>
          <h2 className={styles.secTitle}>
            {title} <span className={styles.secAccent}>{accent}</span>
          </h2>
          <span className={styles.secCount}>{products.length}টি পণ্য</span>
        </div>

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
      </div>

      {/* Aligned Contained Showcase Box */}
      <div className="coverflow-card-wrapper">
        <Swiper
          className="product-coverflow-swiper"
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          loopAdditionalSlides={displayProducts.length}
          slidesPerView="auto"
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.2,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {displayProducts.map((product, idx) => (
            <SwiperSlide key={`${product.id}-${idx}`}>
              <div className="w-full h-full transform transition-all duration-300">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
