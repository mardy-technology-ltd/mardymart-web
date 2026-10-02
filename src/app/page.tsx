"use client";

import { useState, useMemo, useEffect } from "react";
import styles from "./page.module.css";
import { 
  FiSearch, 
  FiUser, 
  FiHeart, 
  FiChevronDown, 
  FiHelpCircle,
  FiShoppingBag,
  FiStar,
  FiX,
  FiPlus,
  FiMinus,
  FiCheck,
  FiEye,
  FiTrash2,
  FiZap,
  FiSliders,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";

interface Product {
  id: number;
  category: string;
  title: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  inStock: boolean;
  description: string;
  tags?: string[];
}

interface CategoryNav {
  id: string;
  title: string;
  categoryFilter: string;
  subcategories: { name: string; keyword?: string }[];
}

const mainNavCategories: CategoryNav[] = [
  {
    id: 'home-kitchen',
    title: 'হোম অ্যান্ড কিচেন',
    categoryFilter: 'হোম অ্যান্ড কিচেন',
    subcategories: [
      { name: 'সকল হোম ও কিচেন', keyword: 'সব' },
      { name: 'রান্নাঘরের হাঁড়ি-পাতিল ও বাসন', keyword: 'বাসন' },
      { name: 'কাটিং ও প্রিপারেশন টুলস', keyword: 'কাটিং' },
      { name: 'স্টোরেজ ও কন্টেইনার', keyword: 'কন্টেইনার' },
      { name: 'ক্লিনিং ও সিঙ্ক এক্সেসরিজ', keyword: 'ক্লিনিং' }
    ]
  },
  {
    id: 'beauty-care',
    title: 'বিউটি ও পার্সোনাল কেয়ার',
    categoryFilter: 'বিউটি ও পার্সোনাল কেয়ার',
    subcategories: [
      { name: 'সকল বিউটি ও পার্সোনাল কেয়ার', keyword: 'সব' },
      { name: 'মেকআপ টুলস ও ব্রাশ', keyword: 'মেকআপ' },
      { name: 'চুলের যত্ন ও এক্সেসরিজ', keyword: 'চুলের যত্ন' },
      { name: 'পার্সোনাল কেয়ার ও বডি স্ক্রাবার', keyword: 'পার্সোনাল কেয়ার' }
    ]
  },
  {
    id: 'stationery',
    title: 'স্টেশনারি ও অফিস সাপ্লাই',
    categoryFilter: 'স্টেশনারি ও অফিস সাপ্লাই',
    subcategories: [
      { name: 'সকল স্টেশনারি আইটেম', keyword: 'সব' },
      { name: 'খাতা, নোটবুক ও ডায়েরি', keyword: 'খাতা' },
      { name: 'রাইটিং, কালার ও আর্ট টুলস', keyword: 'রাইটিং' },
      { name: 'ডেস্ক অর্গানাইজার ও ফাইল', keyword: 'ডেস্ক অর্গানাইজার' }
    ]
  },
  {
    id: 'home-decor',
    title: 'ঘর সাজানো ও লাইফস্টাইল',
    categoryFilter: 'ঘর সাজানো ও লাইফস্টাইল',
    subcategories: [
      { name: 'সকল ঘর সাজানোর সামগ্রী', keyword: 'সব' },
      { name: 'হোম ডেকোর ও মোমবাতি', keyword: 'হোম ডেকোর' },
      { name: 'লাইটিং ও নাইট ল্যাম্প', keyword: 'লাইটিং' },
      { name: 'স্টোরেজ র্যাক ও হ্যাঙ্গার', keyword: 'স্টোরেজ ও হ্যাঙ্গার' }
    ]
  },
  {
    id: 'gadgets',
    title: 'গ্যাজেট ও মোবাইল',
    categoryFilter: 'গ্যাজেট ও মোবাইল এক্সেসরিজ',
    subcategories: [
      { name: 'সকল গ্যাজেট ও মোবাইল আইটেম', keyword: 'সব' },
      { name: 'মোবাইল এক্সেসরিজ ও স্ট্যান্ড', keyword: 'মোবাইল এক্সেসরিজ' },
      { name: 'স্মার্ট ইউটিলিটি ও ক্যাবল', keyword: 'স্মার্ট ইউটিলিটি' }
    ]
  },
  {
    id: 'toys-gifts',
    title: 'বাচ্চাদের খেলনা ও গিফট',
    categoryFilter: 'বাচ্চাদের খেলনা ও গিফট',
    subcategories: [
      { name: 'সকল খেলনা ও গিফট সামগ্রী', keyword: 'সব' },
      { name: 'বাচ্চাদের খেলনা সামগ্রী ও গেম', keyword: 'খেলনা সামগ্রী' },
      { name: 'গিফট আইটেম ও কি-রিং', keyword: 'গিফট আইটেম' }
    ]
  }
];

const priceTiers = [
  { id: 'all', label: 'সব পণ্য', priceText: 'ALL', icon: '🌟', badge: 'সব কালেকশন' },
  { id: '49', label: 'বাজেট কর্নার', priceText: '৳৪৯', icon: '⚡', badge: 'সুপার ডিল' },
  { id: '99', label: 'মেগা জোন', priceText: '৳৯৯', icon: '🔥', badge: 'হট অফার' },
  { id: '199', label: 'ভ্যালু ডিলস', priceText: '৳১৯৯', icon: '💎', badge: 'জনপ্রিয়' },
  { id: '299', label: 'প্রিমিয়াম হাব', priceText: '৳২৯৯', icon: '👑', badge: 'বেস্ট ভ্যালু' },
  { id: '399', label: 'এক্সক্লুসিভ', priceText: '৳৩৯৯', icon: '🚀', badge: 'টপ রেটেড' },
];

const categoriesList = [
  'সব ক্যাটাগরি',
  'হোম অ্যান্ড কিচেন',
  'বিউটি ও পার্সোনাল কেয়ার',
  'স্টেশনারি ও অফিস সাপ্লাই',
  'ঘর সাজানো ও লাইফস্টাইল',
  'গ্যাজেট ও মোবাইল এক্সেসরিজ',
  'বাচ্চাদের খেলনা ও গিফট'
];

const mockProducts: Product[] = [
  // ================= 1. হোম অ্যান্ড কিচেন (HOME & KITCHEN ESSENTIALS) =================
  // 1.1 রান্নাঘরের হাঁড়ি-পাতিল ও বাসন (5 Items)
  {
    id: 101,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'প্লাস্টিক ও স্টিলের মগ, গ্লাস ও বাটি কম্বো সেট',
    price: 99,
    oldPrice: 160,
    rating: 4.8,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'দৈনন্দিন চা, পানি ও স্ন্যাকস পরিবেশনের জন্য দীর্ঘস্থায়ী প্রিমিয়াম মগ ও বাটি সেট।',
    tags: ['বাসন', 'রান্নাঘরের হাঁড়ি-পাতিল ও বাসন', 'মগ', 'বাটি']
  },
  {
    id: 102,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'মেলোমাইন ও কাঁচের ছোট প্লেট এবং সস ডিশ সেট',
    price: 49,
    oldPrice: 85,
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'স্ন্যাকস, সস ও মিষ্টি পরিবেশনের জন্য আকর্ষণীয় আনব্রেকেবল ছোট ডিশ সেট।',
    tags: ['বাসন', 'রান্নাঘরের হাঁড়ি-পাতিল ও বাসন', 'প্লেট', 'সস ডিশ']
  },
  {
    id: 103,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'নন-স্টিক মিনি প্যান ও ডিম ভাজার ছোট কড়াই',
    price: 299,
    oldPrice: 480,
    rating: 4.9,
    reviewsCount: 640,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'তেল ছাড়াই ঝটপট ডিম পোজ ও অমলেট বানানোর গ্রানাইট কোটিং যুক্ত মিনি ফ্রাই প্যান।',
    tags: ['বাসন', 'রান্নাঘরের হাঁড়ি-পাতিল ও বাসন', 'প্যান', 'কড়াই']
  },
  {
    id: 104,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'আইস ট্রে ও আইসক্রিম মেকিং ফুড-গ্রেড সিলিকন মোল্ড',
    price: 49,
    oldPrice: 80,
    rating: 4.8,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'সহজে বরফ কিউব ও বাচ্চাদের ঘরে তৈরি আইসক্রিম বানানোর ফ্লেক্সিবল মোল্ড।',
    tags: ['বাসন', 'রান্নাঘরের হাঁড়ি-পাতিল ও বাসন', 'আইস ট্রে', 'আইসক্রিম']
  },
  {
    id: 105,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'প্লাস্টিকের জুস গ্লাস ও কালারফুল কাপ-পিরিচ সেট',
    price: 199,
    oldPrice: 320,
    rating: 4.9,
    reviewsCount: 430,
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'মেহমান আপ্যায়ন ও দৈনন্দিন জুস বা চা পানের উপযোগী প্রিমিয়াম ৬ পিস কাপ সেট।',
    tags: ['বাসন', 'রান্নাঘরের হাঁড়ি-পাতিল ও বাসন', 'জুস গ্লাস', 'কাপ']
  },

  // 1.2 কাটিং ও প্রিপারেশন টুলস (5 Items)
  {
    id: 106,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'মাল্টি-ফাংশনাল পটেটো ও ভেজিটেবল পিলার',
    price: 49,
    oldPrice: 85,
    rating: 4.8,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'আলু ও যেকোনো শাকসবজির চামড়া মসৃণভাবে ছিলার ধারালো স্টেইনলেস স্টিল পিলার।',
    tags: ['কাটিং', 'কাটিং ও প্রিপারেশন টুলস', 'পিলার']
  },
  {
    id: 107,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'হ্যান্ডহেল্ড চপার ও মাল্টি ভেজিটেবল স্লাইসার',
    price: 199,
    oldPrice: 320,
    rating: 4.9,
    reviewsCount: 680,
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'পেঁয়াজ, রসুন ও সবজি চোখের পানি ছাড়া সেকেন্ডেই কুচি করার পুল চপার মেশিন।',
    tags: ['কাটিং', 'কাটিং ও প্রিপারেশন টুলস', 'চপার', 'স্লাইসার']
  },
  {
    id: 108,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'ফল ও সবজি কাটার স্টেইনলেস স্টিল নাইফ সেট',
    price: 99,
    oldPrice: 170,
    rating: 4.9,
    reviewsCount: 430,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'রান্নাঘরে দ্রুত ফলমূল ও সবজি কুচি করার ধারালো অ্যান্টি-রাস্ট নাইফ সেট।',
    tags: ['কাটিং', 'কাটিং ও প্রিপারেশন টুলস', 'নাইফ', 'ছুরি']
  },
  {
    id: 109,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'সিলিকন কুকিং স্প্যাচুলা ও মিনি অয়েল ব্রাশ সেট',
    price: 49,
    oldPrice: 80,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'রান্নায় তেল, মাখন বা সস ব্রাশ করার ১০০% ফুড-গ্রেড হিট রেজিসট্যান্ট সিলিকন ব্রাশ।',
    tags: ['কাটিং', 'কাটিং ও প্রিপারেশন টুলস', 'স্প্যাচুলা', 'ব্রাশ']
  },
  {
    id: 110,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'উডেন ও ফুড-গ্রেড প্লাস্টিক কাটিং বোর্ড',
    price: 299,
    oldPrice: 450,
    rating: 4.8,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'মাংস, মাছ ও সবজি কাটার জন্য মজবুত এবং অ্যান্টি-স্লিপ হাইজেনিক কাটিং বোর্ড।',
    tags: ['কাটিং', 'কাটিং ও প্রিপারেশন টুলস', 'কাটিং বোর্ড']
  },

  // 1.3 স্টোরেজ ও কন্টেইনার (5 Items)
  {
    id: 111,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'এয়ারটাইট প্লাস্টিক বয়াম ও মসলার কৌটা সেট (৩ পিস)',
    price: 99,
    oldPrice: 180,
    rating: 4.8,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'লবণ, হলুদ ও মসলা শুকনো এবং তাজা রাখার জন্য ফুড-গ্রেড এয়ারটাইট বয়াম সেট।',
    tags: ['কন্টেইনার', 'স্টোরেজ ও কন্টেইনার', 'মসলার কৌটা', 'বয়াম']
  },
  {
    id: 112,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'ফ্রিজ স্টোরেজ বক্স ও ভেজিটেবল ফ্রেশ বাক্সেট',
    price: 199,
    oldPrice: 340,
    rating: 4.8,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ফ্রিজে মাছ, মাংস ও শাকসবজি তাজা ও দুর্গন্ধমুক্ত রাখতে মাল্টিপারপাস ড্রয়ার বক্স।',
    tags: ['কন্টেইনার', 'স্টোরেজ ও কন্টেইনার', 'ফ্রিজ স্টোরেজ', 'ফ্রেশ বক্স']
  },
  {
    id: 113,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'লিক-প্রুফ অয়েল ডিসপেনসার ও সস বোতল (৫০০ মিলি)',
    price: 99,
    oldPrice: 175,
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'তেল না উপচে মসৃণভাবে ঢালার বিশেষ ড্রপ-ফ্রি নজেল যুক্ত কাঁচ ও প্লাস্টিকের বোতল।',
    tags: ['কন্টেইনার', 'স্টোরেজ ও কন্টেইনার', 'অয়েল ডিসপেনসার', 'সস বোতল']
  },
  {
    id: 114,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'স্ন্যাকস সিলিং ক্লিপ ও প্লাস্টিক সিলিং কিট (সেট)',
    price: 49,
    oldPrice: 75,
    rating: 4.7,
    reviewsCount: 280,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'বিস্কুট, চিপস ও মসলার প্যাকেট কুড়মুড়ে ফ্রেশ রাখার জন্য এয়ারটাইট প্লাস্টিক ক্লিপ।',
    tags: ['কন্টেইনার', 'স্টোরেজ ও কন্টেইনার', 'সিলিং ক্লিপ', 'সিলিং কিট']
  },
  {
    id: 115,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'ড্রয়ার অর্গানাইজার ট্রাঙ্ক ও স্পেস সেভিং বক্স',
    price: 299,
    oldPrice: 460,
    rating: 4.8,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'কিচেন বা ঘরের ড্রয়ারের ছোটখাটো জিনিসপত্র সুন্দরভাবে সাজিয়ে রাখার মাল্টি-কম্পার্টমেন্ট ট্রাঙ্ক।',
    tags: ['কন্টেইনার', 'স্টোরেজ ও কন্টেইনার', 'ড্রয়ার অর্গানাইজার', 'ট্রাঙ্ক']
  },

  // 1.4 ক্লিনিং ও সিঙ্ক এক্সেসরিজ (5 Items)
  {
    id: 116,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'বোতল ও গ্লাস পরিষ্কারের লং হ্যান্ডেল স্পঞ্জ ব্রাশ',
    price: 49,
    oldPrice: 80,
    rating: 4.7,
    reviewsCount: 240,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'লম্বা বোতল, পানির ফ্লাস্ক ও গ্লাসের তলদেশ পরিষ্কার করার নরম স্পঞ্জ ব্রাশ।',
    tags: ['ক্লিনিং', 'ক্লিনিং ও সিঙ্ক এক্সেসরিজ', 'স্পঞ্জ ব্রাশ', 'বোতল ব্রাশ']
  },
  {
    id: 117,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'আল্ট্রা-সফট মাইক্রোফাইবার ডাস্টিং ক্লথ (Pack of 3)',
    price: 49,
    oldPrice: 90,
    rating: 4.9,
    reviewsCount: 510,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'কিচেন স্ল্যাব, গ্লাস, ডাইনিং ও গাড়ি দাগহীন পরিষ্কার করার উচ্চ শোষণক্ষমতাসম্পন্ন কাপড়।',
    tags: ['ক্লিনিং', 'ক্লিনিং ও সিঙ্ক এক্সেসরিজ', 'মাইক্রোফাইবার', 'ক্লথ']
  },
  {
    id: 118,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'ডিশওয়াশিং স্ক্রাবার ও সোপ প্যাড হোল্ডার',
    price: 49,
    oldPrice: 75,
    rating: 4.8,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'বাসন ধোয়ার সাবান ও ফোম স্ক্রাবার শুকনা এবং পরিচ্ছন্ন রাখার জন্য সিঙ্ক সাইড হোল্ডার।',
    tags: ['ক্লিনিং', 'ক্লিনিং ও সিঙ্ক এক্সেসরিজ', 'স্ক্রাবার', 'প্যাড হোল্ডার']
  },
  {
    id: 119,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'সিঙ্ক ড্রেন ফিল্টার ও মেটাল জালি নেট সেট',
    price: 49,
    oldPrice: 75,
    rating: 4.6,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'বেসিন ও সিঙ্কের ড্রেন পাইপ জ্যাম হওয়া প্রতিরোধ করার স্টেইনলেস স্টিল ফিল্টার নেট।',
    tags: ['ক্লিনিং', 'ক্লিনিং ও সিঙ্ক এক্সেসরিজ', 'সিঙ্ক ড্রেন', 'মেটাল জালি']
  },
  {
    id: 120,
    category: 'হোম অ্যান্ড কিচেন',
    title: 'হিট-রেজিস্ট্যান্ট সিলিকন ডিশওয়াশিং গ্লাভস',
    price: 199,
    oldPrice: 320,
    rating: 4.8,
    reviewsCount: 460,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'হাত সুরক্ষিত রেখে সহজে থালাবাসন, ফলমূল ও কিচেন পরিষ্কার করার সিলিকন ব্রাশ গ্লাভস।',
    tags: ['ক্লিনিং', 'ক্লিনিং ও সিঙ্ক এক্সেসরিজ', 'সিলিকন গ্লাভস', 'গ্লাভস']
  },

  // ================= 2. বিউটি, পার্সোনাল কেয়ার ও ফ্যাশন (BEAUTY & PERSONAL CARE) =================
  // 2.1 মেকআপ টুলস (5 Items)
  {
    id: 201,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'মেকআপ বিউটি ব্লেন্ডার উইথ স্ট্যান্ড',
    price: 49,
    oldPrice: 95,
    rating: 4.8,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'স্মুথ মেকআপ ফিনিশিং ও ফাউন্ডেশন ব্লেন্ড করার জন্য নরম ল্যাটেক্স-ফ্রি বিউটি ব্লেন্ডার।',
    tags: ['মেকআপ', 'মেকআপ টুলস ও ব্রাশ', 'ব্লেন্ডার', 'মেকআপ স্পঞ্জ']
  },
  {
    id: 202,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'প্রফেশনাল আইশ্যাডো ও ব্লাশ ব্রাশ সেট',
    price: 99,
    oldPrice: 190,
    rating: 4.9,
    reviewsCount: 680,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'আল্ট্রা সফট ফাইবার ব্রিসল যুক্ত ফুল ফেস মেকআপ ও ব্লেন্ডিং ব্রাশ কিট।',
    tags: ['মেকআপ', 'মেকআপ টুলস ও ব্রাশ', 'আইশ্যাডো ব্রাশ', 'ব্লাশ ব্রাশ']
  },
  {
    id: 203,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'সফট মেকআপ রিমুভার প্যাড ও কটন ওয়াইপস প্যাক',
    price: 49,
    oldPrice: 85,
    rating: 4.8,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ত্বক নরম রেখে মেকআপ ও লিপস্টিক সহজে তোলার রিইউজেবল প্যাড।',
    tags: ['মেকআপ', 'মেকআপ টুলস ও ব্রাশ', 'মেকআপ রিমুভার', 'ওয়াইপস']
  },
  {
    id: 204,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'টাচ এলইডি লাইট মেকআপ মিরর ও পোর্টেবল আয়না',
    price: 199,
    oldPrice: 350,
    rating: 4.9,
    reviewsCount: 570,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'পারফেক্ট মেকআপের জন্য ব্রাইট এলইডি লাইট ও টাচ ব্রাইটনেস কন্ট্রোল আয়না।',
    tags: ['মেকআপ', 'মেকআপ টুলস ও ব্রাশ', 'পকেট মিরর', 'এলইডি আয়না']
  },
  {
    id: 205,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'আইল্যাশ কার্লার ও প্রেসিশন পিন্সেট (Tweezers)',
    price: 49,
    oldPrice: 80,
    rating: 4.7,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'চোখের পাপড়ি সুন্দরভাবে কার্ল করার জন্য নরম সিলিকন প্যাড যুক্ত কার্লার ও টুইজার।',
    tags: ['মেকআপ', 'মেকআপ টুলস ও ব্রাশ', 'আইল্যাশ কার্লার', 'টুইজার', 'পিন্সেট']
  },

  // 2.2 চুলের যত্ন ও এক্সেসরিজ (5 Items)
  {
    id: 206,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'ফ্যাশনেবল ক্লাচ, টিকটিকি ও হেয়ার ক্লিপ সেট',
    price: 49,
    oldPrice: 80,
    rating: 4.8,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'চুল শক্তভাবে আটকে রাখার জন্য আকর্ষণীয় ডিজাইনের টেকসই ক্লাচ ও হেয়ার ক্লিপ।',
    tags: ['চুলের যত্ন', 'চুলের যত্ন ও এক্সেসরিজ', 'ক্লাচ', 'ক্লিপ']
  },
  {
    id: 207,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'সিল্ক ও কটন ফ্যাশন স্ক্রাঞ্চি সেট (Pack of 5)',
    price: 49,
    oldPrice: 85,
    rating: 4.9,
    reviewsCount: 620,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'চুলের ক্ষতি না করে সুন্দর হেয়ারস্টাইল করার রঙিন ও আকর্ষণীয় স্ক্রাঞ্চি ব্যান্ড।',
    tags: ['চুলের যত্ন', 'চুলের যত্ন ও এক্সেসরিজ', 'স্ক্রাঞ্চি', 'Scrunchies']
  },
  {
    id: 208,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'স্টাইলিশ হেয়ার ব্যান্ড, ব্যান্ডানা ও হেয়ার রিবন',
    price: 49,
    oldPrice: 80,
    rating: 4.7,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'দৈনন্দিন ব্যবহার ও ফ্যাশনেবল হেয়ার স্টাইলিংয়ের জন্য নরম ফেব্রিক হেয়ার ব্যান্ড।',
    tags: ['চুলের যত্ন', 'চুলের যত্ন ও এক্সেসরিজ', 'হেয়ার ব্যান্ড', 'ব্যান্ডানা', 'রিবন']
  },
  {
    id: 209,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'সিলিকন স্ক্যাল্প ম্যাসেজার কম্ব ও ডিট্যাঙ্গলিং ব্রাশ',
    price: 99,
    oldPrice: 170,
    rating: 4.8,
    reviewsCount: 540,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'শ্যাম্পু করার সময় মাথার ত্বক পরিষ্কার এবং রক্ত সঞ্চালন বৃদ্ধির সিলিকন ম্যাসেজার।',
    tags: ['চুলের যত্ন', 'চুলের যত্ন ও এক্সেসরিজ', 'স্ক্যাল্প ম্যাসেজার', 'ব্রাশ', 'চিরুনি']
  },
  {
    id: 210,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'কুইক-ড্রাই মাইক্রোফাইবার হেয়ার ক্যাপ ও টাওয়েল',
    price: 99,
    oldPrice: 180,
    rating: 4.9,
    reviewsCount: 470,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'গোসলের পর দ্রুত চুল শুকানোর জন্য পানি শোষণকারী সুপার সফট হেয়ার ক্যাপ।',
    tags: ['চুলের যত্ন', 'চুলের যত্ন ও এক্সেসরিজ', 'হেয়ার ক্যাপ', 'টাওয়েল']
  },

  // 2.3 পার্সোনাল কেয়ার (5 Items)
  {
    id: 211,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'ট্রাভেল সাইজ বোটল কিট (শ্যাম্পু/লোশন ভরার জন্য)',
    price: 99,
    oldPrice: 170,
    rating: 4.8,
    reviewsCount: 360,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ভ্রমণের সময় শ্যাম্পু, ফেসওয়াশ ও লোশন সহজে পোর্টেবল রাখার লিক-প্রুফ রিফিল কিট।',
    tags: ['পার্সোনাল কেয়ার', 'পার্সোনাল কেয়ার ও বডি স্ক্রাবার', 'ট্রাভেল কিট', 'বোটল কিট']
  },
  {
    id: 212,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'স্টাইলিশ নেইল কাটার ও নেইল ফাইলার গ্রুমিং সেট',
    price: 49,
    oldPrice: 80,
    rating: 4.7,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'সহজে হাত ও পায়ের নখ পরিষ্কার ও সাইজ করার টেকসই মেটালিক নেইল গ্রুমিং কিট।',
    tags: ['পার্সোনাল কেয়ার', 'পার্সোনাল কেয়ার ও বডি স্ক্রাবার', 'নেইল কাটার', 'নেইল ফাইলার']
  },
  {
    id: 213,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'ফেস পিলিং প্যাড ও সিলিকন ফেস স্ক্রাবার',
    price: 49,
    oldPrice: 75,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'মুখের ত্বকের ব্ল্যাকহেডস ও অতিরিক্ত তেল দূর করার জেন্টল সিলিকন ক্লিনিং ব্রাশ।',
    tags: ['পার্সোনাল কেয়ার', 'পার্সোনাল কেয়ার ও বডি স্ক্রাবার', 'ফেস স্ক্রাবার', 'পিলিং প্যাড']
  },
  {
    id: 214,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'প্রিমিয়াম বডি স্ক্রাবার ও স্নানের সফট ফোমিং লুফা',
    price: 49,
    oldPrice: 85,
    rating: 4.8,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'গোসলে প্রচুর ফেনা তৈরি ও ত্বকের মৃতকোষ দূর করার কোমল এক্সফোলিয়েটিং লুফা।',
    tags: ['পার্সোনাল কেয়ার', 'পার্সোনাল কেয়ার ও বডি স্ক্রাবার', 'বডি স্ক্রাবার', 'লুফা', 'Loofah']
  },
  {
    id: 215,
    category: 'বিউটি ও পার্সোনাল কেয়ার',
    title: 'ফুট রিল্যাক্সিং পিউমিস স্টোন ও হিল স্ক্রাবার',
    price: 49,
    oldPrice: 80,
    rating: 4.7,
    reviewsCount: 260,
    image: 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'পায়ের গোড়ালি ফাটা ও মরা চামড়া পরিষ্কার করে পা নরম রাখার ন্যাচারাল স্ক্রাবার।',
    tags: ['পার্সোনাল কেয়ার', 'পার্সোনাল কেয়ার ও বডি স্ক্রাবার', 'পিউমিস স্টোন', 'হিল স্ক্রাবার']
  },

  // ================= 3. স্টেশনারি ও অফিস সাপ্লাই (STATIONERY & ORGANIZER) =================
  // 3.1 খাতা ও ডায়েরি (5 Items)
  {
    id: 301,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'কিউট পকেট নোটবুক ও পাসবুক মিনি ডায়েরি',
    price: 49,
    oldPrice: 80,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'গুরুত্বপূর্ণ নোট ও হিসাব সহজে লিখে পকেটে বহন করার মতো আকর্ষণীয় ডায়েরি।',
    tags: ['খাতা', 'খাতা, নোটবুক ও ডায়েরি', 'নোটবুক', 'পাসবুক']
  },
  {
    id: 302,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'টু-ডু লিস্ট প্যাড ও ডেইলি মিনি প্ল্যানার',
    price: 49,
    oldPrice: 85,
    rating: 4.7,
    reviewsCount: 280,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'প্রতিদিনের কাজ ও লক্ষ্য গুছিয়ে লেখার জন্য সুন্দর চেকলিস্ট নোটপ্যাড।',
    tags: ['খাতা', 'খাতা, নোটবুক ও ডায়েরি', 'টু-ডু লিস্ট', 'প্ল্যানার']
  },
  {
    id: 303,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'স্পাইরাল বাউন্ড গ্রিড ও রুলড নোটপ্যাড (২০০ পৃষ্ঠা)',
    price: 99,
    oldPrice: 170,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ক্লাস নোট ও প্রফেশনাল লেখার জন্য স্মুথ প্রিমিয়াম পেপারের স্পাইরাল খাতা।',
    tags: ['খাতা', 'খাতা, নোটবুক ও ডায়েরি', 'স্পাইরাল নোটপ্যাড', 'নোটপ্যাড']
  },
  {
    id: 304,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'রঙিন পেস্টেল স্টিকি নোটস (Sticky Notes) ও ফ্ল্যাগস',
    price: 49,
    oldPrice: 75,
    rating: 4.7,
    reviewsCount: 275,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'বই, ল্যাপটপ বা টেবিলে জরুরি রিমাইন্ডার ও নোট আটকে রাখার জন্য রঙিন স্টিকি ফ্ল্যাগস।',
    tags: ['খাতা', 'খাতা, নোটবুক ও ডায়েরি', 'স্টিকি নোটস', 'Sticky Notes']
  },
  {
    id: 305,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'এক্সিকিউটিভ প্রফেশনাল হার্ডকভার লেদার ডায়েরি',
    price: 199,
    oldPrice: 320,
    rating: 4.9,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'অফিস মিটিং ও ব্যক্তিগত জার্নাল লেখার জন্য লাক্সারি লেদার ফিনিশ বাউন্ড ডায়েরি।',
    tags: ['খাতা', 'খাতা, নোটবুক ও ডায়েরি', 'লেদার ডায়েরি', 'হার্ডকভার']
  },

  // 3.2 রাইটিং ও আর্ট টুলস (5 Items)
  {
    id: 306,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'স্মুথ জেল পেন সেট ও কালারফুল হাইলাইটার মার্কার',
    price: 49,
    oldPrice: 85,
    rating: 4.9,
    reviewsCount: 490,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'মসৃণ লেখার জন্য স্মুথ জেল কলম ও বই দাগানোর নান্দনিক হাইলাইটার মার্কার।',
    tags: ['রাইটিং', 'রাইটিং, কালার ও আর্ট টুলস', 'জেল পেন', 'হাইলাইটার']
  },
  {
    id: 307,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'ফাইনলাইনার ড্রয়িং ও ক্যালিগ্রাফি আর্ট পেন সেট',
    price: 99,
    oldPrice: 190,
    rating: 4.8,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'স্কেচিং, ড্রয়িং ও ক্যালিগ্রাফি লেখার জন্য ওয়াটারপ্রুফ ব্ল্যাক ফাইন টিপ মার্কার সেট।',
    tags: ['রাইটিং', 'রাইটিং, কালার ও আর্ট টুলস', 'ক্যালিগ্রাফি', 'ড্রয়িং পেন']
  },
  {
    id: 308,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'কিউট পেন্সিল বক্স ও মাল্টিপারপাস জিপার পাউচ',
    price: 99,
    oldPrice: 180,
    rating: 4.8,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'কলম, পেন্সিল ও স্কেল সহজে গুছিয়ে রাখার বড় ক্যাপাসিটির ওয়াটারপ্রুফ জিপার পাউচ।',
    tags: ['রাইটিং', 'রাইটিং, কালার ও আর্ট টুলস', 'পেন্সিল বক্স', 'জিপার পাউচ']
  },
  {
    id: 309,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'কারুকার্য করা ফ্যান্সি ওয়াসি টেপ বান্ডিল (Washi Tapes)',
    price: 49,
    oldPrice: 80,
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'জার্নাল সাজানো, ক্রাফট ও গিফট র‍্যাপিংয়ের জন্য নান্দনিক প্যাটার্ন ডেকোরেটিভ টেপ।',
    tags: ['রাইটিং', 'রাইটিং, কালার ও আর্ট টুলস', 'ওয়াসি টেপ', 'Washi Tape']
  },
  {
    id: 310,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'ক্রাফট কাঁচি ও সেফটি পেপার কাটার কিট',
    price: 49,
    oldPrice: 80,
    rating: 4.7,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'কাগজ ও আর্ট ক্রাফট নিখুঁতভাবে কাটার জন্য রাউন্ড সেফটি ব্লেড কাটার।',
    tags: ['রাইটিং', 'রাইটিং, কালার ও আর্ট টুলস', 'ক্রাফট কাঁচি', 'পেপার কাটার']
  },

  // 3.3 ডেস্ক অর্গানাইজার (5 Items)
  {
    id: 311,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'মেটাল মেশ পেন হোল্ডার ও মিনি ডেস্ক ট্র্যাশ বিন',
    price: 99,
    oldPrice: 170,
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'পড়াশোনা বা অফিসের টেবিল গোছগাছ রাখতে প্রিমিয়াম স্টেইনলেস মেটাল অর্গানাইজার।',
    tags: ['ডেস্ক অর্গানাইজার', 'ডেস্ক অর্গানাইজার ও ফাইল', 'পেন হোল্ডার', 'ট্র্যাশ বিন']
  },
  {
    id: 312,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'মাল্টি-পকেট ফাইল অ্যান্ড ডকুমেন্ট হোল্ডার ফোল্ডার',
    price: 99,
    oldPrice: 175,
    rating: 4.8,
    reviewsCount: 350,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'সার্টিফিকেট ও প্রয়োজনীয় কাগজপত্র ভাঁজ না হয়ে সুরক্ষিত রাখার ফাইল ফোল্ডার।',
    tags: ['ডেস্ক অর্গানাইজার', 'ডেস্ক অর্গানাইজার ও ফাইল', 'ফাইল', 'ডকুমেন্ট হোল্ডার']
  },
  {
    id: 313,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'কেবল অর্গানাইজার সিলিকন ক্লিপ ও ডেস্ক মেট',
    price: 49,
    oldPrice: 80,
    rating: 4.8,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ডেস্কের তার ও চার্জার সুন্দরভাবে গুছিয়ে রাখার সেলফ-আঠালো প্রিমিয়াম ক্লিপ।',
    tags: ['ডেস্ক অর্গানাইজার', 'ডেস্ক অর্গানাইজার ও ফাইল', 'কেবল অর্গানাইজার', 'ক্লিপ']
  },
  {
    id: 314,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'মাল্টি-লেয়ার অ্যাক্রিলিক ড্রয়ার ডেস্ক অর্গানাইজার',
    price: 199,
    oldPrice: 340,
    rating: 4.9,
    reviewsCount: 480,
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'টেবিলের ক্লিপ, স্ট্যাপলার ও মেকআপ সামগ্রী গুছিয়ে রাখার স্বচ্ছ অ্যাক্রিলিক ড্রয়ার।',
    tags: ['ডেস্ক অর্গানাইজার', 'ডেস্ক অর্গানাইজার ও ফাইল', 'অ্যাক্রিলিক ড্রয়ার', 'ডেস্ক ড্রয়ার']
  },
  {
    id: 315,
    category: 'স্টেশনারি ও অফিস সাপ্লাই',
    title: 'অ্যাডজাস্টেবল মেটাল বুকস্ট্যান্ড ও রিডিং হোল্ডার',
    price: 199,
    oldPrice: 320,
    rating: 4.8,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'বই বা কুরআন রেখে আরামদায়কভাবে পড়ার জন্য উচ্চতা পরিবর্তনযোগ্য মেটাল স্ট্যান্ড।',
    tags: ['ডেস্ক অর্গানাইজার', 'ডেস্ক অর্গানাইজার ও ফাইল', 'বুকস্ট্যান্ড', 'রিডিং হোল্ডার']
  },

  // ================= 4. ঘর সাজানো ও লাইফস্টাইল (HOME DECOR & LIFESTYLE) =================
  // 4.1 হোম ডেকোর (5 Items)
  {
    id: 401,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'কৃত্রিম ছোট টবসহ গাছ (Mini Artificial Succulents)',
    price: 99,
    oldPrice: 190,
    rating: 4.9,
    reviewsCount: 820,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ঘর বা অফিস টেবিলের সৌন্দর্য বাড়াতে প্রাণবন্ত ও টেকসই কৃত্রিম বনসাই গাছ।',
    tags: ['হোম ডেকোর', 'হোম ডেকোর ও মোমবাতি', 'গাছ', 'Succulents']
  },
  {
    id: 402,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'সুগন্ধি অ্যারোমা সয় ওয়াক্স মোমবাতি (Scented Candles) ও স্ট্যান্ড',
    price: 199,
    oldPrice: 320,
    rating: 4.9,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ল্যাভেন্ডার ও ভ্যানিলা ফ্লেভারের ন্যাচারাল সয় ওয়াক্স মোমবাতি যা মন শান্ত রাখে।',
    tags: ['হোম ডেকোর', 'হোম ডেকোর ও মোমবাতি', 'সুগন্ধি মোমবাতি', 'Scented Candle']
  },
  {
    id: 403,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'ওয়াল হ্যাঙ্গিং কি-হোল্ডার ও ডেকোরেটিভ হুক সেট',
    price: 49,
    oldPrice: 90,
    rating: 4.6,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'চাবি, মাস্ক ও ছোট জিনিস ঝুলিয়ে রাখার জন্য ডাবল সাইডেড ওয়াটারপ্রুফ ওয়াল হুক।',
    tags: ['হোম ডেকোর', 'হোম ডেকোর ও মোমবাতি', 'কি-হোল্ডার', 'ডেকোরেটিভ হুক']
  },
  {
    id: 404,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'ছোট কিউট ফটো ফ্রেম ও নান্দনিক টেবিল শোপিস',
    price: 99,
    oldPrice: 180,
    rating: 4.8,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'স্মরণীয় ছবি ও আর্ট প্রিন্ট সাজিয়ে রাখার জন্য মিনিমালিস্ট গোল্ডেন ফটো ফ্রেম।',
    tags: ['হোম ডেকোর', 'হোম ডেকোর ও মোমবাতি', 'ফটো ফ্রেম', 'শোপিস']
  },
  {
    id: 405,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'মডার্ন মিনিমালিস্ট সাইলেন্ট মেটাল ও প্লাস্টিক ওয়াল ক্লক',
    price: 299,
    oldPrice: 490,
    rating: 4.8,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ঘরের সৌন্দর্য কয়েকগুণ বাড়িয়ে দেওয়ার নিঃশব্দ টিকটিকতাহীন আধুনিক দেয়াল ঘড়ি।',
    tags: ['হোম ডেকোর', 'হোম ডেকোর ও মোমবাতি', 'ওয়াল ক্লক', 'ঘড়ি']
  },

  // 4.2 লাইটিং ও ইলেকট্রনিক্স (5 Items)
  {
    id: 406,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'ইউএসবি রিচার্জেবল মোশন সেন্সর নাইট লাইট',
    price: 199,
    oldPrice: 340,
    rating: 4.8,
    reviewsCount: 480,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'মানুষের উপস্থিতি পেলে স্বয়ংক্রিয়ভাবে জ্বলে ওঠা আধুনিক ম্যাগনেটিক বেডরুম লাইট।',
    tags: ['লাইটিং', 'লাইটিং ও নাইট ল্যাম্প', 'নাইট লাইট', 'মোশন সেন্সর']
  },
  {
    id: 407,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'ফ্যান্সি ফেয়ারি টুনি লাইট (Fairy String Lights 5m)',
    price: 99,
    oldPrice: 180,
    rating: 4.8,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ঘরের দেয়াল ও ফটো কর্নার আলোকিত করার জন্য ওয়াটারপ্রুফ ওয়ার্ম ফেয়ারি লাইট।',
    tags: ['লাইটিং', 'লাইটিং ও নাইট ল্যাম্প', 'ফেয়ারি লাইট', 'টুনি লাইট']
  },
  {
    id: 408,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'ছোট টেবিল ডেক্স ফ্যান ও মিনি স্টাডি লাইট',
    price: 399,
    oldPrice: 620,
    rating: 4.9,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'তীব্র গরমে পড়ার টেবিলে ব্যবহারের জন্য রিচার্জেবল ফ্যান ও সফট রিডিং লাইট।',
    tags: ['লাইটিং', 'লাইটিং ও নাইট ল্যাম্প', 'ডেস্ক ফ্যান', 'স্টাডি লাইট']
  },
  {
    id: 409,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'রোমান্টিক সানসেট প্রজেকশন ল্যাম্প ও অ্যাম্বিয়েন্স লাইট',
    price: 199,
    oldPrice: 350,
    rating: 4.8,
    reviewsCount: 510,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ফটোগ্রাফি ও ঘরের নান্দনিক আবহ সৃষ্টির জন্য ৩৬০ ডিগ্রি রোটেটিং সানসেট ল্যাম্প।',
    tags: ['লাইটিং', 'লাইটিং ও নাইট ল্যাম্প', 'সানসেট ল্যাম্প', 'প্রজেকশন ল্যাম্প']
  },
  {
    id: 410,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'ম্যাগনেটিক স্টিক-অন রিচার্জেবল এলইডি লাইট বার',
    price: 199,
    oldPrice: 330,
    rating: 4.8,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'আলমারি, কিচেন ক্যাবিনেট বা আয়নার পাশে লাগানোর রিচার্জেবল ব্রাইট এলইডি বার।',
    tags: ['লাইটিং', 'লাইটিং ও নাইট ল্যাম্প', 'লাইট বার', 'ক্যাবিনেট লাইট']
  },

  // 4.3 স্টোরেজ ও হ্যাঙ্গার (5 Items)
  {
    id: 411,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'ভেলভেট শোল্ডার হ্যাঙ্গার ও মাল্টি-লেয়ার হ্যাঙ্গার সেট',
    price: 99,
    oldPrice: 180,
    rating: 4.8,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'কাপড় স্লিপ না করে এক হ্যাঙ্গারে একাধিক পোশাক গুছিয়ে রাখার নন-স্লিপ হ্যাঙ্গার।',
    tags: ['স্টোরেজ ও হ্যাঙ্গার', 'স্টোরেজ র্যাক ও হ্যাঙ্গার', 'শোল্ডার হ্যাঙ্গার', 'মাল্টি-লেয়ার']
  },
  {
    id: 412,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'জুতো রাখার প্লাস্টিক র্যাক বা স্পেস সেভিং অর্গানাইজার',
    price: 199,
    oldPrice: 340,
    rating: 4.7,
    reviewsCount: 360,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ঘরের প্রবেশদ্বারে জুতো সুন্দরভাবে গুছিয়ে রাখার ৪-লেয়ার পোর্টেবল জুতো র্যাক।',
    tags: ['স্টোরেজ ও হ্যাঙ্গার', 'স্টোরেজ র্যাক ও হ্যাঙ্গার', 'জুতো র্যাক', 'অর্গানাইজার']
  },
  {
    id: 413,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'ফোল্ডিং লন্ড্রি বাস্কেট (কোলাপসিবল কাপড়ের ঝুড়ি)',
    price: 299,
    oldPrice: 460,
    rating: 4.8,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ময়লা কাপড় গুছিয়ে রাখার জন্য ওয়াটারপ্রুফ বড় সাইজের ভাঁজযোগ্য লন্ড্রি ব্যাগ।',
    tags: ['স্টোরেজ ও হ্যাঙ্গার', 'স্টোরেজ র্যাক ও হ্যাঙ্গার', 'লন্ড্রি বাস্কেট', 'কাপড়ের ঝুড়ি']
  },
  {
    id: 414,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'আন্ডারগার্মেন্টস ও মোজা স্টোরেজ ডিভাইডার ট্রাঙ্ক',
    price: 99,
    oldPrice: 170,
    rating: 4.7,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'আলমারির ছোট কাপড় ও মোজা আলাদা আলাদা খোপে সুন্দরভাবে রাখার বক্স।',
    tags: ['স্টোরেজ ও হ্যাঙ্গার', 'স্টোরেজ র্যাক ও হ্যাঙ্গার', 'ডিভাইডার', 'স্টোরেজ বক্স']
  },
  {
    id: 415,
    category: 'ঘর সাজানো ও লাইফস্টাইল',
    title: 'ওয়াল মাউন্টেড স্টেইনলেস হ্যাঙ্গার ও ডোর রোব হুক সেট',
    price: 49,
    oldPrice: 85,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'দরজার পেছনে তোয়ালে ও ব্যাগ ঝুলানোর জন্য শক্তিশালী স্টেইনলেস স্টিল হুক।',
    tags: ['স্টোরেজ ও হ্যাঙ্গার', 'স্টোরেজ র্যাক ও হ্যাঙ্গার', 'হ্যাঙ্গার হুক', 'রোব হুক']
  },

  // ================= 5. গ্যাজেট ও মোবাইল এক্সেসরিজ (TECH & GADGETS) =================
  // 5.1 মোবাইল এক্সেসরিজ (5 Items)
  {
    id: 501,
    category: 'গ্যাজেট ও মোবাইল এক্সেসরিজ',
    title: 'টেবিলটপ ও বেডসাইড ফোল্ডিং মোবাইল হোল্ডার/স্ট্যান্ড',
    price: 49,
    oldPrice: 90,
    rating: 4.8,
    reviewsCount: 750,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'টেবিলে বা বেডে রেখে ফোন ব্যবহার ও ভিডিও দেখার জন্য মজবুত ফোল্ডিং পকেট স্ট্যান্ড।',
    tags: ['মোবাইল এক্সেসরিজ', 'মোবাইল এক্সেসরিজ ও স্ট্যান্ড', 'মোবাইল হোল্ডার', 'মোবাইল স্ট্যান্ড']
  },
  {
    id: 502,
    category: 'গ্যাজেট ও মোবাইল এক্সেসরিজ',
    title: 'স্প্রিং ক্যাবল প্রটেক্টর ও ক্যাবল ওয়াইন্ডার কিট',
    price: 49,
    oldPrice: 70,
    rating: 4.7,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'চার্জার ক্যাবলের মাথা ভেঙ্গে যাওয়া রোধ করতে রঙিন স্প্রিং প্রটেক্টর ও টাই।',
    tags: ['মোবাইল এক্সেসরিজ', 'মোবাইল এক্সেসরিজ ও স্ট্যান্ড', 'ক্যাবল প্রটেক্টর', 'ক্যাবল ওয়াইন্ডার']
  },
  {
    id: 503,
    category: 'গ্যাজেট ও মোবাইল এক্সেসরিজ',
    title: 'ইয়ারফোন ও এয়ারপডস কভার প্রটেক্টিভ সিলিকন কেস',
    price: 49,
    oldPrice: 85,
    rating: 4.8,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'স্ক্র্যাচ ও পতন থেকে রক্ষা করতে প্রিমিয়াম সফট সিলিকন এয়ারপডস প্রোটেকশন কেস।',
    tags: ['মোবাইল এক্সেসরিজ', 'মোবাইল এক্সেসরিজ ও স্ট্যান্ড', 'এয়ারপডস কভার', 'ইয়ারফোন কেস']
  },
  {
    id: 504,
    category: 'গ্যাজেট ও মোবাইল এক্সেসরিজ',
    title: 'সার্বজনীন ওয়াটারপ্রুফ টাচ মোবাইল পাউচ',
    price: 99,
    oldPrice: 170,
    rating: 4.7,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'বৃষ্টি ও পানিতে ফোন সুরক্ষিত রাখতে টাচ-রেসপন্সিভ আইপিএক্স৮ ওয়াটারপ্রুফ পাউচ।',
    tags: ['মোবাইল এক্সেসরিজ', 'মোবাইল এক্সেসরিজ ও স্ট্যান্ড', 'ওয়াটারপ্রুফ পাউচ', 'মোবাইল পাউচ']
  },
  {
    id: 505,
    category: 'গ্যাজেট ও মোবাইল এক্সেসরিজ',
    title: 'এলইডি সেলফি রিং লাইট ও ফোন ট্রাইপড মাউন্ট',
    price: 99,
    oldPrice: 180,
    rating: 4.8,
    reviewsCount: 460,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ভিডিও কল, সেলফি ও রিল তৈরির জন্য ক্লিপ-অন ৩-কালার রিচার্জেবল সেলফি রিং লাইট।',
    tags: ['মোবাইল এক্সেসরিজ', 'মোবাইল এক্সেসরিজ ও স্ট্যান্ড', 'সেলফি লাইট', 'রিং লাইট']
  },

  // 5.2 স্মার্ট ইউটিলিটি (5 Items)
  {
    id: 506,
    category: 'গ্যাজেট ও মোবাইল এক্সেসরিজ',
    title: 'ক্যাবল টাই ও সিলিকন অর্গানাইজার স্ট্র্যাপ প্যাক',
    price: 49,
    oldPrice: 75,
    rating: 4.7,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'চার্জিং তার ও তারের জট পরিচ্ছন্নভাবে বেঁধে রাখার রিইউজেবল সিলিকন স্ট্র্যাপ।',
    tags: ['স্মার্ট ইউটিলিটি', 'স্মার্ট ইউটিলিটি ও ক্যাবল', 'ক্যাবল টাই', 'সিলিকন স্ট্র্যাপ']
  },
  {
    id: 507,
    category: 'গ্যাজেট ও মোবাইল এক্সেসরিজ',
    title: 'টাইপ-সি ও ইউএসবি হাই-স্পিড ওটিজি (OTG) এডাপ্টার',
    price: 49,
    oldPrice: 80,
    rating: 4.8,
    reviewsCount: 430,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'মোবাইলে পেনড্রাইভ, মাউস বা কীবোর্ড দ্রুত সংযোগ করার মেটালিক ওটিজি কনভার্টার।',
    tags: ['স্মার্ট ইউটিলিটি', 'স্মার্ট ইউটিলিটি ও ক্যাবল', 'ওটিজি', 'OTG এডাপ্টার']
  },
  {
    id: 508,
    category: 'গ্যাজেট ও মোবাইল এক্সেসরিজ',
    title: 'পোর্টেবল ফ্লেক্সিবল মিনি ট্রাইপড ও সেলফি স্ট্যান্ড',
    price: 99,
    oldPrice: 190,
    rating: 4.8,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'যে কোনো স্থানে মোবাইল আটকে ছবি ও ভিডিও বানানোর ফ্লেক্সিবল অক্টোপাস ট্রাইপড।',
    tags: ['স্মার্ট ইউটিলিটি', 'স্মার্ট ইউটিলিটি ও ক্যাবল', 'পোর্টেবল ট্রাইপড', 'মিনি ট্রাইপড']
  },
  {
    id: 509,
    category: 'গ্যাজেট ও মোবাইল এক্সেসরিজ',
    title: '৩-ইন-১ ১০০W মাল্টি ফাস্ট চার্জিং ব্রেইডেড ক্যাবল',
    price: 199,
    oldPrice: 320,
    rating: 4.8,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'টাইপ-সি, আইফোন ও মাইক্রো ইউএসবি এক ক্যাবলেই ফাস্ট চার্জ দেওয়ার সুপার ক্যাবল।',
    tags: ['স্মার্ট ইউটিলিটি', 'স্মার্ট ইউটিলিটি ও ক্যাবল', 'ফাস্ট চার্জিং', 'চার্জার ক্যাবল']
  },
  {
    id: 510,
    category: 'গ্যাজেট ও মোবাইল এক্সেসরিজ',
    title: 'TWS ট্রু ওয়্যারলেস ব্লুটুথ ইয়ারবাডস (Deep Bass & ANC)',
    price: 399,
    oldPrice: 650,
    rating: 4.9,
    reviewsCount: 1140,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'স্মার্ট টাচ কন্ট্রোল, নয়েজ ক্যান্সেলেশন এবং ২৪ ঘণ্টা দীর্ঘ ব্যাটারি ব্যাকআপ।',
    tags: ['স্মার্ট ইউটিলিটি', 'স্মার্ট ইউটিলিটি ও ক্যাবল', 'ইয়ারবাডস', 'ব্লুটুথ']
  },

  // ================= 6. বাচ্চাদের খেলনা ও গিফট (TOYS & GIFT ITEMS) =================
  // 6.1 খেলনা সামগ্রী (5 Items)
  {
    id: 601,
    category: 'বাচ্চাদের খেলনা ও গিফট',
    title: 'প্লাস্টিক পুল-ব্যাক কার ও মিনি রেসিং ভেহিকেল সেট',
    price: 49,
    oldPrice: 85,
    rating: 4.8,
    reviewsCount: 460,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'পেছনে টেনে ছেড়ে দিলে দ্রুত গতিতে ছুটে চলা বাচ্চাদের আকর্ষণীয় খেলনা গাড়ি।',
    tags: ['খেলনা সামগ্রী', 'বাচ্চাদের খেলনা সামগ্রী ও গেম', 'পুল-ব্যাক কার', 'খেলনা গাড়ি']
  },
  {
    id: 602,
    category: 'বাচ্চাদের খেলনা ও গিফট',
    title: 'থ্রিডি পাজল গেম, মেজ গেম ও স্পিড রুবিকস কিউব',
    price: 99,
    oldPrice: 180,
    rating: 4.9,
    reviewsCount: 710,
    image: 'https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'বাচ্চাদের ব্রেন ডেভেলপমেন্ট ও স্মৃতিশক্তি বৃদ্ধির স্মুথ রোটেটিং রুবিকস কিউব।',
    tags: ['খেলনা সামগ্রী', 'বাচ্চাদের খেলনা সামগ্রী ও গেম', 'পাজল গেম', 'রুবিকস কিউব']
  },
  {
    id: 603,
    category: 'বাচ্চাদের খেলনা ও গিফট',
    title: 'অটোমেটিক বাবল মেকার গান ও বাবল সলিউশন কিট',
    price: 199,
    oldPrice: 350,
    rating: 4.9,
    reviewsCount: 630,
    image: 'https://images.unsplash.com/photo-1537655780520-1e392ead81f2?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'বাটন চাপলেই শত শত রঙিন সাবানের বুদ্বুদ ওড়ানো বাচ্চাদের সুপার ফান বাবল গান।',
    tags: ['খেলনা সামগ্রী', 'বাচ্চাদের খেলনা সামগ্রী ও গেম', 'বাবল মেকার', 'বাবল গান']
  },
  {
    id: 604,
    category: 'বাচ্চাদের খেলনা ও গিফট',
    title: 'মিনি কিউট সফট প্লাশ পুতুল ও কি-রিং টয়',
    price: 99,
    oldPrice: 170,
    rating: 4.8,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'বাচ্চাদের জন্য অত্যন্ত নরম ও ভেলভেট ফেব্রিকের কিউট মিনি সফট টয়।',
    tags: ['খেলনা সামগ্রী', 'বাচ্চাদের খেলনা সামগ্রী ও গেম', 'সফট টয়', 'পুতুল']
  },
  {
    id: 605,
    category: 'বাচ্চাদের খেলনা ও গিফট',
    title: 'স্মার্ট এলসিডি ড্রয়িং বোর্ড ও কালারিং বুক উইথ ক্রাফট',
    price: 299,
    oldPrice: 480,
    rating: 4.9,
    reviewsCount: 770,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'বাচ্চাদের আঁকাআঁকি ও লেখার জন্য এক-ক্লিকে মুছে ফেলার ইলেকট্রনিক ড্রয়িং স্লেট।',
    tags: ['খেলনা সামগ্রী', 'বাচ্চাদের খেলনা সামগ্রী ও গেম', 'ড্রয়িং বোর্ড', 'কালারিং বুক']
  },

  // 6.2 গিফট আইটেম (5 Items)
  {
    id: 606,
    category: 'বাচ্চাদের খেলনা ও গিফট',
    title: 'মেটাল ও এক্রিলিক কার্টুন কি-রিং (Keychains)',
    price: 49,
    oldPrice: 80,
    rating: 4.9,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'ব্যাগ, চাবি বা গিফটের জন্য কিউট কার্টুন এক্রিলিক কি-চেইন কালেকশন।',
    tags: ['গিফট আইটেম', 'গিফট আইটেম ও কি-রিং', 'কি-রিং', 'Keychains']
  },
  {
    id: 607,
    category: 'বাচ্চাদের খেলনা ও গিফট',
    title: 'কিউট মানি ব্যাংক বা মাটির/প্লাস্টিকের সেভিং ব্যাংক',
    price: 99,
    oldPrice: 175,
    rating: 4.8,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'বাচ্চাদের টাকা জমানোর অভ্যাস গড়ে তুলতে আকর্ষণীয় ডিজাইনের নিরাপদ মানি ব্যাংক।',
    tags: ['গিফট আইটেম', 'গিফট আইটেম ও কি-রিং', 'মানি ব্যাংক', 'পিগি ব্যাংক']
  },
  {
    id: 608,
    category: 'বাচ্চাদের খেলনা ও গিফট',
    title: 'বার্থডে সেলিব্রেশন উইশ কার্ড ও লাক্সারি গিফট ব্যাগ সেট',
    price: 49,
    oldPrice: 80,
    rating: 4.8,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'প্রিয়জনকে জন্মদিনের শুভেচ্ছা জানাতে আকর্ষণীয় গ্রিটিংস কার্ড ও গিফট ব্যাগ।',
    tags: ['গিফট আইটেম', 'গিফট আইটেম ও কি-রিং', 'উইশ কার্ড', 'গিফট ব্যাগ']
  },
  {
    id: 609,
    category: 'বাচ্চাদের খেলনা ও গিফট',
    title: 'মিউজিক্যাল রোমান্টিক ক্রিস্টাল স্নো গ্লোব শোপিস',
    price: 199,
    oldPrice: 340,
    rating: 4.9,
    reviewsCount: 460,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'আলো ও নরম মিউজিক যুক্ত কাঁচের স্নো গ্লোব যা উপহার হিসেবে অত্যন্ত জনপ্রিয়।',
    tags: ['গিফট আইটেম', 'গিফট আইটেম ও কি-রিং', 'স্নো গ্লোব', 'শোপিস']
  },
  {
    id: 610,
    category: 'বাচ্চাদের খেলনা ও গিফট',
    title: 'লাক্সারি সফট প্লাশ জায়ান্ট টেডি বিয়ার গিফট বক্স',
    price: 399,
    oldPrice: 650,
    rating: 5.0,
    reviewsCount: 920,
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    description: 'উপহার দেওয়ার জন্য অসাধারণ কিউট এবং নরম ভেলভেট প্রিমিয়াম টেডি টয় সেট।',
    tags: ['গিফট আইটেম', 'গিফট আইটেম ও কি-রিং', 'টেডি বিয়ার', 'গিফট বক্স']
  }
];

const fullBannerSlides = [
  {
    id: 1,
    badge: '🔥 মেগা ধামাকা অফার',
    badgePrice: '৳৯৯ ONLY',
    title: 'EVERYDAY ESSENTIALS AT ৳৯৯',
    desc: 'প্লাস্টিক ও স্টিলের বাসন, কিচেন মসলার জার, ফেয়ারি লাইট এবং মেকআপ ব্রাশ সেট এখন ফিক্সড ৯৯৳ রেটে!',
    pills: ['🚚 সুপার ফাস্ট ডেলিভারি', '⭐ সেরা গুণগত মান', '🏷️ ফিক্সড ৯৯৳ রেট'],
    ctaText: '৯৯৳ কালেকশন এক্সপ্লোর করুন',
    targetTier: '99',
    themeClass: 'slideThemeYellow',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    floatPrice: '৳৯৯',
    floatDiscount: '🔥 ৪২% বিশেষ ছাড়'
  },
  {
    id: 2,
    badge: '⚡ বাজেট সেভার কর্নার',
    badgePrice: '৳৪৯ ONLY',
    title: 'BUDGET DEALS AT JUST ৳৪৯',
    desc: 'পটেটো পিলার, সিলিকন অয়েল ব্রাশ, মাইক্রোফাইবার ক্লথ ও পকেট মোবাইল স্ট্যান্ড সহ আকর্ষণীয় সব গ্যাজেট!',
    pills: ['⚡ লিমিটেড স্টক', '🛡️ ১০০% প্রিমিয়াম মান', '📦 দ্রুত হোম ডেলিভারি'],
    ctaText: '৪৯৳ বাজেট কর্নার দেখুন',
    targetTier: '49',
    themeClass: 'slideThemeGreen',
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80',
    floatPrice: '৳৪৯',
    floatDiscount: '⚡ ৪৪% মহা সাশ্রয়'
  },
  {
    id: 3,
    badge: '💎 ভ্যালু ও প্রিমিয়াম ডিলস',
    badgePrice: '৳১৯৯ ও ৳২৯৯',
    title: 'KITCHEN & HOME SMART DEALS',
    desc: 'হ্যান্ডহেল্ড চপার, মোশন সেন্সর নাইট লাইট, নন-স্টিক ফ্রাই প্যান ও এলসিডি রাইটিং ট্যাবলেট।',
    pills: ['👑 বেস্ট সেলার ডিল', '🌿 হোম ও গ্যাজেট হাব', '🚀 ফাস্ট ডেলিভারি'],
    ctaText: '১৯৯৳ ও ২৯৯৳ অফার দেখুন',
    targetTier: '199',
    themeClass: 'slideThemeBlue',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80',
    floatPrice: '৳১৯৯',
    floatDiscount: '💎 ৩৯% পর্যন্ত ডিসকাউন্ট'
  },
  {
    id: 4,
    badge: '🚀 এক্সক্লুসিভ টপ রেটেড',
    badgePrice: '৳৩৯৯ ONLY',
    title: 'PREMIUM TECH & LUXURY GIFT ৳৩৯৯',
    desc: 'ডিপ বাস ANC ব্লুটুথ ইয়ারবাডস, ইউএসবি পোর্টেবল জুসার ব্লেন্ডার এবং সফট টেডি গিফট সেট।',
    pills: ['🏆 টপ রেটেড পণ্য', '💯 প্রিমিয়াম গ্যাজেট', '⚡ ওয়ারেন্টি সুবিধা'],
    ctaText: '৩৯৯৳ কালেকশন কিনুন',
    targetTier: '399',
    themeClass: 'slideThemePurple',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    floatPrice: '৳৩৯৯',
    floatDiscount: '👑 ৪৫% বিশেষ মূল্যছাড়'
  }
];

export default function Home() {
  // State for interactive features
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('সব ক্যাটাগরি');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<number[]>([]);

  // Full Hero Banner Slider State
  const [currentBannerSlide, setCurrentBannerSlide] = useState<number>(0);
  const [isBannerPaused, setIsBannerPaused] = useState<boolean>(false);

  // Auto-rotation timer for Full Hero Banner (4.2 seconds)
  useEffect(() => {
    if (isBannerPaused) return;
    const interval = setInterval(() => {
      setCurrentBannerSlide((prev) => (prev + 1) % fullBannerSlides.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isBannerPaused]);

  const handlePrevBannerSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentBannerSlide((prev) => (prev === 0 ? fullBannerSlides.length - 1 : prev - 1));
  };

  const handleNextBannerSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentBannerSlide((prev) => (prev + 1) % fullBannerSlides.length);
  };

  const toggleWishlist = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        triggerToast("💔 উইশলিস্ট থেকে সরানো হয়েছে");
        return prev.filter((id) => id !== productId);
      } else {
        triggerToast("❤️ উইশলিস্টে যুক্ত করা হয়েছে!");
        return [...prev, productId];
      }
    });
  };

  const handleSelectNavCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory(null);
    setSelectedTier('all');
    setActiveDropdown(null);
    document.getElementById('shop-grid-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectSubCategory = (categoryName: string, subCategory: { name: string; keyword?: string }) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory(subCategory.keyword === 'সব' ? null : (subCategory.keyword || subCategory.name));
    setSelectedTier('all');
    setActiveDropdown(null);
    triggerToast(`🔍 ফিল্টার: ${subCategory.name}`);
    document.getElementById('shop-grid-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // 1. Price tier filter
      if (selectedTier !== 'all' && product.price !== parseInt(selectedTier, 10)) {
        return false;
      }
      // 2. Category filter
      if (selectedCategory !== 'সব ক্যাটাগরি' && product.category !== selectedCategory) {
        return false;
      }
      // 3. Subcategory keyword filter
      if (selectedSubCategory && selectedSubCategory !== 'সব') {
        const subQuery = selectedSubCategory.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(subQuery);
        const matchesDesc = product.description.toLowerCase().includes(subQuery);
        const matchesTags = product.tags?.some((t) => {
          const tLower = t.toLowerCase();
          return subQuery.includes(tLower) || tLower.includes(subQuery);
        });
        if (!matchesTitle && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      // 4. Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesPrice = product.price.toString().includes(query);
        if (!matchesTitle && !matchesCategory && !matchesPrice) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'low-high') return a.price - b.price;
      if (sortBy === 'high-low') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [selectedTier, selectedCategory, selectedSubCategory, searchQuery, sortBy]);

  // Cart calculations
  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const totalCartPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  // Cart actions
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });

    setAddedItemIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== product.id));
    }, 1500);

    triggerToast(`🛒 "${product.title.slice(0, 24)}..." কার্টে যুক্ত হয়েছে!`);
  };

  const handleUpdateQty = (productId: number, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; quantity: number }[];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    triggerToast("🗑️ পণ্যটি কার্ট থেকে সরানো হয়েছে");
  };

  // 5 Related products for quick view modal
  const modalRelatedProducts = useMemo(() => {
    if (!quickViewProduct) return [];
    const sameCategory = mockProducts.filter(
      (p) => p.id !== quickViewProduct.id && p.category === quickViewProduct.category
    );
    if (sameCategory.length >= 5) {
      return sameCategory.slice(0, 5);
    }
    const otherSameTier = mockProducts.filter(
      (p) => p.id !== quickViewProduct.id && p.category !== quickViewProduct.category && p.price === quickViewProduct.price
    );
    return [...sameCategory, ...otherSameTier].slice(0, 5);
  }, [quickViewProduct]);

  return (
    <div className={styles.appContainer}>
      {/* 1. Top Notice Announcement */}
      <div className={styles.noticeBar}>
        🔔 বিশেষ মূল্যছাড়: মার্ডি মার্ট-এ পাচ্ছেন প্রতিটি ক্যাটাগরিতে অবিশ্বাস্য ৳৪৯, ৳৯৯, ৳১৯৯, ৳২৯৯ ও ৳৩৯৯ বাজেট অফার! 🔔
      </div>

      {/* 2. Top Utility Subheader */}
      <div className={styles.utilityBar}>
        <div className={styles.utilityInner}>
          <div className={styles.utilityLeft}>
            <div className={styles.utilityItem}>🚀 দেশজুড়ে দ্রুত হোম ডেলিভারি</div>
            <div className={styles.utilityItem}>⚖️ ন্যায্য ও সাশ্রয়ী নির্ধারিত মূল্য</div>
            <div className={styles.utilityItem}>⭐ ৪.৯ কাস্টমার রেটিং (১৫k+ রিভিউ)</div>
          </div>
          <div className={styles.utilityRight}>
            <div className={styles.utilityItem}>🇧🇩 বাংলাদেশ <FiChevronDown size={12} /></div>
            <div className={styles.utilityItem}>বাংলা (BN) <FiChevronDown size={12} /></div>
            <div className={styles.utilityItem}><FiHelpCircle size={14} /> হেল্পলাইন: ০৯৬১২-০০০০০০</div>
          </div>
        </div>
      </div>

      {/* 3. Main Header */}
      <header className={styles.mainHeader}>
        <div className={styles.headerInner}>
          <div className={styles.logo} onClick={() => { setSelectedTier('all'); setSelectedCategory('সব ক্যাটাগরি'); setSearchQuery(''); }} style={{ cursor: 'pointer' }}>
            Mardy<span>Mart</span>
          </div>

          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="পণ্য, ক্যাটাগরি বা বাজেট দিয়ে খুঁজুন (যেমন: ৯৯, খেজুর, ফ্যান, বাটার)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className={styles.headerActions}>
            <div className={styles.actionBtn}>
              <FiHeart size={20} />
            </div>
            <div className={styles.actionBtn}>
              <FiUser size={20} />
            </div>
            <div className={styles.cartBtn} onClick={() => setIsCartOpen(true)}>
              <FiShoppingBag size={19} color="#000000" />
              <span>৳{totalCartPrice.toFixed(2)}</span>
              {totalCartCount > 0 && (
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontWeight: 800 }}>
                  {totalCartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 4. Category & Sub-Category Navigation Bar */}
      <nav className={styles.navRow}>
        <div className={styles.navInner}>
          <div 
            className={`${styles.navLinkItem} ${selectedCategory === 'সব ক্যাটাগরি' && !selectedSubCategory ? styles.active : ''}`}
            onClick={() => { setSelectedCategory('সব ক্যাটাগরি'); setSelectedSubCategory(null); setSelectedTier('all'); }}
          >
            সব পণ্য
          </div>

          {mainNavCategories.map((cat) => {
            const isCatActive = selectedCategory === cat.categoryFilter;
            const isOpen = activeDropdown === cat.id;

            return (
              <div 
                key={cat.id} 
                className={styles.navItemWrapper}
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div 
                  className={`${styles.navLinkItem} ${isCatActive ? styles.active : ''}`}
                  onClick={() => handleSelectNavCategory(cat.categoryFilter)}
                >
                  <span>{cat.title}</span>
                  <FiChevronDown 
                    size={13} 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'none', 
                      transition: 'transform 0.2s',
                      opacity: 0.7 
                    }} 
                  />
                </div>

                {isOpen && (
                  <div className={styles.navDropdown}>
                    <div className={styles.dropdownHeader}>{cat.title}</div>
                    {cat.subcategories.map((sub, idx) => {
                      const isSubActive = selectedSubCategory === (sub.keyword === 'সব' ? null : (sub.keyword || sub.name));
                      return (
                        <div
                          key={idx}
                          className={`${styles.navDropdownItem} ${isSubActive ? styles.activeSubItem : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectSubCategory(cat.categoryFilter, sub);
                          }}
                        >
                          <span>{sub.name}</span>
                          <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>→</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div 
            className={styles.navLinkItem}
            onClick={() => { 
              setSelectedTier('99'); 
              setSelectedCategory('সব ক্যাটাগরি');
              setSelectedSubCategory(null);
              document.getElementById('shop-grid-section')?.scrollIntoView({ behavior: 'smooth' }); 
            }}
            style={{ color: '#ef4444', fontWeight: 800, marginLeft: 'auto' }}
          >
            🔥 ৯৯৳ স্পেশাল ডিল
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={styles.contentWrapper}>
        {/* 5. FULL HERO BANNER CAROUSEL (OPTION 2) */}
        <section 
          className={styles.fullHeroSliderWrapper}
          onMouseEnter={() => setIsBannerPaused(true)}
          onMouseLeave={() => setIsBannerPaused(false)}
        >
          {/* Left Arrow Button */}
          <button 
            className={styles.bannerNavBtnLeft}
            onClick={handlePrevBannerSlide}
            title="পূর্ববর্তী স্লাইড"
          >
            <FiChevronLeft size={26} />
          </button>

          {/* Active Banner Slide */}
          {(() => {
            const slide = fullBannerSlides[currentBannerSlide];
            const themeStyle = styles[slide.themeClass] || styles.slideThemeYellow;

            return (
              <div key={slide.id} className={`${styles.bannerSlide} ${themeStyle}`}>
                {/* Left Column: Typography, Badges & CTA */}
                <div className={styles.bannerLeft}>
                  <div className={styles.bannerTopBadge}>
                    <span>{slide.badge}</span>
                    <span className={styles.bannerBadgePrice}>{slide.badgePrice}</span>
                  </div>

                  <h1 className={styles.bannerTitle}>
                    {slide.title}
                  </h1>

                  <p className={styles.bannerDesc}>
                    {slide.desc}
                  </p>

                  <div className={styles.bannerPillsRow}>
                    {slide.pills.map((pill, pIdx) => (
                      <span key={pIdx} className={styles.bannerMiniPill}>{pill}</span>
                    ))}
                  </div>

                  <div className={styles.bannerActionsRow}>
                    <button 
                      className={styles.bannerCtaBtn}
                      onClick={() => {
                        setSelectedTier(slide.targetTier);
                        document.getElementById('shop-grid-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <FiZap size={18} /> {slide.ctaText}
                    </button>

                    <button 
                      className={styles.bannerSecondaryBtn}
                      onClick={() => {
                        setSelectedTier('all');
                        document.getElementById('shop-grid-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      সব পণ্য দেখুন
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Podium Showcase */}
                <div className={styles.bannerRight}>
                  <div 
                    className={styles.bannerVisualPodium}
                    onClick={() => {
                      setSelectedTier(slide.targetTier);
                      document.getElementById('shop-grid-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className={styles.bannerMainImg}
                    />

                    <div className={styles.bannerFloatPriceTag}>
                      {slide.floatPrice} ONLY
                    </div>

                    <div className={styles.bannerFloatDiscount}>
                      {slide.floatDiscount}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Right Arrow Button */}
          <button 
            className={styles.bannerNavBtnRight}
            onClick={handleNextBannerSlide}
            title="পরবর্তী স্লাইড"
          >
            <FiChevronRight size={26} />
          </button>

          {/* Dots Indicator Bar */}
          <div className={styles.bannerDotsBar}>
            {fullBannerSlides.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.bannerDotItem} ${currentBannerSlide === idx ? styles.activeDotItem : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentBannerSlide(idx);
                }}
                title={`ব্যানার স্লাইড ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* 6. Feature Badges Row */}
        <div className={styles.featuresRow}>
          <div className={styles.featureItem}>
            <span className={styles.featureEmoji}>🚚</span> সরাসরি উৎস থেকে সাশ্রয়ী সরবরাহ
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureEmoji}>⚖️</span> ফিক্সড প্রাইস ক্যাটাগরি (৪৯-৩৯৯৳)
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureEmoji}>🥜</span> ১০০% খাঁটি ও গুণগত মান
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureEmoji}>📦</span> সুরক্ষিত প্রিমিয়াম প্যাকেজিং
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureEmoji}>🚀</span> ফাস্ট হোম ডেলিভারি
          </div>
        </div>

        {/* 7. LUXURY PRICE TIER CARDS */}
        <section id="shop-grid-section" className={styles.priceTierSection}>
          <div className={styles.priceTierHeader}>
            <div className={styles.priceTierHeading}>
              <span>🎯 বাজেট ভিত্তিক ক্যাটাগরি সিলেক্ট করুন</span>
              <span className={styles.priceTierHeadingBadge}>Shop by Price</span>
            </div>
            {selectedTier !== 'all' && (
              <button 
                onClick={() => setSelectedTier('all')} 
                style={{ background: '#f1f5f9', border: 'none', padding: '0.45rem 1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}
              >
                সব পণ্য দেখুন
              </button>
            )}
          </div>

          <div className={styles.priceTierGrid}>
            {priceTiers.map((tier) => {
              const count = tier.id === 'all' 
                ? mockProducts.length 
                : mockProducts.filter((p) => p.price === parseInt(tier.id, 10)).length;
              
              const isActive = selectedTier === tier.id;
              
              let activeClass = '';
              if (isActive) {
                if (tier.id === 'all') activeClass = styles.tierActiveAll;
                else if (tier.id === '49') activeClass = styles.tierActive49;
                else if (tier.id === '99') activeClass = styles.tierActive99;
                else if (tier.id === '199') activeClass = styles.tierActive199;
                else if (tier.id === '299') activeClass = styles.tierActive299;
                else if (tier.id === '399') activeClass = styles.tierActive399;
              }

              return (
                <div
                  key={tier.id}
                  className={`${styles.priceTierCard} ${activeClass}`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  <span className={styles.tierIcon}>{tier.icon}</span>
                  <div className={styles.tierPriceAmount}>{tier.priceText}</div>
                  <div className={styles.tierLabel}>{tier.label}</div>
                  <span className={styles.tierCountBadge}>{count} টি পণ্য</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. CATEGORY & SORT CONTROLS BAR */}
        <div className={styles.filterControlsBar}>
          <div className={styles.categoryPills}>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                className={`${styles.categoryPill} ${selectedCategory === cat ? styles.activePill : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubCategory(null);
                  setSelectedTier('all');
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.sortContainer}>
            <FiSliders size={16} color="#64748b" />
            <select 
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">জনপ্রিয় পণ্য (Most Popular)</option>
              <option value="low-high">মূল্য: কম থেকে বেশি</option>
              <option value="high-low">মূল্য: বেশি থেকে কম</option>
              <option value="rating">সেরা রেটিং (Top Rated)</option>
            </select>
          </div>
        </div>

        {/* Subcategory Filter Pills Row */}
        {(() => {
          const activeCat = mainNavCategories.find((c) => c.categoryFilter === selectedCategory);
          if (!activeCat) return null;

          return (
            <div className={styles.subCategoryBar}>
              <div className={styles.subCategoryHeading}>
                <span>📂 {activeCat.title}:</span>
              </div>
              <div className={styles.subCategoryPillsRow}>
                {activeCat.subcategories.map((sub, sIdx) => {
                  const isAllSub = sub.keyword === 'সব' || sub.name.startsWith('সকল');
                  const isSubActive = isAllSub
                    ? !selectedSubCategory
                    : selectedSubCategory === sub.name || selectedSubCategory === sub.keyword;

                  return (
                    <button
                      key={sIdx}
                      className={`${styles.subCategoryPill} ${isSubActive ? styles.activeSubPill : ''}`}
                      onClick={() => {
                        if (isAllSub) {
                          setSelectedSubCategory(null);
                          setSelectedTier('all');
                          triggerToast(`🔍 সকল ${activeCat.title} পণ্য`);
                        } else {
                          setSelectedSubCategory(sub.name);
                          setSelectedTier('all');
                          triggerToast(`🔍 সাব-ক্যাটাগরি: ${sub.name}`);
                        }
                      }}
                    >
                      <span>{sub.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Active Filter Status & Reset Banner */}
        {(selectedCategory !== 'সব ক্যাটাগরি' || selectedSubCategory || selectedTier !== 'all' || searchQuery) && (
          <div className={styles.activeFilterBanner}>
            <div className={styles.activeFilterLeft}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1e40af' }}>সক্রিয় ফিল্টার:</span>
              {selectedTier !== 'all' && (
                <span className={styles.activeFilterBadge}>বাজেট: ৳{selectedTier}</span>
              )}
              {selectedCategory !== 'সব ক্যাটাগরি' && (
                <span className={styles.activeFilterBadge}>ক্যাটাগরি: {selectedCategory}</span>
              )}
              {selectedSubCategory && (
                <span className={styles.activeFilterSubBadge}>সাব-ক্যাটাগরি: {selectedSubCategory}</span>
              )}
              {searchQuery && (
                <span className={styles.activeFilterSubBadge}>অনুসন্ধান: &ldquo;{searchQuery}&rdquo;</span>
              )}
              <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                ({filteredProducts.length} টি পণ্য পাওয়া গেছে)
              </span>
            </div>
            <button
              className={styles.clearFilterTagBtn}
              onClick={() => {
                setSelectedCategory('সব ক্যাটাগরি');
                setSelectedSubCategory(null);
                setSelectedTier('all');
                setSearchQuery('');
              }}
            >
              <FiX size={14} /> ফিল্টার মুছুন
            </button>
          </div>
        )}

        {/* 9. ULTRA-PREMIUM PRODUCTS GRID */}
        <section className={styles.productSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                {selectedTier === 'all' ? 'সকল প্রিমিয়াম বাজেট পণ্য' : `৳${selectedTier} স্পেশাল কালেকশন`}
              </h2>
              <p className={styles.sectionSubtitle}>
                {selectedCategory !== 'সব ক্যাটাগরি' ? `ক্যাটাগরি: ${selectedCategory}` : 'সেরা দামে পছন্দের পণ্যটি বেছে নিন'}
              </p>
            </div>
            <div className={styles.resultCountText}>
              মোট <strong>{filteredProducts.length}</strong> টি পণ্য পাওয়া গেছে
            </div>
          </div>

          <div className={styles.productGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => {
                const isAdded = addedItemIds.includes(prod.id);
                const isWishlisted = wishlist.includes(prod.id);

                return (
                  <div key={prod.id} className={styles.productCard}>
                    {/* Floating Price Tag */}
                    <span className={styles.badgePriceTag}>৳{prod.price} ONLY</span>

                    {/* Floating Wishlist Heart */}
                    <button 
                      className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlistActive : ''}`}
                      onClick={(e) => toggleWishlist(prod.id, e)}
                      title="পছন্দের তালিকায় রাখুন"
                    >
                      <FiHeart size={16} fill={isWishlisted ? '#ef4444' : 'none'} />
                    </button>

                    {/* Product Image Stage */}
                    <div 
                      className={styles.productImgWrap}
                      onClick={() => setQuickViewProduct(prod)}
                    >
                      <img src={prod.image} alt={prod.title} />
                      <button className={styles.quickViewOverlayBtn}>
                        <FiEye size={14} /> কুইক ভিউ
                      </button>
                    </div>

                    <span className={styles.productCategoryTag}>{prod.category}</span>
                    <h3 
                      className={styles.productItemTitle}
                      onClick={() => setQuickViewProduct(prod)}
                    >
                      {prod.title}
                    </h3>

                    <div className={styles.productMetaRow}>
                      <FiStar size={14} fill="#eab308" />
                      <span>{prod.rating}</span>
                      <span className={styles.ratingCount}>({prod.reviewsCount}+ রিভিউ)</span>
                    </div>

                    <div className={styles.productPriceRow}>
                      <span className={styles.newPrice}>৳{prod.price}</span>
                      <span className={styles.oldPrice}>৳{prod.oldPrice}</span>
                      <span className={styles.discountBadge}>
                        {Math.round(((prod.oldPrice - prod.price) / prod.oldPrice) * 100)}% ছাড়
                      </span>
                    </div>

                    <button 
                      className={`${styles.cardAddBtn} ${isAdded ? styles.addedSuccess : ''}`}
                      onClick={() => handleAddToCart(prod)}
                    >
                      {isAdded ? (
                        <>
                          <FiCheck size={18} /> কার্টে যুক্ত হয়েছে!
                        </>
                      ) : (
                        <>
                          <FiShoppingBag size={17} /> কার্টে যোগ করুন
                        </>
                      )}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className={styles.emptyState}>
                <h3>কোনো পণ্য পাওয়া যায়নি!</h3>
                <p>অনুগ্রহ করে ফিল্টার পরিবর্তন করুন অথবা সার্চ টার্ম চেক করুন।</p>
                <button
                  onClick={() => { setSelectedTier('all'); setSelectedCategory('সব ক্যাটাগরি'); setSearchQuery(''); }}
                  style={{ marginTop: '1rem', padding: '0.6rem 1.4rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                >
                  সব ফিল্টার রিসেট করুন
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 10. QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className={styles.modalBackdrop} onClick={() => setQuickViewProduct(null)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={() => setQuickViewProduct(null)}>
              <FiX size={18} />
            </button>

            <div className={styles.modalTopRow}>
              <div className={styles.modalImgSide}>
                <img src={quickViewProduct.image} alt={quickViewProduct.title} />
              </div>

              <div className={styles.modalContentSide}>
                <span className={styles.productCategoryTag}>{quickViewProduct.category}</span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
                  {quickViewProduct.title}
                </h2>

                <div className={styles.productMetaRow}>
                  <FiStar size={15} fill="#eab308" />
                  <span style={{ fontSize: '0.95rem' }}>{quickViewProduct.rating}</span>
                  <span className={styles.ratingCount}>({quickViewProduct.reviewsCount} কাস্টমার রিভিউ)</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', margin: '0.8rem 0' }}>
                  <span style={{ fontSize: '1.85rem', fontWeight: 900, color: '#000000' }}>
                    ৳{quickViewProduct.price}
                  </span>
                  <span style={{ fontSize: '1.05rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                    ৳{quickViewProduct.oldPrice}
                  </span>
                  <span className={styles.discountBadge}>
                    {Math.round(((quickViewProduct.oldPrice - quickViewProduct.price) / quickViewProduct.oldPrice) * 100)}% ছাড়
                  </span>
                </div>

                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.55', marginBottom: '1.2rem' }}>
                  {quickViewProduct.description}
                </p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                  <button
                    className={styles.cardAddBtn}
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    style={{ padding: '0.9rem' }}
                  >
                    <FiShoppingBag size={18} /> কার্টে যোগ করুন
                  </button>
                </div>
              </div>
            </div>

            {/* Related 5 Products Section */}
            {modalRelatedProducts.length > 0 && (
              <div className={styles.modalRelatedSection}>
                <div className={styles.modalRelatedHeader}>
                  <div className={styles.modalRelatedTitleText}>
                    🔥 সম্পর্কিত ৫টি সেরা পণ্য ({quickViewProduct.category})
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>
                    এক ক্লিকে কার্টে যোগ করুন
                  </span>
                </div>
                <div className={styles.modalRelatedGrid}>
                  {modalRelatedProducts.map((relProd) => (
                    <div 
                      key={relProd.id} 
                      className={styles.modalRelatedCard}
                      onClick={() => setQuickViewProduct(relProd)}
                    >
                      <div className={styles.modalRelatedImgWrap}>
                        <img src={relProd.image} alt={relProd.title} />
                      </div>
                      <div className={styles.modalRelatedItemTitle} title={relProd.title}>
                        {relProd.title}
                      </div>
                      <div className={styles.modalRelatedPriceRow}>
                        <span className={styles.modalRelatedPrice}>৳{relProd.price}</span>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', textDecoration: 'line-through' }}>৳{relProd.oldPrice}</span>
                      </div>
                      <button
                        className={styles.modalRelatedAddBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(relProd);
                        }}
                      >
                        <FiShoppingBag size={12} /> কার্ট
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 11. SLIDE-OVER MINI CART DRAWER */}
      {isCartOpen && (
        <div className={styles.cartDrawerBackdrop} onClick={() => setIsCartOpen(false)}>
          <div className={styles.cartDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.cartDrawerHeader}>
              <h3>আপনার শপিং ব্যাগ ({totalCartCount})</h3>
              <button className={styles.closeDrawerBtn} onClick={() => setIsCartOpen(false)}>
                <FiX size={18} />
              </button>
            </div>

            <div className={styles.cartItemsList}>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.product.id} className={styles.cartItemCard}>
                    <img src={item.product.image} alt={item.product.title} className={styles.cartItemImg} />
                    <div className={styles.cartItemDetails}>
                      <h5>{item.product.title}</h5>
                      <div className={styles.cartItemPrice}>৳{item.product.price}</div>
                    </div>
                    <div className={styles.qtyControls}>
                      <button className={styles.qtyBtn} onClick={() => handleUpdateQty(item.product.id, -1)}>
                        <FiMinus size={12} />
                      </button>
                      <span className={styles.qtyText}>{item.quantity}</span>
                      <button className={styles.qtyBtn} onClick={() => handleUpdateQty(item.product.id, 1)}>
                        <FiPlus size={12} />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemoveFromCart(item.product.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '0.4rem' }}
                      title="মুছে ফেলুন"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                  <FiShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <h4>আপনার কার্ট এখনও খালি!</h4>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>পছন্দের পণ্যটি কার্টে যোগ করুন।</p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className={styles.cartDrawerFooter}>
                <div className={styles.cartTotalRow}>
                  <span>সর্বমোট:</span>
                  <span style={{ color: '#ef4444' }}>৳{totalCartPrice.toFixed(2)}</span>
                </div>
                <button 
                  className={styles.checkoutBtn}
                  onClick={() => triggerToast("🎉 অর্ডার প্লেস করার পেইজ শীঘ্রই যুক্ত হচ্ছে!")}
                >
                  অর্ডার সম্পন্ন করুন (৳{totalCartPrice.toFixed(2)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toastPopup}>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 12. Modern Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <h3>Mardy<span>Mart</span></h3>
              <p>
                খাঁটি, ফ্রেশ এবং সাশ্রয়ী মূল্যের সেরা পণ্য নিয়ে মার্ডি মার্ট আপনার পাশে। ৪৯৳ থেকে ৩৯৯৳ পর্যন্ত প্রতিটি দরকারি পণ্যে অবিশ্বাস্য সাশ্রয়।
              </p>
            </div>

            <div className={styles.footerCol}>
              <h4>বাজেট সেকশন</h4>
              <ul>
                <li><a href="#shop-grid-section" onClick={() => setSelectedTier('49')}>⚡ ৳৪৯ বাজেট কর্নার</a></li>
                <li><a href="#shop-grid-section" onClick={() => setSelectedTier('99')}>🔥 ৳৯৯ মেগা জোন</a></li>
                <li><a href="#shop-grid-section" onClick={() => setSelectedTier('199')}>💎 ৳১৯৯ ভ্যালু ডিলস</a></li>
                <li><a href="#shop-grid-section" onClick={() => setSelectedTier('299')}>👑 ৳২৯৯ প্রিমিয়াম কালেকশন</a></li>
                <li><a href="#shop-grid-section" onClick={() => setSelectedTier('399')}>🚀 ৳৩৯৯ এক্সক্লুসিভ জোন</a></li>
              </ul>
            </div>

            <div className={styles.footerCol}>
              <h4>কাস্টমার সাপোর্ট</h4>
              <ul>
                <li><a href="#">হেল্প ও এফএকিউ</a></li>
                <li><a href="#">ডেলিভারি পলিসি</a></li>
                <li><a href="#">রিটার্ন ও রিফান্ড</a></li>
                <li><a href="#">প্রাইভেসি ও শর্তাবলী</a></li>
              </ul>
            </div>

            <div className={styles.footerCol}>
              <h4>যোগাযোগ</h4>
              <ul>
                <li>📍 ঢাকা, বাংলাদেশ</li>
                <li>📞 +৮৮০ ১২৩৪ ৫৬৭৮৯০</li>
                <li>✉️ support@mardymart.com</li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© ২০২৬ Mardy Mart. সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
