import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, UserProfile } from "./types";
import { LocalDataService } from "./services/localDataService"; // Import Service
import Header from "./components/Header";
// Hero and GlassProductCard kept eager for LCP (Largest Contentful Paint) optimization
import Hero from "./components/Hero";
import LatestProductsBar from "./components/LatestProductsBar";
import BestSellersBar from "./components/BestSellersBar";
import CategoryScroll from "./components/CategoryScroll";
import VideoPromo from "./components/VideoPromo";
import GlassProductCard from "./components/GlassProductCard";
import AnimatedBackground from "./components/AnimatedBackground";
import MobileNav from "./components/MobileNav";
import SEO from "./components/SEO";
import CategoryView from "./components/CategoryView";
import ServicesSection from "./components/ServicesSection";
import LocalBusinessSchema from "./components/LocalBusinessSchema";
import { useCart } from "./context/CartContext";
import {
  Sun,
  Battery,
  Zap,
  Tv,
  Flame,
  Package,
  LayoutGrid,
  AlertTriangle,
  Droplets,
} from "lucide-react";

// --- Step 1: Lazy Load Heavy Page/Section Components ---
const ProductDetail = React.lazy(() => import("./components/ProductDetail"));
const CartDrawer = React.lazy(() => import("./components/CartDrawer"));
const ReviewSection = React.lazy(() => import("./components/ReviewSection"));
const SolarCalculator = React.lazy(
  () => import("./components/SolarCalculator"),
);
const StoryModal = React.lazy(() => import("./components/StoryModal"));
const WarrantyModal = React.lazy(() => import("./components/WarrantyModal"));
const AllReviewsModal = React.lazy(
  () => import("./components/AllReviewsModal"),
);
const AllCategoriesView = React.lazy(
  () => import("./components/AllCategoriesView"),
);
const CheckoutView = React.lazy(() => import("./components/CheckoutView"));
const AuthSidebar = React.lazy(() => import("./components/AuthSidebar"));
const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));
const FloatingContact = React.lazy(
  () => import("./components/FloatingContact"),
);
const FeedbackView = React.lazy(() => import("./components/FeedbackView"));
const PrivacyView = React.lazy(() => import("./components/PrivacyView"));
const RefundPolicyView = React.lazy(
  () => import("./components/RefundPolicyView"),
);
const SearchView = React.lazy(() => import("./components/SearchView"));
const BlogView = React.lazy(() => import("./components/BlogView"));
const ArticleView = React.lazy(() => import("./components/ArticleView"));

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50 backdrop-blur-sm">
    <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
  </div>
);

// Helper to map category names to icons
const getCategoryIcon = (category: string) => {
  if (category === "الكل") return <LayoutGrid size={18} />;
  if (category.includes("الالواح") || category.includes("شمسية"))
    return <Sun size={18} />;
  if (category.includes("البطاريات")) return <Battery size={18} />;
  if (category.includes("الانفرترات")) return <Zap size={18} />;
  if (category.includes("الاجهزة") || category.includes("كهربائية"))
    return <Tv size={18} />;
  if (category.includes("الطباخه")) return <Flame size={18} />;
  if (category.includes("الباقات")) return <Package size={18} />;
  if (category.includes("الغطاسات")) return <Droplets size={18} />;
  return <LayoutGrid size={18} />;
};

