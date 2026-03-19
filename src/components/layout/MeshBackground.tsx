import { useEffect, useRef } from "react";

export default function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let particles: any[] = [];
    const particleCount = 70;

    let clickPoint: { x: number; y: number } | null = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
      }

      move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(250,204,21,0.9)"; // darker gold
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;

          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = 1 - dist / 120;

            ctx.strokeStyle = `rgba(250,204,21,${opacity * 0.35})`;
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const connectToClick = () => {
      if (!clickPoint) return;

      particles.forEach((p) => {
        const dx = p.x - clickPoint!.x;
        const dy = p.y - clickPoint!.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const opacity = 1 - dist / 200;

          ctx.strokeStyle = `rgba(250,204,21,${opacity * 0.7})`;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(clickPoint!.x, clickPoint!.y);
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.move();
        p.draw();
      });

      connect();
      connectToClick();

      requestAnimationFrame(animate);
    };

    animate();

    const handleClick = (e: MouseEvent) => {
      clickPoint = {
        x: e.clientX,
        y: e.clientY,
      };

      setTimeout(() => {
        clickPoint = null;
      }, 800);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-60"
    />
  );
}