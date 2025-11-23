import React, { useEffect, useRef } from "react";

export function Particles({ quantity = 200, color = "251,146,60" }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const cur = particlesRef.current;
      if (cur.length < quantity) {
        for (let i = cur.length; i < quantity; i++) cur.push(createParticle(w, h));
      }
    };
    window.addEventListener("resize", resize);

    function createParticle(width, height) {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,  // doubled speed (was 0.5)
        vy: (Math.random() - 0.5) * 1,  // doubled speed
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      };
    }

    particlesRef.current = Array.from({ length: quantity }).map(() => createParticle(w, h));

    let fillStyle = "";
    if (typeof color === "string" && color.includes(",")) {
      fillStyle = (opacity = 1) => `rgba(${color},${opacity})`;
    } else {
      fillStyle = (opacity = 1) => `${color}${opacity < 1 ? opacity : ""}`;
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle(p.opacity);
        ctx.shadowColor = fillStyle(0.8);
        ctx.shadowBlur = 15;
        ctx.fill();
      });

      // Draw connecting lines
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color},${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [quantity, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
