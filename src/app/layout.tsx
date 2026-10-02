import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MardyMart – ৳৪৯ থেকে ৳৩৯৯ প্রিমিয়াম শপিং | বাংলাদেশের সেরা ফিক্সড প্রাইস শপ",
  description:
    "MardyMart বাংলাদেশের সেরা ফিক্সড-প্রাইস অনলাইন শপ। হোম কিচেন, বিউটি কেয়ার, গ্যাজেট, খেলনা ও আরও অনেক কিছু মাত্র ৳৪৯ থেকে ৳৩৯৯-এ। ফাস্ট ডেলিভারি, প্রিমিয়াম কোয়ালিটি।",
  keywords: ["MardyMart", "মার্ডি মার্ট", "online shopping", "fixed price", "Bangladesh shop", "৯৯ শপ", "সাশ্রয়ী দাম"],
  authors: [{ name: "Mardy Technology Ltd" }],
  openGraph: {
    title: "MardyMart – বাংলাদেশের সেরা ফিক্সড প্রাইস অনলাইন শপ",
    description: "৳৪৯ থেকে ৳৩৯৯-এ প্রিমিয়াম পণ্য। ফাস্ট ডেলিভারি সারাদেশে।",
    type: "website",
    locale: "bn_BD",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
