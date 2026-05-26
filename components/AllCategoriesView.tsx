import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import OptimizedImage from './ui/OptimizedImage';
import SEO from './SEO';

const categoriesGrid = [
  {
    name: 'الالواح الشمسيه',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286799/Gemini_Generated_Image_cheyszcheyszchey_smkwp4.png',
    url: '#/category/solar-panels'
  },
  {
    name: 'البطاريات',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286800/Gemini_Generated_Image_rqnnitrqnnitrqnn_alp0zw.png',
    url: '#/category/batteries'
  },
  {
    name: 'الانفرترات',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286796/Gemini_Generated_Image_gyiz8kgyiz8kgyiz_b9dfzx.png',
    url: '#/category/off-grid-inverters'
  },
  {
    name: 'الاجهزة المنزلية',
    image: 'https://i.postimg.cc/L63YjJSs/IMG-20260125-WA0048.jpg',
    url: '#/category/home-appliances'
  },
  {
    name: 'المكيفات',
    image: 'https://i.postimg.cc/nhsXg07z/IMG_20260125_WA0054.jpg',
    url: '#/category/air-conditioners'
  },
  {
    name: 'اجهزة الطباخه',
    image: 'https://i.postimg.cc/13L8Qwcg/IMG-20260125-WA0070.jpg',
    url: '#/category/cookers'
  },
  {
    name: 'منظومات جاهزه للمنازل',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286800/Gemini_Generated_Image_ayzoi1ayzoi1ayzo_gxhlex.png',
    url: '#/category/home-systems'
  },
  {
    name: 'الغطاسات',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286799/Gemini_Generated_Image_tqzkmatqzkmatqzk_aq73iw.png',
    url: '#/category/submersible-stations'
  },
  {
    name: 'قواعد الالواح الشمسيه',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286793/81bcf5a9-5f9c-4621-bafe-86af17908392_yao4cu.jpg',
    url: '#/category/panel-mounts'
  },
  {
    name: 'قواطع وحمايات',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286794/a2967090-36fc-4846-9284-39d54166cc7f_qa9ipt.jpg',
    url: '#/category/breakers-protections'
  },
  {
    name: 'كيابل الالواح الشمسيه',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286793/e81e271c-820e-4b07-84cf-e8bbba9066f3_x7jyou.jpg',
    url: '#/category/solar-cables'
  },
  {
    name: 'كشافات الطاقة الشمسية',
    image: 'https://res.cloudinary.com/dxzqizvzw/image/upload/v1779286792/af9a6974-8a25-442c-bb9f-a7d71ce12fe3_ojklsg.jpg',
    url: '#/category/solar-lights'
  }
];

interface AllCategoriesViewProps {
  onBack: () => void;
}

const AllCategoriesView: React.FC<AllCategoriesViewProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <SEO title="أقسام منتجات طاقة شمسية في اليمن | أبو إيفان للطاقة" description="تصفح جميع أقسام متجر أبو إيفان للطاقة المتجددة من أفضل ألواح شمسية في اليمن، وبطاريات تخزين للطاقة الشمسية، وإنفرترات وحلول طاقة شمسية للمنازل." />
      
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
           <button 
             onClick={onBack}
             className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
           >
             <ChevronRight size={24} />
           </button>
           <h1 className="text-xl font-black text-gray-900">أقسام المتجر</h1>
           <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            مرحباً بك في الأقسام الرئيسية لمتجر <strong>أبو إيفان للطاقة المتجددة</strong>. نوفر لك أفضل <strong>حلول طاقة شمسية في اليمن</strong> مصممة خصيصاً لتلبي احتياجاتك. اختر من مجموعتنا الواسعة التي تشمل <strong>ألواح شمسية في اليمن</strong> عالية الكفاءة، و <strong>بطاريات تخزين للطاقة الشمسية</strong> طويلة العمر، بالإضافة إلى <strong>إنفرترات</strong> متطورة وأجهزة منزلية موفرة للطاقة لضمان حصولك على أفضل <strong>طاقة شمسية للمنازل</strong> والمشاريع.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {categoriesGrid.map((cat, idx) => (
            <motion.a
              key={idx}
              href={cat.url}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-gray-50 w-full overflow-hidden">
                <OptimizedImage 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex items-end justify-center">
                   {/* Gradient glow overlay */}
                </div>
              </div>
              <div className="p-4 text-center bg-white z-10 flex-grow flex items-center justify-center">
                <h3 className="font-bold text-sm md:text-base text-gray-900 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategoriesView;
