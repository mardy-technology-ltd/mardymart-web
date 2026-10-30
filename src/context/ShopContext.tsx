"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import { Product, CartItem, ToastMessage } from "../types";

const CART_STORAGE_KEY = "mardymart_cart_v1";
const WISH_STORAGE_KEY = "mardymart_wishlist_v1";
const FREE_SHIPPING_THRESHOLD = 500;

// In-Memory External Store for safe SSR & zero cascading render
let memoryCart: CartItem[] = [];
let memoryWishlist: number[] = [];
const storeListeners = new Set<() => void>();

let hasLoadedFromStorage = false;
function loadInitialStorage() {
  if (hasLoadedFromStorage || typeof window === "undefined") return;
  try {
    const rawCart = localStorage.getItem(CART_STORAGE_KEY);
    if (rawCart) {
      const parsed = JSON.parse(rawCart);
      if (Array.isArray(parsed)) {
        memoryCart = parsed.filter(
          (item): item is CartItem =>
            typeof item === "object" &&
            item !== null &&
            typeof item.id === "number" &&
            typeof item.price === "number" &&
            typeof item.qty === "number" &&
            item.qty > 0
        );
      }
    }

    const rawWish = localStorage.getItem(WISH_STORAGE_KEY);
    if (rawWish) {
      const parsedWish = JSON.parse(rawWish);
      if (Array.isArray(parsedWish)) {
        memoryWishlist = parsedWish.filter((id): id is number => typeof id === "number");
      }
    }
  } catch (err) {
    console.warn("Error reading storage:", err);
  }
  hasLoadedFromStorage = true;
}

function notifyStore() {
  storeListeners.forEach((l) => l());
}

function subscribeToStore(listener: () => void) {
  storeListeners.add(listener);
  return () => {
    storeListeners.delete(listener);
  };
}

function persistToStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(memoryCart));
    localStorage.setItem(WISH_STORAGE_KEY, JSON.stringify(memoryWishlist));
  } catch (err) {
    console.warn("Error writing storage:", err);
  }
}

const emptyArrayCart: CartItem[] = [];
const emptyArrayWish: number[] = [];

interface ShopContextType {
  cart: CartItem[];
  cartCount: number;
  totalAmount: number;
  deliveryCharge: number;
  finalTotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  incrementQty: (productId: number) => void;
  decrementQty: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;

  wishlist: number[];
  wishlistCount: number;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  toast: ToastMessage | null;
  showToast: (msg: string, type?: "success" | "info" | "error") => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Load storage once on client
  if (typeof window !== "undefined") {
    loadInitialStorage();
  }

  // React 18/19 official external store subscription
  const cart = useSyncExternalStore(
    subscribeToStore,
    () => memoryCart,
    () => emptyArrayCart
  );

  const wishlist = useSyncExternalStore(
    subscribeToStore,
    () => memoryWishlist,
    () => emptyArrayWish
  );

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((msg: string, type: "success" | "info" | "error" = "success") => {
    setToast({ msg, type });
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      const existingIdx = memoryCart.findIndex((item) => item.id === product.id);
      if (existingIdx >= 0) {
        memoryCart = memoryCart.map((item, idx) =>
          idx === existingIdx ? { ...item, qty: item.qty + quantity } : item
        );
      } else {
        memoryCart = [...memoryCart, { ...product, qty: quantity }];
      }
      persistToStorage();
      notifyStore();
      showToast(`✓ "${product.title.slice(0, 26)}…" কার্টে যোগ হয়েছে`, "success");
    },
    [showToast]
  );

  const incrementQty = useCallback((productId: number) => {
    memoryCart = memoryCart.map((item) =>
      item.id === productId ? { ...item, qty: item.qty + 1 } : item
    );
    persistToStorage();
    notifyStore();
  }, []);

  const decrementQty = useCallback((productId: number) => {
    memoryCart = memoryCart.map((item) =>
      item.id === productId ? { ...item, qty: Math.max(1, item.qty - 1) } : item
    );
    persistToStorage();
    notifyStore();
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    memoryCart = memoryCart.filter((item) => item.id !== productId);
    persistToStorage();
    notifyStore();
  }, []);

  const clearCart = useCallback(() => {
    memoryCart = [];
    persistToStorage();
    notifyStore();
  }, []);

  const toggleWishlist = useCallback(
    (productId: number) => {
      const exists = memoryWishlist.includes(productId);
      if (exists) {
        memoryWishlist = memoryWishlist.filter((id) => id !== productId);
        showToast("উইশলিস্ট থেকে সরানো হয়েছে", "info");
      } else {
        memoryWishlist = [...memoryWishlist, productId];
        showToast("❤️ উইশলিস্টে যোগ হয়েছে", "success");
      }
      persistToStorage();
      notifyStore();
    },
    [showToast]
  );

  const isInWishlist = useCallback(
    (productId: number) => wishlist.includes(productId),
    [wishlist]
  );

  const openQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const deliveryCharge = useMemo(() => {
    if (cart.length === 0) return 0;
    return totalAmount >= FREE_SHIPPING_THRESHOLD ? 0 : 60;
  }, [cart.length, totalAmount]);

  const finalTotal = useMemo(() => totalAmount + deliveryCharge, [totalAmount, deliveryCharge]);

  const freeShippingRemaining = useMemo(
    () => Math.max(0, FREE_SHIPPING_THRESHOLD - totalAmount),
    [totalAmount]
  );

  const freeShippingProgress = useMemo(
    () => Math.min(100, Math.round((totalAmount / FREE_SHIPPING_THRESHOLD) * 100)),
    [totalAmount]
  );

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      totalAmount,
      deliveryCharge,
      finalTotal,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      freeShippingRemaining,
      freeShippingProgress,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      addToCart,
      incrementQty,
      decrementQty,
      removeFromCart,
      clearCart,
      wishlist,
      wishlistCount: wishlist.length,
      toggleWishlist,
      isInWishlist,
      quickViewProduct,
      openQuickView,
      closeQuickView,
      toast,
      showToast,
    }),
    [
      cart,
      cartCount,
      totalAmount,
      deliveryCharge,
      finalTotal,
      freeShippingRemaining,
      freeShippingProgress,
      isCartOpen,
      addToCart,
      incrementQty,
      decrementQty,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      isInWishlist,
      quickViewProduct,
      openQuickView,
      closeQuickView,
      toast,
      showToast,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
