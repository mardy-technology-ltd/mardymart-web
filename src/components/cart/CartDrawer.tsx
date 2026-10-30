"use client";

import React from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import styles from "@/app/page.module.css";

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    totalAmount,
    deliveryCharge,
    finalTotal,
    freeShippingRemaining,
    freeShippingProgress,
    isCartOpen,
    closeCart,
    incrementQty,
    decrementQty,
    removeFromCart,
  } = useShop();

  if (!isCartOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="শপিং কার্ট"
    >
      <aside className={styles.drawer}>
        {/* Drawer Header */}
        <div className={styles.drawerHead}>
          <div className={styles.drawerTitle}>
            <svg
              width="20"
              height="20"
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
            আমার শপিং কার্ট
            {cartCount > 0 && <span className={styles.drawerCount}>{cartCount}</span>}
          </div>
          <button
            className={styles.drawerClose}
            onClick={closeCart}
            aria-label="কার্ট বন্ধ করুন"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className={styles.shippingBarWrap}>
          <div className={styles.shippingBarHeader}>
            {freeShippingRemaining > 0 ? (
              <span>
                আর মাত্র <strong>৳{freeShippingRemaining}</strong> যোগ করলেই পাবেন{" "}
                <span className={styles.textGreen}>ফ্রি ডেলিভারি!</span>
              </span>
            ) : (
              <span className={styles.textSuccessCelebration}>
                🎉 অভিনন্দন! আপনি <strong>ফ্রি ডেলিভারি</strong> পেয়েছেন!
              </span>
            )}
            <span className={styles.shippingBarPercent}>{freeShippingProgress}%</span>
          </div>
          <div className={styles.shippingProgressBar}>
            <div
              className={styles.shippingProgressFill}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Drawer Content */}
        {cart.length === 0 ? (
          <div className={styles.drawerEmpty}>
            <div className={styles.drawerEmptyIcon}>🛍️</div>
            <p>আপনার কার্ট সম্পূর্ণ খালি</p>
            <span>পছন্দের পণ্য যোগ করে সেরা অফার উপভোগ করুন</span>
            <button className={styles.drawerEmptyBtn} onClick={closeCart}>
              শপিং শুরু করুন →
            </button>
          </div>
        ) : (
          <>
            <div className={styles.drawerItems}>
              {cart.map((item) => (
                <div key={item.id} className={styles.drawerItem}>
                  <div className={styles.drawerItemImg}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={70}
                      height={70}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className={styles.drawerItemInfo}>
                    <p className={styles.drawerItemTitle}>{item.title}</p>
                    <p className={styles.drawerItemPrice}>
                      ৳{item.price} × {item.qty} ={" "}
                      <strong>৳{(item.price * item.qty).toLocaleString()}</strong>
                    </p>
                    <div className={styles.drawerQtyRow}>
                      <button
                        onClick={() => decrementQty(item.id)}
                        className={styles.qtyBtn}
                        aria-label="একটি কমান"
                      >
                        −
                      </button>
                      <span className={styles.qtyNum}>{item.qty}</span>
                      <button
                        onClick={() => incrementQty(item.id)}
                        className={styles.qtyBtn}
                        aria-label="একটি বাড়ান"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={styles.qtyRemove}
                        aria-label="আইটেমটি মুছুন"
                        title="মুছে ফেলুন"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer & Checkout */}
            <div className={styles.drawerFoot}>
              <div className={styles.drawerSubtotal}>
                <span>সাবটোটাল ({cartCount}টি আইটেম)</span>
                <span>৳{totalAmount.toLocaleString()}</span>
              </div>
              <div className={styles.drawerDelivery}>
                <span>ডেলিভারি চার্জ</span>
                <span className={styles.drawerFree}>
                  {deliveryCharge === 0 ? "FREE ✓" : "৳60"}
                </span>
              </div>
              <div className={styles.drawerTotal}>
                <span>সর্বমোট প্রদেয়</span>
                <span>৳{finalTotal.toLocaleString()}</span>
              </div>

              <button
                className={styles.checkoutBtn}
                onClick={() => {
                  alert(
                    `অর্ডার প্লেস করার জন্য ধন্যবাদ! মোট মূল্য: ৳${finalTotal.toLocaleString()} (ক্যাশ অন ডেলিভারি / বিকাশ / নগদ)`
                  );
                }}
              >
                চেকআউট করুন (৳{finalTotal.toLocaleString()}) →
              </button>

              <div className={styles.drawerTrust}>
                <span>🔒 ১০০% নিরাপদ পেমেন্ট</span>
                <span>🚚 ক্যাশ অন ডেলিভারি</span>
                <span>↩ সহজ রিটার্ন</span>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
