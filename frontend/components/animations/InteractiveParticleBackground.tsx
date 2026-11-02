'use client';

import React, { useEffect, useRef } from 'react';

export const InteractiveParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    const mouse = { x: -9999, y: -9999, radius: 160 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    function spawnAtEdge(w: number, h: number): { x: number; y: number; vx: number; vy: number } {
      const side = Math.floor(Math.random() * 4);
      const speed = 1.1 + Math.random() * 0.4;
      let x = 0, y = 0, vx = 0, vy = 0;

      switch (side) {
        case 0:
          x = Math.random() * w;
          y = -10;
          vx = (Math.random() - 0.5) * 0.3;
          vy = speed;
          break;
        case 1:
          x = w + 10;
          y = Math.random() * h;
          vx = -speed;
          vy = (Math.random() - 0.5) * 0.3;
          break;
        case 2:
          x = Math.random() * w;
          y = h + 10;
          vx = (Math.random() - 0.5) * 0.3;
          vy = -speed;
          break;
        default:
          x = -10;
          y = Math.random() * h;
          vx = speed;
          vy = (Math.random() - 0.5) * 0.3;
      }
      return { x, y, vx, vy };
    }

    class Particle {
      x: number; y: number;
      vx: number; vy: number;
      baseVx: number; baseVy: number;
      size: number;
      alpha: number;
      fadingIn: boolean;
      fadeInThresh: number;
      canvasW: number; canvasH: number;

      constructor(w: number, h: number) {
        this.canvasW = w; this.canvasH = h;
        const spawn = spawnAtEdge(w, h);
        this.x = spawn.x; this.y = spawn.y;
        this.vx = spawn.vx; this.vy = spawn.vy;
        this.baseVx = this.vx; this.baseVy = this.vy;
        this.size = Math.random() * 1.9 + 0.8;
        this.alpha = 0;
        this.fadingIn = true;
        this.fadeInThresh = 80;
      }

      distFromEdge(): number {
        return Math.min(this.x, this.y, this.canvasW - this.x, this.canvasH - this.y);
      }

      isOutOfBounds(): boolean {
        const margin = 20;
        return (
          this.x < -margin || this.x > this.canvasW + margin ||
          this.y < -margin || this.y > this.canvasH + margin
        );
      }

      update() {
        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;
        this.vx += (this.baseVx - this.vx) * 0.04;
        this.vy += (this.baseVy - this.vy) * 0.04;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = ((mouse.radius - dist) / mouse.radius) * 5.0;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }

        this.x += this.vx;
        this.y += this.vy;

        const dfe = this.distFromEdge();
        if (this.fadingIn) {
          this.alpha = Math.min(dfe / this.fadeInThresh, 1);
          if (this.alpha >= 1) this.fadingIn = false;
        }
        if (!this.fadingIn) {
          this.alpha = Math.min(dfe / this.fadeInThresh, 1);
        }
      }

      draw(isDark: boolean) {
        if (this.alpha <= 0.01) return;

        const ex = this.canvasW * 0.50;
        const ey = this.canvasH * 0.40;
        const rx = this.canvasW * 0.22;
        const ry = this.canvasH * 0.18;
        const ellipseDist = ((this.x - ex) / rx) ** 2 + ((this.y - ey) / ry) ** 2;

        let logoFade = 1;
        if (ellipseDist < 1.3) {
          logoFade = Math.max(0, (ellipseDist - 0.6) / 0.7);
          logoFade = Math.min(logoFade, 1);
          if (ellipseDist < 0.6) logoFade = 0.03;
        }

        const finalAlpha = this.alpha * logoFade;
        if (finalAlpha <= 0.01) return;

        // Pinkish-maroon theme in light mode, golden in dark mode
        const color = isDark
          ? `rgba(251,191,36,${finalAlpha * 0.75})`
          : `rgba(215,55,100,${finalAlpha * 0.85})`;

        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.fill();
      }
    }

    const init = (w: number, h: number) => {
      particlesArray = [];
      const isDark = document.documentElement.classList.contains('dark');

      // Doubled density for light theme + extra 35% increase for pink theme screens (2.7x overall increase)
      const densityDivider = isDark ? 1100 : 660;
      const maxCount = isDark ? 3600 : 5800;
      const count = Math.min(Math.floor((w * h) / densityDivider), maxCount);

      for (let i = 0; i < count; i++) {
        const p = new Particle(w, h);
        const stagger = Math.random();
        p.x += p.baseVx * stagger * (Math.max(w, h) * 0.8);
        p.y += p.baseVy * stagger * (Math.max(w, h) * 0.8);
        particlesArray.push(p);
      }
    };

    const animate = () => {
      if (!ctx) return;
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particlesArray.length - 1; i >= 0; i--) {
        const p = particlesArray[i];
        p.update();
        p.draw(isDark);
        if (p.isOutOfBounds()) {
          particlesArray[i] = new Particle(canvas.width, canvas.height);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      init(w, h);
    };

    // Watch dark mode class toggle on <html> element
    const observer = new MutationObserver(() => {
      if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) {
        init(canvas.width, canvas.height);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    handleResize();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" style={{ display: 'block' }} />
    </div>
  );
};
