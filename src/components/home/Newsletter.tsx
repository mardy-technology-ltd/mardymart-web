"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import styles from "@/app/page.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { showToast } = useShop();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      showToast("অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস দিন", "error");
      return;
    }

    showToast("🎉 সাবস্ক্রিপশন সফল হয়েছে! ধন্যবাদ।", "success");
    setEmail("");
  };

  return (
    <div className={styles.newsletter}>
      <div className={styles.newsletterText}>
        <h3>এক্সক্লুসিভ অফার পেতে সাবস্ক্রাইব করুন</h3>
        <p>প্রথম অর্ডারে ৫% অতিরিক্ত ছাড় পান!</p>
      </div>
      <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
        <input
          type="email"
          placeholder="আপনার ইমেইল দিন..."
          className={styles.newsletterIn}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className={styles.newsletterBtn}>
          সাবস্ক্রাইব
        </button>
      </form>
    </div>
  );
}

