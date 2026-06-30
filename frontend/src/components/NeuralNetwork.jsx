import React, { useEffect, useRef } from "react";

const NeuralNetwork = ({ opacity = 0.7, particleSpeed = 0.25, lineDistance = 220, particleCountRatio = 18000 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * particleSpeed * 2;
        this.vy = (Math.random() - 0.5) * particleSpeed * 2;
        this.radius = 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#22d3ee";
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const count = Math.floor(
        (canvas.width * canvas.height) / particleCountRatio
      );

      for (let i = 0; i < count; i++) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#22d3ee";
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < lineDistance) {
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${
              opacity * (1 - dist / lineDistance)
            })`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalCompositeOperation = "source-over";
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity, particleSpeed, lineDistance, particleCountRatio]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default NeuralNetwork;
