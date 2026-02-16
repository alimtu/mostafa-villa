"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Wifi,
  Waves,
  Utensils,
  Wind,
  Mountain,
  Coffee,
  Tv,
  MapPin,
  MessageCircle,
  Play,
  Info,
} from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { AIChatButton } from "@/components/ai-chat";

const LuxuryButton = ({ href, children, variant = "primary", className = "", ...props }) => {
  const baseStyles =
    "relative inline-flex items-center justify-center px-8 py-4 font-bold transition-all duration-300 rounded-full group overflow-hidden shadow-lg hover:shadow-xl active:scale-95";
  const variants = {
    primary: "bg-stone-900 text-white hover:bg-stone-800",
    secondary: "bg-white text-stone-900 hover:bg-stone-50",
    outline:
      "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-stone-900/10",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-emerald-100",
  };

  return (
    <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-white/20 to-transparent group-hover:opacity-100" />
      <span className="relative flex items-center gap-2">{children}</span>
    </a>
  );
};

// Dynamic import for Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-stone-100 animate-pulse rounded-2xl flex items-center justify-center text-stone-400">
      در حال بارگذاری نقشه...
    </div>
  ),
});

const GALLERY_SLIDES = Array.from({ length: 21 }, (_, i) => ({
  src: `/afra/${i + 1}.jpeg`,
}));

const AMENITIES = [
  { icon: <Wifi className="w-6 h-6" />, label: "اینترنت پرسرعت" },
  { icon: <Waves className="w-6 h-6" />, label: "استخر آبگرم" },
  { icon: <Utensils className="w-6 h-6" />, label: "آشپزخانه مجهز" },
  { icon: <Wind className="w-6 h-6" />, label: "سیستم سرمایش/گرمایش" },
  { icon: <Mountain className="w-6 h-6" />, label: "ویوی ابدی جنگل" },
  { icon: <Coffee className="w-6 h-6" />, label: "باربیکیو" },
  { icon: <Tv className="w-6 h-6" />, label: "تلویزیون هوشمند" },
  { icon: <Info className="w-6 h-6" />, label: "پارکینگ اختصاصی" },
];

