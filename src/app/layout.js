import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { FirebaseAnalytics } from "@/components/firebase-analytics";
import { PushNotification } from "@/components/push-notification";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://afra-landing.ir";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ویلای مصطفی افراتخته | اقامتی لوکس در بام گلستان",
    template: "%s | ویلای مصطفی",
  },
  description:
    "تجربه اقامتی بی‌نظیر در ویلای مصطفی؛ نگین روستای ییلاقی افراتخته. لوکس‌ترین ویلای منطقه با امکانات کامل، استخر آبگرم و چشم‌انداز ابدی جنگل‌های هیرکانی.",
  keywords: [
    "ویلای مصطفی",
    "ویلا مصطفی افراتخته",
    "اجاره ویلا در افراتخته",
    "اقامتگاه لوکس گلستان",
    "ویلا با استخر آبگرم افراتخته",
    "رزرو ویلا علی‌آباد کتول",
    "گردشگری روستای افراتخته",
  ],
  authors: [{ name: "مدیریت ویلای مصطفی" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: "ویلای مصطفی افراتخته",
    title: "ویلای مصطفی | اقامتگاهی لوکس در قلب جنگل‌های افراتخته",
    description:
      "رزرو مستقیم ویلای مصطفی در افراتخته. دارای استخر آبگرم، ویوی جنگل و تمامی امکانات رفاهی مدرن.",
    images: [
      {
        url: "/afra/mostafa.webp",
        width: 1200,
        height: 630,
        alt: "لوگوی ویلای مصطفی",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/afra/mostafa.webp",
    apple: "/afra/mostafa.webp",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
