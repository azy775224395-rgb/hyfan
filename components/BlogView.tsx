import React from "react";
import { ChevronRight, BookOpen } from "lucide-react";
import SEO from "./SEO";
import { articles } from "../data/articles";
import { motion } from "framer-motion";

interface BlogViewProps {
  onNavigate: (hash: string) => void;
}

const BlogView: React.FC<BlogViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <SEO 
        title="المدونة ودليل المشتري | أبو إيفان للطاقة المتجددة" 
        description="تعرف على أحدث نصائح وحلول الطاقة الشمسية في اليمن. أدلة شاملة لاختيار الألواح الشمسية والبطاريات والأنظمة المناسبة لمنزلك." 
      />
      
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => onNavigate("#/")}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-gray-50 text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          <h1 className="text-xl font-black text-emerald-950 flex items-center gap-2">
            <BookOpen size={24} className="text-emerald-600" />
            دليل المشتري والمدونة
          </h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center max-w-3xl mx-auto animate-fade-in-up">
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            مرحباً بك في مدونة <strong>أبو إيفان للطاقة المتجددة</strong>. نوفر لك هنا مقالات تعليمية وأدلة شاملة لتساعدك في اتخاذ القرار الصحيح عند اختيار <strong>منظومة طاقة شمسية في اليمن</strong>.
          </p>
        </div>

        <div className="grid gap-6">
          {articles.map((article, idx) => (
            <motion.a
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              href={`#/blog/${article.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`#/blog/${article.id}`);
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col sm:flex-row"
            >
              <div className="w-full sm:w-1/3 h-48 sm:h-auto shrink-0 relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-duration-500"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="inline-flex py-2 px-4 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs items-center gap-2 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    اقرأ المقال الكامل &larr;
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogView;
