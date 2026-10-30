import { Product, PriceTier, HeroSlide, TopCategory, BrandDeal, EssentialItem } from "../types";

export const PRODUCTS: Product[] = [
  // ─── হোম অ্যান্ড কিচেন ───
  { id: 101, category: "হোম অ্যান্ড কিচেন", title: "প্লাস্টিক ও স্টিলের মগ, গ্লাস ও বাটি কম্বো সেট", price: 99, oldPrice: 160, rating: 4.8, reviewsCount: 520, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80", inStock: true, description: "দৈনন্দিন চা, পানি ও স্ন্যাকস পরিবেশনের জন্য প্রিমিয়াম মগ ও বাটি সেট।", badge: "৩৮% ছাড়", isBestSeller: true },
  { id: 102, category: "হোম অ্যান্ড কিচেন", title: "মেলোমাইন ছোট প্লেট ও সস ডিশ সেট", price: 49, oldPrice: 85, rating: 4.7, reviewsCount: 310, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&auto=format&fit=crop&q=80", inStock: true, description: "স্ন্যাকস ও সস পরিবেশনের আনব্রেকেবল ডিশ সেট।", badge: "৪২% ছাড়" },
  { id: 103, category: "হোম অ্যান্ড কিচেন", title: "নন-স্টিক গ্রানাইট কোটিং মিনি ফ্রাই প্যান", price: 299, oldPrice: 480, rating: 4.9, reviewsCount: 640, image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&auto=format&fit=crop&q=80", inStock: true, description: "তেল ছাড়াই ডিম পোজ ও অমলেট বানানোর প্রিমিয়াম প্যান।", badge: "৩৮% ছাড়", isBestSeller: true },
  { id: 104, category: "হোম অ্যান্ড কিচেন", title: "ফুড-গ্রেড সিলিকন আইস ট্রে ও মোল্ড", price: 49, oldPrice: 80, rating: 4.8, reviewsCount: 220, image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=500&auto=format&fit=crop&q=80", inStock: true, description: "ঘরে বানানো আইসক্রিমের জন্য ফ্লেক্সিবল সিলিকন মোল্ড।", badge: "৩৯% ছাড়", isNew: true },
  { id: 105, category: "হোম অ্যান্ড কিচেন", title: "প্রিমিয়াম ৬ পিস কালারফুল কাপ-পিরিচ সেট", price: 199, oldPrice: 320, rating: 4.9, reviewsCount: 430, image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=500&auto=format&fit=crop&q=80", inStock: true, description: "মেহমান আপ্যায়নের আকর্ষণীয় প্রিমিয়াম কাপ সেট।", badge: "৩৮% ছাড়" },
  { id: 106, category: "হোম অ্যান্ড কিচেন", title: "মাল্টি-ফাংশনাল পুল চপার ও ভেজিটেবল স্লাইসার", price: 199, oldPrice: 320, rating: 4.9, reviewsCount: 680, image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80", inStock: true, description: "পেঁয়াজ, রসুন ও সবজি সেকেন্ডেই কুচি করার চপার।", badge: "৩৮% ছাড়", isBestSeller: true },
  { id: 107, category: "হোম অ্যান্ড কিচেন", title: "এয়ারটাইট মসলার কৌটা বয়াম সেট (৩ পিস)", price: 99, oldPrice: 180, rating: 4.8, reviewsCount: 390, image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=500&auto=format&fit=crop&q=80", inStock: true, description: "লবণ, হলুদ ও মসলা তাজা রাখার ফুড-গ্রেড বয়াম সেট।", badge: "৪৫% ছাড়" },
  { id: 108, category: "হোম অ্যান্ড কিচেন", title: "ফ্রিজ ভেজিটেবল ফ্রেশ স্টোরেজ বক্স", price: 199, oldPrice: 340, rating: 4.8, reviewsCount: 410, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80", inStock: true, description: "মাছ, মাংস ও শাকসবজি তাজা রাখার ড্রয়ার স্টোরেজ বক্স।", badge: "৪১% ছাড়", isNew: true },
  { id: 109, category: "হোম অ্যান্ড কিচেন", title: "হিট-রেজিস্ট্যান্ট সিলিকন কিচেন গ্লাভস", price: 199, oldPrice: 320, rating: 4.8, reviewsCount: 460, image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&auto=format&fit=crop&q=80", inStock: true, description: "হাত সুরক্ষিত রেখে থালাবাসন পরিষ্কার করার সিলিকন গ্লাভস।", badge: "৩৮% ছাড়" },
  { id: 110, category: "হোম অ্যান্ড কিচেন", title: "স্টেইনলেস স্টিল ফল ও সবজি কাটার নাইফ সেট", price: 99, oldPrice: 170, rating: 4.9, reviewsCount: 430, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&auto=format&fit=crop&q=80", inStock: true, description: "দ্রুত ফলমূল ও সবজি কাটার অ্যান্টি-রাস্ট নাইফ সেট।", badge: "৪২% ছাড়" },

  // ─── বিউটি ও পার্সোনাল কেয়ার ───
  { id: 201, category: "বিউটি ও পার্সোনাল কেয়ার", title: "মেকআপ বিউটি ব্লেন্ডার উইথ স্ট্যান্ড", price: 49, oldPrice: 95, rating: 4.8, reviewsCount: 390, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80", inStock: true, description: "স্মুথ মেকআপ ফিনিশিং ও ফাউন্ডেশন ব্লেন্ড করার বিউটি ব্লেন্ডার।", badge: "৪৮% ছাড়", isBestSeller: true },
  { id: 202, category: "বিউটি ও পার্সোনাল কেয়ার", title: "প্রফেশনাল আইশ্যাডো ও ব্লাশ ব্রাশ সেট", price: 99, oldPrice: 190, rating: 4.9, reviewsCount: 680, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=80", inStock: true, description: "আল্ট্রা সফট ফাইবার ব্রাশ কিট — ফুল ফেস মেকআপের জন্য।", badge: "৪৮% ছাড়", isBestSeller: true },
  { id: 203, category: "বিউটি ও পার্সোনাল কেয়ার", title: "টাচ এলইডি লাইট মেকআপ মিরর", price: 199, oldPrice: 350, rating: 4.9, reviewsCount: 570, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80", inStock: true, description: "ব্রাইট LED ও টাচ ব্রাইটনেস কন্ট্রোল সহ মেকআপ আয়না।", badge: "৪৩% ছাড়", isNew: true },
  { id: 204, category: "বিউটি ও পার্সোনাল কেয়ার", title: "ফ্যাশনেবল হেয়ার ক্লিপ ও ক্লাচ সেট", price: 49, oldPrice: 80, rating: 4.8, reviewsCount: 450, image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=80", inStock: true, description: "চুল সুন্দরভাবে আটকে রাখার আকর্ষণীয় ক্লাচ ও হেয়ার ক্লিপ।", badge: "৩৯% ছাড়" },
  { id: 205, category: "বিউটি ও পার্সোনাল কেয়ার", title: "সিলিকন স্ক্যাল্প ম্যাসেজার ও ডিট্যাঙ্গলিং ব্রাশ", price: 99, oldPrice: 170, rating: 4.8, reviewsCount: 540, image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&auto=format&fit=crop&q=80", inStock: true, description: "মাথার ত্বক পরিষ্কার ও রক্ত সঞ্চালন বৃদ্ধির সিলিকন ম্যাসেজার।", badge: "৪২% ছাড়" },
  { id: 206, category: "বিউটি ও পার্সোনাল কেয়ার", title: "নেইল কাটার ও ফাইলার গ্রুমিং কিট", price: 49, oldPrice: 80, rating: 4.7, reviewsCount: 230, image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=500&auto=format&fit=crop&q=80", inStock: true, description: "নখ পরিষ্কার ও সাইজ করার মেটালিক গ্রুমিং কিট।", badge: "৩৯% ছাড়" },
  { id: 207, category: "বিউটি ও পার্সোনাল কেয়ার", title: "প্রিমিয়াম বডি স্ক্রাবার ও সফট লুফা", price: 49, oldPrice: 85, rating: 4.8, reviewsCount: 290, image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80", inStock: true, description: "গোসলে ফেনা তৈরি ও ত্বকের মৃতকোষ দূর করার কোমল লুফা।", badge: "৪২% ছাড়" },
  { id: 208, category: "বিউটি ও পার্সোনাল কেয়ার", title: "ট্রাভেল সাইজ লিক-প্রুফ বোটল কিট", price: 99, oldPrice: 170, rating: 4.8, reviewsCount: 360, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80", inStock: true, description: "ভ্রমণে শ্যাম্পু, লোশন পোর্টেবল রাখার রিফিল কিট।", badge: "৪২% ছাড়", isNew: true },

  // ─── স্টেশনারি ও অফিস সাপ্লাই ───
  { id: 301, category: "স্টেশনারি ও অফিস সাপ্লাই", title: "কিউট পকেট নোটবুক ও মিনি ডায়েরি", price: 49, oldPrice: 80, rating: 4.8, reviewsCount: 310, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80", inStock: true, description: "পকেটে বহনযোগ্য আকর্ষণীয় ডায়েরি।", badge: "৩৯% ছাড়" },
  { id: 302, category: "স্টেশনারি ও অফিস সাপ্লাই", title: "স্পাইরাল বাউন্ড গ্রিড নোটপ্যাড (২০০ পৃষ্ঠা)", price: 99, oldPrice: 170, rating: 4.9, reviewsCount: 420, image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=80", inStock: true, description: "ক্লাস নোটের জন্য স্মুথ প্রিমিয়াম পেপার স্পাইরাল খাতা।", badge: "৪২% ছাড়", isBestSeller: true },
  { id: 303, category: "স্টেশনারি ও অফিস সাপ্লাই", title: "প্রফেশনাল হার্ডকভার লেদার ডায়েরি", price: 199, oldPrice: 320, rating: 4.9, reviewsCount: 380, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80", inStock: true, description: "অফিস মিটিংয়ের লাক্সারি লেদার বাউন্ড ডায়েরি।", badge: "৩৮% ছাড়" },
  { id: 304, category: "স্টেশনারি ও অফিস সাপ্লাই", title: "স্মুথ জেল পেন ও হাইলাইটার মার্কার সেট", price: 49, oldPrice: 85, rating: 4.9, reviewsCount: 490, image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=80", inStock: true, description: "স্মুথ জেল কলম ও বই দাগানোর হাইলাইটার সেট।", badge: "৪২% ছাড়" },
  { id: 305, category: "স্টেশনারি ও অফিস সাপ্লাই", title: "ফাইনলাইনার ক্যালিগ্রাফি আর্ট পেন সেট", price: 99, oldPrice: 190, rating: 4.8, reviewsCount: 390, image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=80", inStock: true, description: "স্কেচিং ও ক্যালিগ্রাফির ওয়াটারপ্রুফ মার্কার সেট।", badge: "৪৮% ছাড়", isNew: true },
  { id: 306, category: "স্টেশনারি ও অফিস সাপ্লাই", title: "মেটাল মেশ পেন হোল্ডার ও ডেস্ক অর্গানাইজার", price: 99, oldPrice: 170, rating: 4.7, reviewsCount: 310, image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=500&auto=format&fit=crop&q=80", inStock: true, description: "টেবিল সুন্দর রাখার প্রিমিয়াম মেটাল ডেস্ক অর্গানাইজার।", badge: "৪২% ছাড়" },

  // ─── ঘর সাজানো ও লাইফস্টাইল ───
  { id: 401, category: "ঘর সাজানো ও লাইফস্টাইল", title: "আরোমা সয় ওয়াক্স ক্যান্ডেল সেট", price: 299, oldPrice: 499, rating: 4.8, reviewsCount: 380, image: "https://images.unsplash.com/photo-1602178506175-16fd90ee6f07?w=500&auto=format&fit=crop&q=80", inStock: true, description: "ঘর সুগন্ধময় রাখার লাভেন্ডার ও রোজ সেন্টেড ক্যান্ডেল।", badge: "৪০% ছাড়", isBestSeller: true },
  { id: 402, category: "ঘর সাজানো ও লাইফস্টাইল", title: "বোহেমিয়ান ম্যাক্রামে ওয়াল হ্যাঙ্গিং", price: 299, oldPrice: 500, rating: 4.7, reviewsCount: 290, image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80", inStock: true, description: "দেওয়ালকে নান্দনিক করার হ্যান্ডমেড বোহেমিয়ান ম্যাক্রামে।", badge: "৪০% ছাড়" },
  { id: 403, category: "ঘর সাজানো ও লাইফস্টাইল", title: "ইনডোর মিনি প্ল্যান্ট পট সেট", price: 199, oldPrice: 340, rating: 4.8, reviewsCount: 420, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=80", inStock: true, description: "ঘরে সবুজ পরিবেশের সিরামিক মিনি পট সেট।", badge: "৪১% ছাড়", isNew: true },
  { id: 404, category: "ঘর সাজানো ও লাইফস্টাইল", title: "USB ফেইরি এলইডি স্ট্রিং লাইট (৩ মিটার)", price: 199, oldPrice: 350, rating: 4.9, reviewsCount: 560, image: "https://images.unsplash.com/photo-1607602132700-068258431b7f?w=500&auto=format&fit=crop&q=80", inStock: true, description: "ব্যালকনি ও জন্মদিনের ডেকোরেশনের USB ফেইরি লাইট।", badge: "৪৩% ছাড়" },
  { id: 405, category: "ঘর সাজানো ও লাইফস্টাইল", title: "মাল্টিপারপাস ওয়াল হুক ও স্টোরেজ র্যাক", price: 99, oldPrice: 180, rating: 4.7, reviewsCount: 340, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=80", inStock: true, description: "দরজায় কাপড়, চাবি ও ব্যাগ ঝুলিয়ে রাখার র্যাক।", badge: "৪৫% ছাড়" },
  { id: 406, category: "ঘর সাজানো ও লাইফস্টাইল", title: "আধুনিক কাঠের ডেকোরেটিভ ফটো ফ্রেম সেট", price: 299, oldPrice: 480, rating: 4.8, reviewsCount: 310, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format&fit=crop&q=80", inStock: true, description: "স্মরণীয় মুহূর্ত ধরে রাখার কাঠের ফটো ফ্রেম সেট।", badge: "৩৮% ছাড়" },

  // ─── গ্যাজেট ও মোবাইল এক্সেসরিজ ───
  { id: 501, category: "গ্যাজেট ও মোবাইল এক্সেসরিজ", title: "৩৬০° রোটেটেবল মেটাল ফোন রিং হোল্ডার", price: 49, oldPrice: 85, rating: 4.9, reviewsCount: 680, image: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=500&auto=format&fit=crop&q=80", inStock: true, description: "ফোন পড়ে না যাওয়ার রোটেটেবল মেটাল রিং হোল্ডার।", badge: "৪২% ছাড়", isBestSeller: true },
  { id: 502, category: "গ্যাজেট ও মোবাইল এক্সেসরিজ", title: "ফাস্ট চার্জিং টাইপ-সি ব্রেইডেড ক্যাবল", price: 99, oldPrice: 180, rating: 4.8, reviewsCount: 590, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=80", inStock: true, description: "৩A ফাস্ট চার্জিং ২ মিটার ব্রেইডেড নাইলন ক্যাবল।", badge: "৪৫% ছাড়" },
  { id: 503, category: "গ্যাজেট ও মোবাইল এক্সেসরিজ", title: "মিনি পোর্টেবল ব্লুটুথ স্পিকার (IPX5)", price: 399, oldPrice: 699, rating: 4.6, reviewsCount: 320, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=80", inStock: true, description: "৩৬০° সাউন্ড, ওয়াটারপ্রুফ ও ৬ ঘণ্টা প্লেব্যাক স্পিকার।", badge: "৪৩% ছাড়", isNew: true },
  { id: 504, category: "গ্যাজেট ও মোবাইল এক্সেসরিজ", title: "অ্যাডজাস্টেবল অ্যালুমিনিয়াম ট্রাইপড স্ট্যান্ড", price: 299, oldPrice: 490, rating: 4.8, reviewsCount: 380, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80", inStock: true, description: "ভ্লগিং ও ভিডিও কলের জন্য ৬০সেমি অ্যালুমিনিয়াম ট্রাইপড।", badge: "৩৯% ছাড়" },
  { id: 505, category: "গ্যাজেট ও মোবাইল এক্সেসরিজ", title: "মাল্টি-পোর্ট USB 3.0 হাব ও কেবল ম্যানেজার", price: 299, oldPrice: 480, rating: 4.8, reviewsCount: 520, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=80", inStock: true, description: "৪টি ডিভাইস একসাথে কানেক্ট করার কম্প্যাক্ট USB হাব।", badge: "৩৮% ছাড়" },
  { id: 506, category: "গ্যাজেট ও মোবাইল এক্সেসরিজ", title: "বেসিক ব্লুটুথ ওয়্যারলেস নেকব্যান্ড ইয়ারফোন", price: 399, oldPrice: 650, rating: 4.7, reviewsCount: 440, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80", inStock: true, description: "ক্লিয়ার সাউন্ড ও ৮ ঘণ্টা ব্যাটারি লাইফের নেকব্যান্ড।", badge: "৩৯% ছাড়", isBestSeller: true },

  // ─── বাচ্চাদের খেলনা ও গিফট ───
  { id: 601, category: "বাচ্চাদের খেলনা ও গিফট", title: "কালারফুল উডেন বিল্ডিং ব্লক সেট (৫০ পিস)", price: 299, oldPrice: 499, rating: 4.9, reviewsCount: 580, image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&auto=format&fit=crop&q=80", inStock: true, description: "শিশুদের সৃজনশীলতা বিকাশের নন-টক্সিক উডেন ব্লক সেট।", badge: "৪০% ছাড়", isBestSeller: true },
  { id: 602, category: "বাচ্চাদের খেলনা ও গিফট", title: "ডাইনোসর ও অ্যানিমেল ফিগার সেট (১২ পিস)", price: 199, oldPrice: 350, rating: 4.8, reviewsCount: 420, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=80", inStock: true, description: "রিয়েলিস্টিক নন-টক্সিক পিভিসি ডাইনোসর ও প্রাণী সেট।", badge: "৪৩% ছাড়" },
  { id: 603, category: "বাচ্চাদের খেলনা ও গিফট", title: "অটোমেটিক বাবল গান মেশিন", price: 199, oldPrice: 340, rating: 4.9, reviewsCount: 650, image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&auto=format&fit=crop&q=80", inStock: true, description: "একসাথে হাজার বাবল তৈরির ব্যাটারি চালিত বাবল বন্দুক।", badge: "৪১% ছাড়", isNew: true },
  { id: 604, category: "বাচ্চাদের খেলনা ও গিফট", title: "ক্রিয়েটিভ ম্যাজিক ডুডল বোর্ড", price: 99, oldPrice: 170, rating: 4.8, reviewsCount: 390, image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&auto=format&fit=crop&q=80", inStock: true, description: "যত খুশি আঁকো, মুছে ফেলো — পেপার নষ্ট ছাড়া।", badge: "৪২% ছাড়" },
  { id: 605, category: "বাচ্চাদের খেলনা ও গিফট", title: "কিউট আল্ট্রা-সফট প্লাশ টেডি বিয়ার", price: 299, oldPrice: 499, rating: 4.9, reviewsCount: 480, image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500&auto=format&fit=crop&q=80", inStock: true, description: "শিশুদের প্রিয় সঙ্গী হাইপোঅ্যালার্জেনিক প্লাশ টেডি বিয়ার।", badge: "৪০% ছাড়" },
  { id: 606, category: "বাচ্চাদের খেলনা ও গিফট", title: "শিশুদের ক্রিয়েটিভ আর্ট ও ক্রাফট কিট", price: 199, oldPrice: 350, rating: 4.8, reviewsCount: 360, image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&auto=format&fit=crop&q=80", inStock: true, description: "রং, ব্রাশ, স্টিকার ও ক্রাফট ম্যাটেরিয়াল সহ আর্ট কিট।", badge: "৪৩% ছাড়" },
];

export const NAV_ITEMS = [
  { label: "সব পণ্য", filter: "all" },
  { label: "হোম & কিচেন", filter: "হোম অ্যান্ড কিচেন" },
  { label: "বিউটি কেয়ার", filter: "বিউটি ও পার্সোনাল কেয়ার" },
  { label: "স্টেশনারি", filter: "স্টেশনারি ও অফিস সাপ্লাই" },
  { label: "ঘর সাজানো", filter: "ঘর সাজানো ও লাইফস্টাইল" },
  { label: "গ্যাজেট", filter: "গ্যাজেট ও মোবাইল এক্সেসরিজ" },
  { label: "খেলনা & গিফট", filter: "বাচ্চাদের খেলনা ও গিফট" },
];

export const TIERS: PriceTier[] = [
  { label: "সব", value: 0, color: "#0068c8" },
  { label: "৳৪৯", value: 49, color: "#22a650" },
  { label: "৳৯৯", value: 99, color: "#f59e0b" },
  { label: "৳১৯৯", value: 199, color: "#8b5cf6" },
  { label: "৳২৯৯", value: 299, color: "#ef4444" },
  { label: "৳৩৯৯", value: 399, color: "#ec4899" },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: "🔥 সীমিত সময়ের অফার",
    title: "SMART WEARABLE.",
    sub: "UP TO 80% OFF · ফ্রি ডেলিভারি",
    bg: "linear-gradient(135deg, #0d1b3e 0%, #1a3560 60%, #0d2545 100%)",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
    cta: "এখনই কিনুন",
    ctaFilter: "গ্যাজেট ও মোবাইল এক্সেসরিজ",
  },
  {
    eyebrow: "🍳 কিচেন সেলে স্বাগতম",
    title: "HOME & KITCHEN.",
    sub: "৳৪৯ থেকে শুরু · সর্বোচ্চ ৪৫% ছাড়",
    bg: "linear-gradient(135deg, #0a2e1a 0%, #134d2e 60%, #0a3020 100%)",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=80",
    cta: "দেখুন",
    ctaFilter: "হোম অ্যান্ড কিচেন",
  },
  {
    eyebrow: "💄 বিউটি ফেস্ট চলছে",
    title: "BEAUTY DEALS.",
    sub: "সেরা ব্র্যান্ড · ৪৮% পর্যন্ত ছাড়",
    bg: "linear-gradient(135deg, #2d0a3e 0%, #4d1460 60%, #2d0a40 100%)",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80",
    cta: "এক্সপ্লোর",
    ctaFilter: "বিউটি ও পার্সোনাল কেয়ার",
  },
];

export const TOP_CATS: TopCategory[] = [
  { name: "হোম কিচেন", filter: "হোম অ্যান্ড কিচেন", icon: "🍳", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&auto=format&fit=crop&q=80" },
  { name: "বিউটি", filter: "বিউটি ও পার্সোনাল কেয়ার", icon: "💄", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=150&auto=format&fit=crop&q=80" },
  { name: "স্টেশনারি", filter: "স্টেশনারি ও অফিস সাপ্লাই", icon: "✏️", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80" },
  { name: "ঘর সাজানো", filter: "ঘর সাজানো ও লাইফস্টাইল", icon: "🏮", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=150&auto=format&fit=crop&q=80" },
  { name: "গ্যাজেট", filter: "গ্যাজেট ও মোবাইল এক্সেসরিজ", icon: "📱", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80" },
  { name: "খেলনা", filter: "বাচ্চাদের খেলনা ও গিফট", icon: "🎮", img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=150&auto=format&fit=crop&q=80" },
  { name: "সব পণ্য", filter: "all", icon: "🛍", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&auto=format&fit=crop&q=80" },
];

export const BRAND_DEALS: BrandDeal[] = [
  { label: "হোম কিচেন", sub: "৪৫% পর্যন্ত ছাড়", bg: "#0d1b3e", tc: "#fff", filter: "হোম অ্যান্ড কিচেন", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=220&auto=format&fit=crop&q=80" },
  { label: "বিউটি কেয়ার", sub: "৪৮% পর্যন্ত ছাড়", bg: "#ffd012", tc: "#111", filter: "বিউটি ও পার্সোনাল কেয়ার", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=220&auto=format&fit=crop&q=80" },
  { label: "গ্যাজেট", sub: "৪৫% পর্যন্ত ছাড়", bg: "#1a1a1a", tc: "#fff", filter: "গ্যাজেট ও মোবাইল এক্সেসরিজ", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=220&auto=format&fit=crop&q=80" },
  { label: "খেলনা ও গিফট", sub: "৪৩% পর্যন্ত ছাড়", bg: "#ff6900", tc: "#fff", filter: "বাচ্চাদের খেলনা ও গিফট", img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=220&auto=format&fit=crop&q=80" },
];

export const ESSENTIALS: EssentialItem[] = [
  { name: "ঘরের জন্য", off: "৩৮–৪৫% ছাড়", filter: "হোম অ্যান্ড কিচেন", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&auto=format&fit=crop&q=80" },
  { name: "বিউটি", off: "৩৯–৪৮% ছাড়", filter: "বিউটি ও পার্সোনাল কেয়ার", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&auto=format&fit=crop&q=80" },
  { name: "গ্যাজেট", off: "৩৮–৪৫% ছাড়", filter: "গ্যাজেট ও মোবাইল এক্সেসরিজ", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&auto=format&fit=crop&q=80" },
  { name: "স্টেশনারি", off: "৩৮–৪৮% ছাড়", filter: "স্টেশনারি ও অফিস সাপ্লাই", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=200&auto=format&fit=crop&q=80" },
  { name: "খেলনা", off: "৪০–৪৩% ছাড়", filter: "বাচ্চাদের খেলনা ও গিফট", img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=200&auto=format&fit=crop&q=80" },
  { name: "ঘর সাজানো", off: "৩৮–৪৫% ছাড়", filter: "ঘর সাজানো ও লাইফস্টাইল", img: "https://images.unsplash.com/photo-1602178506175-16fd90ee6f07?w=200&auto=format&fit=crop&q=80" },
];

