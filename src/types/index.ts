export interface Product {
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
  badge?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  qty: number;
}

export interface PriceTier {
  label: string;
  value: number;
  color: string;
}

export interface HeroSlide {
  eyebrow: string;
  title: string;
  sub: string;
  bg: string;
  image: string;
  cta: string;
  ctaFilter: string;
}

export interface TopCategory {
  name: string;
  filter: string;
  icon: string;
  img: string;
}

export interface BrandDeal {
  label: string;
  sub: string;
  bg: string;
  tc: string;
  filter: string;
  img: string;
}

export interface EssentialItem {
  name: string;
  off: string;
  filter: string;
  img: string;
}

export interface ToastMessage {
  msg: string;
  type: "success" | "info" | "error";
}

