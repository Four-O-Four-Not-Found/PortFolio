import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const particles: Particle[] = [];
    const particleCount = 350; // Increased for a more dense swarm

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
      life: number;
      maxLife: number;

      constructor() {
        this.x = mouseRef.current.x;
        this.y = mouseRef.current.y;
        this.size = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.maxLife = Math.random() * 60 + 20;
        this.life = this.maxLife;
        this.color = `rgba(0, 132, 255, ${Math.random() * 0.5 + 0.2})`;
      }

      update() {
        // Attract to mouse
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 300) {
          this.vx += dx * 0.001;
          this.vy += dy * 0.001;
        }

        this.x += this.vx;
        this.y += this.vy;
        
        // Damping
        this.vx *= 0.96;
        this.vy *= 0.96;

        this.life--;
        if (this.life <= 0) {
          this.reset();
        }
      }

      reset() {
        this.x = mouseRef.current.x + (Math.random() - 0.5) * 50;
        this.y = mouseRef.current.y + (Math.random() - 0.5) * 50;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = this.maxLife;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = (this.life / this.maxLife) * 0.4;
        ctx.fillStyle = this.color.replace('0.5', opacity.toString());
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 4, // Above body background, below app content
        opacity: 0.8
      }}
    />
  );
};

export default CustomCursor;