const App: React.FC = () => {
  // Load products from LocalDataService instead of constant directly
  const [products, setProducts] = useState<Product[]>([]);
  const [clientIP, setClientIP] = useState<string>("");
  const [isBanned, setIsBanned] = useState(false);

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("hyfan_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          parsed.id &&
          typeof parsed.id === "string" &&
          parsed.id.includes("-")
        ) {
          return parsed as UserProfile;
        }
        localStorage.removeItem("hyfan_user");
        return null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // --- Security & Tracking Logic ---
  useEffect(() => {
    // 1. Fetch Real IP
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = (await response.json()) as { ip: string };
        const ip = data.ip;
        setClientIP(ip);

        // 2. Check Ban Status
        if (LocalDataService.isBanned(ip)) {
          setIsBanned(true);
        } else {
          // 3. Start Session Heartbeat (Only if not banned)
          // Initial Update
          LocalDataService.updateSessionHeartbeat(ip, user?.email, user?.name);

          // Interval Update (Every 30 seconds)
          const interval = setInterval(() => {
            LocalDataService.updateSessionHeartbeat(
              ip,
              user?.email,
              user?.name,
            );
          }, 30000);

          return () => clearInterval(interval);
        }
      } catch (error: any) {
        console.error("Failed to fetch IP", error);
      }
    };
    fetchIP();
  }, [user]);

  useEffect(() => {
    const loadProducts = () => {
      setProducts(LocalDataService.getProducts());
    };
    loadProducts();

    // Listen for updates from Admin Dashboard
    window.addEventListener("products-updated", loadProducts);
    return () => window.removeEventListener("products-updated", loadProducts);
  }, []);

  const [currentHash, setCurrentHash] = useState(window.location.hash || "#/");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل"); // State for selected category

  // State for Floating Contact Button
  const [isContactOpen, setIsContactOpen] = useState(false);

  const homeScrollPos = useRef(0);
  const isBackAction = useRef(false);

  // Use Cart Context
  const { cart, addToCart, removeFromCart, updateQuantity, cartCount } =
    useCart();

  const MAP_URL = "https://maps.app.goo.gl/C3aYNCfbdpDyBTGc8";

  useEffect(() => {
    const onHashChange = () => {
      const newHash = window.location.hash || "#/";
      if (currentHash === "#/") homeScrollPos.current = window.scrollY;
      setCurrentHash(newHash);
      if (newHash === "#/") {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: homeScrollPos.current,
            behavior: isBackAction.current ? "instant" : "smooth",
          });
          isBackAction.current = false;
        });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [currentHash]);

  const navigateTo = (hash: string, resetScroll = false) => {
    if (hash === "#/") isBackAction.current = true;
    if (resetScroll && hash === "#/") homeScrollPos.current = 0;
    window.location.hash = hash;
  };

  const handleUserUpdate = (newUser: UserProfile) => {
    setUser(newUser);
    localStorage.setItem("hyfan_user", JSON.stringify(newUser));
    navigateTo("#/");
  };

  const formatPrice = (sarPrice: number) => {
    return `${sarPrice} ر.س`;
  };

  // Extract unique categories in order + "All"
  const categories = useMemo(() => {
    const preferredOrder = [
      "الالواح الشمسيه",
      "البطاريات",
      "الانفرترات",
      "منظومات جاهزه للمنازل",
      "الغطاسات",
      "قواعد الالواح الشمسيه",
      "قواطع وحمايات",
      "كيابل الالواح الشمسيه",
      "كشافات الطاقة الشمسية",
      "محطات للمصانع و المولات",
    ];
    const availableCategories = Array.from(
      new Set(products.map((p) => p.category)),
    );
    const sortedCats = [
      ...preferredOrder.filter((c) => availableCategories.includes(c)),
      ...availableCategories.filter((c) => !preferredOrder.includes(c)),
    ];
    return ["الكل", ...sortedCats];
  }, [products]);

  // Sync category with Hash
  useEffect(() => {
    if (currentHash === "#/") {
      setSelectedCategory("الكل");
    } else if (currentHash.startsWith("#/category/")) {
      // Simple mapping or finding
      const catSlug = currentHash.replace("#/category/", "");
      // Mapping slugs to real categories
      const slugMap: Record<string, string> = {
        "solar-panels": "الالواح الشمسيه",
        batteries: "البطاريات",
        "off-grid-inverters": "الانفرترات",
        "home-systems": "منظومات جاهزه للمنازل",
        "submersible-stations": "الغطاسات",
        "panel-mounts": "قواعد الالواح الشمسيه",
        "breakers-protections": "قواطع وحمايات",
        "solar-cables": "كيابل الالواح الشمسيه",
        "solar-lights": "كشافات الطاقة الشمسية",
        "factory-stations": "محطات للمصانع و المولات",
        "home-appliances": "الاجهزة المنزلية",
        "air-conditioners": "المكيفات",
        cookers: "اجهزة الطباخه",
        bundles: "الباقات",
        // Keep old fallbacks just in case
        inverters: "الانفرترات",
        "on-grid-inverters": "الانفرترات",
        "pumping-inverters": "الانفرترات",
        "car-inverters": "الانفرترات",
        "lithium-batteries": "البطاريات",
        "gel-batteries": "البطاريات",
        cooling: "منظومات جاهزه للمنازل",
        refrigerators: "منظومات جاهزه للمنازل",
        fans: "منظومات جاهزه للمنازل",
        "solar-ac": "منظومات جاهزه للمنازل",
        systems: "منظومات جاهزه للمنازل",
        "villa-stations": "منظومات جاهزه للمنازل",
        "agri-stations": "الغطاسات",
      };
      const mappedCat = slugMap[catSlug];
      if (mappedCat) {
        setSelectedCategory(mappedCat);
      }
    }
  }, [currentHash]);

  // Filter products based on selected category (Search is on a dedicated page)
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "الكل") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    return result;
  }, [products, selectedCategory]);

  const renderCurrentPage = () => {
    const hash = currentHash;

    if (hash.startsWith("#/product/")) {
      const id = hash.replace("#/product/", "");
      const product = products.find((p) => p.id === id);
      if (product)
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductDetail
              product={product}
              allProducts={products}
              user={user}
              onClose={() => navigateTo("#/")}
              onAddToCart={addToCart}
              onOrderNow={(p) => navigateTo(`#/checkout/${p.id}`)}
              formatPrice={formatPrice}
            />
          </Suspense>
        );
    }

    if (hash.startsWith("#/checkout/")) {
      const id = hash.replace("#/checkout/", "");
      const product = products.find((p) => p.id === id);
      if (product)
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <CheckoutView
              product={product}
              onCancel={() => navigateTo("#/")}
              user={user}
            />
          </Suspense>
        );
    }

    if (hash.startsWith("#/category/")) {
      const catSlug = hash.replace("#/category/", "");
      const slugMap: Record<string, string> = {
        "solar-panels": "الالواح الشمسيه",
        batteries: "البطاريات",
        "off-grid-inverters": "الانفرترات",
        "home-systems": "منظومات جاهزه للمنازل",
        "submersible-stations": "الغطاسات",
        "panel-mounts": "قواعد الالواح الشمسيه",
        "breakers-protections": "قواطع وحمايات",
        "solar-cables": "كيابل الالواح الشمسيه",
        "solar-lights": "كشافات الطاقة الشمسية",
        "factory-stations": "محطات للمصانع و المولات",
        "home-appliances": "الاجهزة المنزلية",
        "air-conditioners": "المكيفات",
        cookers: "اجهزة الطباخه",
        bundles: "الباقات",
        latest: "احدث المنتجات",
      };
      const catName = slugMap[catSlug] || "القسم غير متوفر";

      let catProducts = products;
      if (catSlug === "latest") {
        catProducts = [...products].reverse();
      } else {
        catProducts = products.filter((p) => p.category === catName);
      }

      const getCategoryDescription = (name: string) => {
        if (name === "الالواح الشمسيه") return "اكتشف أفضل ألواح شمسية في اليمن بأسعار مميزة. خيارات متنوعة تشمل ألواح شمسية عالية الكفاءة وتقنيات متطورة لضمان أقصى طاقة شمسية للمنازل والمشاريع من أبو إيفان للطاقة المتجددة.";
        if (name === "البطاريات") return "تسوق أفضل بطاريات تخزين للطاقة الشمسية في اليمن. بطاريات جل وليثيوم تدوم طويلاً لضمان عدم انقطاع الكهرباء وتوفير أفضل حلول طاقة شمسية للمنازل.";
        if (name === "الانفرترات") return "إنفرترات طاقة شمسية عالية الكفاءة بمواصفات عالمية، مثالية لتحويل الطاقة وأحد أهم حلول طاقة شمسية في اليمن.";
        return `تسوق أفضل منتجات ${name} في اليمن من أبو إيفان للطاقة المتجددة ضمن حلولنا الموفرة للطاقة.`;
      };

      return (
        <CategoryView
          categoryName={catName}
          categoryDescription={getCategoryDescription(catName)}
          products={catProducts}
          onAddToCart={addToCart}
          onViewDetails={(p) => navigateTo(`#/product/${p.id}`)}
          onOrderNow={(p) => navigateTo(`#/checkout/${p.id}`)}
          formatPrice={formatPrice}
          onBack={() => navigateTo("#/")}
        />
      );
    }

    if (hash === "#/search") {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <SearchView
            products={products}
            searchQuery={searchQuery}
            onAddToCart={addToCart}
            onViewDetails={(p) => navigateTo(`#/product/${p.id}`)}
            onOrderNow={(p) => navigateTo(`#/checkout/${p.id}`)}
            formatPrice={formatPrice}
          />
        </Suspense>
      );
    }

    if (hash.startsWith("#/blog/")) {
      const id = hash.replace("#/blog/", "");
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <ArticleView id={id} onBack={() => navigateTo("#/blog")} />
        </Suspense>
      );
    }

    if (hash === "#/blog") {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <BlogView onNavigate={navigateTo} />
        </Suspense>
      );
    }

    switch (hash) {
      case "#/admin":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDashboard user={user} onNavigate={navigateTo} />
          </Suspense>
        );
      case "#/cart":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <CartDrawer
              isOpen={true}
              onClose={() => navigateTo("#/")}
              items={cart}
              onRemove={removeFromCart}
              onUpdateQty={updateQuantity}
              user={user}
              formatPrice={formatPrice}
            />
          </Suspense>
        );
      case "#/auth":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AuthSidebar
              isOpen={true}
              onClose={() => navigateTo("#/")}
              user={user}
              onUserUpdate={handleUserUpdate}
            />
          </Suspense>
        );
      case "#/calculator":
        return (
          <div className="pt-8 pb-32 container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-emerald-950">
                حاسبة الطاقة
              </h2>
              <button
                onClick={() => navigateTo("#/")}
                className="text-emerald-600 font-bold text-sm"
              >
                عودة للرئيسية
              </button>
            </div>
            <Suspense
              fallback={
                <div className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
              }
            >
              <SolarCalculator />
            </Suspense>
          </div>
        );
      case "#/story":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <StoryModal onClose={() => navigateTo("#/")} />
          </Suspense>
        );
      case "#/categories":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AllCategoriesView onBack={() => navigateTo("#/")} />
          </Suspense>
        );
      case "#/warranty":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <WarrantyModal onClose={() => navigateTo("#/")} />
          </Suspense>
        );
      case "#/reviews":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AllReviewsModal onClose={() => navigateTo("#/")} />
          </Suspense>
        );
      case "#/feedback":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <FeedbackView onClose={() => navigateTo("#/")} />
          </Suspense>
        );
      case "#/privacy":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivacyView onClose={() => navigateTo("#/")} />
          </Suspense>
        );
      case "#/refund-policy":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <RefundPolicyView onClose={() => navigateTo("#/")} />
          </Suspense>
        );
      default:
        return (
          <div className="flex flex-col gap-0 pb-16 md:pb-32">
            <SEO
              title="الرئيسية | أبو إيفان للطاقة المتجددة - حلول طاقة شمسية في اليمن"
              description="موقع أبو إيفان للطاقة المتجددة يقدم أفضل حلول طاقة شمسية في اليمن. تسوق ألواح شمسية، بطاريات، إنفرترات، وأنظمة طاقة شمسية للمنازل بأفضل الأسعار وتقنيات حديثة."
            />
            <VideoPromo />

            <CategoryScroll />

            {/* Removed Offers Bar and Weekly Offers */}
            {/* Added Latest Products Bar */}
            <LatestProductsBar
              products={products}
              onViewDetails={(p) => navigateTo(`#/product/${p.id}`)}
              formatPrice={formatPrice}
              onAddToCart={(p) => addToCart(p, 1)}
            />

            <BestSellersBar
              products={products}
              onViewDetails={(p) => navigateTo(`#/product/${p.id}`)}
              formatPrice={formatPrice}
              onAddToCart={(p) => addToCart(p, 1)}
            />

            {/* Category Filter Bar removed based on user request */}

            <Hero onOpenStory={() => navigateTo("#/story")} />

            <ServicesSection />

            <div className="mt-8 md:mt-16">
              <Suspense
                fallback={<div className="h-64 bg-gray-50/50 rounded-3xl" />}
              >
                <ReviewSection
                  user={user}
                  onShowAll={() => navigateTo("#/reviews")}
                />
              </Suspense>
            </div>
          </div>
        );
    }
  };

  // --- Banned View ---
  if (isBanned) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle size={64} className="text-red-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-black text-white mb-4">تم حظر الوصول</h1>
        <p className="text-gray-400 font-bold mb-8 max-w-md">
          عذراً، تم حظر عنوان IP الخاص بك ({clientIP}) من الوصول إلى هذا الموقع
          بسبب انتهاك شروط الاستخدام.
        </p>
        <p className="text-xs text-gray-600">
          ID: {window.btoa(String(clientIP || "unknown"))}
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-[#f8fafc] overflow-x-hidden font-sans"
      dir="rtl"
    >
      {/* Global Structured Data */}
      <LocalBusinessSchema />

      {/* Hide Header on Admin Dashboard */}
      {currentHash !== "#/admin" && (
        <Header
          cartCount={cartCount}
          onOpenCart={() => navigateTo("#/cart")}
          onOpenAuth={() => navigateTo("#/auth")}
          searchQuery={searchQuery}
          onSearchSubmit={(q) => {
            setSearchQuery(q);
            navigateTo("#/search");
          }}
          onClearSearch={() => {
            setSearchQuery("");
            if (currentHash === "#/search") {
              navigateTo("#/");
            }
          }}
          onLogoClick={() => navigateTo("#/", true)}
          user={user}
        />
      )}

      <main className="flex-grow relative z-10" role="main">
        {renderCurrentPage()}
      </main>

      {!currentHash.includes("cart") &&
        !currentHash.includes("checkout") &&
        !currentHash.includes("calculator") &&
        !currentHash.includes("admin") && (
          <footer className="bg-white border-t border-gray-100 text-slate-800 py-8 md:py-16 text-right relative z-10 pb-20 md:pb-16 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
              <div className="col-span-1 md:col-span-1">
                <img
                  src="https://res.cloudinary.com/dxzqizvzw/image/upload/v1779209369/IMG_%D9%A2%D9%A0%D9%A2%D9%A6%D9%A0%D9%A5%D9%A1%D9%A9_%D9%A1%D9%A9%D9%A2%D9%A5%D9%A4%D9%A2_kji9am.png"
                  alt="أبو إيفان للطاقة المتجددة"
                  className="w-24 h-24 object-contain rounded-2xl mb-6 shadow-sm border border-gray-100"
                  loading="lazy"
                />
                <h3 className="text-xl font-black text-primary mb-2">
                  أبو إيفان للطاقة المتجددة
                </h3>
                <p className="text-gray-500 font-bold text-sm mb-6 leading-relaxed">
                  نحن متخصصون في توفير أفضل الحلول للطاقة البديلة في اليمن، مع
                  التركيز على الجودة والخدمة الممتازة.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                  >
                    <Sun size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                  >
                    <Zap size={20} />
                  </a>
                </div>
              </div>

              <div className="col-span-1">
                <h4 className="text-lg font-black text-slate-800 mb-6">
                  روابط سريعة
                </h4>
                <nav className="flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={() => navigateTo("#/story")}
                    className="text-sm font-bold text-gray-600 hover:text-primary transition-colors text-right"
                  >
                    من نحن
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo("#/warranty")}
                    className="text-sm font-bold text-gray-600 hover:text-primary transition-colors text-right"
                  >
                    سياسة الضمان
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = MAP_URL;
                      link.target = "_blank";
                      link.rel = "noopener noreferrer";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="text-sm font-bold text-gray-600 hover:text-primary transition-colors text-right"
                  >
                    موقعنا على الخريطة
                  </button>
                </nav>
              </div>

              <div className="col-span-1">
                <h4 className="text-lg font-black text-slate-800 mb-6">
                  الدعم والخصوصية
                </h4>
                <nav className="flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={() => navigateTo("#/feedback")}
                    className="text-sm font-bold text-gray-600 hover:text-primary transition-colors text-right"
                  >
                    الشكاوى و الاقتراحات
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo("#/privacy")}
                    className="text-sm font-bold text-gray-600 hover:text-primary transition-colors text-right"
                  >
                    سياسه الاستخدام و الخصوصيه
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo("#/refund-policy")}
                    className="text-sm font-bold text-gray-600 hover:text-primary transition-colors text-right"
                  >
                    سياسة الاستبدال أو الاسترجاع
                  </button>
                </nav>
              </div>

              <div className="col-span-1">
                <h4 className="text-lg font-black text-slate-800 mb-6">
                  تواصل معنا
                </h4>
                <div className="space-y-4">
                  <p className="text-sm font-bold text-gray-600">
                    📞 +967 784400333
                  </p>
                  <p className="text-sm font-bold text-gray-600">
                    📧 support@abuevan-energy.com
                  </p>
                  <p className="text-sm font-bold text-gray-600">
                    📍 خط الهناجر امام فكة المرور، عدن، اليمن
                  </p>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs font-bold text-gray-400">
                © 2026 أبو إيفان للطاقة المتجددة - جميع الحقوق محفوظة
              </p>
              <div className="flex gap-4">
                <img
                  src="https://i.postimg.cc/mD8zQ6Bq/Screenshot-2026-05-19-at-12-00-00.png"
                  alt="Payment Methods"
                  className="h-6 opacity-30"
                />
              </div>
            </div>
          </footer>
        )}

      {currentHash !== "#/admin" && (
        <MobileNav
          activeTab={currentHash}
          cartCount={cartCount}
          onNavigate={navigateTo}
        />
      )}

      <Suspense fallback={null}>
        <FloatingContact
          isOpen={isContactOpen}
          onToggle={() => setIsContactOpen(!isContactOpen)}
        />
      </Suspense>
    </div>
  );
};

export default App;
