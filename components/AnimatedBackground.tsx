
import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      baseSpeedY: number;
      frequency: number;
      offset: number;
      opacity: number;
      color: string;
      fadeSpeed: number;

      constructor() {
        this.init();
        this.y = Math.random() * canvas.height;
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 3 + 1;
        this.baseSpeedY = -(Math.random() * 0.4 + 0.2);
        this.frequency = Math.random() * 0.02 + 0.01;
        this.offset = Math.random() * 1000;
        this.opacity = 0;
        this.fadeSpeed = Math.random() * 0.01 + 0.005;
        
        // ألوان هادئة للثيم الفاتح
        const colors = ['#86efac', '#4ade80', '#22c55e', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.baseSpeedY;
        this.x += Math.sin(this.y * this.frequency + this.offset) * 0.6;

        if (this.opacity < 0.4) {
          this.opacity += this.fadeSpeed;
        }

        if (this.y < -50) {
          this.init();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = this.color;
        
        ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 12), 120);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#f0fdf4]">
      {/* Wave/Aura Blobs - Light Emerald Theme */}
      <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[120%] bg-emerald-100/40 blur-[150px] animate-wave-slow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[100%] h-[100%] bg-green-100/30 blur-[180px] animate-wave-slower" />
      <div className="absolute top-[30%] right-[15%] w-[50%] h-[50%] bg-teal-50/50 blur-[120px] animate-wave-fast" />
      
      {/* Light Mesh Overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <style>{`
        @keyframes wave-slow {
          0%, 100% { transform: translate(0, 0) scale(1) skew(0deg); }
          50% { transform: translate(5%, 3%) scale(1.1) skew(2deg); }
        }
        @keyframes wave-slower {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-5%, -5%) scale(1.05) rotate(5deg); }
        }
        @keyframes wave-fast {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10%, 10%) scale(1.2); }
        }
        .animate-wave-slow { animation: wave-slow 30s infinite ease-in-out; }
        .animate-wave-slower { animation: wave-slower 40s infinite ease-in-out; }
        .animate-wave-fast { animation: wave-fast 25s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
