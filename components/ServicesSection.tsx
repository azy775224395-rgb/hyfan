import React from 'react';
import { ShieldCheck, Zap, Droplet, Sun, PenTool as Tool } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-emerald-950 mb-6">
            حلول طاقة مخصصة لتضاريس <span className="text-emerald-600">اليمن</span>
          </h2>
          <p className="text-gray-600 md:text-xl font-bold leading-relaxed">
            لأننا نفهم تنوع المناخ في محافظاتنا، صممنا منظومات متكاملة تناسب الرطوبة العالية في السواحل، والبرودة في الجبال، وقسوة الطبيعة في الصحراء.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Aden & Hodeida */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Droplet size={32} />
            </div>
            <h3 className="text-2xl font-black text-emerald-950 mb-4">أنظمة مقاومة للرطوبة الساحلية</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              أفضل منظومات الطاقة الشمسية المصممة لمدن مثل عدن والحديدة والمكلا. نستخدم ألواح N-Type وكابلات نحاسية مقصدرة تقاوم التآكل والرطوبة والأملاح البحرية، مع إنفرترات مخصصة لتحمل درجات الحرارة الاستثنائية.
            </p>
          </motion.div>

          {/* Sanaa & Dhamar */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <Sun size={32} />
            </div>
            <h3 className="text-2xl font-black text-emerald-950 mb-4">حلول المناطق الجبلية والباردة</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              لمدن مثل صنعاء، ذمار، وعمران.. نوفر منظومات شمسية ذات حصاد طاقة ممتاز في الشتاء، وحلول تدفئة وتسخين مياه متقدمة تعمل بكفاءة حتى في أشد الأيام برودة وغيوماً.
            </p>
          </motion.div>

          {/* Tehama & Hadramout Agriculture */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-black text-emerald-950 mb-4">غطاسات ومضخات المزارع</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              لرواد الزراعة في تہامة، حضرموت، وأبين، نقدم غطاسات بالطاقة الشمسية بضمان حقيقي وصناعة ستانلس ستيل بالكامل لاستخراج المياه بكفاءة وبدون قطرة ديزل واحدة لزيادة أرباح المزارعين.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
