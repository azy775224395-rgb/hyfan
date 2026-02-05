
import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // تحسين الأداء عبر تعطيل الشفافية المعقدة في السياق
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(); // إعادة التهيئة عند تغيير الحجم لضبط عدد الجزيئات
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.init(true);
      }

      init(firstTime = false) {
        this.x = Math.random() * canvas.width;
        this.y = firstTime ? Math.random() * canvas.height : canvas.height + 10;
        this.size = Math.random() * 1.5 + 0.5; // حجم أصغر قليلاً
        this.speedY = -(Math.random() * 0.2 + 0.1); // سرعة أبطأ لتوفير المعالجة
        this.opacity = Math.random() * 0.2 + 0.1;
        this.color = '#86efac';
      }

      update() {
        this.y += this.speedY;
        if (this.y < -20) this.init();
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      // تقليل عدد الجزيئات لزيادة السلاسة
      const particleCount = isMobile ? 15 : 40; 
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // استخدام لون ثابت للخلفية بدلاً من clearRect لتحسين أداء الرسم في بعض المتصفحات
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#f0fdf4';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#f0fdf4]">
      <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[120%] bg-emerald-100/30 blur-[100px]" />
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default AnimatedBackground;