export default function Home() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Fetch Jajiga room data
    fetch("/api/room")
      .then((res) => res.json())
      .then((data) => {
        setRoomData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch room data:", err);
        setLoading(false);
      });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use API coordinates if available, otherwise fallback to defaults
  const position = roomData?.geo ? [roomData.geo.lat, roomData.geo.lng] : [36.793164, 54.964735];
  const title = roomData?.title || "ویلای لوکس مصطفی";
  const description = roomData?.description || "آرامشی بی‌پایان در بلندای ابرها. اقامتگاهی اختصاصی با امکانات رفاهی کامل برای خلق خاطراتی ماندگار.";

  return (
    <div
      className="min-h-screen bg-[#fafaf9] text-[#1c1917] selection:bg-[#78716c] selection:text-white font-sans"
      dir="rtl"
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md py-4 border-b border-stone-200"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-stone-900">
            MOSTAFA <span className="font-light text-stone-500 uppercase">Villa</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#gallery" className="hover:text-stone-500 transition-colors">
              گالری تصاویر
            </a>
            <a href="#amenities" className="hover:text-stone-500 transition-colors">
              امکانات
            </a>
            <a href="#location" className="hover:text-stone-500 transition-colors">
              موقعیت
            </a>
            <a href="#contact" className="hover:text-stone-500 transition-colors">
              تماس با ما
            </a>
          </div>
          <LuxuryButton
            href="tel:09384330636"
            className="px-6 py-2 text-sm"
          >
            رزرو مستقیم
          </LuxuryButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/afra/video-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              ویلای لوکس مصطفی <br />
            </h1>
            <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              در آغوش جنگل‌های هیرکانی، جایی میان مه و ابرها؛ ویلای مصطفی با چشم‌انداز بی‌انتها،
              آرامش ناب و امکانات کامل، مقصدی خاص برای ساختن خاطره‌های ماندگار شماست.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LuxuryButton
                href="tel:09384330636"
                variant="secondary"
                className="px-10 h-14 text-base font-semibold"
              >
                <Phone className="ml-2 h-5 w-5" />
                رزرو و استعلام قیمت
              </LuxuryButton>
              <LuxuryButton
                href="#gallery"
                variant="outline"
                className="px-10 h-14 text-base font-semibold"
              >
                مشاهده گالری
              </LuxuryButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-4 block">
              Luxury Retreat
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-stone-900 leading-tight">
              امکانات رفاهی کامل
            </h2>
            <p className="text-stone-600 leading-relaxed mb-12 text-lg font-light">
              ما در این اقامتگاه تمامی نیازهای شما را پیش‌بینی کرده‌ایم. از اینترنت پرسرعت تا
              استخر آبگرم برای ریلکس کردن در هوای خنک کوهستان.
            </p>
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              {AMENITIES.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-700">
                    {item.icon}
                  </div>
                  <span className="text-stone-800 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-2xl shadow-stone-200 aspect-[4/5]"
            >
              <img
                src="/afra/1.jpeg"
                alt="نمای بیرونی اقامتگاه"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 bg-stone-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">گالری تصاویر</h2>
            <div className="w-20 h-1 bg-stone-900 mx-auto" />
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {GALLERY_SLIDES.map((slide, i) => (
              <motion.div
                key={slide.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 5) * 0.08 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={slide.src}
                  alt={`تصویر ${i + 1} از اقامتگاه`}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Listing Details from API */}
      <AnimatePresence>
        {roomData && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-24 px-6 max-w-7xl mx-auto"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-stone-100 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-32 h-32 bg-stone-50 rounded-br-full -z-10" />
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-stone-900 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {roomData.is_plus ? "Plus Listing" : "Verified"}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="font-bold text-lg">{roomData.ratings.total}</span>
                      <span className="text-stone-400 text-sm">({roomData.ratings.count} نظر)</span>
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 text-stone-900 leading-tight">
                    ویلای مبله در افراتخته
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-10 text-lg font-light whitespace-pre-line">
                    {roomData.description}
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
                    <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 text-center">
                      <span className="block text-2xl font-bold text-stone-900 mb-1">{roomData.guest_number}</span>
                      <span className="text-xs text-stone-500 uppercase font-bold tracking-tighter">ظرفیت استاندارد</span>
                    </div>
                    <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 text-center">
                      <span className="block text-2xl font-bold text-stone-900 mb-1">{roomData.max_guest_number}</span>
                      <span className="text-xs text-stone-500 uppercase font-bold tracking-tighter">حداکثر ظرفیت</span>
                    </div>
                    <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 text-center">
                      <span className="block text-2xl font-bold text-stone-900 mb-1">{roomData.floor_area}m²</span>
                      <span className="text-xs text-stone-500 uppercase font-bold tracking-tighter">متراژ بنا</span>
                    </div>
                    <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 text-center">
                      <span className="block text-2xl font-bold text-stone-900 mb-1">{roomData.bedrooms}</span>
                      <span className="text-xs text-stone-500 uppercase font-bold tracking-tighter">تعداد اتاق</span>
                    </div>
                  </div>
                </div>

                <div className="lg:border-r border-stone-100 lg:pr-12">
                  <div className="sticky top-32">
               

                    <div className="p-8 rounded-4xl bg-stone-900 text-white mb-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/20">
                          <img 
                            src={'/afra/mostafa.webp'} 
                            alt={roomData.host.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-stone-400 text-xs block mb-1">میزبان شما</span>
                          <span className="text-lg font-bold">{roomData.host.name}</span>
                        </div>
                      </div>
                      <div className="space-y-4 text-sm font-medium">
                        <div className="flex justify-between items-center opacity-80">
                          <span>نرخ پاسخگویی</span>
                          <span>{roomData.host.accept_rate}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white" style={{ width: `${roomData.host.accept_rate}%` }} />
                        </div>
                      </div>
                    </div>

                    <LuxuryButton
                      href={`https://www.jajiga.com${roomData.url}`}
                      target="_blank"
                      variant="primary"
                      className="w-full h-16 rounded-3xl"
                    >
                      رزرو از طریق جاجیگا
                    </LuxuryButton>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={GALLERY_SLIDES}
      />

      {/* Full Screen Image Parallax */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div
          style={{
            backgroundImage: "url('/afra/1.jpeg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        <div className="relative text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
              یک قاب از بهشت
            </h2>
            <p className="text-xl md:text-2xl text-stone-200 font-light italic">
              جایی که ابرها به زمین می‌رسند
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section id="location" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-4 block">
            Location
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900">موقعیت ما در نقشه</h2>
        </div>
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white relative group">
          <div className="h-[600px] w-full z-0">
            <Map position={position} />
          </div>
          
          {/* Absolute Routing Button Overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full px-8 max-w-md">
            <LuxuryButton
              href="https://www.google.com/maps/dir/?api=1&destination=36.793164,54.964735"
              target="_blank"
              className="w-full h-16 text-lg shadow-2xl backdrop-blur-xl bg-white/90 text-stone-900 border border-white/50 hover:bg-white"
            >
              <MapPin className="ml-2 w-6 h-6 text-red-500" />
              مسیریابی هوشمند با گوگل مپ
            </LuxuryButton>
          </div>

          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg z-10 max-w-xs hidden sm:block border border-stone-100 transition-transform group-hover:scale-105">
            <div className="flex items-center gap-3 text-stone-900 font-bold mb-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>افراتخته، گلستان</span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              واقع در ارتفاعات علی‌آباد کتول؛ جاده‌ای کوهستانی و زیبا که شما را به بالای ابرها
              می‌برد.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-stone-900">منتظر دیدار شما هستیم</h2>
          <p className="text-lg text-stone-600 mb-12 font-light leading-relaxed">
            برای رزرو مستقیم و استعلام تقویم خالی اقامتگاه، از طریق راه‌های زیر با ما در ارتباط
            باشید.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <LuxuryButton
              href="tel:09384330636"
              className="h-20 rounded-3xl"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <span className="block text-xs opacity-60">تماس تلفنی</span>
                  <span className="text-xl font-bold">09384330636</span>
                </div>
              </div>
            </LuxuryButton>
            <LuxuryButton
              href="https://wa.me/989384330636"
              variant="whatsapp"
              className="h-20 rounded-3xl"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <span className="block text-xs opacity-80">واتس‌اپ</span>
                  <span className="text-xl font-bold underline underline-offset-4">پیام مستقیم</span>
                </div>
              </div>
            </LuxuryButton>
          </div>
        </div>
      </section>

      <AIChatButton />

      <footer className="bg-stone-900 text-stone-400 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-right">
          <div className="col-span-2">
            <div className="text-2xl font-bold tracking-tighter text-white mb-6">
              AFRA <span className="font-light text-stone-500 uppercase">Takhteh</span>
            </div>
            <p className="text-stone-500 font-light leading-relaxed max-w-sm mb-8">
              اقامتگاه لوکس افراتخته، تجربه‌ای متفاوت در دل طبیعت بکر گلستان. ما میزبان لحظات آرام و خاطره‌ساز شما هستیم.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">دسترسی سریع</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#gallery" className="hover:text-white transition-colors underline-offset-8 hover:underline">گالری تصاویر</a></li>
              <li><a href="#amenities" className="hover:text-white transition-colors underline-offset-8 hover:underline">امکانات رفاهی</a></li>
              <li><a href="#location" className="hover:text-white transition-colors underline-offset-8 hover:underline">موقعیت روی نقشه</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors underline-offset-8 hover:underline">رزرو و تماس</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">ارتباط با ما</h4>
            <div className="space-y-4 text-sm font-light">
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-stone-600" />
                09384330636
              </p>
              <p className="flex items-start gap-3 leading-relaxed">
                <MapPin className="w-4 h-4 text-stone-600 mt-1" />
                گلستان، علی‌آباد کتول، روستای ییلاقی افراتخته
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-light text-stone-600">
            © {new Date().getFullYear()} تمامی حقوق برای اقامتگاه افراتخته محفوظ است.
          </p>
        </div>
      </footer>
    </div>
  );
}
