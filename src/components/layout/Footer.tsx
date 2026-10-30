"use client";

import React from "react";
import Link from "next/link";
import styles from "@/app/page.module.css";

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export default function Footer({ onSelectCategory }: FooterProps) {
  const categories = [
    "হোম অ্যান্ড কিচেন",
    "বিউটি ও পার্সোনাল কেয়ার",
    "স্টেশনারি ও অফিস সাপ্লাই",
    "ঘর সাজানো ও লাইফস্টাইল",
    "গ্যাজেট ও মোবাইল এক্সেসরিজ",
    "বাচ্চাদের খেলনা ও গিফট",
  ];

  const customerServices = [
    "আমাদের সম্পর্কে",
    "শর্তাবলী",
    "সাধারণ প্রশ্ন (FAQ)",
    "গোপনীয়তা নীতি",
    "রিটার্ন পলিসি",
    "ডেলিভারি পলিসি",
    "ই-ওয়েস্ট পলিসি",
  ];

  const socialLinks = [
    { name: "Facebook", ic: "f" },
    { name: "Instagram", ic: "ig" },
    { name: "YouTube", ic: "yt" },
    { name: "WhatsApp", ic: "wa" },
  ];

  const paymentMethods = ["bKash", "Nagad", "Rocket", "Visa", "MasterCard"];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <span className={styles.footerLogoM}>Mardy</span>
            <span className={styles.footerLogoMt}>Mart</span>
          </div>
          <p className={styles.footerTagline}>
            ৳৪৯ থেকে ৳৩৯৯ — প্রিমিয়াম পণ্য, সাশ্রয়ী দাম।
          </p>
          <div className={styles.footerContact}>
            <h4>Contact Us</h4>
            <div className={styles.footerContactItem}>
              <span>💬</span>
              <div>
                <p>WhatsApp</p>
                <p>+880 1700-000000</p>
              </div>
            </div>
            <div className={styles.footerContactItem}>
              <span>📞</span>
              <div>
                <p>Call Us</p>
                <p>+880 1800-000000</p>
              </div>
            </div>
          </div>
          <div className={styles.footerApps}>
            <p>Download App</p>
            <div className={styles.footerAppBtns}>
              <Link href="#" className={styles.footerAppBtn}>
                <span>🍎</span> App Store
              </Link>
              <Link href="#" className={styles.footerAppBtn}>
                <span>▶</span> Google Play
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerColH}>সব ক্যাটাগরি</h4>
          <ul className={styles.footerList}>
            {categories.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => onSelectCategory?.(c)}
                  className={styles.footerLink}
                >
                  › {c}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerColH}>Customer Service</h4>
          <ul className={styles.footerList}>
            {customerServices.map((service) => (
              <li key={service}>
                <Link href="#" className={styles.footerLink}>
                  › {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerColH}>আমাদের সাথে থাকুন</h4>
          <div className={styles.footerSocial}>
            {socialLinks.map((s) => (
              <Link
                key={s.name}
                href="#"
                className={styles.socialBtn}
                aria-label={s.name}
              >
                {s.ic}
              </Link>
            ))}
          </div>
          <div className={styles.footerPay}>
            <p className={styles.footerPayTitle}>পেমেন্ট পদ্ধতি</p>
            <div className={styles.footerPayRow}>
              {paymentMethods.map((m) => (
                <span key={m} className={styles.payChip}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2026 MardyMart · Mardy Technology Ltd. সর্বস্বত্ব সংরক্ষিত।</p>
        <div className={styles.footerBottomLinks}>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}

