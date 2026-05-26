import React from "react";
import { ChevronRight, Calendar } from "lucide-react";
import SEO from "./SEO";
import FAQSchema from "./FAQSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";
import { articles } from "../data/articles";
import { motion } from "framer-motion";

interface ArticleViewProps {
  id: string;
  onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ id, onBack }) => {
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">المقال غير موجود</h2>
          <button onClick={onBack} className="text-emerald-600 font-bold hover:underline">العودة للمدونة</button>
        </div>
      </div>
    );
  }

  const baseUrl = window.location.origin + window.location.pathname;

  return (
    <article className="min-h-screen bg-white pb-24">
      <SEO 
        title={`${article.title} | مدونة أبو إيفان للطاقة المتجددة`} 
        description={article.excerpt}
        image={article.image}
        type="article"
      />
      <FAQSchema content={article.content} />
      <BreadcrumbSchema 
        items={[
          { name: "الرئيسية", item: `${baseUrl}#/` },
          { name: "المدونة", item: `${baseUrl}#/blog` },
          { name: article.title, item: `${baseUrl}#/blog/${article.id}` }
        ]} 
      />

      
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-gray-50 text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          <h1 className="text-lg font-black text-emerald-950 truncate max-w-[250px] md:max-w-md">
            المدونة
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-64 md:h-96 relative overflow-hidden bg-gray-100">
        <img 
          src={article.image} 
          alt={article.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10 w-full max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-12"
        >
          <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold mb-4">
            <Calendar size={16} />
            <span>نشر في 2026</span>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-black text-emerald-950 mb-6 leading-tight">
            {article.title}
          </h1>

          <div 
            className="prose prose-lg prose-emerald max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Social Share / Tags could go here */}
        </motion.div>
      </div>
    </article>
  );
};

export default ArticleView;
