"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import styles from "@/app/page.module.css";

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div
      role="alert"
      className={`${styles.toast} ${
        toast.type === "success" ? styles.toastSuccess : styles.toastInfo
      }`}
    >
      {toast.msg}
    </div>
  );
}

