'use client';

import React, { useEffect, useRef, useState } from 'react';

export const RazorpayWaterDropAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    // Basic theme detection on mount and mutation observer for class changes
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    let time = 0;
    
    // Resize handler
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Mouse tracking
    let mouse = {
      x: canvas.width * 0.65,
      y: canvas.height * 0.5,
      targetX: canvas.width * 0.65,
      targetY: canvas.height * 0.5,
      isHovering: false
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      // Drift back to default position
      mouse.targetX = canvas.width * 0.65;
      mouse.targetY = canvas.height * 0.5;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    class Particle {
      x: number;
      y: number;
      angle: number;
      radius: number;
      size: number;
      opacity: number;
      originDistance: number;
      
      constructor(radius: number, angle: number) {
        this.radius = radius;
        this.angle = angle;
        this.size = 1.5 + Math.random() * 2;
        this.opacity = 0;
        this.x = 0;
        this.y = 0;
        this.originDistance = radius;
      }
      
      update(centerX: number, centerY: number, timeOff: number, maxDist: number) {
        // Continuous outward movement (expanding rings)
        this.radius += 0.6; // speed of wave expansion
        
        // If it goes beyond the screen, reset to center
        if (this.radius > maxDist * 1.5) {
          this.radius = 5; // Reset near center
          this.originDistance = 5;
        }

        // Water drop ripple wavy effect on top of expansion
        const wave = Math.sin((this.radius * 0.05) - (timeOff * 3)) * 8;
        const currentRadius = this.radius + wave;
        
        this.x = centerX + Math.cos(this.angle) * currentRadius;
        this.y = centerY + Math.sin(this.angle) * currentRadius;
        
        // Fade in near center, fade out at edges
        if (this.radius < 50) {
          // Fade in smoothly when newly born
          this.opacity = (this.radius / 50);
        } else {
          // Fade out towards edge
          this.opacity = Math.max(0, 1 - (this.radius / maxDist));
        }
      }
      
      draw(context: CanvasRenderingContext2D, darkTheme: boolean) {
        if (this.opacity <= 0) return;
        
        context.beginPath();
        // Razorpay blue colors
        const color = darkTheme 
          ? `rgba(59, 130, 246, ${this.opacity * 0.8})` // Blue-500
          : `rgba(37, 99, 235, ${this.opacity * 0.7})`; // Blue-600
          
        context.fillStyle = color;
        
        // Draw stretched droplets
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.ellipse(0, 0, this.size * 1.5, this.size * 0.5, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }
    
    // Initialize particles in concentric rings spread out
    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const numRings = isMobile ? 18 : 32;
      const baseRadius = 15;
      
      for (let r = 1; r <= numRings; r++) {
        // Initial random spread across the screen
        const radius = baseRadius * Math.pow(r, 1.15) + (Math.random() * 20);
        const particlesInRing = isMobile ? Math.floor(r * 4) + 6 : Math.floor(r * 7) + 8;
        
        for (let i = 0; i < particlesInRing; i++) {
          const angle = (Math.PI * 2 * i) / particlesInRing + (Math.random() * 0.2);
          particles.push(new Particle(radius, angle));
        }
      }
    };
    
    initParticles();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth lerp for mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      
      time += 0.015;
      
      const maxDist = Math.max(canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update(mouse.x, mouse.y, time, maxDist);
        p.draw(ctx, isDark);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.95 }}
    />
  );
};
