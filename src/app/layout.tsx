import type { Metadata } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import { ShopProvider } from "@/context/ShopContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MardyMart – বাজেটবান্ধব অনলাইন শপিং | Mardy Technology",
  description:
    "MardyMart-এ স্বাগতম! সাশ্রয়ী মূল্যে সেরা হোম কিচেন, বিউটি, গ্যাজেট, স্টেশনারি ও খেলনা কিনুন ৳৪৯ থেকে ৳৩৯৯ এর মধ্যে। ৳৫০০+ অর্ডারে ফ্রি ডেলিভারি!",
  keywords: [
    "MardyMart",
    "Mardy Technology",
    "অনলাইন শপিং",
    "বাজেট শপিং",
    "হোম অ্যান্ড কিচেন",
    "গ্যাজেট এক্সেসরিজ",
    "best deals BD",
  ],
  authors: [{ name: "Mardy Technology Ltd." }],
  openGraph: {
    title: "MardyMart – ৳৪৯ থেকে শুরু প্রিমিয়াম শপিং",
    description: "সাশ্রয়ী মূল্যে সেরা পণ্য ঘরে বসে অর্ডার করুন। ৳৫০০+ অর্ডারে ফ্রি ডেলিভারি!",
    type: "website",
    locale: "bn_BD",
    siteName: "MardyMart",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body>
        <ShopProvider>{children}</ShopProvider>
      </body>
    </html>
  );
}
