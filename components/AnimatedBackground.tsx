
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-white">
      {/* 
         طبقة التدرج اللوني الرئيسية 
         تتحرك ببطء بين الأبيض، السماوي الفاتح، ولمسة خفيفة من الأخضر لربط الهوية
      */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 30%, #e0f2fe 60%, #ecfdf5 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientFlow 20s ease infinite',
        }}
      />
      
      {/* 
         تأثير توهج الشمس (Energy Glow) - أعلى اليسار
         يعطي إحساساً بالضوء الطبيعي والطاقة
      */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(186, 230, 253, 0.6) 0%, rgba(255, 255, 255, 0) 70%)',
          animation: 'floatLight 10s ease-in-out infinite alternate'
        }}
      />

      {/* 
         تأثير توهج ثانوي - أسفل اليمين
         لإحداث توازن بصري مع لون الهوية (الأخضر الفاتح جداً)
      */}
      <div 
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
          animation: 'floatLight 15s ease-in-out infinite alternate-reverse'
        }}
      />
      
      {/* 
         طبقة ضوضاء خفيفة (Noise) 
         تضيف ملمساً احترافياً وتمنع ظهور تكسر في الألوان (Banding)
      */}
      <div className="absolute inset-0 opacity-[0.025] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatLight {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, 20px) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
