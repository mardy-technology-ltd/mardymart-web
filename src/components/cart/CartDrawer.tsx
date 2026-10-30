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
        <div className={styles.drawerHead}>
          <div className={styles.drawerTitle}>
            <svg
              width="20"
              height="20"
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
            আমার কার্ট
            {cartCount > 0 && <span className={styles.drawerCount}>{cartCount}</span>}
          </div>
          <button
            className={styles.drawerClose}
            onClick={closeCart}
            aria-label="বন্ধ করুন"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.drawerEmpty}>
            <div className={styles.drawerEmptyIcon}>🛒</div>
            <p>কার্ট খালি আছে</p>
            <span>পণ্য যোগ করতে শপিং শুরু করুন</span>
            <button className={styles.drawerEmptyBtn} onClick={closeCart}>
              শপিং শুরু করুন
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
                      width={64}
                      height={64}
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
                        aria-label="কমান"
                      >
                        −
                      </button>
                      <span className={styles.qtyNum}>{item.qty}</span>
                      <button
                        onClick={() => incrementQty(item.id)}
                        className={styles.qtyBtn}
                        aria-label="বাড়ান"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={styles.qtyRemove}
                        aria-label="মুছে ফেলুন"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.drawerFoot}>
              <div className={styles.drawerSubtotal}>
                <span>সাবটোটাল</span>
                <span>৳{totalAmount.toLocaleString()}</span>
              </div>
              <div className={styles.drawerDelivery}>
                <span>ডেলিভারি চার্জ</span>
                <span className={styles.drawerFree}>
                  {deliveryCharge === 0 ? "FREE ✓" : "৳60"}
                </span>
              </div>
              <div className={styles.drawerTotal}>
                <span>সর্বমোট</span>
                <span>৳{finalTotal.toLocaleString()}</span>
              </div>
              {totalAmount < 500 && (
                <p className={styles.drawerPromo}>
                  আর ৳{500 - totalAmount} কেনাকাটায় ফ্রি ডেলিভারি পাবেন!
                </p>
              )}
              <button
                className={styles.checkoutBtn}
                onClick={() => {
                  alert(
                    `অর্ডার কনফার্মেশনের জন্য ধন্যবাদ! মোট মূল্য: ৳${finalTotal.toLocaleString()}`
                  );
                }}
              >
                অর্ডার করুন →
              </button>
              <div className={styles.drawerTrust}>
                <span>🔒 নিরাপদ পেমেন্ট</span>
                <span>↩ সহজ রিটার্ন</span>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

