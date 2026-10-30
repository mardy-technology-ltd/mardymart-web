"use client";

import { useState, useMemo, useCallback } from "react";
import { PRODUCTS } from "@/data/mockData";

// Components
import Toast from "@/components/common/Toast";
import CartDrawer from "@/components/cart/CartDrawer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import TrustBadges from "@/components/home/TrustBadges";
import FlashSaleBar from "@/components/home/FlashSaleBar";
import PriceTierFilter from "@/components/home/PriceTierFilter";
import TopCategories from "@/components/home/TopCategories";
import CategoryDeals from "@/components/home/CategoryDeals";
import MidBanner from "@/components/home/MidBanner";
import DailyEssentials from "@/components/home/DailyEssentials";
import Newsletter from "@/components/home/Newsletter";
import ProductCard from "@/components/product/ProductCard";
import SectionHead from "@/components/product/SectionHead";

import styles from "./page.module.css";

export default function Home() {
  const [navFilter, setNavFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const hasFilter = navFilter !== "all" || priceFilter !== 0 || !!searchQuery;

  const clearAllFilters = useCallback(() => {
    setNavFilter("all");
    setPriceFilter(0);
    setSearchQuery("");
  }, []);

  const navigateToCategory = useCallback((category: string) => {
    setNavFilter(category);
    setPriceFilter(0);
    setSearchQuery("");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCat = navFilter === "all" || product.category === navFilter;
      const matchPrice = priceFilter === 0 || product.price === priceFilter;
      const matchQuery =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchPrice && matchQuery;
    });
  }, [navFilter, priceFilter, searchQuery]);

  const getSectionProducts = useCallback((category: string, limit = 8) => {
    return PRODUCTS.filter((p) => p.category === category).slice(0, limit);
  }, []);

  return (
    <div className={styles.pg}>
      <Toast />
      <CartDrawer />
      <AnnouncementBar />
      <Header onSearch={handleSearch} />
      <Navigation
        currentFilter={navFilter}
        onSelectCategory={navigateToCategory}
      />

      <main className={styles.main}>
        <div className={styles.wrap}>
          {/* Active Filter or Search Results View */}
          {hasFilter ? (
            <section className={styles.sec}>
              <SectionHead
                title={
                  searchQuery
                    ? `"${searchQuery}" ফলাফল`
                    : navFilter !== "all"
                    ? navFilter
                    : "সব পণ্য"
                }
                accent={priceFilter ? `· ৳${priceFilter}` : ""}
                count={filteredProducts.length}
                onViewAll={clearAllFilters}
              />

              <PriceTierFilter
                currentTier={priceFilter}
                hasActiveFilter={hasFilter}
                onSelectTier={setPriceFilter}
                onClearFilters={clearAllFilters}
              />

              {filteredProducts.length === 0 ? (
                <div className={styles.empty}>
                  <div className={styles.emptyIcon}>😔</div>
                  <p>কোনো পণ্য পাওয়া যায়নি</p>
                  <span>অন্য কীওয়ার্ড বা ফিল্টার ব্যবহার করুন</span>
                  <button className={styles.emptyBtn} onClick={clearAllFilters}>
                    সব পণ্য দেখুন
                  </button>
                </div>
              ) : (
                <div className={styles.grid}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>
          ) : (
            /* Standard Curated Home View */
            <>
              <HeroBanner onCtaClick={navigateToCategory} />
              <TrustBadges />
              <FlashSaleBar onViewAllOffers={() => navigateToCategory("all")} />

              <PriceTierFilter
                currentTier={priceFilter}
                hasActiveFilter={hasFilter}
                onSelectTier={setPriceFilter}
                onClearFilters={clearAllFilters}
              />

              {/* সেকশন ১: হোম অ্যান্ড কিচেন */}
              <section className={styles.sec}>
                <SectionHead
                  title="হোম কিচেনের"
                  accent="সেরা ডিল"
                  onViewAll={() => navigateToCategory("হোম অ্যান্ড কিচেন")}
                />
                <div className={styles.hScroll}>
                  {getSectionProducts("হোম অ্যান্ড কিচেন").map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>

              {/* টপ ক্যাটাগরি */}
              <section className={styles.sec}>
                <SectionHead title="Shop From" accent="Top Categories" />
                <TopCategories onSelectCategory={navigateToCategory} />
              </section>

              {/* ব্র্যান্ড ডিল */}
              <section className={styles.sec}>
                <SectionHead title="Top" accent="Category Deals" />
                <CategoryDeals onSelectCategory={navigateToCategory} />
              </section>

              {/* মিড ব্যানার */}
              <MidBanner onExplore={navigateToCategory} />

              {/* সেকশন ২: বিউটি ও পার্সোনাল কেয়ার */}
              <section className={styles.sec}>
                <SectionHead
                  title="বিউটি ও"
                  accent="পার্সোনাল কেয়ার"
                  onViewAll={() => navigateToCategory("বিউটি ও পার্সোনাল কেয়ার")}
                />
                <div className={styles.hScroll}>
                  {getSectionProducts("বিউটি ও পার্সোনাল কেয়ার").map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>

              {/* ডেইলি এসেনশিয়ালস গ্রিড */}
              <section className={styles.sec}>
                <SectionHead title="Daily" accent="Essentials" />
                <DailyEssentials onSelectCategory={navigateToCategory} />
              </section>

              {/* সেকশন ৩: গ্যাজেট ও মোবাইল এক্সেসরিজ */}
              <section className={styles.sec}>
                <SectionHead
                  title="গ্যাজেট ও"
                  accent="মোবাইল এক্সেসরিজ"
                  onViewAll={() => navigateToCategory("গ্যাজেট ও মোবাইল এক্সেসরিজ")}
                />
                <div className={styles.hScroll}>
                  {getSectionProducts("গ্যাজেট ও মোবাইল এক্সেসরিজ").map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>

              {/* সেকশন ৪: বাচ্চাদের খেলনা ও গিফট */}
              <section className={styles.sec}>
                <SectionHead
                  title="বাচ্চাদের"
                  accent="খেলনা ও গিফট"
                  onViewAll={() => navigateToCategory("বাচ্চাদের খেলনা ও গিফট")}
                />
                <div className={styles.hScroll}>
                  {getSectionProducts("বাচ্চাদের খেলনা ও গিফট").map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>

              {/* সেকশন ৫: স্টেশনারি ও অফিস সাপ্লাই */}
              <section className={styles.sec}>
                <SectionHead
                  title="স্টেশনারি ও"
                  accent="অফিস সাপ্লাই"
                  onViewAll={() => navigateToCategory("স্টেশনারি ও অফিস সাপ্লাই")}
                />
                <div className={styles.hScroll}>
                  {getSectionProducts("স্টেশনারি ও অফিস সাপ্লাই").map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>

              {/* নিউজলেটার সাবস্ক্রিপশন */}
              <Newsletter />
            </>
          )}
        </div>
      </main>

      <Footer onSelectCategory={navigateToCategory} />
    </div>
  );
}
